const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Function to generate a pair of public and private key.
// We'll use the built in modules 'crypto' to generate key pairs, and
// 'fs' to save the keys
function generateKeyPair() {
    // Generates an object with properties 'privateKey' and 'publicKey'
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,        // The number of bits in our key
        publicKeyEncoding: {
            type: 'pkcs1',      // Public key Cryptography Standards 1
            format: 'pem',      // Saved as .pem file. Common format
        },
        privateKeyEncoding: {
            type: 'pkcs1',      // Public key Cryptography Standards 1
            format: 'pem'       
        }
    });

    // Create the public key file
    fs.writeFileSync( path.join(__dirname, 'public_key.pem'), keyPair.publicKey);
    // Create the private key file
    fs.writeFileSync( path.join(__dirname, 'private_key.pem'), keyPair.privateKey);

    console.log("Key Pair Generated");
}

module.exports = generateKeyPair;