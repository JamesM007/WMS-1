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

#### Output User Table Data

```sql
    table users;
```

---

## Tasks History

-   PostgresSQL database and user table setup : Elmer Almeida
-   Authentication and Registration : Elmer Almeida
-   Frontend layout template : Elmer Almeida
    -   Protected and restricted views based on user role
