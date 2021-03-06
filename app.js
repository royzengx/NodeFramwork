const Koa = require('koa');
const koaRouter = require('koa-router')();
const json = require('koa-json');
const logger = require('koa-logger');
const jwt = require('koa-jwt');
const views = require('koa-views')
const path = require('path')

// import log4j setting.
const log4js = require('koa-log4')
require('./util/log4j')
const log4j = log4js.getLogger('mgcasher')
log4j.info('--------step into koa-------------')

// Oh hooo~~ init daddy object.ß
const app = new Koa();
// Custom 401 handling (first middleware)
app.use(function (ctx, next) {
    let url = ctx.url
    if (url !== '/auth/login') {
        // check logic here.
        log4j.info('running:' + url)
        if (ctx.querystring.indexOf('devmode') > -1) {
            log4j.debug(ctx)
        }
    }
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                code: '100401',
                error: err.originalError ? err.originalError.message : err.message
            };
        } else {
            throw err;
        }
    });
});

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.on('error', function (err, ctx) {
    log4j.error('server error', err);
});

// Load ejs template engine.
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))

// Middleware below this line is only reached if JWT token is valid
// unless the URL starts with '/auth'
app.use(jwt({
    secret: 'shared-secret'
}).unless({
    path: [/^\/auth\/login/, /^\/page\/index/]
}));

app.use(log4js.koaLogger(log4js.getLogger('http'), {
    level: 'auto'
}))

const indexRouters = require('./api/index')
app.use(indexRouters.routes()).use(indexRouters.allowedMethods());


app.listen(8080, () => {
    log4j.debug('Server is listening in 8080');
});
