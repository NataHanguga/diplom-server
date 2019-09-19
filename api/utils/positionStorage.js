const fs = require('fs');

const propData = 'api/storage/position.json';
const data = JSON.parse(fs.readFileSync(propData, 'utf-8'));

function findSameName(name) {
    return data.filter(el => el.position === name).length;
}
module.exports = {
    getPositions(req, res, next) { res.send(data) },

    getPositionsForTable() { return data },

    createPosition(req, res, next) {
        const {position, salary} = req.body;
        const newPosition = {
            position: position,
            salary: salary,
            id: Date.now()
        }

        if (!findSameName(position)) {
            data.push(newPosition)
            fs.writeFileSync(propData, JSON.stringify(data), 'utf-8')
            res.send(data) 
        } else {
            res.status(401).json({
                message: 'This position already exist'
            })
        }
        
       
    },

    editPosition(req, res,next) {
        const {id} = req.params
        const {position, salary} = req.body
        let status;

        // if (+id === position && !findSameName(position)) {
            data.forEach(pos => {
                if (+pos.id === +id) {
                    pos.position = position;
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
        // } else {
        //     res.status(401).json({
        //         message: 'This position already exist'
        //     })
        // }
        
    },

    deletePosition(req, res, next) {
        const {id} = req.params

        let s = data.filter((value) => value.id !== +id)
        console.log(s, data)
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