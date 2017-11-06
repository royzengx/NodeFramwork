const todolist = require('../dao/todolist.js');

module.exports = {
    async getTodolist(ctx) {
        const id = ctx.body.id; // 获取url里传过来的参数里的id
        const result = await todolist.getTodolistById(id); // 通过yield “同步”地返回查询结果
        this.body = result // 将请求的结果放到response的body里返回
    },

    async createTodolist(ctx) {
        const data = ctx.body;
        const result = await todolist.createTodolist(data);

        this.body = {
            success: true
        }
    },

    async removeTodolist (ctx) {
        const id = ctx.params.id;
        const user_id = ctx.params.userId;
        const result = await todolist.removeTodolist(id, user_id);

        this.body = {
            success: true
        }
    },

    async updateTodolist (ctx) {
        const id = ctx.params.id;
        const user_id = ctx.params.userId;
        let status = ctx.params.status;
        status == '0' ? status = true : status = false; // 状态反转（更新）

        const result = await todolist.updateTodolist(id, user_id, status);

        this.body = {
            success: true
        }
    }
}
