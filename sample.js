// GET route
app.get('/clothing', (req, res) => {
    Clothing.findAll({
      attributes: [
        'id',
        'type',
        'type_ID',
        'color',
        'last_worn',
        'description',
        'user_id'
      ]
    })
      .then(dbClothingData => res.json(dbClothingData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // POST route
  app.post('/clothing', (req, res) => {
    Clothing.create({
      type: req.body.type,
      type_ID: req.body.type_ID,
      color: req.body.color,
      last_worn: req.body.last_worn,
      description: req.body.description,
      user_id: req.body.user_id
    })
      .then(dbClothingData => res.json(dbClothingData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // DELETE route
  app.delete('/clothing/:id', (req, res) => {
    Clothing.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbClothingData => {
        if (!dbClothingData) {
          res.status(404).json({ message: 'No clothing found with this id' });
          return;
        }
        res.json(dbClothingData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });