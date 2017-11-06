const user = require('../dao/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    async getUserInfo1() {
        return "hhh"
    },

    async getUserInfo(ctx) {
        const id = ctx.params.id; // 获取url里传过来的参数里的id
        const result = await user.getUserById(id); // 通过yield “同步”地返回查询结果
        console.log(result);
        ctx.body = result // 将请求的结果放到response的body里返回
    },

    async postUserAuth(ctx) {
        console.log(ctx.request.body);
        const data = ctx.request.body; // post过来的数据存在request.body里
        const userInfo = await user.getUserByName(data.name);
        console.log(userInfo)
        if (userInfo != null) { // 如果查无此用户会返回null
            if (!bcrypt.compareSync(data.password, userInfo.password)) {
                ctx.body = {
                    success: false, // success标志位是方便前端判断返回是正确与否
                    info: '密码错误！'
                }
            } else {
                const userToken = {
                    name: userInfo.user_name,
                    id: userInfo.id
                }
                const secret = 'shared-secret'; // 指定密钥
                const token = jwt.sign(userToken, secret, {
                    expiresIn: 60 * 60 * 2 // 2小时过期
                }); // 签发token
                ctx.body = {
                    success: true,
                    token: token, // 返回token
                }
            }
        } else {
            ctx.body = {
                success: false,
                info: '用户不存在！' // 如果用户不存在返回用户不存在
            }
        }
    }
}

// module.exports = {
//     getUserInfo,
//     postUserAuth
// }
