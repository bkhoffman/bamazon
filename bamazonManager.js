const inquirer = require("inquirer");
const mysql = require("mysql");
const {printTable} = require("console-table-printer");

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: "root",
  password: "Spartan117",
  database: "bamazonDB"
});

db.connect(function(err){
  if(err) throw err;
  console.log("connected as id " + db.threadId);
  managerOptions();
});

function managerOptions(){
  inquirer.prompt([{
    name: "menuOptions", 
    type: "rawlist",
    message: "What would you like to do?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
  }]).then(function(choice){
    // console.log(choice.menuOptions);
    switch(choice.menuOptions){
      case "View Products for Sale": viewProducts();
        break;
      case "View Low Inventory": lowInventory();
        break;
      case "Add to Inventory": console.log("Add to Inventory");
        break;
      case "Add New Product": console.log("Add New Product");
        break;
      case "Quit": console.log("Quit");
    }; 
  });
};

function viewProducts(){
  db.query("SELECT * FROM products", function(err, res){
    if (err) throw err;
    printTable(res);
    console.log("--".repeat(40));
    managerOptions();
  })
};

function lowInventory(){
  db.query("SELECT * FROM products WHERE `stock_quantity` BETWEEN 0 AND 5", (err, res) => {
    if (err) throw err;
    console.log("These product currently have low inventory below 4 units: ");
    printTable(res);
    managerOptions();
  })
};