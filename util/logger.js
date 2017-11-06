/**
 * Logger common
 * @author Roy Zeng
 * @Date 2017-11-06 08:08:32
 * @param {*} ctx
 */
function log( ctx ) {
    console.log( ctx.method, ctx.header.host + ctx.url )
    // if need, record into database here.
}

module.exports = function () {
  return async function ( ctx, next ) {
    log(ctx);
    await next()
  }
}
