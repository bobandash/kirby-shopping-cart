const Product = require('../models/product.js')
const Category = require('../models/category.js')

const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');


exports.products_list = asyncHandler(async (req, res, next) => {
  let products;
  const category = req.params.category;
  if(category === 'all'){
    products = await Product.find({}).exec();
  } else {
    const productsCategoryPopulated = await Product.find({})
      .populate('category')
      .exec();
    products = productsCategoryPopulated.filter(product => {
      return product.category.name === category;
    })
  }

  res.json(products);
})

exports.featured_plush_list = asyncHandler(async (req, res, next) => {
  const productsCategoryPopulated = await Product.find({featured: true})
    .populate('category')
    .exec();
  let products = productsCategoryPopulated.filter(product => {
    return product.category.name === 'Plushies';
  })
  products = products.slice(0, 3);
  res.json(products);
})

exports.featured_games_list = asyncHandler(async (req, res, next) => {
  const productsCategoryPopulated = await Product.find({featured: true})
    .populate('category')
    .exec();
  let products = productsCategoryPopulated.filter(product => {
    return product.category.name === 'Games';
  })
  products = products.slice(0, 3);
  res.json(products);
})