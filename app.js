'use strict';
var express = require('express');
var routes = require('./routes');
var app = express();
var bodyParser = require('body-parser');
var config = require('./config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// use pug for templating
app.set('view engine', 'pug');
app.set('views', './views')

app.get('/', routes.displayServerList);
app.post('/', routes.connectToServer);
app.get('/main', routes.checkRippleConnection, routes.main);
app.get('/query/:commandIndex', routes.checkRippleConnection, routes.query);
app.post('/query/:commandIndex', routes.checkRippleConnection, routes.submitQuery);

app.use('/q', routes.checkRippleConnection);
app.get('/q/account/:address', routes.getAccountInfo);
app.get('/q/server', routes.getServerInfo);
app.get('/q/balancesheet/:address', routes.getBalanceSheet);
app.get('/q/transaction/:id', routes.getTransaction);
app.get('/q/transactions/:address', routes.getTransactions);
app.get('/q/ledger', routes.getLedger);
app.get('/q/trustlines/:address', routes.getTrustlines);
app.get('/q/balances/:address', routes.getBalances);
app.get('/q/orders/:address', routes.getOrders);
app.get('/q/settings/:address', routes.getSettings);

app.get('/manageAccounts', routes.checkRippleConnection, routes.showAccountList);
app.post('/manageAccounts/addExisting', routes.checkRippleConnection, routes.addExistingAccount);
app.post('/manageAccounts/create', routes.checkRippleConnection, routes.createAccount);
app.get('/queryAccount', routes.checkRippleConnection, routes.showQueryAccount);
app.post('/queryAccount', routes.checkRippleConnection, routes.queryAccount);
app.get('/getPaths', routes.checkRippleConnection, routes.showGetPaths);
app.post('/getPaths', routes.checkRippleConnection, routes.getPaths);
app.get('/getOrderbook', routes.checkRippleConnection, routes.showGetOrderbook);
app.post('/getOrderbook', routes.checkRippleConnection, routes.getOrderbook);
app.get('/transaction/payment', routes.checkRippleConnection, routes.showMakePayment);
app.post('/transaction/payment', routes.checkRippleConnection, routes.makePayment);
app.get('/transaction/settings', routes.checkRippleConnection, routes.showChangeSettings);
app.post('/transaction/settings', routes.checkRippleConnection, routes.changeSettings);
app.get('/transaction/trustline', routes.checkRippleConnection, routes.showChangeTrustline);
app.post('/transaction/trustline', routes.checkRippleConnection, routes.changeTrustline);
app.get('/transaction/order', routes.checkRippleConnection, routes.showPlaceOrder);
app.post('/transaction/order', routes.checkRippleConnection, routes.placeOrder);
app.get('/transaction/orderCancel', routes.checkRippleConnection, routes.showCancelOrder);
app.post('/transaction/orderCancel', routes.checkRippleConnection, routes.handleCancelOrderAction);

app.use(routes.handleError);

const port = config.port;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});

process.on('SIGTERM',function() {
    console.log("caught sigterm");
    process.exit();
});
process.on('SIGINT',function() {
    console.log("caught sigint");
    process.exit();
});
process.on('exit',function() {
    console.log("Shutting down.");
    // exit code (release resource)

    console.log("Done");
});
