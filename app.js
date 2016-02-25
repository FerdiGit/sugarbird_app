var express = require('express');
var app = express();

app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
  'use strict';
  res.render('index');
});

app.get('/contact', function(req, res){
  'use strict';
  res.render('contact');
});

app.get('/gallery', function(req, res){
  'use strict';
  res.render('gallery');
});

app.listen(3000, function(){
  'use strict';
  console.log("The frontend server is running on port 3000!");
});
