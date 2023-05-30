const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


//This line seedDataBase is a function that will be called in the server.js file and will seed the database with the data from the seed.json file
const seedDataBase = async () => {
    await sequelize.sync({ force: true });

    await ClothingType.bulkCreate([
        {name: 'Shirt'},
        {name: 'Pants'},
        {name: 'Shoes'},
    ]);

    await Shirt.bulkCreate([
        {name: 'T-Shirt', color: 'Red', clothing_type_id: 1},
        {name: 'T-Shirt', color: 'Blue', clothing_type_id: 1},
        {name: 'T-Shirt', color: 'Green', clothing_type_id: 1},
        {name: 'T-Shirt', color: 'Yellow', clothing_type_id: 1},
        {name: 'T-Shirt', color: 'Orange', clothing_type_id: 1},
    ]);

    await Pants.bulkCreate([
        {name: 'Jeans', color: 'Blue', clothing_type_id: 2},
        {name: 'Jeans', color: 'Black', clothing_type_id: 2},
        {name: 'Dress Pants', color: 'Grey', clothing_type_id: 2},
        {name: 'Slacks', color: 'White', clothing_type_id: 2},
        {name: 'Shorts', color: 'Blue', clothing_type_id: 2},
    ]);

    await FootWear.bulkCreate([
        {name: 'Sneakers', color: 'White', clothing_type_id: 3},
        {name: 'Slippers', color: 'Black', clothing_type_id: 3},
        {name: 'Loafers', color: 'Red', clothing_type_id: 3},
        {name: 'Boots', color: 'Brown', clothing_type_id: 3},
        {name: 'Sandals', color: 'Blue', clothing_type_id: 3},
    ]);

    console.log('Database seeded!');
    process.exit(0);
};
seedDataBase();
test


    
