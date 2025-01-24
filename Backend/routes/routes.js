const express = require('express');
const categoryController = require('../controllers/categoryController.controller');
const subCategoryController = require('../controllers/subCategoryController.controller');
const itemController = require('../controllers/itemController.controller');

const router = express.Router();

// Category routes
router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:name', categoryController.getCategoryByName);
router.put('/categories/:name', categoryController.updateCategory);

// Subcategory routes
router.post('/category/:name/subcategory', subCategoryController.createSubCategoryUnderCategory);
router.get('/category/:name/subcategories', subCategoryController.getSubCategoriesByCategory);
router.put('/category/:name/subcategory/:subcategoryName', subCategoryController.updateSubCategory);

// Item routes
router.post('/items', itemController.createItem); // Create an item
router.get('/items', itemController.getAllItems); // Get all items
router.get('/items/:subCategoryName', itemController.getItemsBySubCategory); // Get items by sub-category
router.put('/items/:name', itemController.updateItemByName); // Update an item by name
router.get('/items/name/:name', itemController.searchItemByName); // Search an item by name

module.exports = router;
