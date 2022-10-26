const viewAll = `SELECT employees.id, employees.first_name, employees.last_name, 
    roles.title, departments.name, roles.salary
    FROM employees
    JOIN roles ON roles.id = employees.role_id
    JOIN departments ON departments.id = roles.department_id;`;

const viewRoles = `SELECT * FROM roles;`;

const viewDepartments = `SELECT * FROM departments;`;

module.exports = { viewAll, viewRoles, viewDepartments };
