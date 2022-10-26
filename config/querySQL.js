const viewAllEmployee = `SELECT employees.id, employees.first_name, employees.last_name, 
    roles.title, departments.name, roles.salary
    FROM employees
    JOIN roles ON roles.id = employees.role_id
    JOIN departments ON departments.id = roles.department_id
    ORDER BY employees.id ASC;`;
const viewDepartments = `SELECT * FROM departments;`;
const viewRoles = `SELECT * FROM roles;`;

module.exports = { viewAllEmployee, viewRoles, viewDepartments };
