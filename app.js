var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
  'use strict';
  res.render('index');
});

// Handle form data
app.post('/', function(req, res){
  'use strict';
  var mailOpts, smtpTrans;

  // Setup Nodemailer transport.
  // Create an application-specific password to avoid problems
  smtpTrans = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "sugarbirdmail@gmail.com",
      pass: "" // Change me before deployment
    }
  });

  // Mail options
  mailOpts = {
    from: req.body.name + '&lt;' + req.body.email + '&gt;',
    to: 'sugarbirdgfbaking@gmail.com',
    subject: 'Website contact form',
    text: "Name: " + req.body.name +
          "\nEmail: " + req.body.email +
          "\nMessage: "+ req.body.message
  };

  smtpTrans.sendMail(mailOpts, function(error, info){
    // Email not sent
    if (error) {
      res.render('contact', { msg: 'Error occured, message not sent.',
                              err: true, page: 'contact' });
    } else {
      console.log('message Sent'+info.response);
      res.render('contact', { msg: 'Message sent! Thank you.',
                              err: false, page: 'contact'});
    }
  });
});

app.listen(3000, function(){
  'use strict';
  console.log("The frontend server is running on port 3000!");
});
