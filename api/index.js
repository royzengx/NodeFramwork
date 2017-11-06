const router = require('koa-router')()

const auth = require('./auth')
const api = require('./api')
const page = require('./pageApi')

router.use('/api', api.routes(), api.allowedMethods())
router.use('/auth', auth.routes(), auth.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

module.exports = router
