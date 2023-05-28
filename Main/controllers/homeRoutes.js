const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');
const Clothing = require('../models/Clothing');

// Home route
router.get('/', async (req, res) => {
  try {
    // Fetch all clothing items from the database
    const clothingItems = await Clothing.findAll();

    res.render('index', { title: 'Home', clothingItems });
  } catch (err) {
    console.error('Error retrieving clothing items:', err);
    res.status(500).json({ error: 'Failed to retrieve clothing items' });
  }
});

// About route
router.get('/about', withAuth, (req, res) => {
  res.render('about', { title: 'About' });
});

module.exports = router;