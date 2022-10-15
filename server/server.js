const express = require('express');

// consolu renklendirir
const colors = require('colors');

// env dosyasına ulaşmamızı sağlıyor
const dotenv = require ('dotenv').config();

const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;


const app = express();
app.use(express.json({extended : false}));

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connectted: ${conn.connection.host}`);
    } catch (error) {
        console.log(`ERROR : ${error.message}`.red.bold);
        process.exit(1);
    }
    
}

connectDB();


app.listen(PORT, ()=> console.info(`Server is running on port ${PORT}`.green));
