var config = {
    dbname: 'test',
    uname: 'cdb_outerroot',
    upwd: 'UF5m2DpcodigakdS',
    host: '591eee9a777d7.sh.cdb.myqcloud.com',
    port: 12128,
    dialect: 'mysql',
    pool: {
        max: 20,
        min: 0,
        idle: 10000
    }
};

module.exports = config;

//sequelize-auto -o "./model" -d test -h '591eee9a777d7.sh.cdb.myqcloud.com' -u cdb_outerroot -p 12128 -x UF5m2DpcodigakdS -e mysql
