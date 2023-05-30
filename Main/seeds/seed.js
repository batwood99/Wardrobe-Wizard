const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const seedData = require('./seed.json');
const { ClothingType, Shirt, Pants, FootWear } = require('../models/Clothing');

const seedDataBase = async () => {
  await sequelize.sync({ force: true });

  await ClothingType.bulkCreate([
    { name: 'Shirt' },
    { name: 'Pants' },
    { name: 'FootWear' },
  ]);

  await Shirt.bulkCreate(seedData.shirts);
  await Pants.bulkCreate(seedData.pants);
  await FootWear.bulkCreate(seedData.footwear);

  console.log('Database seeded!');
  process.exit(0);
};

seedDataBase();
