// const Product = require('../models/product');
const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => console.log(err))
  // Product.fetchAll().then(products => {
  //   res.render('shop/product-list', {
  //     prods: products[0],
  //     pageTitle: 'All Products',
  //     path: '/products'
  //   });
  // })
  // .catch(err => console.log(err))
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({where:{id:productId}})
    })
    .then(products => {
      let product;
      if(products.length>0)
        product = products[0]

      let newQuantity = 1;
      if(product){
        newQuantity += product.cartItem.quantity;
        return fetchedCart.addProduct(product, {
          through:{
            quantity: newQuantity
          }
        })
      }
      return Product.findByPk(productId)
        .then(product => {
          return fetchedCart.addProduct(product, {through: {quantity: newQuantity}})
        })
        .catch(err => console.log(err))
    })
    .then(result => res.redirect('/cart'))
    .catch(err => console.log(err))
  // Product.findByPk(productId, prod => {
  //   Cart.addProduct(productId, prod.price);
  // })
  // res.redirect('/cart')
}

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  // console.log(productId);
  Product.findAll({where:{id:productId}})
    .then(products => {
      res.render('shop/product-detail', {
        product: products[0],
        pageTitle: products[0].title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));

  // Product.findByPk(productId)
  //   .then(product => {
  //     res.render('shop/product-detail', {
  //       product: product,
  //       pageTitle: product.title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err))

  // Product.findById(productId)
  //   .then((product) => {
  //     res.render('shop/product-detail', {
  //       product: product,
  //       pageTitle: product.title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err))
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'All Products',
        path: '/'
      });
    })
    .catch(err => console.log(err))
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render('shop/index', {
  //       prods: rows,
  //       pageTitle: 'All Products',
  //       path: '/'
  //     });
  //   })
  //   .catch(err => console.log(err))
};

exports.getCart = (req, res, next) => {

  req.user.getCart()
    .then(cart => {
      // console.log(cart);
      return cart.getProducts()
                .then(products => {
                  res.render('shop/cart',{
                    path: '/cart',
                    pageTitle: 'Your Cart',
                    products: products
                  });
                })
    })

  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for(product of products){
  //       const cartProductData = cart.products.find(prod => prod.id === product.id);
  //       if(cartProductData){
  //         cartProducts.push({productData:product, qty:cartProductData.qty});
  //       }
  //     }
  //     res.render('shop/cart',{
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   })
  // });
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({include:['products']})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postCartDelete = (req, res, next) => {
  const prodId = req.params.productId;
  console.log("Delete Controller:"+prodId);
  req.user.getCart()
    .then(cart => {
      return cart.getProducts({where : {id: prodId}})
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy(); 
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user.createOrder()
              .then(order => {
                order.addProducts(products.map(product => {
                  product.orderItem = { quantity: product.cartItem.quantity}
                  return product;
                }))
              })
              .catch(err => console.log(err))
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders')
    })
    .catch(err => console.log(err))

  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
}
