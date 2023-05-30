const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');
const Clothing = require('../models/Clothing');
const moment = require('moment');

// Landing route
router.get('/landing', withAuth, async (req, res) => {
  try {
    // Fetch the user's clothing items from the database
    const clothingItems = await Clothing.findAll({ where: { userId: req.session.user_id } });

    // Render the landing page and pass the clothing items as data
    res.render('landing', { title: 'Landing', clothingItems });
  } catch (err) {
    console.error('Error fetching clothing items:', err);
    res.status(500).json({ error: 'Failed to fetch clothing items' });
  }
});

// Update last_worn route
router.post('/update-last-worn', withAuth, async (req, res) => {
  try {
    // Extract the clothing item ID from the request body
    const { clothingItemId } = req.body;

    // Find the clothing item in the database
    const clothingItem = await Clothing.findOne({ where: { id: clothingItemId, userId: req.session.user_id } });

    if (clothingItem) {
      // Update the last_worn date to today's date
      clothingItem.last_worn = moment().format('YYYY-MM-DD');
      await clothingItem.save();

      res.sendStatus(200);
    } else {
      res.status(404).json({ error: 'Clothing item not found' });
    }
  } catch (err) {
    console.error('Error updating last_worn:', err);
    res.status(500).json({ error: 'Failed to update last_worn' });
  }
});

// Wardrobe route
router.get('/wardrobe', withAuth, async (req, res) => {
  try {
    // Fetch the user's clothing items from the database
    const clothingItems = await Clothing.findAll({ where: { userId: req.session.user_id } });

    // Render the wardrobe page and pass the clothing items as data
    res.render('wardrobe', { title: 'Wardrobe', clothingItems });
  } catch (err) {
    console.error('Error fetching clothing items:', err);
    res.status(500).json({ error: 'Failed to fetch clothing items' });
  }
});

module.exports = router;
