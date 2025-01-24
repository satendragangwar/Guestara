const mongoose = require("mongoose");
// const itemSchema = require('./item.model');

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  taxApplicability: { type: Boolean, default: false },
  tax: { type: Number },
  taxType: { type: String },
  items: [
    
  ]  // Items under each subcategory
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String
  },
  taxApplicability: {
    type: Boolean,
    required: true
  },
  tax: {
    type: Number
  },
  taxType: {
    type: String
  },
  subcategories: [subCategorySchema]  // Subcategories under each category
});

module.exports = mongoose.model("Category", categorySchema);
