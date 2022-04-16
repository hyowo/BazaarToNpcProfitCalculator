var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/images'));

app.use(express.static('public'));

app.use(require('./routes/routes'));

// host the app on port 7799 or parameter passed in
var port = process.env.PORT || 7799;
app.listen(port, function () {
    console.log('Bazaar-Npc-Calculator listening on port ' + port);
});