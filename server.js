var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
    inquirer.prompt({
        type: "list",
        name: "selection",
        message: "Select an option.",
        choices: [
            "Add departments",
            "Add roles",
            "Add employees",
            "View departments",
            "View roles",
            "View employees",
            "Update employee roles"
        ]
    }
    
    )
    .then(function (response) {
        switch (response.action) {
            case "Add departments":
                addDepartments();
                break;
            
            case "Add roles":
                addRoles();
                break;
            
            case "Add employees":
                addEmployees();
                break;

            case "View departments":
                viewDepartments();
                break;
            
            case "View roles":
                viewRoles();
                break;

            case "View employees":
                viewEmployees();
            
            case "Update employee roles":
                updateEmployeeRoles();
                break;
        }
    });
}

function addDepartments() {
    inquirer.prompt({
        type: "input",
        name: "department",
        message: "Add department"
    })
    .then(function (response) {
        connection.query("INSERT INTO department SET?",
        {
            name: response.department
        },
        function(err) {
            if (err) throw err;
            console.log("Department added successfully")
        },
        );
        start();
    });
}

function addRoles() {
    inquirer.prompt({
        type: "input",
        name: "title",
        message: "Add title"
    },
    {
        type: "input",
        name: "salary",
        message: "Add salary"
    },
    {
        type: "input",
        name: "departmentId",
        message: "Add department id"
    },
    )
    .then(function (response) {
        connection.query("INSERT INTO role SET?",
        {
            title: response.title,
            salary: response.salary,
            department_id: response.departmentId
        },
        function(err) {
            if (err) throw err;
            console.log("Role added successfully")
        },
        );
        start();
    });
}

function addEmployees() {
    inquirer.prompt({
        type: "input",
        name: "first",
        message: "First name"
    },
    {
        type: "input",
        name: "last",
        message: "Last name"
    },
    {
        type: "input",
        name: "roleId",
        message: "Employee role"
    },
    {
        type: "input",
        name: "managerId",
        message: "Manager id"
    },
    )
    .then(function (response) {
        connection.query("INSERT INTO employee SET?",
        {
            first_name: response.first,
            last_name: response.last,
            role_id: response.roleId,
            manager_id: response.managerId
        },
        function(err) {
            if (err) throw err;
            console.log("Employee added successfully")
        },
        );
        start();
    });
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, response){
        console.table(response);
        if (err) throw err;
        console.log("Departments")
    });
    start();
}

function viewRoles() {
    connection.query("SELECT * FROM role ", function (err, response){
        console.table(response);
        if (err) throw err;
        console.log("Roles")
    });
    start();
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, response){
        console.table(response);
        if (err) throw err;
        console.log("Employees")
    });
    start();
}

function updateEmployeeRoles() {
    connection.query("SELECT first_name, last_name, id FROM employees", function (err, response){
        let employees = response.map(employee => ({
            name: employee.first_name + " " + employee.last_name, 
            value: employee.id 
        }))
        inquirer.prompt (
        {
            type: "list",
            name: "employee",
            message: "Choose employee to update"
        },
        {
            type: "input",
            name: "role",
            message: "Enter new role"
        }
    )
    .then (function(response){
        connection.query("UPDATE employees SET rol_id = $(response.role} WHERE id = ${response.employeeName}",
        function (err, response){
            console.log(response);
        })
        start();
    });
})}
