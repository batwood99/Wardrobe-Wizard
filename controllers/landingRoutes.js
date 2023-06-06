const express = require('express');
const { Clothing, User } = require('../models');
const withAuth = require('../utils/auth');

const router = express.Router();

// Route to display the wardrobe page
router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch the logged-in user's wardrobe with associated clothing items
    const userData = await User.findByPk(req.session.user_id, {
      include: { model: Clothing },
    });
    const user = userData.get({ plain: true });
    // console.log(user);
    user.loggedIn = req.session.logged_in;
console.log(user.loggedIn = req.session.logged_in)
    // Render the wardrobe page with the user's wardrobe data
    res.render('landing', { user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
