const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const pub = fs.readFileSync(path.join(__dirname, '../../keys/identity.pub'));
const options = {
    algorithm: 'RS256',
    issuer: 'identity.via.world'
};

module.exports.verifyToken = function(token, callback) {
  return jwt.verify(token, pub, options, callback);
};
