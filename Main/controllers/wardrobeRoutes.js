const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');
const Clothing = require('../models/Clothing');

// GET route for the Wardrobe page
router.get('/wardrobe', withAuth, async (req, res) => {
  try {
    // Fetch the user's clothing items from the database
    const clothes = await Clothing.findAll({ where: { userId: req.session.user_id } });

    // Render the wardrobe page and pass the clothing items as data
    res.render('wardrobe', { clothes });
  } catch (err) {
    console.error('Error fetching clothing items:', err);
    res.status(500).json({ error: 'Failed to fetch clothing items' });
  }
});

module.exports = router;