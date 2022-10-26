const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const map = require('map');
// const startMenu = require('../server');

const {viewAllEmployee, viewRoles, viewDepartments} = require('./querySQL');
const e = require('express');
require('dotenv').config()

const db = mysql.createConnection (
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);

const addEmployee = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'firstName',
            message: `Enter the Employee's First name.`
        },
        {
            type: 'input',
            name: 'lastName',
            message: `Enter the Employee's Last name.`
        },
    ])
    .then((name) => {
        const startMenu = require('../server');
        const employee = [JSON.stringify(name.firstName).trim(), JSON.stringify(name.lastName).trim()];
        console.log(employee);
        db.promise().query('SELECT roles.id, roles.title FROM roles;')
        .then(((data) => { 
            const roleList = data[0].map(({id, title}) => ({value: id, name: title}));
            inquirer.prompt ([
                {
                    type: 'list',
                    name: 'employeeRole',
                    message: 'Assign a role to the employee.',
                    choices: roleList
                }
            ])
            .then((roleData) => {
                employee.push(roleData.employeeRole);
                console.log(employee);
                db.promise().query('SELECT * FROM employees;')
                .then(((data) => {
                    const managerList = data[0].map(({first_name, last_name, role_id}) => ({value: role_id, name: `${first_name} ${last_name}` }));
                    inquirer.prompt ([
                        {
                            type: 'list',
                            name: 'employeeManager',
                            message: `Who is this Employee's Manager?`,
                            choices: managerList
                        }
                    ])
                    .then((managerData) => {
                        employee.push(managerData.employeeManager);
                        db.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (${employee[0]}, ${employee[1]}, ${employee[2]}, ${employee[3]});`)
                        .then(() => {
                            console.log(`\n${name.firstName} ${name.lastName} has been added to the database!\n`)
                            startMenu();
                        })
                    })
                })) 
            })
        }))
    })}

const updateRole = () => {
    const startMenu = require('../server');
    
    const employeeArray = [];
    db.promise().query('SELECT employees.id AS id, first_name, last_name FROM employees;')
    .then((data) => {
        const employeeList = data[0].map(({id, first_name, last_name,}) => ({value: id, name: `${first_name} ${last_name}`}));
        inquirer.prompt([
            {
                type: 'list',
                name: 'selectEmployee',
                message: 'Select which Employee to Update.',
                choices: employeeList
            }
        ])
        .then((data) => {
            employeeArray.push(data.selectEmployee);
            db.promise().query('SELECT roles.id, roles.title FROM roles;')
            .then((data) => {
                const roleList = data[0].map(({id, title}) => ({value: id, name: title}));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'selectRole',
                        message: 'Select the Role of this Employee is switching.',
                        choices: roleList
                    }
                ])
                .then((roleChoice) => {
                    employeeArray.push(roleChoice.selectRole);
                    console.log(employeeArray);
                    db.promise().query(`UPDATE employees SET role_id = ${employeeArray[1]} WHERE employees.id = ${employeeArray[0]};`)
                    .then(() => {
                        console.log(`\nEmployee's Role has been Updated!\n`)
                        startMenu();
                    })
                })
            }) 
        })
    })};

const addRole = () => {
    const startMenu = require(`../server`);
    db.promise().query(viewDepartments)
    .then((data) => {
        const departmentList = data[0].map(({id, name}) => ({value: id, name: name}))
        inquirer.prompt ([
            {
                type: `input`,
                name: `roleName`,
                message: `What is the name of the Role?`
            },
            {
                type: `input`,
                name: `salary`,
                message: `What is the salary for this Role?`
            },
            {
                type: `list`,
                name: `department`,
                message: `What Department does the Role belong to?`,
                choices: departmentList
            },
        ])
        .then((data) => {
            const addRoleData = [JSON.stringify(data.roleName), data.salary, data.department];
            db.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES (${addRoleData[0]}, ${addRoleData[1]}, ${addRoleData[2]});`)
            .then(() => {
                console.log(`\n~~~~~ ${data.roleName} Role has been successfully added! \n~~~~~~`);
                startMenu();
            })
        })
    })
};

const addDatabase = () => {
    const startMenu = require(`../server`);
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message:'What is the name of the department?' 
        }
    ])
    .then((data) => {
        const departmentData = [JSON.stringify(data.departmentName)];
        db.promise().query(`INSERT INTO departments (name) VALUES (${departmentData[0]});`)
        .then(() => {
            console.log(`\n~~~~~ ${data.departmentName} Department has been successfully added! ~~~~~~\n`);
            startMenu();
        })
    })
}

// const removeEmployee = () => {
//     const startMenu = require('../server');

//     // const employeeArray = [];
//     db.promise().query('[SELECT employees.id AS id, first_name, last_name FROM employees;')
//     .then((data) => {
//         const employeeList = data[0].map(({id, first_name, last_name,}) => ({value: id, name: `${first_name} ${last_name}`}));
//         inquirer.prompt([
//         {
//             type: 'list',
//             name: 'removeEmployee',
//             message: 'Select Employee to Remove.',
//             choices: employeeList
//         }
//     ])
//         .then((employeeId) => {
//             db.promise().query('DELETE FROM employee WHERE id = ?', employeeId);
//             console.log(`\nThis Employee has been Removed\n`);
//             startMenu();
//         })
//     })
    


// }
        
const viewAllRoles = () => { 
    const startMenu = require(`../server`);
    db.query(viewRoles, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.table(data);
            startMenu();
        }
    })};

const viewAllEmployees = () => {
    const startMenu = require(`../server`);
    db.query(viewAllEmployee, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.table(data);
            startMenu();
        }
    })
}

const viewAllDepartments = () => {
    const startMenu = require(`../server`);
    db.query(viewDepartments, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.table(data);
            startMenu();
        }
    })
}
module.exports = { addEmployee, 
    viewAllRoles, 
    viewAllEmployees, 
    viewAllDepartments, 
    updateRole, 
    addRole, 
    addDatabase 
};