let restify = require('restify');
let builder = require('botbuilder');

// Get secrets from server environment
let connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Create bot
let bot = new builder.UniversalBot(connector);
bot.dialog('/', function (session) {

    //respond with user's message
    session.send("You said " + session.message.text);
});

// Setup Restify Server
let server = restify.createServer();

// Handle Bot Framework messages
server.post('/api/messages', connector.listen());

// Serve a static web page
//server.get('/', restify.serveStatic({
//  'directory': __dirname,
//  'default': 'index.html'
//}));

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});