-- users table
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
