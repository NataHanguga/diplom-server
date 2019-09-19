const fs = require('fs');

const propData = 'api/storage/studentPayConstant.json';
const data = JSON.parse(fs.readFileSync(propData, 'utf-8'));

module.exports = {
    getPay(req, res, next) {
        res.send([data]);
    },

    getPayAsConstant() {
        return data.pay;
    },

    editPay(req, res, next) {
        const {pay} = req.body;
        // data.push({pay: pay})
        fs.writeFileSync(propData, JSON.stringify([{pay: pay}]), 'utf-8')
        res.send(data) 
    }
}