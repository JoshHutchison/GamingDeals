const Comment = require('../models/comments')

const getAllComments = async (req,res) => {
    try {
        const comments = await Comment.find()
        return res.json(comments)
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

const getOneComment = async (req,res) => {
    try {
        const id = req.params.id
        const comment = await Comment.findById(id)
        if (comment) {
            return res.json(comment)
        }
        return res.status(404).send('Comment with specified ID does not exist')
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

module.exports = {
    getAllComments,
    getOneComment
}