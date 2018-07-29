const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/myApp').then(() => {
  console.log('success!');
});

const stringSchema = new Schema({
  id: mongoose.Schema.ObjectId,
  input: String,
  date: Date,
});

const StringModel = mongoose.model('String', stringSchema);

const test = new StringModel({ input: 'test1' });

// const writeString = test.save(err => {
//   if (err) return err;
//   // saved!
// });

let result = StringModel.find({ input: 'test' }, (err, found) => {
  if (err) return err;
});

module.exports.weird = result;
