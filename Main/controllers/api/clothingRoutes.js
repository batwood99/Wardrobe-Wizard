// Import necessary dependencies
const express = require('express');
const router = express.Router();
const Clothing = require('../../models/Clothing');

// Define the routes for clothing items
router.get('/clothing', async (req, res) => {
  try {
    // Fetch all clothing items from the database
    const clothingItems = await Clothing.findAll();

    // Send the clothing items as a response
    res.json(clothingItems);
  } catch (err) {
    // Handle errors
    console.error('Error fetching clothing items:', err);
    res.status(500).json({ error: 'Failed to fetch clothing items' });
  }
});

router.post('/clothing', async (req, res) => {
  try {
    // Extract the clothing details from the request body
    const { name, category, subCategory } = req.body;

    // Create a new clothing item in the database
    const newClothingItem = await Clothing.create({ name, category, subCategory });

    // Send the newly created clothing item as a response
    res.status(201).json(newClothingItem);
  } catch (err) {
    // Handle errors
    console.error('Error creating clothing item:', err);
    res.status(500).json({ error: 'Failed to create clothing item' });
  }
});

// Export the router
module.exports = router;
