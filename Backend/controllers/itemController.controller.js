const Item = require('../models/item.model');
const SubCategory = require('../models/subCategory.model');
const Category  = require('../models/category.model')
// Create an item under a subcategory

exports.createItem = async (req, res) => {
    try {
        const { categoryName, subCategoryName, name, image, description, taxApplicability, tax, baseAmount, discount, totalAmount } = req.body;

        // Find the category by its name
        const category = await Category.findOne({ name: categoryName.trim() });

        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }

        // Find the subcategory by its name within the category
        const subCategoryIndex = category.subcategories.findIndex(sub => sub.name.trim().toLowerCase() === subCategoryName.trim().toLowerCase());

        if (subCategoryIndex === -1) {
            return res.status(404).send({ message: 'Subcategory not found' });
        }

        // Access the subcategory using the found index
        const subCategory = category.subcategories[subCategoryIndex];

        // Ensure the subcategory has an items array (it should be initialized)
        if (!subCategory.items) {
            subCategory.items = []; // Initialize the items array if not present
            console.log("Initialized empty items array for subcategory:", subCategory);
        }

        // Create a new item object
        const newItem = {
            name,
            image,
            description,
            taxApplicability,
            tax,
            baseAmount,
            discount,
            totalAmount,
            subCategoryName: subCategory.name // Store subcategory name in the item
        };

        // Push the new item directly into the subcategory's items array
        subCategory.items.push(newItem); // Use push instead of reassigning the array

        // Save the updated category document
        await category.save();

        console.log("Item added to subcategory and category saved:", newItem);

        // Send the response with the new item
        res.status(201).send(newItem);
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(400).send({ message: 'Error creating item', error: err.message });
    }
};





// Get all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find().populate('subCategoryName');
        res.status(200).send(items);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getItemsBySubCategory = async (req, res) => {
    try {
        // console.log("Request received");  // Add a log to check if the function is being hit
        const { subCategoryName } = req.params; // Expecting subCategoryName in the URL params
        
        if (!subCategoryName) {
            return res.status(400).send({ message: 'subCategoryName query parameter is required.' });
        }

        // console.log("Subcategory name from params:", subCategoryName);

        // Find the category that contains the subcategory with the given name
        const category = await Category.findOne({ 'subcategories.name': subCategoryName });

        if (!category) {
            return res.status(404).send({ message: 'Category with the given subcategory not found.' });
        }

        // Find the subcategory in the category's subcategories array
        const subCategory = category.subcategories.find(sub => sub.name.trim().toLowerCase() === subCategoryName.trim().toLowerCase());

        if (!subCategory) {
            return res.status(404).send({ message: 'Subcategory not found in the category.' });
        }

        // console.log("Subcategory found:", subCategory);

        // Now, we have access to the items of the found subcategory
        if (!subCategory.items || subCategory.items.length === 0) {
            return res.status(404).send({ message: 'No items found for the given subcategory.' });
        }

        // Return the found items from the subcategory
        res.status(200).send(subCategory.items);
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).send({ message: 'Error retrieving items', error: err.message });
    }
};




// Search for an item by name
exports.searchItemByName = async (req, res) => {
    try {
        const { name } = req.params;
       
        
        const Item1 = await Item.findOne({ name: new RegExp('^' + name.trim() + '$', 'i') });

        if (!Item1) {
            return res.status(404).send({ message: 'Item not found' });
        }

        res.status(200).send(Item1);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update item by name
exports.updateItemByName = async (req, res) => {
    try {
        const { name } = req.params;
        // console.log(name)
        const updatedItem = await Item.findOneAndUpdate({ name }, req.body, { new: true });

        if (!updatedItem) {
            return res.status(404).send({ message: 'Item not found' });
        }

        res.status(200).send(updatedItem);
    } catch (err) {
        res.status(400).send(err);
    }
};
