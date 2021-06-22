let AWS = require('aws-sdk');
let dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {

    let tableName = "currency_history";
    
    let toDateArr = event.end_date.split('-');
    let date1 = new Date(parseInt(toDateArr[0]), parseInt(toDateArr[1]) -1, parseInt(toDateArr[2]));
    const to = parseInt([date1.getUTCFullYear(), (date1.getUTCMonth() + 1), 
		date1.getUTCDate() < 10 ? "0"+date1.getUTCDate() : date1.getUTCDate()].join(""), 10); 
    
    let fromDateArr = event.start_date.split('-');
    let date2 = new Date(parseInt(fromDateArr[0]), parseInt(fromDateArr[1]) -1, parseInt(fromDateArr[2]));
    const from = parseInt([date2.getUTCFullYear(), (date2.getUTCMonth() + 1), 
    	date2.getUTCDate() < 10 ? "0"+date2.getUTCDate() : date2.getUTCDate()].join(""), 10); 
    
    console.log(from, to);
    
    let params = {
        TableName : tableName,
        FilterExpression:"#date >= :from AND #date <= :to",
        ExpressionAttributeNames: {
	    	"#date":"date"
	    },
	    ExpressionAttributeValues: {
	    	":from": from,
	    	":to": to
	    }	
    };
    var items = []
	
	var queryExecute = function(callback) {
	
		docClient.scan(params,function(err,result) {

			if(err) {
				callback(err);
			} else {
				
				items = items.concat(result.Items);
				console.log(result.Items);
			
				if(result.LastEvaluatedKey) {
					params.ExclusiveStartKey = result.LastEvaluatedKey;
					queryExecute(callback);				
				} else {
						let finalItems = {};
						items.forEach(function (item, index) {
							const dateStr = item['date']+"";
							const finalDateStr = [dateStr.substr(0,4), dateStr.substr(4,2), dateStr.substr(6,2)].join("-");
							delete item['date'];
							
							if(event.base) {
								const temp = {};
								temp[event.base] = item[event.base];
								finalItems[finalDateStr] = temp;
							} else{
								finalItems[finalDateStr] = item;
							}
							
						});
					callback(err,finalItems);
				}	
			}
		});
	}
	
	queryExecute(callback);
	
};