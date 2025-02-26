const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
         type: String,
         required: true 
        },
    image: { 
        type: String
     },
    description: {
         type: String
         },
    taxApplicability: { type: Boolean },
    tax: { type: Number },
    baseAmount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    subCategoryName: { type: String, required: true } ,
     // Reference to SubCategory by name
});

module.exports = mongoose.model('Item', itemSchema);
