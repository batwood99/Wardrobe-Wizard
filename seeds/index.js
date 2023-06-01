const { sequelize } = require('../models/User.js');
const clothingData = require('./clothingSeed.js');
const userData = require('./userSeed.js');

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await userData();
    console.log('\n----- USERS SEEDED -----\n');
    await clothingData();
    console.log('\n----- CLOTHING SEEDED -----\n');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = seedAll;
