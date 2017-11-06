const Koa = require('koa');
const koaRouter = require('koa-router')();
const json = require('koa-json');
const logger = require('koa-logger');
const jwt = require('koa-jwt');
const log4js = require('koa-log4')

// log4j import.
require('./util/log4j')
const log4j = log4js.getLogger('mgtest')
log4j.info('--------step into koa-------------')


const app = new Koa();
// Custom 401 handling (first middleware)
app.use(function (ctx, next) {
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
    console.log('server error', err);
});

// Middleware below this line is only reached if JWT token is valid
// unless the URL starts with '/auth'
app.use(jwt({
    secret: 'shared-secret'
}).unless({
    path: [/^\/auth\/login/]
}));

app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }))

const indexRouters = require('./api/index')
app.use(indexRouters.routes()).use(indexRouters.allowedMethods());

app.listen(8080, () => {
    console.log('Server is listening in 8080');
});
