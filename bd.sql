create database db_forum;

use db_forum;
create table forum(
	id INT auto_increment primary key,
    title VARCHAR(255) not null,
    description text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select*from forum;

create table users(
	id int not null auto_increment primary key,
    name varchar(255) not null,
    password varchar(255) not null,
    email varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

select*from users;

DROP DATABASE db_forum;