const crypto = require('crypto');

// This modules is from client's perspective.
// Client only has public key given by the server.


// Pass in public key and message to encrypt, returns encrypted message in type Buffer.
function encryptWithPublicKey(publicKey, message) {
    const buffer = Buffer.from(message, 'utf8');
    return crypto.publicEncrypt(publicKey, buffer);
}

function decryptWithPublicKey(publicKey, encryptedMessage) {
    return crypto.publicDecrypt(publicKey, encryptedMessage);
}

function verifySignedData(publicKey, dataPackage) {
    // Convert original data => Hashed Data like how the server does it
    const hash = crypto.createHash(dataPackage.algorithm);
    const dataString = JSON.stringify(dataPackage.originalData);
    hash.update( dataString );
    const hashedData = hash.digest('hex');

    // Decrypt the signed data back into hashedData. 
    const decryptedData = crypto.publicDecrypt(publicKey, dataPackage.signedEncryptedData);

    // Compare if they are same.
    if (hashedData.toString() === decryptedData.toString() )
        console.log("Signed Data is Verified!");
    else
        console.log("Signed Data does not match!");
}


module.exports = {
    encryptWithPublicKey,
    decryptWithPublicKey,
    verifySignedData
};