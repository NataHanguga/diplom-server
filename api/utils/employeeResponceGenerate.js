/*
  this.positions = [
            { label: 'Select position', value: null },
            { label: 'teacher', value: 'teacher' },
            { label: 'cleaner', value: 'cleaner' },
            { label: 'technic', value: 'technic' },
            { label: 'repaier', value: 'repaier' },
            { label: 'complex maintenance', value: 'complex maintenance' },
            { label: 'dreasser', value: 'dreasser' }
        ];

        this.categories = [
            { label: 'Select category', value: null },
            { label: 'teacher high cat', value: 'teacher high cat' },
            { label: 'teacher first cat', value: 'teacher first cat' },
            { label: 'teacher second cat', value: 'teacher second cat' },
            { label: 'teacher tach cat', value: 'teacher teach cat' }
        ];

        this.teacherRank = [
            { label: 'Select teacher rank', value: null },
            { label: 'methodist', value: 'methodist' },
            { label: 'senior teacher', value: 'senior teacher' }
        ];

        this.educationSelection = [
            { label: 'Select education', value: null },
            { label: 'high III-IV', value: 'high III-IV' },
            { label: 'high I-II', value: 'high I-II' }
        ];

        this.additionalPositions = [
            { label: 'Select education', value: null },
            { label: 'director', value: 'director' },
            { label: 'deputy director', value: 'deputy director' },
            { label: 'deputy departament', value: 'deputy departament' }
        ];
*/
const grade = [
    { category: 'teacher high cat', grade: '14', salary: '5113.9' },
    { category: 'teacher first cat', grade: '13', salary: '4797.1' },
    { category: 'teacher second cat', grade: '12', salary: '4480.3' },
    { category: 'teacher tach cat', grade: '11', salary: '4162.4' },
    { category: 'repaier', grade: '8', salary: '3150' },

];

const teachRank = [
    { label: 'methodist', value: '0.15' },
    { label: 'senior teacher', value: '0.1' }
];
const dDPercent = 0.95;
const position = [
    { label: 'director', salary: '4797,1' },
    { label: 'deputy director', salary: (4797, 1 * dDPercent).toString() },
    { label: 'cleaner', salary: '2094' }, //0.5030
    { label: 'dreasser', salary: '2094' },
    { label: 'technic', salary: '2958' },
    { label: 'complex maintenance', salary: '2613' }
];

let midlleSalary_;
let midlleSumm_;
function roundNumber(number, n = 2) {
    return Math.floor((number) * Math.pow(10, n)) / Math.pow(10, n)
}

function getTarifTeachersList(employee) {
    employee.forEach(e => {
        grade.forEach(g => {
            if (g.category === e.category) {
                e.grade = g.grade
                e.salary = g.salary
            }
        })
        teachRank.forEach(t => {
            if (t.label === e.teachRank) {
                e.teachRankRise = roundNumber(t.value * e.salary)
            }
        })

        e.monthTarif =
            (e.teachRankRise !== undefined)
                ? roundNumber(+e.salary + +e.teachRankRise)
                : e.salary

        e.experiencePercent =
            (+e.experience < 3)
                ? '0' : ((+e.experience <= 9)
                    ? '10' : ((+e.experience <= 19)
                        ? '20' : '30'))
        e.premium = roundNumber(+e.monthTarif * +e.experiencePercent / 100)
        e.twentyPercentTarif = roundNumber(e.monthTarif * 0.2)
        e.totalTarif = roundNumber(+e.monthTarif + +e.premium + +e.twentyPercentTarif)
    })
}

function midlleSalaryUtils(e, totalHours) {
    e.loadVolume = roundNumber(totalHours / 18, 4)
    e.midlleTeacherTarifSalary = roundNumber(e.monthTarif * e.loadVolume)
    e.twentyPercentMiddle = roundNumber(e.midlleTeacherTarifSalary * 0.2)
    e.totalMidlle = roundNumber(e.totalTarif * e.loadVolume)
    e.salaryAndPremium = roundNumber(e.totalMidlle - e.twentyPercentMiddle)
}

