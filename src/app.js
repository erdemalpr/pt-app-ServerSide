require('dotenv').config();             // .env içindeki DATABASE_URL, JWT_SECRET, vs.

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');     // Tüm route’ları içe aktar
const app = express();

// --- 1) Global Middleware ---
app.use(express.json());                // JSON body parser

// --- 2) MongoDB Bağlantısı ---
mongoose.connect(process.env.DATABASE_URL, {})
.then(() => console.log(`MongoDB’ye bağlanıldı: ${mongoose.connection.name}`))
.catch(err => console.error('DB bağlantı hatası:', err));


// 3) Tüm route’ları tek yerden mount et
app.use('/api', routes);        

// --- 4) Global Error Handler ---

// Eğer controller veya service içinde throw()’lanan bir hata olursa buraya düşer
app.use((err, res,) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;
