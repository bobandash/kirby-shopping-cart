const Product = require('../models/product.js')
const Category = require('../models/category.js')

const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');


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