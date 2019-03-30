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
	('Shoes', 'Clothing', 100, 50),
	('Shirt', 'Clothing', 50, 100),
	('Charging Cable', 'Electronics', 20, 300),
	('Vacuum Cleaner', 'Home', 350, 20),
	('Shampoo', 'Beauty & Health', 15, 500),
	('Jenga', 'Toys', 40, 80),
	('Basketball', 'Sports', 25, 250),
	('Jump Starter', 'Automotive', 100, 55),
	('Headphones', 'Electronics', 150, 99),
	('Beard Trimmer', 'Beauty & Health', 30, 60);
	
