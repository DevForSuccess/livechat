DROP DATABASE chatApp;
CREATE DATABASE chatApp;

USE chatApp;

CREATE TABLE room (
  id int NOT NULL AUTO_INCREMENT,
  roomname varchar(20),
  PRIMARY KEY (ID)
);

INSERT INTO room (roomname)
VALUES ('Javascript'), ('Python'), ('React'), ('MySQL'), ('Redux'), ('Mongo'),('Sequelize');


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
