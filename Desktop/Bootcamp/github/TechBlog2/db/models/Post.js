const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connection.js');

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
  },
  { sequelize, modelName: 'post', freezeTableName: true, timestamps: false }
);

module.exports = Post;