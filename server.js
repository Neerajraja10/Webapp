var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

var userRoutes = require('./api-routes/routes');

app.use('/v1/user',userRoutes);
app.get('/healthz',function(req, res) {
  res.status(200).send(); 
});
module.exports = app;