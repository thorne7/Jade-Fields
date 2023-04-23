const express = require('express');
const router = express.Router();
const noteRouter = require('./notes');

router.use('/notes', noteRouter);

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
