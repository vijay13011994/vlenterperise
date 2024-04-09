require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const cors = require('cors');
const helmet = require('helmet');
const { INTERNAL_SERVER_ERROR } = require('./app/constants');

app.use(helmet());
app.use(cors());
app.use('/', require('./router'));

app.use(function (req, res, next) {
    res.status(404).json({success: false, msg: 'Not Found!'});
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({success: false, msg: INTERNAL_SERVER_ERROR});
});

app.listen(3000);