var config = {
    dbname: 'test',
    uname: 'test',
    upwd: 'test',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 20,
        min: 0,
        idle: 10000
    }
};

module.exports = config;
