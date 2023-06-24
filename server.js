const express = require('express');
const path = require('path');
const app = express();

const indexRoutes = require('./routes/index');
const notesRoutes = require('./routes/notes');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);
app.use('/', notesRoutes);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
