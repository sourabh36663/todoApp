var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var todoRoutes = require('./routes/todos');

app.use('/api/todos', todoRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/views'));


app.get('/', function(req, res){
    res.sendFile("index.html");
});

app.post('/',function(req,res){
    res.send("This is the post root route.");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Everything is fine here, please go on. You are doing great!");
});
