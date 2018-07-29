const express = require('express');
const router = express.Router();
const mongoQuery = require('../database/mongoQuery.js');
const bodyParser = require('body-parser');
const mongoWrite = require('../database/mongoWrite.js');

// middleware that is specific to this router

router.use(bodyParser.json());

router.use((req, res, next) => {
  if(req.method === 'POST') {
    mongoWrite.write(req.body.input.savedString);
    res.send('POST request to the homepage')
  }
  next();
});
// define the home page route
router.get('/', (req, res) => {
  mongoQuery.query.then(found => {
    res.send(found);
  });
});

module.exports = router;
