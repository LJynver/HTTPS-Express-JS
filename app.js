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
    key: fs.readFileSync(path.join(__dirname, 'cert-2', 'localhost-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert-2', 'localhost.pem')) 
}

const server = https.createServer(httpsOptions, app);

server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
  console.log(httpsOptions.cert)
});