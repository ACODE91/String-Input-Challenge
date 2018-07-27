const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const stringSchema = new Schema({
  id: mongoose.Schema.ObjectId,
  input: String,
  date: Date,
});

const StringModel = mongoose.model('String', stringSchema);

// const test = new StringModel({ input: 'test' });
// test.save(function(err) {
//   if (err) return handleError(err);
//   // saved!
// });

const testQuery = StringModel.find({ input: 'test' }, (err, found) => {
  if (err) return err;
  console.log(found);
});

mongoose.connect('mongodb://localhost:27017/myApp').then(() => {
  console.log('success!');
});
