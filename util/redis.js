const redis = require('redis')
// import log4j setting.
const log4js = require('koa-log4')
require('../util/log4j')
const log4j = log4js.getLogger('casher_redis')

let RDS_PORT = 6379 //端口号
let RDS_HOST = '127.0.0.1' //服务器IP
let RDS_PWD = '123456'
let RDS_OPTS = {
    auth_pass: RDS_PWD
}

const redisObj = {
    client: null,
    connect: function () {
        this.client = redis.createClient({
            host: RDS_HOST,
            port: RDS_PORT
        });
        this.client.auth(RDS_PWD, function (err, reply) {
            log4j.info(`Redis connectiong is ${reply}`)
        });
        this.client.on('error', function (err) {
            log4j.error('redisCache Error ' + err);
        });
        this.client.on('ready', function () {
            log4j.info('redisCache connection succeed');
        });
    },
    init: function () {
        this.connect(); // 创建连接
        const instance = this.client;

        const get = instance.get;
        const set = instance.set;
        const setex = instance.setex;

        instance.set = function (key, value, callback) {
            if (value !== undefined) {
                set.call(instance, key, JSON.stringify(value), callback);
            }
        };

        instance.get = function (key, callback) {

            get.call(instance, key, (err, val) => {
                if (err) {
                    logger.warn('redis.get: ', key, err);
                }
                callback(null, JSON.parse(val));
            });

        };
        // 可以不用传递expires参数。在config文件里进行配置。
        instance.setex = function (key, value, callback) {
            if (value !== undefined) {
                setex.call(instance, key, config.cache.maxAge, JSON.stringify(value), callback);
            }
        };

        return instance;

    },
};

// 返回的是一个redis.client的实例
module.exports = redisObj.init();

//-------------------------------
// const redis = require('./util/redis')
// redis.set('casher:test:key', "val", (err, res) => {
//     console.log(err)
//     console.log(res)
// });
// redis.get('casher:test:key', (err, val) => {
//     if (val) {
//         console.log(val)
//     } else {
//         console.log(err)
//     }
// });
//-------------------------------
