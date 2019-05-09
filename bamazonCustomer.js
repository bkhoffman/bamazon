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
    let itemsObj = res;
    orderProducts(itemsObj);
  });
  
};

function orderProducts(itemsObj){
  console.log("What would you like to buy?");
  inquirer.prompt([{
    name: "itemID",
    message: "Pick the id of the item you would like to purchase: "
  },{
    name: "quantity",
    message: "How many would you like to purchase? "
  }]).then(function(userChoice){
    let userChoiceID = userChoice.itemID
    let userChoiceQty = userChoice.quantity
    console.log("user choice id: " + userChoiceID + "\nqty chosen: " + userChoiceQty);
    checkStock(userChoiceID, userChoiceQty)
  })
};

function checkStock(id, qty){
  db.query('SELECT * FROM products WHERE item_id = '+ id, function(err, res){
    if (err) throw err;
    console.log(res[0]);
    console.log("user choice id: " + id + "\nqty chosen: " + qty);
    if(qty <= res[0].stock_quantity){
      console.log(res[0].product_name + " is in stock!" + "\nYour total is: " + res[0].price*qty)
      let inventory = res[0].stock_quantity;
      db.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: inventory - qty
          },
          {
            item_id: id
          }
        ],
        function(err) {
          if (err) throw err;
        }
      );
      shopAgain();
    }else{
      console.log("Insuffient Inventory. There are currently only " + res[0].stock_quantity + " in stock. \nPlease try again")
      orderProducts();
    }
  })
};

function shopAgain(){
  inquirer.prompt([{
    name: "confirm",
    type: "confirm",
    message: "Would you like to continue shopping?",
    default: false
  }]).then(function(userResponse){
    console.log(userResponse);
    if(userResponse.confirm){
      showProducts()
    }else{
      console.log("Thanks for shopping!");
      db.end();
    }
  })
};