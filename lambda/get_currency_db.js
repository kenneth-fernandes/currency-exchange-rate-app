const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({
  region: 'us-west-2'
});

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});


exports.handler =  async (event, context, callback) => {
    console.log(event.base);
    const params = {
        TableName: 'currency',
        Key: {
            "base": {S: event.base}
        }
    };
    var result = await dynamodb.getItem(params).promise();
    console.log(JSON.stringify(result));
    
    return result;
};
