const express = require('express');
const path = require('path');

var publicPath = path.join(__dirname + '../../public');
var app = express();

app.use(express.static(publicPath));



app.listen(3000, () => {
  console.log('Server has been started successfully');
});
