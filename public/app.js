/* global $*/
$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos);
    
    $('#todoInput').keypress(function(event){
        if(event.which == 13){
            createTodo();
            $('#todoInput').val('');
        }
    });
    
    $('.list').on('click', 'span', function(e){
        e.stopPropagation();
        var todo = $(this).parent();
        removeTodo(todo);
    });
    
    $('.list').on('click', 'li', function(){
        updateTodo($(this));
    });
}); 

function removeTodo(todo) {
    var clickedId = todo.data('id');
    var deleteUrl = '/api/todos/'+clickedId;
        $.ajax({
            method: 'DELETE',
            url: deleteUrl
        })
        .then(function(data){
            todo.remove();
        })
        .catch(function(err){
            console.log(err);
        });
}

function addTodos(todos){
    todos.forEach(function(todo){
        addTodo(todo);
    });
}

function addTodo(todo){
    var newTodo = $('<li class="task">'+ todo.name+'<span>X</span></li>');
    newTodo.data('completed', todo.completed);
    newTodo.data('id', todo._id);
    if(todo.completed){
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

function createTodo(){
    //send request to create new todo.
    var usrInput = $('#todoInput').val();
    $.post("/api/todos", {name: usrInput})
    .then(function(newTodo){
      addTodo(newTodo);  
    })
    .catch(function(err){
        console.log(err);
    });
}

function updateTodo(todo){
    var updateUrl = '/api/todos/'+ todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone};
    
    $.ajax({
        method: 'PUT',
        url: updateUrl, 
        data: updateData
    })
    .then(function(updatedTodo){
         todo.toggleClass("done");
         todo.data('completed', isDone);
    })
}