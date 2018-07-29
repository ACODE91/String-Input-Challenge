const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StringModel = require('./mongoWrite');

mongoose.connect('mongodb://localhost:27017/myApp').then(() => {
  console.log('success!');
});

const result = StringModel.model.find({}, (err, found) => {
  if (err) return err;
});

module.exports.query = result;
