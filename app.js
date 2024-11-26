console.log('SSL testing 1,2,3');

const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');

const port = 443;

const app = express();

app.use('/', (req, res) => {
  res.send('Hello World');
});

// const httpsOptions = {
//   key: fs.readFileSync(path.join(__dirname, 'server.key')),// private key
//   cert: fs.readFileSync(path.join(__dirname, 'server.crt'))// certificate
// };

// https.createServer(httpsOptions, app).listen(3000);

const httpsServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

httpsServer.listen(443, () => {
    console.log(`Listening on port ${port}`);
});