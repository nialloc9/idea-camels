const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
    
    const response = {
        statusCode: 200,
        body: {event},
        headers: {'Content-Type': 'application/json'}
    }
    response.body.test = "1"

      const params = {
        TableName: 'coming_soon',
        Item: {
          'email' : {S: 'test'}
        }
      };
      
      // Call DynamoDB to add the item to the table
      dynamodb.putItem(params, (err, data) => {
        if (err) {
            response.statusCode = 500
            response.body = {error: err}
        } else {
          response.body.test = "3"
        }

        response.body = JSON.stringify(response)
        callback(null, response)
      });
}
