use employee_db;

INSERT INTO departments (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 4),
        ("Salesperson", 80000, 4),
        ("Lead Engineer", 150000, 1),
        ("Software Engineer", 120000, 1),
        ("Account Manager", 160000, 2),
        ("Accountant", 125000, 2),
        ("Legal Team Lead", 250000, 3),
        ("Lawyer", 190000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Christian","Empalmado", 1, null),
        ("Michael","Jordan", 2, 1),
        ("Lebron","James", 3, null),
        ("Kobe","Bryant", 4, 3 ),
        ("Kevin","Durant", 5, null),
        ("Stephen","Curry", 6, 5),
        ("Klay","Thompson", 7, null),
        ("Nikola","Jokic", 8, 7);