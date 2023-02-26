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
  req.user.createProduct({
    title: title,
    price: price,
    description: description,
    imageURL: imageUrl
  })
  .then(result => {
    console.log('Product Created!'); 
    res.redirect('/')
  })
  .catch(err => console.log(err));
  // Product.create({
  //   title: title,
  //   price: price,
  //   description: description,
  //   userId: req.user.id,
  //   imageURL: imageUrl
  // })
    

  // const product = new Product(null, title, imageUrl, description, price);
  // product.save()
  //   .then(() =>  res.redirect('/'))
  //   .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  console.log('editMode:'+editMode);
  if(!editMode)
    return res.redirect('/');
  const prodId = req.params.productId;

  //custom methods get created when you define associations like hasMany and belongsTo, in this case User associated 
  // with products hence, user can create Methods like getProducts and createProducts
  req.user.getProducts({where:{id:prodId}})
    .then(products => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing : editMode,
        product : products[0],
      });
    })
    .catch(err => console.log(err))

  // Product.findByPk(prodId).then((product) => {
  //     if(!product)
  //       return res.redirect('/');
  //     // console.log(product);
  //     res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     editing : editMode,
  //     product : product,
  //   });
  // }).
  // catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("Controller:"+prodId);
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.imageURL = updatedImageUrl;
      product.price = updatedPrice;
      product.description = updatedDescription;
      return product.save();
    })
    .then(result => {
      console.log('PRODUCT UPDATED');
      res.redirect('/admin/products');
    })
    .catch((err) => {
      console.log(err);
    })

  // const updateProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
  // updateProduct.save()
  //   .then(() => {
  //     res.redirect('/admin/products');
  //   })
  //   .catch(() => {
  //     console.log(err);
  //   })
};

exports.getProducts = (req, res, next) => {
  console.log('fetch')
  // Product.findAll()
  req.user.getProducts()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log(err);
    })
  // Product.fetchAll().then(products => {
  //   // console.log(products);
  //   res.render('admin/products', {
  //     prods: products[0],
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // })
  // .catch(err => console.log(err));
};

exports.deleteProductById = (req, res, next) => {
  const prodId = req.params.productId;
  console.log("Delete Controller:"+prodId);
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log('PRODUCT DELETED');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err)
    })

  // Product.findById(prodId)
  //   .then(([product]) => {
  //     if(!product[0])
  //       return res.redirect('/');
  //     Product.delete(prodId);
  //       res.redirect('/');
  //   })
}
