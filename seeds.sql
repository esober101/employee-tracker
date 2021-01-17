USE employee_db;

INSERT INTO department (id, name) 
VALUES (1, "FOH"), 
(2, "BOH"), 
(3, "MGMT");

INSERT INTO role (id, title, salary, deparment_id) 
VALUES (1, "Cashier", 30000, 1), 
(2 "Cook", 30000, 2), 
(3, "Manager", 40000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Emma", "Jo", 1, NULL), 
(2, "Bailey", "Ray", 2, NULL), 
(3, "Eric", "Ober", 3, 3);


