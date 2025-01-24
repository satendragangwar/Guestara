const Category = require('../models/category.model');
const SubCategory = require('../models/subCategory.model');
const Item = require('../models/item.model');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).send(category);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Get category by name
exports.getCategoryByName = async (req, res) => {
    try {
        const { name } = req.params; 
        const category = await Category.findOne({ name });

        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }
        res.status(200).send(category);
    } catch (err) {
        res.status(500).send({ message: 'Error retrieving category', error: err.message });
    }
};

// Update category by name
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate(
            { name: req.params.name },
            req.body,
            { new: true }
        );

        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }

        res.status(200).send(category);
    } catch (err) {
        res.status(400).send({ message: 'Error updating category', error: err.message });
    }
};
