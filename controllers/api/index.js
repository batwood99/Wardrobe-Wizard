const router = require('express').Router();
const userRoutes = require('./userRoutes');
const clothingRoutes = require('./clothingRoutes');
//This will prefix user routes into one group of routes prefixed as /api/users
router.use('/users', userRoutes);
router.use('/clothing', clothingRoutes);

module.exports = router;
