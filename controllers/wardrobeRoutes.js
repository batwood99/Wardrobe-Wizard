const express = require('express');
const { Clothing, User } = require('../models');
const withAuth = require('../utils/auth');

const router = express.Router();

// Route to display the wardrobe page
//Add withAuth between the route path and the route handler function
router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch the logged-in user's wardrobe with associated clothing items
    const userData = await User.findByPk(req.session.user_id, {
      include: Clothing,
    });
    const user = userData.get({ plain: true });
    console.log(user);

    // Render the wardrobe page with the user's wardrobe data
    res.render('wardrobe', { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
