
// In index.js, we showed how JWT works at lower level. Actually, we can simply install a node module 'jsonwebtoken'
// and have it handle all the stuff for us.
const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('./private_key.pem');
const publicKey = fs.readFileSync('./public_key.pem');

const payload = {
    sub: '123454321',
    name: 'AdmiJW',
    credentials: 'DO NOT INCLUDE CREDENTIALS IN JWT!',
    iat: Date.now()
};



const signedJWT = jwt.sign(payload, privateKey, { algorithm: "RS256"});

jwt.verify( signedJWT, publicKey, { algorithms: ['RS256']}, (err, payload)=> {
    if (err) console.log(err);
    else console.log(payload);
});