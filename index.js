// Importing Node modules and initializing Express
const express = require('express'),  
      app = express(),
      bodyParser = require('body-parser'),
       mongoose = require('mongoose'),
      logger = require('morgan'),
      config = require('./config/main');
      socketEvents = require('./socketEvents');  
      router = require('./router');  

 // Start the server
const server = app.listen(config.port);  
console.log('Your server is running on port ' + config.port + '.');  
const io = require('socket.io').listen(server);

socketEvents(io); 

mongoose.connect(config.database); 

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  

// Enable CORS from client-side
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

router(app); 