var aws = require('aws-sdk');
var lambda = new aws.Lambda({
    region: 'us-east-1' //change to your region
});

lambda.invoke({
    FunctionName: 'mainCall',
    Payload: JSON.stringify(event, null, 2), // pass params
    InvocationType: 'Event'
}, function (error, data) {
    if (error) {
        context.done('error', error);
    }
    if (data.Payload) {
        context.succeed(data.Payload)
    }
});