const { Sequelize , DataTypes  } = require('sequelize');

// Replace 'your_database_name', 'your_username', and 'your_password' with your MySQL credentials
const sequelize = new Sequelize('blog', 'jatin', '7011285746@jatin', {
    host: '127.0.0.1',
    dialect: 'mysql',
  });

// Test the database connection
(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

// Define your database models here
// For example, a User model:
const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  //posts model
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100), // Maximum length of 100 characters
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT, // For longer text with 5000 words limit
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW, // Default value is the current date and time
    },
    posted_by: {
        type: DataTypes.STRING, // Or any other suitable data type for the posted_by information
        allowNull: false, // You can make it non-null if you have user information for each post
      },
  });

  // Define associations between models
User.hasMany(Post, { foreignKey: 'userId' }); // A User can have many Posts
Post.belongsTo(User, { foreignKey: 'userId' }); // A Post belongs to a User

module.exports = { sequelize, User, Post };