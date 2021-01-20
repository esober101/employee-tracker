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
					"Update employee roles",
					"Exit"
				]
			}

		)
		.then(function(response) {
			switch (response.selection) {
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
					break;

				case "Update employee roles":
					updateEmployeeRoles();
					break;

				case "Exit":
					connection.end();
					break;
			}
		});
}

function addDepartments() {
	inquirer.prompt([
		{
			type: "input",
			name: "department",
			message: "Add department"
		}])
		.then(function(response) {
			connection.query("INSERT INTO department SET?", {
						name: response.department
					},
					function(err) {
						if (err) { throw err; }
						console.table(response);
						console.log("Department added successfully");
						start();
				});					
		});	
}

function addRoles() {
	inquirer.prompt([{
			type: "input",
			name: "title",
			message: "Add title"
		}, {
			type: "input",
			name: "salary",
			message: "Add salary"
		}, {
			type: "input",
			name: "departmentId",
			message: "Add department id"
		}, ])
		.then(function(response) {
			connection.query("INSERT INTO role SET?", {
					title: response.title,
					salary: response.salary,
					department_id: response.departmentId
				},
				function(err) {
					if (err) { throw err; }
                	console.table(response);
					console.log("Role added successfully");
					start();
			});
		});
		
}

function addEmployees() {
	inquirer.prompt([{
			type: "input",
			name: "first",
			message: "First name"
		}, {
			type: "input",
			name: "last",
			message: "Last name"
		}, {
			type: "input",
			name: "role_id",
			message: "Employee role"
		}, {
			type: "input",
			name: "manager_id",
			message: "Manager id"
		}, ])
		.then(function(response) {
			connection.query("INSERT INTO employee SET?", {
					first_name: response.first,
					last_name: response.last,
					role_id: response.roleId,
					manager_id: response.managerId
				},
				function(err) {
					if (err) { throw err; }
					console.table(response);
					console.log("Role added successfully");	
					start();
			});
		});
		
}

function viewDepartments() {
	connection.query("SELECT * FROM department", function(err, response) {
		if (err) { throw err; }
		console.table(response);
		console.log("These are the current departments");
		start();
	});
}

function viewRoles() {
	connection.query("SELECT * FROM role ", function(err, response) {
		if (err) { throw err; }
		console.table(response);
		console.log("These are the current roles");
		start();
	});
}

function viewEmployees() {
	connection.query("SELECT * FROM employee", function(err, response) {
		if (err) { throw err; }
		console.table(response);
		console.log("These are the current employees");
		start();
	});
}

function updateEmployeeRoles() {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                message: "Choose employee to update",
                name: "update",
                choices: res.map(res => res.id + " " + res.first_name + " " + res.last_name)
            }
        ]).then(employee => {
            var updateRole = employee.update.split(' ')[0];

            connection.query("SELECT * FROM role", (err, res) => {
                if (err) throw err;
                inquirer.prompt([
                    {
                        type: "list",
                        message: "Choose role",
                        name: "newrole",
                        choices: res.map(res => res.id + " " + res.title)
                    }
                ]).then(newrole => {
                    let roleId = newrole.newrole.split(' ')[0];
                    console.log("Update complete");
                    connection.query("UPDATE employee SET role_id = ? WHERE id = ?",
                        [roleId, updateRole],
                        (err, res) => {
                            if (err) throw err;
                        }
                    );
                    start();
                });
            });
        });
	});
}
