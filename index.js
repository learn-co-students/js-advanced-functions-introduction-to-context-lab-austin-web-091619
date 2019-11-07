function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arr) {
    return arr.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    })
    return employee
}

function hoursWorkedOnDate(employee, dateStamp) {
    let timeIn = employee.timeInEvents.find(timeIn => timeIn.date === dateStamp).hour
    let timeOut = employee.timeOutEvents.find(timeOut => timeOut.date === dateStamp).hour
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employee, dateStamp) {
    return hoursWorkedOnDate(employee, dateStamp) * employee.payPerHour
}

function allWagesFor(employee) {
    return employee.timeInEvents.map(record => wagesEarnedOnDate(employee, record.date)).reduce((x, y) => x + y)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName)
}


function calculatePayroll(employeeArray) {
    return employeeArray.map(employeeRecord => employeeRecord.timeInEvents.map(record => wagesEarnedOnDate(employeeRecord, record.date)).reduce((x, y) => x + y)).reduce((x, y) => x + y)
}