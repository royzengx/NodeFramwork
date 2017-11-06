const router = require('koa-router')()

const auth = require('./auth')
const api = require('./api')

router.use('/api', api.routes(), api.allowedMethods())
router.use('/auth', auth.routes(), auth.allowedMethods())


module.exports = router
