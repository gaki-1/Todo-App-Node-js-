var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// mongodb+srv://mongodbadmin1:12345@cluster0-dtg3g.mongodb.net/test?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://mongodbadmin1:12345@cluster0-dtg3g.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne=Todo({item: 'wake up early'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved');
// });


// var data = [{ item: 'get milk' }, { item: 'coding ass' }, { item: 'walk dog' }];
var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function (app) {
    app.get('/todo', function (req, res) {
        // get data from mongo db
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        });
    });

    app.post('/todo', urlencodedParser, function (req, res) {
        // get data nd add it
        var newTodo=Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json({ todos: data });
        })
        // data.push(req.body);
    });

    app.delete('/todo/:item', function (req, res) {
        // delete the requested object from mongo db
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
};