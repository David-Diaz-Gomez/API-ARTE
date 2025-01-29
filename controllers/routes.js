const express = require('express');
const app = express();


app.use( '/usuario', require('./user') );
app.use( '/rol', require('./rol') );

module.exports = app;