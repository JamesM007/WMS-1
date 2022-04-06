# Capstone Project - WMS

This is the codebase for Group 25 - UniqueCoders Capstone Project.

This project is built using the **PERN** stack.

-   PostgresSQL
-   Express
-   React
-   NodeJS

---

# Database

PostgresSQL using a database called `WMS`.

#### Create `WMS` database

```sql
create database wms;
```

#### Use `WMS` database

```sql
\c wms
```

#### Create User Table

```sql
create table users (
    user_id serial primary key,
    first_name varchar(120) not null,
    last_name varchar(120) not null,
    username varchar(120) unique not null,
    email varchar(255) unique not null,
    password varchar(255) not null,
    active boolean not null default false,
    role_type varchar(120) not null,
    created_at date default current_date
);
```

#### Create Warehouse Objects Table

```sql
-- Warehouse objects table
create table objects (
    id varchar(120) primary key,
    type varchar(120) not null, -- rect or image
    x int not null,
    y int not null,
    width int not null,
    height int not null,
    image varchar(255),
    fill varchar(120),
    created_at date default current_date,
    active boolean not null default true
);
```

#### Output User Table Data

```sql
table users;
```

#### Change active status of an account

```sql
--- updating by username
update users set active=true where username='<username>';

--- updating by user id
update users set active=true where user_id=<user_id>;
```

---

# Create `.env` File

Under `server` directory, add the following `.env` file:

```env
PORT = 5000
SECRET = 75ca8cbdceeffdfeb4950150e8983436

CLIENT_URL = http://localhost:3000
SERVER_URL = http://localhost:5000
```

---

# Tasks History

**Tasks completed by Elmer.**

-   PostgresSQL database, user table and objects table setup.
-   Authentication, validation and registration.
-   Protected and restricted routes for auth users and guest users.
-   Create canvas for warehouse objects and clear canvas functionality.
-   Create warehouse objects with resize, rotate, and delete functionality.
-   Export canvas as image.
-   Save warehouse objects functionality.
-   AllUsers route to view all users and their roles. [Must be a "Management" role]
-   Redux store for the following:
    -   Quick access to isAuth of the current user.
    -   Get auth user information.
    -   Get all registered users information.
