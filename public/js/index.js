var socket = io();
socket.on('connect', () => {
  console.log('connected to the server');
});
socket.on('newMessage', function(message){
  console.log(message);

  var li =jQuery('<li></li>');
  li.text(`${message.from}:${message.text}`);
   jQuery('#messages').append(li);

});

socket.on('newLocationMessage', function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">get my location</a>');
  li.text(`${message.from}: `);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);

});


socket.on('disconnect', function (data) {
  console.log('disconnected from server');
});
// socket.emit('createMessage', {
//   from:'rakesh',
//   text:'this is create message'
// }, function(data){
//   console.log('got it',data);
// });
var messageTextBox = jQuery('[name=message]');
jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from:'User',
    text:messageTextBox.val()
  }, function(){
    messageTextBox.val('');
  });

});


var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    alert('Geolocation is not supported in your browser');
  }
  locationButton.attr('disabled', 'disabled').text('sending location...');
navigator.geolocation.getCurrentPosition(function(position){
  locationButton.removeAttr('disabled', 'disabled').text('send location');
  socket.emit('createLocation', {
    latitude:position.coords.latitude,
    longitude:position.coords.longitude
  });
},function(){
  locationButton.removeAttr('disabled', 'disabled').text('send location');
  alert('geoloaction can not be fetched');
});

});
