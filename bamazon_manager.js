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
	
}


