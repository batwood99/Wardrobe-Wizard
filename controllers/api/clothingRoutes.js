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

router.post('/update-last-worn', async (req, res) => {
  const clothingIds = req.body.ids; // Get the clothing item IDs from the request body

  try {
    const updatedClothingItems = await Clothing.update(
      { last_worn: new Date() }, // Update the last_worn field to today's date
      {
        where: {
          id: clothingIds,
          user_id: req.session.user_id,
        },
      }
    );

    if (updatedClothingItems[0] === 0) {
      res.status(404).json({ message: 'No clothing items found to update.' });
    } else {
      res.json(updatedClothingItems);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


module.exports = router;
