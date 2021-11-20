const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connection.js');

class Comment extends Model {}

Comment.init(
  {
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
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Post',
            key: 'id'
        }
    }
  },
  { sequelize, modelName: 'comment', freezeTableName: true, timestamps: false }
);

module.exports = Comment;