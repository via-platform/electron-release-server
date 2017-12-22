/**
 * authToken
 *
 * @module      :: Policy
 * @description :: Ensure that the user is authenticated with an authToken
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  var token;

  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.forbidden('Wrong authorization format.');
    }
  } else {
    return res.forbidden('No authorization header found.');
  }

  AuthToken.verifyToken(token, function(err, user) {
    if (err) return res.forbidden('Invalid Token.');
    if (!user.admin) return res.forbidden('You are not an authorized administrator.');
    req.token = user;
    req.user = user;
    next();
  });
};
