const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/travelStories.json");

router.get('/api/travel-stories', (req, res) => {
    fs.readFile(storiesFile, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading stories' });
        }
        res.json(JSON.parse(data));
    });
});

// Save Travel Story
router.post('/api/travel-stories', (req, res) => {
    fs.readFile(storiesFile, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading stories' });
        }

        const stories = JSON.parse(data);
        const newStory = {
            title: req.body.title,
            content: req.body.content
        };

        stories.push(newStory);

        fs.writeFile(storiesFile, JSON.stringify(stories, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving story' });
            }
            res.status(201).json(newStory);
        });
    });
});
module.exports = router;
