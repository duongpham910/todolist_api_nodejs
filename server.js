var PORT = process.env.PORT || 3001;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var _ = require('underscore');

var middleware = require('./middleware.js');
var todo = require('./db/todo.js');
var todoNextId = 1;

app.use(middleware.logger);


// app.get('/about', middleware.requireAuthentication, function (req, res) {
//   res.send('About us!');
// });

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());

// GET /todos
app.get('/todos', function(req, res) {
  todo.getTodos((todos) => {
    res.json(todos);
  })
});

// GET /todos/:id
app.get('/todos/:id', function(req, res) {

  let todoId = req.params.id;
  let todoItem;

  todo.getTodos((todos) => {
    todos.forEach(function(todo) {
      if (todo.id == todoId) {
        todoItem = todo;
      }
    });
    if (todoItem) {
      res.json(todoItem);
    } else {
      res.status(404).send();
    }
  })
});

// POST /todos
app.post('/todos', (req, res) => {
  let body = req.body;
  body.id = todoNextId++;
  todo.createTodo((err) => {
    if (err) {
      res.json({status: false});
    } else {
      res.json(body);
    }
  }, body);
});

http.listen(PORT, function(){
  console.log('Listening on :3001');
});
