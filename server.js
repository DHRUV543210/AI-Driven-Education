//Express Application

const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');

// const mime=require('mime');

const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const port= 3000;
const hostname = '127.0.0.1';

//Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname,'public')));

//Connect to MongoDB via Mongoose
mongoose.connect(`mongodb://${hostname}:27017/ContactUs`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var db = mongoose.connection;

//Defining a Mongoose Schema
var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

//Creating a Mongoose Model
var Contact = mongoose.model('Contact', contactSchema, 'Info');

//MiddleWare to parse the body
app.use(bodyParser.urlencoded({extended: true}));

//Serving HTML Files
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

//Handling incoming Post request for Form Data
app.post('/submit', (req, res)=>{
    
    //Creating a new instance of mongoose model 'Contact'...
    const newItem = new Contact({
        name : req.body.name,
        email : req.body.email,
        message : req.body.message,
    });

//Saving Data into the collection

newItem.save()
    .then(() => {
        console.log('Data saved successfully to the database...');
    })
    .catch((err) => {
        console.error('Error while saving data into the collection...', err);
    });

});

//Adding Event Listeners
db.on('error', (err)=>{
    console.error('MongoDB Connection Error... ',err);
});

db.on('open', ()=>{
    console.log('MongoDB Connection Sucessful...');
});


// // Middleware to handle MIME types for CSS and JavaScript files
// app.use('/public', (req, res, next) => {
//     const mimeType = mime.getType(req.path);
//     res.setHeader('Content-Type', mimeType);
//     next();
// });

app.listen(port, hostname, ()=>{
    console.log(`Server is running on http://${hostname}:${port}`);
});