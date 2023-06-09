const createClothing = require('./clothingSeed');
const seedUsers = require('./userSeed');

const sequelize = require('../config/connection');

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    await createClothing();
    console.log('\n----- CLOTHING SEEDED -----\n');
  } catch (err) {
    console.log(err);
  }
  process.exit(0);
};

console.log('hello world');

seedAll();

module.exports = seedAll;
