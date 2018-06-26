var mongoose = require('mongoose');


var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name must be present in order to add a new todo'
    },
    completed:{
        type: Boolean,
        default: false
    },
    created_date:{
        type: Date,
        default: Date.now
    }
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;