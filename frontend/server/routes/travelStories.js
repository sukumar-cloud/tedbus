const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/travelStories.json");

// GET all travel stories
router.get("/posts", (req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading travel stories:", err);
            return res.status(500).json({ error: "Failed to load travel stories" });
        }
        res.json(JSON.parse(data));
    });
});

module.exports = router;
