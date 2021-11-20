const { Post, User, Comment } = require('../db/models');
const sequelize = require('../db/connection');
const postSeeds = require('./posts.json');
const userSeeds = require('./users.json');
const commentSeeds = require('./comments.json');


// const seedDb = async () => {

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const post of postData) {
      await post.create({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    for (const comments of commentsData) {
      await comments.create({
        ...comments,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });    
    }
  
    process.exit(0);
  };
  
  seedDatabase();
  