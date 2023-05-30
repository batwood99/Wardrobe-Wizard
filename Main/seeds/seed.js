const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const seedData = require('./seed.json');

const ClothingType = sequelize.define('ClothingType', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'clothing_type',
});

const Shirt = sequelize.define('Shirt', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clothing_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clothing_type',
      key: 'id',
    },
  },
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'shirt',
});

const Pants = sequelize.define('Pants', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clothing_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clothing_type',
      key: 'id',
    },
  },
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'pants',
});

const FootWear = sequelize.define('FootWear', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clothing_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clothing_type',
      key: 'id',
    },
  },
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'foot_wear',
});

const seedDataBase = async () => {
  await sequelize.sync({ force: true });

  await ClothingType.bulkCreate([
    { name: 'Shirt' },
    { name: 'Pants' },
    { name: 'Shoes' },
  ]);

  await Shirt.bulkCreate(seedData.shirts);
  await Pants.bulkCreate(seedData.pants);
  await FootWear.bulkCreate(seedData.footwear);

  console.log('Database seeded!');
  process.exit(0);
};

seedDataBase();
