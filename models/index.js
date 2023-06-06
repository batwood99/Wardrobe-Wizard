const Clothing = require('./Clothing');
const User = require('./User');

User.hasMany(Clothing, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Clothing.belongsTo(User, {
  foreignKey: 'user_id'
});



module.exports = { Clothing, User};