const express = require('express');
const router = express.Router();
const path = require('path');
// const { readFromFile, writeToFile, readAndAppend } = require('../fsUtils');
const fs = require('fs');
const app = express();

const notes = [];

router.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('/api/notes', (req, res) => {
  res.json(notes);
});

router.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).send('Please provide a title and note content');
  }
  const newNote = { title, text, id: notes.length + 1 };
  notes.push(newNote);
  fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving note');
    }
    console.info('Note saved successfully!');
    return res.send(newNote);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public'));
});

module.exports = router;



