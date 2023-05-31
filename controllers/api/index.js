const router = require('express').Router();
const userRoutes = require('./userRoutes');
//This will prefix user routes into one group of routes prefixed as /api/users
router.use('/users', userRoutes);

module.exports = router;
