const express = require('express');
const { Clothing, User } = require('../models');

const router = express.Router();

// Route to display the wardrobe page
router.get('/wardrobe', async (req, res) => {
  try {
    // Fetch the logged-in user's wardrobe with associated clothing items
    const user = await User.findByPk(req.session.user_id, {
      include: { model: Clothing },
    });

    // Render the wardrobe page with the user's wardrobe data
    res.render('wardrobe', { user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to add a clothing item to the user's wardrobe
router.post('/wardrobe/add', async (req, res) => {
  try {
    const { type, color, last_worn, description } = req.body;
    const user_id = req.session.user_id;

    // Create a new clothing item in the database
    await Clothing.create({
      type,
      color,
      last_worn,
      description,
      user_id,
    });

    // Redirect the user back to the wardrobe page
    res.redirect('/wardrobe');
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to delete a clothing item from the user's wardrobe
router.post('/wardrobe/delete/:id', async (req, res) => {
  try {
    const clothingId = req.params.id;

    // Delete the clothing item from the database
    await Clothing.destroy({
      where: {
        id: clothingId,
        user_id: req.session.user_id,
      },
    });

    // Redirect the user back to the wardrobe page
    res.redirect('/wardrobe');
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
