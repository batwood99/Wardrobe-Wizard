const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const wardrobeRoutes = require('./wardrobeRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/wardrobe', wardrobeRoutes);
router.use('/api', apiRoutes);


module.exports = router;