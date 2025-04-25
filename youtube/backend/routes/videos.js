const express = require("express");
const router = express.Router();
const Video = require("../models/Video");

router.get("/", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.json(video);
  } catch (err) {
    res.status(404).json({ error: "Video not found" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newVideo = new Video(req.body);
    const saved = await newVideo.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to upload video" });
  }
});

router.put("/:id", async (req, res) => {
    try {
      const updated = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: "Failed to update video" });
    }
  });
  

router.delete("/:id", async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete video" });
  }
});

module.exports = router;
