const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


const app = express();


const ClothingType = sequelize.define('ClothingType', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
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
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },

    clothing_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clothing_type',
            key: 'id'
        }
    }
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
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clothing_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clothing_type',
            key: 'id'
        }
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pants',
});

const footWear = sequelize.define('FootWear', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clothing_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clothing_type',
            key: 'id'
        }
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'foot_wear',
});

module.exports = { ClothingType, Shirt, Pants, footWear };
