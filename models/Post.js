const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Post = sequelize.define('Post', {
    title: { type: DataTypes.STRING, allowNull: false },
    publishedAt: { type: DataTypes.DATE, allowNull: true },
    status: {
        type: DataTypes.ENUM('draft', 'published', 'archived'),
        defaultValue: 'draft',
    },
});

module.exports = Post;