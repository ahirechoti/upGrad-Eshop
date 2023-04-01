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
if(process.env.MONGODBLINK){
    mongoose.connect(process.env.MONGODBLINK);
    const db = mongoose.connection;
    db.once('open', ()=>{
        console.log('DB connected');
    })
    db.on('error', (e)=>{
        console.error('Error while connecting to database', e);
        process.exit();
    })
}else{
    console.error("DB link error");
    process.exit();
}

app.get('/', (req, res)=>{
    res.status(httpStatus.StatusCodes.OK).json({welcome:"Hello world!"});
})


app.listen(PORT, ()=>{
    console.log(`Application listening at http://localhost:${PORT}/`);
})

//module.exports = app;