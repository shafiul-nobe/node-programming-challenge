const express = require('express');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/file');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/file', fileRoutes);

app.listen(8080);