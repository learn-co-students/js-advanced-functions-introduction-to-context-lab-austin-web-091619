// Your code here
function createEmployeeRecord(employeeArray){
 let employee = {
     firstName: employeeArray[0],
     familyName: employeeArray[1],
     title: employeeArray[2],
     payPerHour: employeeArray[3],
     timeInEvents:[],
     timeOutEvents:[]
 }
 return employee
}

function createEmployeeRecords(employees){
    return employees.map(employee => createEmployeeRecord(employee) );

}

function createTimeInEvent(employee, timeStr){
    
    employee.timeInEvents.push({
        type:"TimeIn",
        date: timeStr.split(" ")[0],
        hour: parseInt(timeStr.split(" ")[1])
    })
    return employee
}

function createTimeOutEvent(employee, timeStr){
    employee.timeOutEvents.push({
        type:"TimeOut",
        date: timeStr.split(" ")[0],
        hour: parseInt(timeStr.split(" ")[1])
    })
    return employee
}

function hoursWorkedOnDate(employee, date){
   let clockin = employee.timeInEvents.find(event=> event.date == date)
   let clockout = employee.timeOutEvents.find(event=> event.date == date)
   return (clockout.hour - clockin.hour)/100
}

function wagesEarnedOnDate(employee, date){
   return hoursWorkedOnDate(employee,date)*employee.payPerHour
}
function allWagesFor(employee){
    
   return employee.timeInEvents.reduce(function(accumulator, timeInEvent){
        
        return accumulator+ wagesEarnedOnDate(employee,timeInEvent.date)
    }, 0)
    
}
function calculatePayroll(employeeArray){
    return employeeArray.reduce(function(memo,employee){return memo+allWagesFor(employee)},0)
}

function findEmployeeByFirstName(employeeArray, name){
    return employeeArray.find(employee=> employee.firstName == name)
}