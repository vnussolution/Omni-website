const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();


app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} : ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err)
            console.log(' ERROR MESSAGE: ', err);
    });
    next();
});

app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(port, () => {
    console.log(`server is up on port: ${port}`);
});