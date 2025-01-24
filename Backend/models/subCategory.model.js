const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  taxApplicability: { type: Boolean, default: false },
  tax: { type: Number },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }] // Items under each subcategory
});

module.exports = mongoose.model('SubCategory', subCategorySchema);
