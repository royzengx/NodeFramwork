// const Sequelize = require('sequelize');

// // 使用连接的形式进行连接的话，注意将root: 后面的XXXX改成自己数据库的密码
// const Todolist = new Sequelize('mysql://root:XXXX@localhost/todolist',{
//   define: {
//     timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
//   }
// })

// module.exports = {
//   Todolist // 将Todolist暴露出接口方便Model调用
// }

// 引入模块
const Sequelize = require('sequelize');
// 读取配置
const mysqlConfig = require('../config/configs');

// 根据配置实例化seq
const Op = Sequelize.Op;
// var mgplateform = new Sequelize('database', 'root', 'root', {
//     host: 'localhost', // 数据库地址
//     dialect: 'mysql', // 数据库类型
//     pool: {
//         max: 5, // 连接池最大连接数量
//         min: 0, // 连接池最小连接数量
//         idle: 10000 // 如果一个线程超过10秒钟没有被使用过就释放该线程
//     }
// })
var mgplateform = new Sequelize(mysqlConfig.dbname, mysqlConfig.uname, mysqlConfig.upwd, {
    port: mysqlConfig.port,
    host: mysqlConfig.host,
    dialect: mysqlConfig.dialect,
    pool: mysqlConfig.pool,
    operatorsAliases: Op, // use Sequelize.Op
    define: {
        timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
    }
});
module.exports = {
    // 将database暴露出接口方便Model调用
    mgplateform
}
