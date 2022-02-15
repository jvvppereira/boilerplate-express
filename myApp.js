var express = require('express');
var app = express();

// console.log("Hello World");

// app.get("/", function(req, res) {
//   res.send("Hello Express");
// });

app.use('/', function (req, res, next) {
  const { method, path, ip } = req;
  console.log(`${method} ${path} - ${ip}`);
  next();
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
