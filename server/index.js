const express = require('express');
const app = express();
const port = 3000;
const db = require('../database/index')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(express.static("./client/public"))
app.get('/api/cows',function(req,res){
    db.find({},function(err,results){
        res.send(results)
    })
})

app.post('/api/cows', function(req,res){
    db.save(req.body, function(err,results){
        res.send(results)
    })
})

app.listen(port, console.log(`listening on ${port}`))