const { User } = require('../models');

const userData = [
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password1',
  },
  {
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    password: 'password2',
  },
  {
    name: 'Michael Johnson',
    email: 'michaeljohnson@example.com',
    password: 'password3',
  },
  {
    name: 'Emily Davis',
    email: 'emilydavis@example.com',
    password: 'password4',
  },
  {
    name: 'David Wilson',
    email: 'davidwilson@example.com',
    password: 'password5',
  },
  {
    name: 'Emma Thompson',
    email: 'emmathompson@example.com',
    password: 'password6',
  },
];

const seedUsers = async () => {
  for (const user of userData) {
    await User.findOrCreate({
      where: { email: user.email },
      defaults: user,
    });
  }
};

module.exports = seedUsers;
