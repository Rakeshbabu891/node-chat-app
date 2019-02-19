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
socket.on('disconnect', function (data) {
  console.log('disconnected from server');
});
// socket.emit('createMessage', {
//   from:'rakesh',
//   text:'this is create message'
// }, function(data){
//   console.log('got it',data);
// });

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from:'User',
    text:jQuery('[name=message]').val()
  }, function(data){
    console.log('got it',data);
  });

});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    alert('Geolocation is not supported in your browser');
  }
navigator.geolocation.getCurrentPosition(function(position){
  socket.emit('createLocation', {
    latitude:position.coords.latitude,
    longitude:position.coords.longitude
  });
},function(){
  alert('geoloaction can not be fetched');
});

});