function columnSumm(employee, colName) {
    let result = 0;
    employee.forEach(e => {
        result += +e[colName];
    })

    return result;
}

function midlleSalary(employee) {
    let newTeachers = []
    employee.forEach(e => {
        e.totalHours = roundNumber(+e.teachHours + +e.concertHours)
        midlleSalaryUtils(e, e.totalHours);

        if (e.additionalPosition === ('director' || 'deputy director')) {
            console.log(e.fullName, e.addTeachHours, e.addConcertHours)
            let addE = {
                fullName: e.fullName,
                teachHours: e.addTeachHours,
                concertHours: e.addConcertHours,
                monthTarif: e.monthTarif,
                totalTarif: e.totalTarif,
                additionalPosition: e.additionalPosition,
                totalHours: roundNumber(+e.addTeachHours + +e.addConcertHours)
            }
            midlleSalaryUtils(addE, addE.totalHours);
            newTeachers.push(addE);
        }

    });

    const midlleTeachers = employee.concat(newTeachers);
    const summArray = [
        roundNumber(columnSumm(midlleTeachers, 'totalHours')),
        roundNumber(columnSumm(midlleTeachers, 'loadVolume'), 4),
        roundNumber(columnSumm(midlleTeachers, 'monthTarif')),
        roundNumber(columnSumm(midlleTeachers, 'midlleTeacherTarifSalary')),
        roundNumber(columnSumm(midlleTeachers, 'salaryAndPremium')),
        roundNumber(columnSumm(midlleTeachers, 'twentyPercentMiddle')),
        roundNumber(columnSumm(midlleTeachers, 'totalMidlle')),
    ]

    const midlleSalary = roundNumber(summArray[6] / summArray[1]);
    midlleSalary_ = midlleSalary
    midlleSumm_ = summArray
    return { table: midlleTeachers, summ: summArray, midlleSalary: midlleSalary }
}

function deputyDepartmentList(employee) {
    const persent = 15;
    let deputyArray = [];
    employee.forEach(e => {
        if (e.additionalPosition === 'deputy departament') {
            let deputy = {
                fullName: e.fullName,
                departament: e.department,
                salary: e.salary,
                percent: persent,
                pay: roundNumber(e.salary * persent / 100)
            }

            deputyArray.push(deputy)
        }
    })

    const summ = roundNumber(columnSumm(deputyArray, 'pay'))
    const analitycPay = [
        midlleSalary_,
        midlleSumm_[1],
        midlleSumm_[6],
        summ,
        null,
        +summ + +midlleSumm_[6]
    ]
    // console.log(deputyArray, summ, analitycPay)
    // return {table: deputyArray, summ: summ, analitycPay: analitycPay};

}

function repaierTable(repaier) {
    let percent = '0.4588'
    let gradeRepaier = grade.filter(g => g.category === 'repaier')
    let r = {
        position: gradeRepaier[0].category,
        numbers: repaier.length,
        grade: gradeRepaier[0].grade,
        salary: gradeRepaier[0].salary
    }

    r.monthSalary = roundNumber(r.salary * +percent),
        r.yearSalary = roundNumber(r.monthSalary * 12)
    // return r
}

function staffList(employee) {
    let arr = []

        console.log(p.label);
        // employee.forEach(e => {
        //     let employ
        //     let count = 0
        //     if (e.position === 'teacher') {
        //         employ = employee.filter(e => {
        //             position.forEach(p => 
        //                 return(e.additionalPosition === p.label);
        //         })
        //         ).forEach(e => count++)
        //     } else {
        //         employ = employee.filter(e => e.position === p.label).forEach(e => count++)

        //     }
        // console.log(count, employ, e.fullName)
        // })


}



module.exports = {
    getEmployeesArray(employee) {
        let teachers = employee.filter(empl => empl.position === 'teacher')
        getTarifTeachersList(teachers)
        midlleSalary(teachers)
        deputyDepartmentList(teachers)
        let repaier = employee.filter(e => e.position === 'repaier')
        repaierTable(repaier)
        staffList(employee)
        return employee;
    }


}