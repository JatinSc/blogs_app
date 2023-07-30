const express = require('express')
const postRoutes = express.Router()
const { Post } = require('../db/db');
const userAuth = require('../middlewares/userAuth')

postRoutes.post('/create', userAuth , async (req, res) => {

    const { title, description, userId, posted_by } = req.body
    if (!title || !description) {
        return res.status(400).json({
            error: "please enter all the required fields",
        });
    }
    
    if (!userId || !posted_by) {
        return res.status(401).json({
            error: "Authentication Error Please Login Again",
        });
    }

    try {
        const newPost = await Post.create({
            title,
            description,
            posted_by,
            userId
        })

        // Return the newly created post as the response
        return res.status(201).json({
            message: "Post created successfully",
            post: newPost
        });

    } catch (error) {
        console.log('Error creating post:', error);
        return res.status(500).json({ error: 'Unable to create post' });
    }
})

postRoutes.get('/all', userAuth, async (req, res) => {

    try {
        const posts = await Post.findAll({
            where: {
                userId: req.user.id, // Use the user's ID as the condition for finding posts
            },
        });
        return res.status(200)
            .json({
                post: posts.reverse()
            })
    } catch (error) {
         console.log('Error fetching posts:', error.message);
         return res.status(500).json({ error: 'Unable to fetch posts' });
    }

})


postRoutes.get('/view/:id', userAuth, async (req, res) => {
    const {id} = req.params
    try {
        const posts = await Post.findOne({
            where: {
                id: id, // Use the user's ID as the condition for finding posts
            },
        });
        
        return res.status(200)
            .json({
                post: posts
            })
    } catch (error) {
        console.log('Error fetching posts:', error.message);
        return res.status(500).json({ error: error.message });
    }

})

postRoutes.delete('/delete/:id', userAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await Post.destroy({
            where: {
                id: id, // Use the post's ID as the condition for deletion
            },
        });

        if (deletedCount === 0) {
            // If no post is deleted (post with the given ID not found), return a 404 response
            return res.status(404).json({ error: 'Post not found' });
        }
        return res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: error.message });
    }

})


module.exports = postRoutes