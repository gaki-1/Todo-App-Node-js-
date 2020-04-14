var express = require('express');
var app = express();
var todoController=require('./controllers/todoController');
// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));


todoController(app);


// listen to ports
app.listen('3000');
console.log('listening to port 3000');