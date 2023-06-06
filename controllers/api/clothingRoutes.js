// controllers/api/clothingRoutes.js
const express = require('express');
const router = express.Router();
const Clothing = require('../../models/Clothing');

// POST route to add a new clothing item
router.post('/', async (req, res) => {
  try {
    // Extract the data from req.body
    const { type, color, description } = req.body;

    // Save the new clothing item to the database
    const newClothing = await Clothing.create({
      type,
      color,
      description,
      user_id: req.session.user_id, // Associate the clothing item with the user
    });

    // Return a success response to the client
    res.status(201).json({ message: 'Clothing item added successfully!', clothing: newClothing });
  } catch (error) {
    // Return an error response to the client
    res.status(500).json({ error: 'Failed to add the clothing item.' });
  }
});

// DELETE route to delete a clothing item
router.delete('/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;

    // Delete the clothing item from the database
    const deletedItem = await Clothing.destroy({ where: { id: itemId, user_id: req.session.user_id } });

    if (deletedItem) {
      // Return a success response to the client
      res.status(200).json({ message: 'Clothing item deleted successfully!' });
    } else {
      // Return an error response if the item doesn't exist or doesn't belong to the user
      res.status(404).json({ error: 'Clothing item not found.' });
    }
  } catch (error) {
    // Return an error response to the client
    res.status(500).json({ error: 'Failed to delete the clothing item.' });
  }
});

// POST route to update the last_worn date for selected clothing items
router.post('/update-last-worn', async (req, res) => {
  try {
    const { outfitItems } = req.body;

    // Convert outfitItems to an array if it's a single value
    const outfitIds = Array.isArray(outfitItems) ? outfitItems : [outfitItems];

    // Update the last_worn date for each selected clothing item
    await Clothing.update(
      { last_worn: new Date() },
      { where: { id: outfitIds, user_id: req.session.user_id } }
    );

    // Redirect the user to the landing page or display a success message
    res.redirect('/landing');
  } catch (error) {
    // Return an error response to the client
    res.status(500).json({ error: 'Failed to update the last_worn date.' });
  }
});

module.exports = router;
