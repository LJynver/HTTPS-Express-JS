console.log('SSL testing 1,2,3');

const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const os = require('os');

const port = 443;

const app = express();

app.use(express.static('public'));

app.use('/', (req, res) => {
  res.send('Hello World');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const getLocalIP = () => {
    const networkInterfaces = os.networkInterfaces();

    // let ipAddress = `https://${getLocalIP()}:${port}`;
    // console.log(networkInterfaces);
    
    let ipAddress = `127.0.0.1`; //in case the address can not be fetched

    for (const interface of Object.values(networkInterfaces)) {
        for (const interfaceDetails of interface) {
            if (interfaceDetails.family === 'IPv4' && !interfaceDetails.internal) {
                ipAddress = interfaceDetails.address;
                break;
            }
        }
    }

    console.log(ipAddress);

    return ipAddress;
};

const ipAddress = getLocalIP();

const httpsServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)


httpsServer.listen(443, '0.0.0.0', () => {
    console.log(`Listening on port ${ipAddress}:${port}`);
});