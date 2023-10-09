const Category = require('../models/category.js')
const Product = require('../models/product.js')
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

exports.category_add_delete = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).sort({name: 1})
  const products = await Product.find({}).populate('category');
  categories.forEach(category => {
    const numProducts = products.filter(product => product.category.name === category.name).length
    category.num_products = numProducts
  })
  res.render("add-categories", {
    title: 'Categories',
    categories: categories,
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

    if(errors.length > 0) {
      res.render("add-categories", {
        title: 'Categories',
        categories: categories,
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
  const numProductsInCategory = (await Product.find({category: categoryId})).length
  if(numProductsInCategory === 0){
    await Category.findByIdAndRemove(categoryId);
    res.redirect('/admin/categories')
  } else {
    res.redirect('/admin/categories')
  }
})