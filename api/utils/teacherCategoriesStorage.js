const fs = require('fs');

const propData = 'api/storage/teacherCategories.json';
const data = JSON.parse(fs.readFileSync(propData, 'utf-8'));

function findSameName(name) {
    return data.filter(el => el.label === name).length;
}
module.exports = {
    getCategories(req, res, next) { 
        res.send(data) 
    },

    getCategoriesForTable() { return data },

    createCategory(req, res, next) {
        const {label} = req.body;
        const newPercent = 
        { 
            label: label, 
            id: Date.now()
        }

        if (!findSameName(label)) {
            data.push(newPercent)
            fs.writeFileSync(propData, JSON.stringify(data), 'utf-8')
            res.send(data) 
        } else {
            res.status(401).json({
                message: 'This category already exist'
            })
        }
       
    },

    editCategory(req, res,next) {
        const {id} = req.params;
        const {label} = req.body
        let status;

            data.forEach(pos => {
                if (+pos.id === +id) {
                    pos.label = label;
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
    },

    deleteCategory(req, res, next) {
        const {id} = req.params

        let s = data.filter((value) => +value.id !== +id)
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