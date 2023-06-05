const express = require('express');
const { Clothing, User } = require('../models');

const router = express.Router();

// Route to display the wardrobe page
router.get('/', async (req, res) => {
  try {
    // Fetch the logged-in user's wardrobe with associated clothing items
    const user = await User.findByPk(req.session.user_id, {
      include: { model: Clothing },
    });

    // Render the wardrobe page with the user's wardrobe data
    res.render('landing', { user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
