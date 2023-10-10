const Product = require('../models/product.js')
const Category = require('../models/category.js')
const he = require('he')

const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');


const MIN_FEATURED_AMOUNT_PLUSH = 3;
const MIN_FEATURED_AMOUNT_GAMES = 1;
// helper functions for HTTP requests
const checkDecimalPlaces = (value, maxDecimals) => {
  const decimalCount = (value.split('.')[1] || []).length;
  if (decimalCount > maxDecimals) {
    throw new Error(`Number cannot have more than ${maxDecimals} decimal places`);
  }
  return true; 
}

async function hasMinFeaturedAmount(categoryId, minFeaturedAmount) {
  const productsFeaturedInCategory = await Product.find({category: categoryId, featured: true}).exec();
  const numFeaturedProductsInCategory = productsFeaturedInCategory.length;
  if(numFeaturedProductsInCategory <= minFeaturedAmount){
    return false;
  }

  return true;
}

// HTTP request operations
exports.product_information = asyncHandler(async (req, res, next) => {
  const productInfo = await Product.findOne({_id: req.params.id}).exec();
  res.json(productInfo);
})

exports.product_edit_get = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const productInfo = await Product.findOne({_id: productId}).populate('category').exec();
  const listOfCategories = await Category.find({}).exec();
  res.render('edit-form', {
    title: "Test",
    product: productInfo,
    categories: listOfCategories
  })
})

exports.product_add_get = asyncHandler(async (req, res, next) => {
  const listOfCategories = await Category.find({}).exec();
  res.render('add-form', {
    title: "Add Products",
    categories: listOfCategories
  })
})


exports.product_edit = [
  body('title', 'Title cannot be empty')
    .trim()
    .isLength({min: 1})
    .escape(),
  body('description', 'Description cannot be empty')
    .trim()
    .isLength({min: 1})
    .escape(),
  body('price', 'Price must be formatted with at most two decimal points')
    .trim()
    .custom(value => checkDecimalPlaces(value, 2))
    .escape(),
  body('inventory', "Inventory has to be at least 0")
    .trim()
    .custom(value => checkDecimalPlaces(value, 0))
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req).array();
    const [prevProductInfo, listOfCategories] =
      await Promise.all([
        Product.findById(req.params.id).populate('category').exec(),
        Category.find({}).exec()
      ])

    const updatedProduct = new Product({
      _id: req.body.sku,
      title: he.decode(req.body.title),
      description: he.decode(req.body.description),
      category: req.body.category,
      price: req.body.price,
      inventory: req.body.inventory,
      featured: (req.body.featured === "true" ? true : false),
      //TO-DO: validate imageUrl and change to file upload
      imageUrl: req.body.image,
    })
    
    // check if min featured products for plush/games is met for front-end 
    if(prevProductInfo.featured === true){
      const IsFeaturedNewProduct = Boolean(req.body.featured);
      const categoryNewProduct = (await Category.findById(req.body.category).exec()).name;
      let hasMinFeaturedProducts = true;
      let minimum;
      // old category still has min amount even when category of product updates
      // if category doesn't update and featured status updated, then the category still has the min amount
      if((categoryNewProduct !== prevProductInfo.category.name || !IsFeaturedNewProduct) ){
        if(prevProductInfo.category.name === 'Plushies'){
          hasMinFeaturedProducts = await hasMinFeaturedAmount(prevProductInfo.category._id, MIN_FEATURED_AMOUNT_PLUSH + 1);
          minimum = MIN_FEATURED_AMOUNT_PLUSH;
        } else if (prevProductInfo.category.name === 'Games'){
          hasMinFeaturedProducts = await hasMinFeaturedAmount(prevProductInfo.category._id, MIN_FEATURED_AMOUNT_GAMES + 1) 
          minimum = MIN_FEATURED_AMOUNT_GAMES;
        }
      }

      if(!hasMinFeaturedProducts){
        errors.push({msg: `Amount of Featured Products for ${prevProductInfo.category.name} does not meet minimum: ${minimum}.`})
      }
    }

    if(errors.length > 0){
      // TO-DO: get product.category.name
      const category = await Category.findById(updatedProduct.category).exec();
      const currentCategory = category.name;
      console.log(updatedProduct);
      res.render('edit-form', {
        title: "Edit Product",
        product: updatedProduct,
        categories: listOfCategories,
        currentCategory: currentCategory,
        errors: errors
      })
    } else {
      await Product.findByIdAndUpdate(req.body.sku, updatedProduct);
      const updatedProductCategoryPopulated = await Product.findById(req.body.sku).populate('category').exec();
      res.render('edit-form',{
        title: "Test",
        product: updatedProductCategoryPopulated,
        categories: listOfCategories,
        message: 'Successfully updated'
      })
    }
  })
]

exports.product_delete = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId).populate('category').exec();
  let hasMinFeaturedProducts = true;
  if(product.category.name === 'Plushies'){
    hasMinFeaturedProducts = await hasMinFeaturedAmount(product.category._id, MIN_FEATURED_AMOUNT_PLUSH);
  } else if(product.category.name === 'Games'){
    hasMinFeaturedProducts = await hasMinFeaturedAmount(product.category._id, MIN_FEATURED_AMOUNT_GAMES);
  }
  if(product.featured && !hasMinFeaturedProducts){
    const listOfCategories = await Category.find({}).exec();
    const errors = [];
    if(product.category.name === 'Plushies')
      errors.push({msg: 'Cannot Delete: Need at least 3 featured plushies at all times'});
    else if(product.category.name === 'Games'){
      errors.push({msg: 'Cannot Delete: Need at least 1 featured game at all times'});
    }
    res.render('edit-form', {
      title: "Edit Products",
      product: product,
      categories: listOfCategories,
      errors: errors
    })
  }
  else {
    await Product.findByIdAndRemove(productId);
    res.redirect('/admin');
  }

})