const express = require(`express`);
const inquirer = require(`inquirer`);
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
require('dotenv').config();

init();

function init () {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    '\n\tEmployee-Tracker Application',
    '\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n');
}

const { viewAllRoles, 
    addEmployee, 
    viewAllEmployees, 
    viewAllDepartments, 
    updateRole, 
    addRole, 
    addDatabase,
    // removeEmployee 
} = require(`./config/index`);

const startMenu = () => {
    inquirer.prompt ([
        {
            type: 'list',
            message: `What would you like to do?`,
            name: 'userChoice',
            choices: [
                'View All Employees',
                'View All Roles',
                'View All Departments',
                'Add Employee',
                'Add Role',
                'Add Department',
                'Update Employee Role',
                // 'Remove Employee',
                'Exit Application'
                ],
            },
        ])
    .then((answer) => {
        
        switch (answer.userChoice) {
            case 'View All Employees':
                viewAllEmployees();
                break;

            case 'View All Roles':
                viewAllRoles();
                break;

            case 'View All Departments':
                viewAllDepartments();
                break;

            case 'Add Employee':
                addEmployee();
                break;

            case 'Add Role':
                addRole();           
                break; 

            case 'Add Department':
                addDatabase();
                break;

            case 'Update Employee Role':
                updateRole();
                break;

            // case 'Remove Employee':
            //     removeEmployee();
            //     break;

            case 'Exit Application':
                exitProgram();
            };
        });
}
startMenu();

function exitProgram() {
    console.log(`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
                ` Employee-Tracker Closed `,
                `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
                );
    process.exit();
  }


app.use((req, res) => {
        res.status(404).end;
});

// app.listen(PORT, () => {
//     console.log(`\n\nNow Listening to PORT ${PORT}`);
// });

module.exports = startMenu;
