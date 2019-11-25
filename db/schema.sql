DROP DATABASE IF EXISTS EatDaBurgerdb;
CREATE DATABASE EatDaBurgerDBdb;
USE EatDaBurgerdb;

CREATE TABLE burgers (
  id INT NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR (50) NOT NULL,
  price DECIMAL(10,4) NOT NULL,
  devoured BOOLEAN DEFAULT false,  
  cheese BOOLEAN DEFAULT true,
  PRIMARY KEY (id)
);