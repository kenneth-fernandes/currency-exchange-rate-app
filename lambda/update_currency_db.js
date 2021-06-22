
const http = require("https");
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({
  region: 'us-west-2'
});

exports.handler = async (event, context, callback) => {

  let options = {
    "method": "GET",
    "port": null,
    "hostname": "api.exchangeratesapi.io",
    "path": "/latest?base=USD",
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

        resolve(result);

      });
    });
    req.end();
  });
  
  let keys = Object.keys(
    JSON.parse(
      await firstReq.then((value) => {
        return value;
      })
    )['rates']
  );

  for(let i = 0; i < keys.length; i+=1) {
    
    options['path'] = '/latest?base='+ keys[i];
    
    let secondReq = new Promise((resolve, reject) => {
    
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
          
          resolve(body.toString());
        
        });
      });
      req.end();
    });
    
    let currencyData = JSON.parse(await secondReq.then((value => {
      return value;
    })));
    
    const params = {
      TableName: 'currency',
      Item: {
        base: keys[i],
        rates: currencyData['rates']
      }
    };
    
    await db.put(params).promise();
  }
 
 callback();
};