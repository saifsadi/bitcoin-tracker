//jshint esversion:6

//added npm packages to the file
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

//bodyParser to get the values of form inputs
app.use(bodyParser.urlencoded({extended : true}));

//render the index.html as homepage
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

  // created variable 'url' to store the api-url
  var url = "";

  //post method to get the value of html forms
  app.post("/", function(req, res){
  //body.crypto => crypto is the name of our first dropdown and fiat is the second
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;
  //old url => url = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/'+crypto+fiat;
  //new api url = 'https://apiv2.bitcoinaverage.com/convert/global?from='+crypto+'&to='+fiat+'&amount='+amount;
  //use request method to send the http request and get data from bitcoinaverage api


  //options method in request package
  var options = {
    url : 'https://apiv2.bitcoinaverage.com/convert/global',
    method : 'GET',
    //qs meaning parameters after '?' in the base_url
    qs : {
      from : crypto,
      to : fiat,
      amount : amount
    }
  };


  request(options, function(err, response, body){
      console.log("Error :" + err);
      console.log("Response :" + response.statusCode);
      console.log("Body :" + body);

      //converting JSON to javascript normal objects to get the data
      var data = JSON.parse(body);
      var price = data.price;
      res.write("<p>The current Date is " + data.time + "</p>");
      res.write("<h3> The " + amount + " " + crypto + " is currently worth " + price + " " +fiat + "</h3>");
      res.send();

  });


});

// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

app.listen(3000, function(){
  console.log('server is running on port http://localhost:3000/');
});
