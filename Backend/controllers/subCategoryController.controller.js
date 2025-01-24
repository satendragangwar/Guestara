const Category = require('../models/category.model');
const SubCategory = require('../models/subCategory.model');

// Create a subcategory under a category
exports.createSubCategoryUnderCategory = async (req, res) => {
    try {
        const { name } = req.params; 
        const category = await Category.findOne({ name });

        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }

        const subCategory = new SubCategory({
            ...req.body,
            name: req.body.name
        });

        category.subcategories.push(subCategory);
        await subCategory.save();
        await category.save();
        
        res.status(201).send(subCategory);
    } catch (err) {
        res.status(400).send({ message: 'Error creating subcategory', error: err.message });
    }
};

// Get all subcategories by category name
exports.getSubCategoriesByCategory = async (req, res) => {
    try {
        const { name } = req.params;  
        const category = await Category.findOne({ name });

        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }

        res.status(200).send(category.subcategories);
    } catch (err) {
        res.status(500).send({ message: 'Error retrieving subcategories', error: err.message });
    }
};

// Update a subcategory under a category
exports.updateSubCategory = async (req, res) => {
    try {
        const { name, subcategoryName } = req.params; 

        const category = await Category.findOne({ name });
        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }

        const subCategory = category.subcategories.find(sub => sub.name === subcategoryName);
        if (!subCategory) {
            return res.status(404).send({ message: 'Subcategory not found' });
        }

        Object.assign(subCategory, req.body);
        await category.save();

        res.status(200).send(subCategory);
    } catch (err) {
        res.status(400).send({ message: 'Error updating subcategory', error: err.message });
    }
};
