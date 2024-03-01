const express = require("express");
const router = express.Router();
const postModel = require("../../models/post");

router.post('/createPost', async (req, res) => {
    try {
        // Create a new post using the postModel schema
        const newPost = new postModel(req.body);

        // Save the new post to the database
        const savedPost = await newPost.save();

        // Respond with the saved post
        res.status(201).json(savedPost);
    } catch (error) {
        console.error(error);

        // Handle different types of errors and respond accordingly
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: 'Validation Error', details: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

module.exports = router;
