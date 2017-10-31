// --------------- Main handler -----------------------

exports.handler = (event, context, callback) => {
    try {

        process.env.TZ = 'America/New_York';
        console.log(`event.bot.name=${event.bot.name}`);


        if (event.bot.name !== 'BankBot') {
            console.log('checking the bot name.');
            callback('Invalid Bot Name');
        }

        dispatch(event, (response) => callback(null, response));
    } catch (err) {
        callback(err);
    }
};


function dispatch(intentRequest, callback) {
    console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);

    const intentName = intentRequest.currentIntent.name;

    if (intentName === 'Help') {
        callback(help(intentRequest));
    } else {
        throw new Error('Intent not supported');
    }
}


function help(intent_request) {
    return {
        'SessionAttributes': intent_request['SessionAttributes'],
        'dialogAction': {
            'type': 'Close',
            'fulfillmentState': 'Fulfilled',
            'message': {
                'contentType': 'PlainText',
                'content': 'how can i help?'
            },
        }
    }
}