const fs = require('fs');
const generateKeyPair = require('./generateKeyPair');
const Server = require('./server.js');
const Client = require('./client.js');

// Generates a public private key pair
generateKeyPair();

// Loads in the public & private key
const publicKey = fs.readFileSync('./public_key.pem');
const privateKey = fs.readFileSync('./private_key.pem');

//======================
// Encryption Example
//======================
const msg = 'This should be encrypted';

const encrypted = Client.encryptWithPublicKey(publicKey, msg);
console.log("\nEncrypted: ");
console.log(encrypted.toString() );

const decrypted = Server.decryptWithPrivateKey(privateKey, encrypted);
console.log("\nDecrypted:");
console.log(decrypted.toString() );



console.log("\n\n\n\n");
//======================
// Signing Example
//======================
const dataToSign = {
    username: "AdmiJW",
    credentials: "YOU SHALL NEVER INCLUDE CREDENTIALS. EVERYONE WITH PUBLIC KEY CAN DECRYPT"
};

const dataPackage = Server.signData(privateKey, dataToSign);
Client.verifySignedData(publicKey, dataPackage);