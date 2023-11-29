let express = require('express');
const consign = require('consign');
let bodyParser = require('body-parser');

let app = express();
app.set('view engine', 'json');

app.use(bodyParser.urlencoded({extended: true}));

consign()
.include('app/routes')
.then('config/dbConnection.js')
.then('app/models')
.then('app/controllers')
.into(app);

module.exports = app;
