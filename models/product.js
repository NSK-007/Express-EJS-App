const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;



























// // const fs = require('fs');
// // const path = require('path');
// const Cart = require('./cart');
// const db = require('../util/database');

// // const p = path.join(
// //   path.dirname(process.mainModule.filename),
// //   'data',
// //   'products.json'
// // );

// // const getProductsFromFile = cb => {
// //   fs.readFile(p, (err, fileContent) => {
// //     if (err) {
// //       cb([]);
// //     } else {
// //       cb(JSON.parse(fileContent));
// //     }
// //   });
// // };

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   static delete(id){
//     return db.execute('DELETE FROM products WHERE id = ?', [id]);
//   }

//   save() {
//     if(this.id===null){
//       return db.execute(`INSERT INTO products (title, price, description, imageURL) VALUES (?, ?, ?, ?)`, [this.title, this.price, this.description, this.imageUrl])
//       .then()
//       .catch(err => console.log(err));
//     }
//     else{
//       return db.execute('UPDATE products SET title = ?, price = ?, description = ?, imageURL = ? WHERE id = ?', [this.title, this.price, this.description, this.imageUrl, this.id])
//     }
//   }

//   static fetchAll() {
//     return db.execute(`SELECT * FROM products`);
//   }

//   static findById(id){
//     return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
//   }
    
// };
