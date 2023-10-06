const Product = require('../models/product.js')

const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');


exports.product_information = asyncHandler(async (req, res, next) => {
  const productInfo = await Product.findOne({_id: req.params.id}).exec();
  res.json(productInfo);
})