const inquirer = require("inquirer");
const mysql = require("mysql");
const {printTable} = require("console-table-printer");
//setup connection to database
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Spartan117",
  database: "bamazonDB"
});

db.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + db.threadId);
  showProducts();
});

function showProducts(){
  db.query('SELECT item_id, product_name, price FROM products', (err, res) => {
    if (err) throw err;
    printTable(res);
    console.log("--".repeat(40));
    orderProducts();
  });
  db.end();
};

function orderProducts(){
  console.log("What would you like to buy?");
  inquirer.prompt([{
    name: "itemID",
    message: "Pick the id of the item you would like to purchase: "
  },{
    name: "quantity",
    message: "How many would you like to purchase? "
  }]).then(function(userChoice){
    
  })
};