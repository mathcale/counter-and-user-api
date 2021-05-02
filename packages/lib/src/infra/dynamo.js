const AWS = require('aws-sdk');

const dynamoConfig = process.env.AWS_SAM_LOCAL ? { endpoint: 'http://dynamodb:8000' } : undefined;
const DynamoDBClient = new AWS.DynamoDB.DocumentClient(dynamoConfig);

module.exports = {
  putItem: async (tableName, item) => {
    const putParams = {
      TableName: tableName,
      Item: item,
      ConditionExpression: 'attribute_not_exists(pk)',
    };

    return await DynamoDBClient.put(putParams).promise();
  },
};
