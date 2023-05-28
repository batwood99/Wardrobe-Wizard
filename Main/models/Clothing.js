// Import necessary dependencies
const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

// Define the Clothing model
const Clothing = sequelize.define('clothing', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  subCategory: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Define the available categories and sub-categories
const categories = ['Tops', 'Bottoms', 'Shoes'];
const subCategories = {
  Tops: ['Shirts', 'Jackets', 'Vests', 'Dresses'],
  Bottoms: ['Pants', 'Shorts', 'Skirts', 'Leggings'],
  Shoes: ['Shoes', 'Flip-flops']
};

// Create the Clothing table in the database
Clothing.sync({ force: false })
  .then(() => {
    console.log('Clothing table created successfully.');
  })
  .catch((err) => {
    console.error('Error creating Clothing table:', err);
  });

// Export the Clothing model
module.exports = Clothing;
