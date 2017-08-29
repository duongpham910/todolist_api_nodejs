const mongoose  = require('mongoose');
const counter  = require('./counter.js');
mongoose.connect('mongodb://localhost:27017/todolist', {
  useMongoClient: true,
});
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  id: Number,
  description: String,
  due_date: Date,
  completed: false
}, {collection: 'task'});

const Todo = mongoose.model('Todo', todoSchema);

// var item = {
//   description: 'Go home early',
//   due_date: n,
//   completed: false,
// };

// var data = new Todo(item);
// data.save();

// Todo.find().exec((err, todos) => {
//   console.log(todos);
// });

module.exports = {
  createTodo: (callback, item) => {

    item.due_date = new Date(item.due_date);
    counter.getNextSequenceValue('taskid', (taskid) => {
      if (taskid) {
        item.id = taskid;
        let data = new Todo(item);
        let result = data.save((err) => {
          callback(err);
        });
      }
    });
  },
  getTodos: (callback) => {
    //async
    Todo.find().exec((err, todos) => {
      callback(todos)
    });
  }
}
