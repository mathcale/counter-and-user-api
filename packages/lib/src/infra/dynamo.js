const AWS = require('aws-sdk');

const dynamoConfig = process.env.AWS_SAM_LOCAL ? { endpoint: 'http://dynamodb:8000' } : undefined;
const DynamoDBClient = new AWS.DynamoDB.DocumentClient(dynamoConfig);

module.exports = {
  queryIndex: async (tableName, indexName, value) => {
    const queryParams = {
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: `id = :id`,
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':id': value,
      },
      ProjectionExpression: 'id, #name, email, enabled, createdAt, updatedAt',
    };

    return await DynamoDBClient.query(queryParams).promise();
  },
  putItem: async (tableName, item) => {
    const putParams = {
      TableName: tableName,
      Item: item,
      ConditionExpression: 'attribute_not_exists(pk)',
    };

    return await DynamoDBClient.put(putParams).promise();
  },
};
