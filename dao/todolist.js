const db = require('../config/db.js');
const database = db.mgplateform; // 引入数据库
const Todolist = database.import('../model/list.js');
const Op = database.Op;

const getTodolistById = async(id) => {
    const todolist = await Todolist.findAll({ // 查找全部的todolist
        where: {
            user_id: {
                [Op.eq]: id
            }
        },
        attributes: ['id', 'content', 'status'] // 只需返回这三个字段的结果即可
    });

    return todolist // 返回数据
}

const createTodolist = async(data) => {
    await Todolist.create({
        user_id: data.id,
        content: data.content,
        status: data.status
    })
    return true
}

const removeTodolist = async(id, user_id) => {
    await Todolist.destroy({
        where: {
            id,
            user_id
        }
    })
    return true
}

const updateTodolist = async(id, user_id, status) => {
    await Todolist.update({
        status
    }, {
        where: {
            id,
            user_id
        }
    })
    return true
}

module.exports = {
    getTodolistById,
    createTodolist,
    removeTodolist,
    updateTodolist
}
