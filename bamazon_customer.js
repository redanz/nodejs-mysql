var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : 'password',
	database : 'bamazon_db'
});


function displayProducts() {
	connection.connect();
	connection.query('SELECT id, product_name, price FROM products', function
		(error, results, fields) {
			if (error) throw error;
			console.log('ID  ', 'Product (price)');
			for (var i in results) {
				console.log(results[i].id + '    ' + results[i].product_name + ' ($' + results[i].price + ')');
			}
			// console.log(results);
			askUser();
		});
}


function askUser() {
	var stockItem;
	var priceItem;
	inquirer
		.prompt([
		{
			type: 'input',
			message: 'Type ID of product you\'d like to purchase:',
			name: 'product_id'
		},
		{
			type: 'input',
			message: 'Type quantity of that product you\'d like to purchase:',
			name: 'quantity'
		}
		]).then(function(response) {	
			connection.query('SELECT stock_quantity, price FROM products WHERE id = ?', [response.product_id], function
				(error, results, fields) {
					if (error) throw error;
					stockItem = results[0].stock_quantity;
					priceItem = results[0].price;
					if (response.quantity > stockItem) {
						console.log('Insufficient quantity in stock, please choose a lower number.');
						askUser();
					} else {
						stockItem -= response.quantity;
						connection.query('UPDATE products SET stock_quantity = ? WHERE id = ?', [stockItem, response.product_id], function
							(error, results, fields) {
								if (error) throw error;
								console.log('Total: $' + (response.quantity*priceItem));
							})
						connection.end();
					}
			});
		})
}

displayProducts();

