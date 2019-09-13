const fs = require('fs');

const propData = 'api/storage/education.json';
const data = JSON.parse(fs.readFileSync(propData, 'utf-8'));

function findSameName(name) {
    return data.filter(el => el.label === name).length;
}
module.exports = {
    getEducations(req, res, next) { res.send(data) },

    getEducationsForTable() { return data },

    createEducation(req, res, next) {
        const {label} = req.body;
        console.log(label)

        if (label) {
            const newPercent = {
                label: label,
                id: Date.now()
            }

            data.push(newPercent)
            fs.writeFileSync(propData, JSON.stringify(data), 'utf-8')
            res.send(data) 
        } else {
            res.status(401).json({
                message: 'This education label already exist'
            })
        }
       
    },

    editEducation(req, res,next) {
        const {id} = req.params;
        const {label} = req.body
        let status;

        status = data.filter(pos => {
            if (+pos.id !== +id) {
                return 0;
            } else {
                pos.label = label;
                return 1
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

    deleteEducation(req, res, next) {
        const {id} = req.params;

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