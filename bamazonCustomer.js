const inquirer = require("inquirer");
const mysql = require("mysql");
const {printTable} = require("console-table-printer");
//setup connection to database
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Rounders22",
  database: "bamazonDB"
});

db.connect(function(err){
  if (err) throw err;
  console.log("Connected as id " + db.threadID)
});