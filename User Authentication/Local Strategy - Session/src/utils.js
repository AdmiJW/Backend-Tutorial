// Aids with password checking and hashing process
const bcrypt = require('bcrypt');
require('dotenv').config();

function comparePassword( plainTextPassword, hashedPassword ) {
    return bcrypt.compareSync( plainTextPassword, hashedPassword );
}

// Uses process.env.SALT_ROUNDS from .env file
function generateHashFromPassword( plainTextPassword ) {
    const salt = bcrypt.genSaltSync( Number.parseInt(process.env.SALT_ROUNDS));
    return bcrypt.hashSync( plainTextPassword, salt );
}

module.exports = {
    comparePassword,
    generateHashFromPassword
};