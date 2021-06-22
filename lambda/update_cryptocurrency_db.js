
const http = require("http");
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({
  region: 'us-west-2'
});

exports.handler = async (event, context, callback) => {

  let options = {
    "method": "GET",
    "port": null,
    "hostname": "api.coinlayer.com",
    "path": "/api/live?access_key=927f7437dab79940bb1e607d433dc2d0",
    "headers": {
      "cache-control": "no-cache",
      "Content-Type": "application/json"
    }
  };
  
  
  let firstReq = new Promise((resolve, reject) => {

    let req = http.request(options, function (res) {

      let chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
      
      res.on("error", function (data) {
        reject(data);
      });
      
      res.on("end", function () {
        
        let body = Buffer.concat(chunks);
        let result = body.toString();
        console.log(result);
        resolve(body.toString());

      });
    });
    req.end();
  });
  
 let keys = Object.keys(
   JSON.parse(
     await firstReq.then((value) => {
       console.log(value);
      return value;
     })
   )['rates']);

  for(let i = 0; i < keys.length; i+=1) {
    
    
    let currencyData = JSON.parse(await firstReq.then((value => {
      return value;
    })));

    const params = {
      TableName: 'cryptocurrency',
      Item: {
        Target: keys[i],
        rates: currencyData

      }};
    
   await db.put(params).promise();
  }
 
 callback();
};