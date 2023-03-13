const express = require('express');
const router = express.Router();

const notes = [];

router.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

router.get('/api/notes', (req, res) => {
  res.json(notes);
});

router.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = notes.length + 1;
  notes.push(newNote);
  res.json(newNote);
});

module.exports = router;
