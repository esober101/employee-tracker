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
};