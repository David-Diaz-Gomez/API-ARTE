const express = require('express');
const app = express();


app.use( '/usuario', require('./user') );
app.use( '/rol', require('./rol') );

app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(middleware.route.path);
    }
});

module.exports = app;