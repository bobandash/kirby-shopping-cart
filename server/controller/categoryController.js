const Category = require('../models/category.js')
const Product = require('../models/product.js')
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

async function populateNumProducts(categories){
  const products = await Product.find({}).populate('category');
  categories.forEach(category => {
    const numProducts = products.filter(product => product.category.name === category.name).length
    category.num_products = numProducts
  })
  return categories;
}

exports.category_add_delete = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).sort({name: 1})
  const categoriesWithNumProducts = await populateNumProducts(categories);
  res.render("add-categories", {
    title: 'Categories',
    categories: categoriesWithNumProducts,
  })
})

exports.category_add_post = [
  body('add-categories','Category must not be empty.')
    .trim()
    .isLength({min: 1})
    .escape(),
  asyncHandler(async (req, res, next) => {
    const formInputValue = req.body["add-categories"];
    const errors = validationResult(req).array();
    const hasCategory = (await Category.find({name: formInputValue}).exec()).length === 0 ? false : true;
    if(hasCategory){
      errors.push({
        msg: 'Already has category'
      })
    }
    const categories = await Category.find({}).exec();
    const categoriesWithNumProducts = await populateNumProducts(categories);
    
    if(errors.length > 0) {
      res.render("add-categories", {
        title: 'Categories',
        categories: categoriesWithNumProducts,
        errors: errors
      })
    }
    else {
      const newCategory = new Category({name: formInputValue})
      await newCategory.save();
      res.redirect('/admin/categories')
    }
  })
]

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const categoryId = req.params.id;
  const numProductsInCategory = (await Product.find({category: categoryId}).exec()).length;

  if(numProductsInCategory === 0){
    await Category.findByIdAndRemove(categoryId);
    res.redirect('/admin/categories')
  } else {
    const categories = await Category.find({}).sort({name: 1}).exec()
    const categoriesWithNumProducts = await populateNumProducts(categories);
    const categoryName = (await Category.findById(categoryId).exec()).name;
    const errors = [{msg: `Cannot delete ${categoryName}. ${categoryName} category has more than 0 products.`}]
    res.render("add-categories", {
      title: 'Categories',
      categories: categoriesWithNumProducts,
      errors: errors
    })
  }
})

exports.category_update_post = [
  body('category-update','Category must not be empty.')
    .trim()
    .isLength({min: 1})
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req).array();
    if(errors.length > 0){
      const categories = await Category.find({}).exec();
      const categoriesWithNumProducts = await populateNumProducts(categories);
      res.render("add-categories", {
        title: 'Categories',
        categories: categoriesWithNumProducts,
        errors: errors
      })
    } else {
      const categoryId = req.params.id;
      const categoryName = req.body["category-update"];
      await Category.findByIdAndUpdate(categoryId, {name: categoryName});
      res.redirect('/admin/categories');
    }
  })
]