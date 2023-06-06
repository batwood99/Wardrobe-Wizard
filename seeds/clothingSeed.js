const { Clothing } = require('../models');

const clothingData = [
  {
    type: 'Shirt',
    type_ID: 1,
    color: 'Red',
    last_worn: '2023-01-01',
    description: 'Red shirt',
    user_id: 1,
  },
  {
    type: 'Pants',
    type_ID: 2,
    color: 'Blue',
    last_worn: '2023-02-01',
    description: 'Blue pants',
    user_id: 2,
  },
  {
    type: 'Shirt',
    type_ID: 1,
    color: 'Green',
    last_worn: '2023-03-01',
    description: 'Green shirt',
    user_id: 3,
  },
  {
    type: 'Pants',
    type_ID: 2,
    color: 'Black',
    last_worn: '2023-04-01',
    description: 'Black pants',
    user_id: 4,
  },
  {
    type: 'Shirt',
    type_ID: 1,
    color: 'Yellow',
    last_worn: '2023-05-01',
    description: 'Yellow shirt',
    user_id: 5,
  },
  {
    type: 'Footwear',
    type_ID: 3,
    color: 'White',
    last_worn: '2023-06-01',
    description: 'White sneakers',
    user_id: 6,
  },
  {
    type: 'Shirt',
    type_ID: 1,
    color: 'Orange',
    last_worn: '2023-07-01',
    description: 'Orange shirt',
    user_id: 1,
  },
  {
    type: 'Pants',
    type_ID: 2,
    color: 'Grey',
    last_worn: '2023-08-01',
    description: 'Grey pants',
    user_id: 2,
  },
  {
    type: 'Shirt',
    type_ID: 1,
    color: 'Purple',
    last_worn: '2023-09-01',
    description: 'Purple shirt',
    user_id: 3,
  },
  {
    type: 'Pants',
    type_ID: 2,
    color: 'White',
    last_worn: '2023-10-01',
    description: 'White pants',
    user_id: 4,
  },
  {
    type: 'Shirt',
    type_ID: 1,
    color: 'Green',
    last_worn: '2023-11-01',
    description: 'Green shirt',
    user_id: 5,
  },
  {
    type: 'Footwear',
    type_ID: 3,
    color: 'Black',
    last_worn: '2023-12-01',
    description: 'Black shoes',
    user_id: 6,
  },
];


const createClothing = async () => {
  for (const item of clothingData) {
    const [clothing, created] = await Clothing.findOrCreate({
      where: {
        type: item.type,
        type_ID: item.type_ID,
        color: item.color,
        user_id: item.user_id,
      },
      defaults: item,
    });

    if (!created) {
      console.log(`Clothing item already exists: ${clothing.type} - ${clothing.color}`);
    } else {
      console.log(`Created new clothing item: ${clothing.type} - ${clothing.color}`);
    }
  }
};

module.exports = createClothing;