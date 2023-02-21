const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static delete(id){
    getProductsFromFile(products => {
      const existingProduct = products.findIndex(prod => prod.id === id);
        console.log(existingProduct);
      const updatedProducts = [...products];
      updatedProducts.pop(existingProduct)

      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log(err);
      })
    })
  }

  save() {
    getProductsFromFile(products => {
      console.log(this.id);
      if(this.id){
        const existingProduct = products.findIndex(prod => prod.id === this.id);
        console.log(this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProduct] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      }
      else{
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        })
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb){
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    })
  }
};
