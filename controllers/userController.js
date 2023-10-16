const User = require('../models/user')

const getAllUsers = async (req,res) => {
    try {
        const users = await User.find()
        return res.json(users)
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

const getOneUser = async (req,res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if (user) {
            return res.json(user)
        }
        return res.status(404).send('User with specified ID does not exist')
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

module.exports = {
    getAllUsers,
    getOneUser
}