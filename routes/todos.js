var express = require("express");
var router = express.Router();
var db = require('../models/index.js');
var bodyParser = require('body-parser');
var helpers = require('../helpers/todos.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodos);
    

router.route('/:todoId')
    .get(helpers.getTodo)
    .put(helpers.putTodo)
    .delete(helpers.deleteTodo);

module.exports = router;