const express = require('express');
const dotenv = require('dotenv');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 3443;

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello, welcome to the HTTPS website! 🚀');
});

const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')) 
}

const server = https.createServer(httpsOptions, app);

server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});