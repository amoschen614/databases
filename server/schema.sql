CREATE DATABASE chatdb;

USE chatdb;

CREATE TABLE users(uid INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name varchar(30), createdAt DATETIME NOT NULL, updatedAt DATETIME NOT NULL);

CREATE TABLE rooms(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name varchar(15), createdAt DATETIME NOT NULL, updatedAt DATETIME NOT NULL);
CREATE TABLE messages (msgId INT PRIMARY KEY NOT NULL AUTO_INCREMENT, content varchar(250), createdAt DATETIME NOT NULL, updatedAt DATETIME NOT NULL, userid integer not null, FOREIGN KEY fk_userid(userid) references users(uid), roomid integer not null, FOREIGN KEY fk_roomid(roomid) references rooms(id) );

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


insert into users(name, createdAt, updatedAt) values ('user1', '2017-06-13 22:39:17', '2017-06-13 22:39:17');
insert into users(name, createdAt, updatedAt) values ('user2', '2017-06-13 22:39:17', '2017-06-13 22:39:17');
insert into rooms(name, createdAt, updatedAt) values('lobby', '2017-06-13 22:39:17', '2017-06-13 22:39:17');
insert into rooms(name, createdAt, updatedAt) values('HR', '2017-06-13 22:39:17', '2017-06-13 22:39:17');
