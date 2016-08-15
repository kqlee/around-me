var express = require('express');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var path = require('path');

// Invoke our env file
dotenv.config();

var app = express();
var port = process.env.PORT || 8000;

//Add middleware to the application stack
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

// Checks to make sure server is working
app.get('/', function(req, res) {
  res.render(path.join(__dirname + '/index'));
});


app.listen(port, function() {
  console.log('Server is listening on port:', port);
});
