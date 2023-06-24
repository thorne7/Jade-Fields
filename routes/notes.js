const express = require('express');
const router = express.Router();
const fs = require('fs');

let notes = require('../db/db.json');

router.get('/notes', (req, res) => {
  res.sendFile('notes.html', { root: './public' });
});

router.get('/api/notes', (req, res) => {
  res.json(notes);
});

router.post('/api/notes', (req, res) => {
  notes.push(req.body);

  fs.writeFile('./db/db.json', JSON.stringify(notes), (writeErr) =>
    writeErr ? console.error(writeErr) : console.info('Success!')
  );

  res.json(notes);
});

router.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  // Find the index of the note with the given id
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex !== -1) {
    // Remove the note from the notes array
    notes.splice(noteIndex, 1);

    // Update the db.json file
    fs.writeFile('./db/db.json', JSON.stringify(notes), (writeErr) =>
      writeErr ? console.error(writeErr) : console.info('Success!')
    );

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
