const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/tasks';
console.log(DB_URL);

mongoose.connect(DB_URL)
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('Error in MongoDB Connection ', err);
    })