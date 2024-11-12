const express = require('express');
const router = express.Router();
const Jukebox = require('../models/jukebox.js');

// Post /tracks
router.post('/', async (req, res) => {
    try {
      const newTrack = await Jukebox.create(req.body);
      res.status(201).json(newTrack);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// Get /tracks
router.get('/', async (req, res) => {
    try {
        const jukeboxes = await Jukebox.find();
        res.status(200).json(jukeboxes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get /tracks/:id
router.get('/:trackId', async (req, res) => {
    try {
        const foundTrack = await Jukebox.findById(req.params.trackId);
        if (!foundTrack) {
            res.status(404);
            throw new Error('Track not found');
        }
        res.status(200).json(foundTrack);
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

// Put /tracks/:id
router.put('/:trackId', async (req, res) => {
    try {
        const updatedTrack = await Jukebox.findByIdAndUpdate(req.params.trackId, req.body, { new: true });
        if (!updatedTrack) {
            res.status(404);
            throw new Error('Track not found');
        }
        res.status(200).json(updatedTrack);
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

// Delete /tracks/:id
router.delete('/:trackId', async (req, res) => {
    try {
        const deletedTrack = await Jukebox.findByIdAndDelete(req.params.trackId);
        if (!deletedTrack) {
            res.status(404);
            throw new Error('Track not found');
        }
        res.status(200).json(deletedTrack);
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

module.exports = router;