const express = require('express');
const router = express.Router();
const mongoQuery = require('../database/mongoQuery.js');
const bodyParser = require('body-parser');

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', (req, res) => {
  mongoQuery.weird.then(found => {
    res.send(found[0].input);
  });
});

module.exports = router;
