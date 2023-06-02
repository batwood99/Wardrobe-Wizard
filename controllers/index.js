const router = require('express').Router();

const wardrobeRoutes = require('./wardrobeRoutes');
const landingRoutes = require('./landingRoutes');
const apiRoutes = require('./api');

router.use('/', landingRoutes);
router.use('/wardrobe', wardrobeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
