const express = require('express');
const cors = require('cors')
const { sequelize, User, Post } = require('./db/db'); // Import Sequelize instance and models
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
require('dotenv').config()
const userAuth = require('./middlewares/userAuth')

const app = express();
app.use(express.json())
app.use(cors())

app.use('/', userRoutes)
app.use('/post', postRoutes)

// app.get('/protected', userAuth , (req , res)=>{
//   return res.status(200)
//   .json({
//     user:req.user
//   })
// })

const PORT = 3000;

// ... Your other application code and routes ...

// Start the server
(async () => {
    try {
      // Synchronize the models with the database
      await sequelize.sync();
  
      // Start your server only after the tables are created
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Error synchronizing models:', error);
    }
  })();