const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/travelStories.json");

// Get Travel Stories
router.get('/travel-stories', (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading stories' });
        }
        res.json(JSON.parse(data));
    });
});

// Save Travel Story
router.post('/travel-stories', (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading stories' });
        }

        const stories = JSON.parse(data);
        const newStory = {
            title: req.body.title,
            content: req.body.content
        };

        stories.push(newStory);

        fs.writeFile(filePath, JSON.stringify(stories, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving story' });
            }
            res.status(201).json(newStory);
        });
    });
});

module.exports = router;
