var restify = require('restify');
var server = restify.createServer();
var setupController= require("./controllers/setupController.js");
var user= require("./controllers/user.js");
var restifyValidator= require("restify-validator");
const mongoose = require('mongoose');
var config= require('./config/dbconnections.js')

mongoose.connect(config.getMongoConnection());
setupController(server, restify, restifyValidator);
user(server);

server.listen(8081, function() {
  console.log('%s listening at %s', server.name, server.url);
});
