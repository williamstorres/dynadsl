const AWS = require('aws-sdk')

AWS.config.update({
  region: "us-east-1"
});

var dynamodb = new AWS.DynamoDB();

const dynadsl = function(tableName) {
  this.idName = 'id'

  this.key = (keyValue) => {
    this.idName = Object.keys(keyValue)[0]
    this.idValue = keyValue[0]
    return this
  }

  const createTableOrUpdate = async () => {
    try {
      var params = {
        TableName : tableName,
        KeySchema: [       
            { AttributeName: "year", KeyType: "HASH"},
        ],
        AttributeDefinitions: [       
            { AttributeName: "year", AttributeType: "S" },
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 1, 
            WriteCapacityUnits: 1
        }
      };
      const { TableDescription } = await dynamodb.createTable(params).promise();
      //dynamodb.describeTable(params
      return TableDescription;
    } catch (error) {
      console.log(error)
    }
  }
  
  this.add = async (updatedData) => {
    await createTableOrUpdate()
  }

  return this;
};

module.exports = dynadsl;