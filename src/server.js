// src/server.js
const app = require('./app');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
  console.log(`Server çalışıyor → http://${HOST}:${PORT}`);
});
