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
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
  }]).then(function(choice){
    console.log(choice);
  });
};