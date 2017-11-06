const db = require('../config/db.js');
const database = db.mgplateform;
const User = database.import('../model/user.js');
const Op = database.Op;

const getUserById = async(id) => {
    const userInfo = await User.findOne({
        where: {
            id: {
                [Op.eq]: id
            }
        }
    });

    return userInfo
}

const getUserByName = async(name) => {
    const userInfo = await User.findOne({
        where: {
            user_name: {
                [Op.eq]: name
            }
        }
    });

    return userInfo
}

module.exports = {
    getUserById,
    getUserByName
}
