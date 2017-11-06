const pager = require('../service/pagehandler.js');
const router = require('koa-router')();

const pageRouters =
    router.get('/index', async function (ctx, next) {
        let title = 'hello koa2, This is the page handler.'
        await ctx.render('index', {
            title
        })
    })
module.exports = pageRouters;
