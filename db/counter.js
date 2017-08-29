const mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todolist', {
  useMongoClient: true,
});
const Schema = mongoose.Schema;

const counterSchema = new Schema({
  _id: String,
  sequence_value: Number,
}, {collection: 'counter'});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = {
  getNextSequenceValue: (tableName, callback) => {
    var query = Counter.findOne({ '_id': tableName });
    query.exec((err, counter) => {
      if (err) return err;
      callback(counter.sequence_value);
      counter.sequence_value ++;
      counter.save();
    });
  }
}
