const router = require('express').Router();

const wardrobeRoutes = require('./wardrobeRoutes');

router.use('/', wardrobeRoutes);

module.exports = router;
