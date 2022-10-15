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
        const conn = await mongoose.connect(
         `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster-hs.vrot0gz.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
        )
        console.log(`MongoDB Connected: ${conn.connection.host}`.green.bold);
    } catch (error) {
        console.log(`ERROR : ${error.message}`.red.bold);
        process.exit(1);
    }    
}

connectDB();

// oluşturduğumuz rotaları server'ımıza bağlıyoruz.
// server'a bu uç dan bir istek geldiğinde useRoutes da oluşturduğumuz rotalara gidecek

// app.use("/api/users", require("./routes/userRoutes"));


app.listen(PORT, ()=> console.info(`Server is running on port ${PORT}`.green));


