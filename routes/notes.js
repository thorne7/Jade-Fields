const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')
const { v4: uuidv4 } = require('uuid');

let notes = [];

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../db/db.json'))
});

router.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

router.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();

  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.json(newNote);
    });
  });
});

router.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  // Find the index of the note with the given id
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex !== -1) {
    // Remove the note from the notes array
    notes.splice(noteIndex, 1);

    // Update the db.json file
    fs.writeFile('../db/db.json', JSON.stringify(notes), (writeErr) =>
      writeErr ? console.error(writeErr) : console.info('Success!')
    );

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
