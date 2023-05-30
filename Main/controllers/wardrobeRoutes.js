const express = require('express');
const router = express.Router();
const apiRoutes = require('./apiRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// Render index page
router.get('/', (req, res) => {
  res.render('index', { title: 'Wardrobe Wizard' });
});

module.exports = router;
