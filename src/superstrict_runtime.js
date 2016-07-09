var checkCasting = require('./check_casting')
var safeGet = require('./safe_get')
var o = {...checkCasting, ...safeGet}
module.exports = {...checkCasting, ...safeGet}
