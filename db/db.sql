SELECT departments.name, departments.id as id, roles.title, roles.salary 
FROM departments
JOIN roles ON roles.department_id = departments.id GROUP BY roles.id;

SELECT roles.id, roles.title, departments.name, roles.salary
FROM departments
JOIN roles ON roles.department_id = departments.id;

SELECT employees.id, employees.first_name, employees.last_name, 
roles.title, departments.name, roles.salary
FROM employees
JOIN roles ON roles.id = employees.role_id
JOIN departments ON departments.id = roles.department_id;