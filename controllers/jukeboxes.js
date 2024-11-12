const express = require('express');
const router = express.Router();
const Jukebox = require('../models/jukebox.js');

// Post /tracks
router.post('/', async (req, res) => {
    try {
      const newJukebox = await Jukebox.create(req.body);
      res.status(201).json(newJukebox);
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
        const foundJukebox = await Jukebox.findById(req.params.trackId);
        if (!foundJukebox) {
            res.status(404);
            throw new Error('Track not found');
        }
        res.status(200).json(foundJukebox);
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});


module.exports = router;