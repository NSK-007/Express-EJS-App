const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save()
    .then(() =>  res.redirect('/'))
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  console.log('editMode:'+editMode);
  if(!editMode)
    return res.redirect('/');
  const prodId = req.params.productId;
  Product.findById(prodId).then(([product]) => {
      if(!product)
        return res.redirect('/');
      console.log(product[0]);
      res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing : editMode,
      product : product[0],
    });
  }).
  catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("Controller:"+prodId);
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  const updateProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
  updateProduct.save()
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(() => {
      console.log(err);
    })
};

exports.getProducts = (req, res, next) => {
  console.log('fetch')
  Product.fetchAll().then(products => {
    // console.log(products);
    res.render('admin/products', {
      prods: products[0],
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log(err));
};

exports.deleteProductById = (req, res, next) => {
  const prodId = req.params.productId;
  console.log("Delete Controller:"+prodId);
  Product.findById(prodId)
    .then(([product]) => {
      if(!product[0])
        return res.redirect('/');
      Product.delete(prodId);
        res.redirect('/');
    })
}
