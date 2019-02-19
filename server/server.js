const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

var publicPath = path.join(__dirname + '../../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user conncted');

  socket.on('disconnect', () => {
    console.log('user was disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server has been started successfully');
});
