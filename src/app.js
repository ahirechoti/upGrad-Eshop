//import express from 'express';
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const httpStatus = require('http-status-codes');
//load .env configuration
dotenv.config();

const PORT = process.env.PORT || 3030;

const app = express();
app.use(cors());
app.use(express.json());

//mongoose db connection.
//console.log(process.env);
if (process.env.MONGODBLINK) {
    mongoose.connect(process.env.MONGODBLINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'UPGRAD',
    });
    const db = mongoose.connection;
    db.once('open', () => {
        console.log('DB connected');
    })
    db.on('error', (e) => {
        console.error('Error while connecting to database', e);
        process.exit();
    })
} else {
    console.error("DB link error");
    process.exit();
}
/**
 * define and call all the API(s)
 */
const { signInAPI, signUpAPI } = require('./routes/auth.route');
signUpAPI(app);
signInAPI(app);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})
app.get('/signUp', (req, res) => {
    res.sendFile(__dirname + '/views/signUp.html');
})
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/views/404.html')
})

app.listen(PORT, () => {
    console.log(`Upgrad-eShop running at http://localhost:${PORT}/`);
})

//module.exports = app;