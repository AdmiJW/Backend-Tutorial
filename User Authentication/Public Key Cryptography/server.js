const crypto = require('crypto');

// This modules is from server's perspective.
// Server has both public key and private key, but will mainly use private key

// Remember that return value is of type Buffer. Use toString to get string representation
function decryptWithPrivateKey(privateKey, encryptedMessage) {
    return crypto.privateDecrypt(privateKey, encryptedMessage);
}

function encryptWithPrivateKey(privateKey, message) {
    const buffer = Buffer.from(message, 'utf8');
    return crypto.privateEncrypt(privateKey, buffer);
}


// Signs the data with SHA-256 algorithm.
function signData(privateKey, data) {
    const hash = crypto.createHash('sha256');
    const dataString = JSON.stringify(data);
    hash.update(dataString);
    //  Data hashed into Hexadecimals. Thus a Buffer will be returned
    const hashedData = hash.digest('hex');
    const signedEncryptedData = crypto.privateEncrypt(privateKey, Buffer.from(hashedData, 'utf8') );

    return {
        algorithm: 'sha256',
        originalData: data,             //JSON
        signedEncryptedData             //Buffer
    };
}


module.exports = {
    decryptWithPrivateKey,
    encryptWithPrivateKey,
    signData
};