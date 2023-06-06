// controllers/api/clothingRoutes.js
const express = require('express');
const router = express.Router();
const Clothing = require('../../models/Clothing');

// POST route to add a new clothing item
router.post('/clothing', (req, res) => {
  Clothing.create({
    type: req.body.type,
    type_ID: req.body.type_ID,
    color: req.body.color,
    last_worn: req.body.last_worn,
    description: req.body.description,
    user_id: req.body.user_id,
  })
    .then((dbClothingData) => res.json(dbClothingData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE route to delete a clothing item
router.delete('/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;

    // Delete the clothing item from the database
    const deletedItem = await Clothing.destroy({
      where: { id: itemId, user_id: req.session.user_id },
    });

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
  Clothing.update(
    {
      last_worn: new Date(),
    },
    {
      where: {
        user_id: req.session.user_id,
      },
    }
  )
    .then((dbClothingData) => {
      if (!dbClothingData) {
        res.status(404).json({ message: 'No clothing found with this id' });
        return;
      }
      res.json(dbClothingData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
