const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body);

  console.log("======================");
  console.log(body.email);
  console.log("======================");
  const response = {
    statusCode: 200,
    body: { event },
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    },
  };

  response.email = body.email;

  const params = {
    TableName: "coming_soon",
    Item: {
      email: { S: body.email },
    },
  };

  // Call DynamoDB to add the item to the table
  dynamodb.putItem(params, (err, data) => {
    if (err) {
      response.statusCode = 500;
      response.body.error = err;
    }

    console.log("======================");
    console.log(response);
    console.log("======================");
    response.body = JSON.stringify(response);
    callback(null, response);
  });
};
