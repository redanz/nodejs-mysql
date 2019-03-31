DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(255),
	department_name VARCHAR(255),
	price INT,
	stock_quantity INT,
	PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
	('Shoes', 'Clothing', 100, 10),
	('Shirt', 'Clothing', 50, 14),
	('Charging Cable', 'Electronics', 20, 25),
	('Vacuum Cleaner', 'Home', 350, 2),
	('Shampoo', 'Beauty & Health', 15, 16),
	('Jenga', 'Games & Toys', 40, 1),
	('Basketball', 'Sports', 25, 11),
	('Jump Starter', 'Automotive', 100, 7),
	('Headphones', 'Electronics', 150, 3),
	('Desk Lamp', 'Home', 30, 9);
	
