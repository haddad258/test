var express = require('express'); 
var app = express(); 
var bodyParser = require('body-parser');
const axios = require('axios');
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser
const fs = require('fs');
var m;
var send ;
app.use(bodyParser.json());  

app.get('/',function(req,res){  

axios.get('https://www.cdiscount.com/high-tech/casques-baladeur-hifi/l-10654.html#_his_/').then(resp => {
    fs.writeFile('helloworld.html', resp.data, function (err) {
        if (err) return console.log(err);        
        m = resp.data;
        console.log(m)
        var doc = new dom().parseFromString(m)
        var node = xpath.select("//*[@id='lpTBk']", doc)[0]
        send = node.namespaceURI;
        console.log(send)
      });
     
      res.sendFile(__dirname + "/index.html");
});
});

app.listen('3001','localhost', function(){
    console.log('running on 3001...');
});
