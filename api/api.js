const api = require('../service/todolist.js');
const router = require('koa-router')();

const apiRouters =
router.get('/todolist/:id', api.getTodolist)
.post('/todolist', api.createTodolist)
.delete('/todolist/:userId/:id', api.removeTodolist)
.put('/todolist/:userId/:id/:status', api.updateTodolist)

module.exports = apiRouters;

