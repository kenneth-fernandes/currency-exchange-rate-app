const http = require("https");
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({
  region: 'us-west-2'
});

const days = 365;
exports.handler = async (event, ctx, callback) => {
    
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
  
    let keys = Object.keys (
       JSON.parse(
         await firstReq.then((value) => {
          return value;
         })
       )['rates']
    );
    
    let date1 = new Date();
    const date1Str = date1.getUTCFullYear() + "-" + (date1.getUTCMonth() + 1) + "-"+ date1.getUTCDate();
      console.log(date1);
    
    let date2 = new Date();
    date2.setDate(date2.getDate() - days);
    const date2Str = date2.getUTCFullYear() + "-" + (date2.getUTCMonth() + 1) + "-"+ date2.getUTCDate();
    console.log(date2);
    
    const histRatesData = {};
    for(let i = 0; i < keys.length; i+=1) {
        options["path"] = "/history?start_at=" + date2Str + "&end_at=" + date1Str +"&base="+ keys[i];
        
        
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
                    
                    resolve(result);
                
                });
            });
            
            req.end();                              
        });
        
        let dateRates = JSON.parse(
            await secondReq.then((value) => {
                return value;
            })
        )['rates'];

        for(const property in dateRates) {
            let tempObj;
            if(histRatesData.hasOwnProperty(property)) {
                tempObj = histRatesData[property];
            } else {
                histRatesData[property] = {};
                tempObj = histRatesData[property];
            }
            
            tempObj[keys[i]] = dateRates[property];

        }
          
    }
    for(const property in histRatesData) {
        const params = { TableName: 'currency_history', Item: {date: parseInt(property.split("-").join(""), 10)}};
        let itemObj = params['Item'];
        for(const currency in histRatesData[property]){
            itemObj[currency] = histRatesData[property][currency];
        }
        await db.put(params).promise();
    }
    const response = {
        statusCode: 200,
        body: JSON.stringify('Successful execution'),
    };
     
    return response;
};
