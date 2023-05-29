const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();

const sequelize = new Sequelize('clothing_db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

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




