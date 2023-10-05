const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  // this is the sku number
  _id: {
    type: Number,
    min: 1000,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    validate: {
      validator: function(value) {
        // Regular expression to check for two decimal places
        return /^\d+(\.\d{1,2})?$/.test(value);
      },
    },
    required: true,
  },
  inventory: {
    type: Number,
    min: 0,
    default: 0,
  },
  imageUrl: {
    type: String,
    validate: {
      validator: function(value) {
        // Regular expression to check for a valid URL
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value);
      },
    }
  }
})

ProductSchema.virtual('edit-url').get(function() {
  return `/edit/${this._id}`
});

module.exports = mongoose.model("Product", ProductSchema);