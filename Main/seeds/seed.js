const sequelize = require('../config/connection');
const User = require('../models/User');
const Clothing = require('../models/Clothing');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  try {
    // Create a test user
    const user = await User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });

    // Create some clothing items for the user
    await Clothing.bulkCreate([
      { name: 'Blue T-Shirt', category: 'Tops', subCategory: 'Shirts', userId: user.id },
      { name: 'Black Jeans', category: 'Bottoms', subCategory: 'Pants', userId: user.id },
      { name: 'Running Shoes', category: 'Shoes', subCategory: 'Shoes', userId: user.id },
    ]);

    console.log('Database seeded successfully.');
  } catch (err) {
    console.error('Error seeding database:', err);
  }

  process.exit(0);
};

seedDatabase();