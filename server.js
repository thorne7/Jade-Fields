const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const api = require('./routes');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(api)


app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});

module.exports = app