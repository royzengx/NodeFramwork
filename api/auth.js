const auth = require('../service/user.js');
const router = require('koa-router')();

const userRouters =
router.get('/user/:id', auth.getUserInfo)
.post('/login', auth.postUserAuth)
.get('/index', auth.loadIndex)

module.exports = userRouters;
