var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : 'password',
	database : 'bamazon_db'
});

inquirer
	.prompt([
		{
			type: 'list',
			message: 'Menu Options:',
			choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
			name: 'choice'
		}
	]).then(function(response) {
		var choice = response.choice;
		if (choice == 'View Products for Sale') {
			console.log('ID, Product Name, Department, Price, Stock');
			viewProducts();
		} else if (choice == 'View Low Inventory') {
			console.log('ID, Product Name, Department, Price, Stock');
			viewLowInventory();
		} else if (choice == 'Add to Inventory') {
			addToInventory();
		}
	})


function viewProducts() {
	connection.connect();
	connection.query('SELECT * FROM products', function
		(error, results, fields) {
			if (error) throw error;
			for (var i in results) {
				var arr = [];
				for (var j in Object.keys(results[i])) {
					arr.push(results[i][Object.keys(results[i])[j]]);
				}
				console.log(arr.join(', '));
			}
		});
	connection.end();
}


function viewLowInventory() {
	connection.connect();
	connection.query('SELECT * FROM products WHERE stock_quantity < 50', function
		(error, results, fields) {
			if (error) throw error;
			for (var i in results) {
				var arr = [];
				for (var j in Object.keys(results[i])) {
					arr.push(results[i][Object.keys(results[i])[j]]);
				}
				console.log(arr.join(', '));
			}
		});
	connection.end();
}

function addToInventory() {
	var currentItems = [];
	var currentQuantity = {};
	connection.connect();
	connection.query('SELECT id, product_name, stock_quantity FROM products', function
		(error, results, fields) {
			if (error) throw error;
			for (var i in results) {
				currentQuantity[results[i].product_name] = results[i].stock_quantity;
				currentItems.push(results[i].product_name);
			}
			console.log(currentQuantity);
			inquirer
				.prompt([
					{
						type: 'list',
						message: 'Select Item to Add:',
						choices: currentItems,
						name: 'choice'
					},
					{
						type: 'input',
						message: 'Add stock quantity:',
						name: 'addQuantity'
					}
				]).then(function(response) {
					currentQuantity[response.choice] += parseInt(response.addQuantity);
					connection.query('UPDATE products SET stock_quantity = ? WHERE product_name = ?', [currentQuantity[response.choice], response.choice], function(error, results, fields) {
							if (error) throw error;
							console.log('Updated quantity for ' + response.choice + ' to: ' + currentQuantity[response.choice]);
						});
					connection.end();
				})
				
		});
}