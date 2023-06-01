const express = require('express');
const router = express.Router();
const apiRoutes = require('./apiRoutes');
const homeRoutes = require('./homeRoutes');
const { Clothing } = require('../models'); // Import the Clothing model

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// Render index page
router.get('/', (req, res) => {
  res.render('index', { title: 'Wardrobe Wizard' });
});

// Update last_worn route
router.post('/update-last-worn', async (req, res) => {
  try {
    // Extract the clothing item ID from the request body
    const { clothingItemId } = req.body;

    // Find the clothing item in the database
    const clothingItem = await Clothing.findOne({ where: { id: clothingItemId, user_id: req.session.user_id } });

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

module.exports = router;
