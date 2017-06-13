CREATE DATABASE chatdb;

USE chatdb;

CREATE TABLE users(uid INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name varchar(30));

CREATE TABLE rooms(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name varchar(15));
CREATE TABLE messages (msgId INT PRIMARY KEY NOT NULL AUTO_INCREMENT, content varchar(250), userid integer not null, FOREIGN KEY fk_userid(userid) references users(uid), roomid integer not null, FOREIGN KEY fk_roomid(roomid) references rooms(id) );

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

