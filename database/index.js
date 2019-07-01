const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cows', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`connection to cows db open`)
  // we're connected!
});


var cowSchema = new mongoose.Schema({
    name: String,
    description: String
  });

var Cows = mongoose.model('Cows', cowSchema)

const find = (data,cb) => {
  Cows.find(data, function(err, result) {
    if (err) { return cb("error checking for existing entry",err)}
    if (result) { return cb(null, result)}
  })
}

const save = (data,cb) => {
  Cows.find(data, function(err, result) {
    if (err) { return cb("error checking for existing entry",err)}
    if (result.length) { return cb("That Cow already exists")}
    var newCow = new Cows({name: data.name, description: data.description});
    newCow.save((err, result) => {
      if(err) {return cb("error saving entry to database", err)}
      return cb(null, newCow)
    })

  })
} 

module.exports = {save, find}