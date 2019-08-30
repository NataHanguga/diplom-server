const fs = require('fs');

const propData = 'api/storage/grade.json';
const data = JSON.parse(fs.readFileSync(propData, 'utf-8'));

function findSameName(name) {
    return data.filter(el => el.category === name).length;
}
module.exports = {
    getGrades(req, res, next) { res.send(data) },

    getGradesForTable() { return data },

    createGrade(req, res, next) {
        const {category, grade, salary} = req.body;
        const newPosition = {
            category: category,
            grade: grade,
            salary: salary,
            id: Date.now()
        }

        if (!findSameName(category)) {
            data.push(newPosition)
            fs.writeFileSync(propData, JSON.stringify(data), 'utf-8')
            res.send(data) 
        } else {
            res.status(401).json({
                message: 'This category already exist'
            })
        }
        
       
    },

    editGrade(req, res,next) {
        const {name} = req.params
        const {category, grade, salary} = req.body
        let status;

        if (name === category && !findSameName(category)) {
            data.forEach(pos => {
                if (pos.category === name) {
                    pos.category = category;
                    pos.grade = grade;
                    pos.salary = salary;
                    status = 1;
                } else {
                    status = 0
                }
            })
            if (!status) {
                res.status(404).json({
                    message: 'Nothing founded'
                })
            } else {
                fs.writeFileSync(propData, JSON.stringify(data), 'utf-8')
                res.send(data) 
            }
        } else {
            res.status(401).json({
                message: 'This category already exist'
            })
        }
        
    },

    deleteGrade(req, res, next) {
        const {id} = req.params

        let s = data.filter((value) => value.id !== +id)
        if(data.length === s.length) {
            res.status(404).json({
                message: 'Nothing founded'
            })
        } else {
            fs.writeFileSync(propData, JSON.stringify(s), 'utf-8')
            res.send(s) 
        }
    }
}