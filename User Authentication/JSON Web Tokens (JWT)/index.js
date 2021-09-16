const fs = require('fs');
const base64url = require('base64url');
const crypto = require('crypto');


// Read in the public and private key
const publicKey = fs.readFileSync('./public_key.pem');
const privateKey = fs.readFileSync('./private_key.pem');

//================================
// ISSUE-ING
//================================

// The contents that will be in our JWT
const header = {
    alg: 'RS256',
    typ: 'JWT'
};
const payload = {
    sub: '123454321',
    name: 'AdmiJW',
    credentials: 'DO NOT INCLUDE CREDENTIALS IN JWT!',
    iat: Date.now()
};


// Stringify our objects.
const headerStr = JSON.stringify(header);
const payloadStr = JSON.stringify(payload);
// Convert them into Base64url encoding
const headerBase64 = base64url(headerStr);
const payloadBase64 = base64url(payloadStr);


// Next up is to create signature part. Use crypto's built in function
const signatureFunction = crypto.createSign('RSA-SHA256');
signatureFunction.write(headerBase64 + '.' + payloadBase64);
signatureFunction.end();
// Sign using the private key, and further encode into base64url
let signature = signatureFunction.sign(privateKey, 'base64');
signature = base64url.fromBase64(signature);


// Finally, concatenate to finish our JWT!
const JWT = headerBase64 + '.' + payloadBase64 + '.' + signature;



//================================
// VERIFICATION
//================================
const [headerPart, payloadPart, signaturePart] = JWT.split('.');
const signaturePartInBase64 = base64url.toBase64(signaturePart);


// To verify, use crypto's built in function
const verifyFunction = crypto.createVerify('RSA-SHA256');
verifyFunction.write( headerPart + '.' + payloadPart );
verifyFunction.end();

// Verification
const isSignatureValid = verifyFunction.verify( publicKey, signaturePartInBase64, 'base64');
console.log(isSignatureValid);