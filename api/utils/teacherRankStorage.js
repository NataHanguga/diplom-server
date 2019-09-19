const fs = require('fs');

const propData = 'api/storage/teacherRank.json';
const data = JSON.parse(fs.readFileSync(propData, 'utf-8'));
function findSameName(name) {
    return data.filter(el => el.label === name).length;
}
module.exports = {
    getRanks(req, res, next) { res.send(data) },

    getRanksForTable() { return data },

    used(id) {
        data.forEach((value) => {
            if (+value.id === +id) {
                value.isUsed = true;
            } else {
                value.isUsed = false;
            }
        })
    },

    createRank(req, res, next) {
        const {label, value} = req.body;
        const newPercent = {
            label: label,
            isUsed: false,
            value: value,
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

    editRank(req, res,next) {
        const {id} = req.params
        const {label, value} = req.body
        let status;

            data.forEach(pos => {
                if (+pos.id === +id) {
                    pos.label = label;
                    pos.value = value;
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

    deleteRank(req, res, next) {
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