const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// Render index page
router.get('/', (req, res) => {
  res.render('index', { title: 'Wardrobe Wizard' });
});

module.exports = router;
