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

const writeString = function(str) {
 const newModel = new StringModel({ input: str });
  newModel.save(err => {
    if (err) return err;
  });
};

module.exports.model = StringModel;
module.exports.write = writeString;