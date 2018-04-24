'use strict';
const https = require('https');
console.log('Loading function');
exports.handler = (event, context, callback) => {
    var body = "";
    var url = getUrl(event);
    console.log(url);
    console.log('start request to ' + url)
    https.get(url, function(response) {
        console.log("Got response: " + response.statusCode);
        console.log('end request to ' + url)
        response.on('data', (chunk) => {
            body += chunk;
        });
        response.on('end', () => {
            const result = {
                body: body
            };
            callback(null, result);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
        callback(null, new Error("Failed"));
    });

function getUrl (event){
        var baseCurrency = "USD";
        var desiredCurrency = "BTC";
        if (typeof event.baseCurrency !== 'undefined')
            baseCurrency = event.baseCurrency;
        if (typeof event.desiredCurrency === 'undefined')
            desiredCurrency ="BTC"; //return "NO desiredCurrency found!"; removing temp to get good output
        else
            desiredCurrency = event.desiredCurrency;
        var url = "https://min-api.cryptocompare.com/data/price?fsym="+desiredCurrency+"&tsyms="+baseCurrency;
        return url;
}

};

