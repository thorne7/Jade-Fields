const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const notes = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = notes.length + 1;
  notes.push(newNote);
  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
