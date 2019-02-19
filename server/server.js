const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

var {generateMessage,generateLocationMessage} = require('./utils/message.js');
var publicPath = path.join(__dirname + '../../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user conncted');

socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
socket.broadcast.emit('newMessage',generateMessage('Admin','New User has been joined'));

 socket.on('createMessage', (message,callback) => {
   console.log('createMessage',message);
   io.emit('newMessage',generateMessage(message.from,message.text));
   callback('this is from server');

});

socket.on('createLocation', (coords) => {
  io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude));
});

socket.on('disconnect', () => {
    console.log('user was disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server has been started successfully');
});
