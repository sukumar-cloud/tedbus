const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // URL to an image
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", PostSchema);

// Create a new post
router.post("/posts", async (req, res) => {
    try {
        const { title, content, image, author } = req.body;
        const newPost = new Post({ title, content, image, author });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Error creating post" });
    }
});

// Get all posts
router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "name").sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error fetching posts" });
    }
});

// Like a post
router.put("/posts/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });
        
        if (!post.likes.includes(req.body.userId)) {
            post.likes.push(req.body.userId);
        } else {
            post.likes = post.likes.filter(id => id.toString() !== req.body.userId);
        }
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Error liking post" });
    }
});

// Comment on a post
router.post("/posts/:id/comment", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });
        
        post.comments.push({ user: req.body.userId, text: req.body.text });
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Error adding comment" });
    }
});

module.exports = router;
