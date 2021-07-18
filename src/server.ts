import app from './app';
import * as https from 'https';
import * as fs  from 'fs';

const privateKey = fs.readFileSync( 'pems/key.pem' );
const certificate = fs.readFileSync( 'pems/cert.pem' );

const PORT = process.env.PORT || 3000;

https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})