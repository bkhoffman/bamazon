const inquirer = require("inquirer");
const mysql = require("mysql");
const { printTable } = require("console-table-printer");
const chalk = require('chalk');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: "root",
  password: "Spartan117",
  database: "bamazonDB"
});

db.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + db.threadId);
  managerOptions();
});

function managerOptions() {
  inquirer.prompt([{
    name: "menuOptions",
    type: "rawlist",
    message: "What would you like to do?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
  }]).then(function (choice) {
    switch (choice.menuOptions) {
      case "View Products for Sale": viewProducts();
        break;
      case "View Low Inventory": lowInventory();
        break;
      case "Add to Inventory": addInventory();
        break;
      case "Add New Product": addProduct();
        break;
      case "Quit": quit();
    };
  });
};

function viewProducts() {
  db.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    printTable(res);
    console.log("**".repeat(40));
    managerOptions();
  })
};

function lowInventory() {
  db.query("SELECT * FROM products WHERE `stock_quantity` BETWEEN 0 AND 5", (err, res) => {
    if (err) throw err;
    console.log("**".repeat(40));
    console.log(chalk.red("These product currently have low inventory below 4 units: "));
    printTable(res);
    managerOptions();
  })
};

function addInventory() {
  db.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    printTable(res);
    console.log("--".repeat(40));
    inquirer.prompt([{
      name: "itemID",
      message: "Pick the id of the item you would like to add inventory: "
    }, {
      name: "quantity",
      message: "How many would you like to add? "
    }]).then((choice) => {
      db.query("SELECT * FROM products WHERE item_id =" + choice.itemID, (err, res) => {

        let inventory = parseInt(res[0].stock_quantity);
        let choiceID = choice.itemID
        let addQty = parseInt(choice.quantity)
        db.query("UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: inventory + addQty
            },
            {
              item_id: choiceID
            }
          ], function (err) {
            if (err) throw err;
          }
        );
        console.log("**".repeat(40));
        console.log(chalk.blue("Inventory added."));
        console.log("**".repeat(40));
        db.query("SELECT * FROM products WHERE item_id = " + choiceID, (err, res) => {
          if (err) throw err;
          printTable(res);
          console.log("**".repeat(40));
        })
        viewProducts();
      })
    });
  })
};

function addProduct() {
  console.log("**".repeat(40));
  console.log("Let's add a product!")
  console.log("**".repeat(40));
  inquirer.prompt([{
    name: "productName",
    message: "Name of the product? "
  }, {
    name: "department",
    message: "What department does it belong in? "
  }, {
    name: "price",
    message: "What price? "
  }, {
    name: "quantity",
    message: "How much inventory? "
  }]).then((newProd) => {
    db.query("INSERT INTO products SET ?",
      {
        product_name: newProd.productName,
        department_name: newProd.department,
        price: newProd.price,
        stock_quantity: newProd.quantity
      }, (err) => {
        if (err) throw err;
        console.log("**".repeat(40));
        console.log("Your new product was created.");
        console.log("**".repeat(40));
        viewProducts();
      })
  })
};

function quit() {
  db.end();
};