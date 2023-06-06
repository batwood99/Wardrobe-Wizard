const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Clothing extends Model {
  get last_worn() {
    const date = this.getDataValue('last_worn');
    if (date) {
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      const formattedDate = new Date(date).toLocaleDateString('en-US', options);
      return formattedDate;
    }
    return null;
  }
}

Clothing.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_worn: {
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        const date = this.getDataValue('last_worn');
        if (date) {
          const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
          const formattedDate = new Date(date).toLocaleDateString('en-US', options);
          return formattedDate;
        }
        return null;
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'clothing',
  }
);

module.exports = Clothing;
