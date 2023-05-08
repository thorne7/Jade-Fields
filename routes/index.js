const express = require('express');
const router = express.Router();
const app = express();
const noteRouter = require('./notes');
const path = require('path')

router.use('./', noteRouter);

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

module.exports = router;
