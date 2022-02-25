var express = require('express');
var app = express();
var bodyParser = require('body-parser')

// console.log("Hello World");

// app.get("/", function(req, res) {
//   res.send("Hello Express");
// });

app.use('/', bodyParser.urlencoded({extended: false}));

app.use('/', function (req, res, next) {
  const { method, path, ip } = req;
  console.log(`${method} ${path} - ${ip}`);
  next();
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  req.time = req.time.slice(0,19) + (+ req.time.slice(19,21) +2 ) + req.time.slice(21);
  next();
}, function(req, res) {
  res.send({time: req.time});
});

app.get("/:word/echo", function(req, res) {
  const { word } = req.params;
  
  res.json({echo: word});
});

app.get("/name", function(req, res) {
  const { first, last } = req.query;
  
  res.json({ name: `${first} ${last}`});
}).post("/name", function(req, res) {
  const { first, last } = req.body;
  
  res.json({ name: `${first} ${last}`});
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', function(req, res) {
  let message =  "Hello json";
  
  if (process.env.MESSAGE_STYLE == "uppercase") {
    message = message.toUpperCase();
  }
  
  res.json({"message": message});
});

























 module.exports = app;
