const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: {type: String, required: true},
    position: {type: String, required: true},
    category: {type: String},
    year: {type: String},
    experience: {type: String},
    teachRank: {type: String},
    education: {type: String},
    teachHours: {type: String},
    concertHours: {type: String},
    additionalPosition: {type: String},
    addTeachHours: {type: String},
    addConcertHours: {type: String},
    department: {type: String},
    /* teacher tarif list */
    grade: {type: String},
    salary: {type: String},
    teachRankRise: {type: String},
    monthTarif: {type: String},
    experiencePercent: {type: String},
    premium: {type: String},
    twentyPercentTarif: {type: String},
    totalTarif: {type: String},
    /* midlle teacher tarif  */
    totalHours: {type: String},
    loadVolume: {type: String},
    midlleTeacherTarifSalary: {type: String},
    twentyPercentMiddle: {type: String},
    totalMidlle: {type: String},
    salaryAndPremium: {type: String},
    totalAddHours: {type: String}
})

module.exports = mongoose.model('Employee', employeeSchema)