const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/travelStories.json");

// GET all travel stories
router.get("/api/posts", (req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading travel stories:", err);
            return res.status(500).json({ error: "Failed to load travel stories" });
        }
        res.json(JSON.parse(data));
    });
});

// POST a new travel story
router.post("/api/posts", (req, res) => {
    const newStory = req.body;

    if (!newStory.title || !newStory.content) {
        return res.status(400).json({ error: "Title and content are required" });
    }

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading travel stories:", err);
            return res.status(500).json({ error: "Failed to read travel stories" });
        }

        let stories = JSON.parse(data);
        newStory.id = stories.length ? stories[stories.length - 1].id + 1 : 1;
        stories.push(newStory);

        fs.writeFile(filePath, JSON.stringify(stories, null, 2), (writeErr) => {
            if (writeErr) {
                console.error("Error writing travel stories:", writeErr);
                return res.status(500).json({ error: "Failed to save travel story" });
            }
            res.status(201).json({ message: "Travel story added successfully", newStory });
        });
    });
});

module.exports = router;
