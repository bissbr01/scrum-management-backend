const { expressjwt: jwt } = require('express-jwt')
const { AUDIENCE, ISSUER, SECRET } = require('./config')

const jwtVerify = jwt({
  secret: SECRET,
  algorithms: ['HS256'],
  // audience: AUDIENCE,
  // issuer: ISSUER,
}).unless({ path: ['/api/login'] })

module.exports = jwtVerify
