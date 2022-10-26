const express = require(`express`);
const inquirer = require(`inquirer`);
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
require('dotenv').config();

const { viewAllRoles, 
    addEmployee, 
    viewAllEmployees, 
    viewAllDepartments, 
    updateRole, 
    addRole, 
    addDatabase 
} = require(`./config/index`);

const startMenu = () => {
    inquirer.prompt ([
        {
            type: `list`,
            message: `What would you like to do?`,
            name: `startChoice`,
            choices: [
                    `View All Employees`,
                    `Add Employee`,
                    `Update Employee Role`,
                    `View All Roles`,
                    `Add Role`,
                    `View All Departments`,
                    `Add Department`,
                    `Exit`
                ],
            },
        ])
    .then((answer) => {
        
        switch (answer.startChoice) {
            case `View All Employees`:
                viewAllEmployees();
                break;

            case `View All Roles`:
                viewAllRoles();
                break;

            case `View All Departments`:
                viewAllDepartments();
                break;

            case `Add Employee`:
                addEmployee();
                break;

            case `Add Role`:
                addRole();           
                break; 

            case `Add Department`:
                addDatabase();
                break;

            case `Update Employee Role`:
                updateRole();
                break;

            case `Exit`:
                exitProgram();
            };
        });
}
startMenu();

function exitProgram() {
    console.log(`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
                ` Database Closed `,
                `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
                );
    process.exit();
  }


app.use((req, res) => {
        res.status(404).end;
});

app.listen(PORT, () => {
    console.log(`Now Listening to PORT ${PORT}`);
});

module.exports = startMenu;
