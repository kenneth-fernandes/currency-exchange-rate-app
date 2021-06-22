const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({
  region: 'us-west-2'
});

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});


exports.handler =  async (event, context, callback) => {
    console.log(event.Target)
    
    const params = {
        TableName: 'cryptocurrency',
        Key: {
            "Target":{S: event.Target}
        }
    };
    var result = await dynamodb.getItem(params).promise();
    console.log(JSON.stringify(result));
    
    return result;
};
