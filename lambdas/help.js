// --------------- Main handler -----------------------

// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    try {
        // By default, treat the user request as coming from the America/New_York time zone.
        process.env.TZ = 'America/New_York';
        console.log(`event.bot.name=${event.bot.name}`);


        if (event.bot.name !== 'awsBot') {
            console.log('checking the bot name.');
            callback('Invalid Bot Name');
        }

        dispatch(event, (response) => callback(null, response));
    } catch (err) {
        callback(err);
    }
};

function dispatch(intentRequest, callback) {
    const intentName = intentRequest.currentIntent.name

    if (intentName === 'Help') {
        callback(help(intentRequest));
    }
}


function help(intent_request) {
    console.log(intent_request);
    console.log('reached greeting');

    return {
        'sessionAttributes': intent_request['sessionAttributes'],
        'dialogAction': {
            'type': 'Close',
            'fulfillmentState': 'Fulfilled',
            'message': {
                'contentType': 'PlainText',
                'content': 'I am here to answer any and all questions about AWS. If you need to know where to start you can say, help me get started.'
            },

        }
    };

}
