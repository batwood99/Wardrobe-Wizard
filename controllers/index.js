const router = require('express').Router();

const wardrobeRoutes = require('./wardrobeRoutes');
const landingRoutes = require('./landingRoutes');

router.use('/', landingRoutes);
router.use('/wardrobe', wardrobeRoutes);

module.exports = router;
