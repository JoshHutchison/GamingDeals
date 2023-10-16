const Comment = require('../models/comments')
const mongoose = require('mongoose')
const User = require('../models/users')
const Deal = require('../models/deals')

function isValidCommentId(id) {
    return mongoose.Types.ObjectId.isValid(id)
}

async function findCommentById(id) {
    return await Comment.findById(id)
}

async function handleOperation(req, res, operation) {
    try {
        const id = req.params.id
        if (!isValidCommentId(id)) {
            return res.status(400).send('Invalid Comment ID')
        }

        const comment = await operation(id)

        if (!comment) {
            return res.status(404).send('Comment not found')
        }

        res.json(comment)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

async function getAllComments(req, res) {
    const comments = await Comment.find()
    res.json(comments)
}

async function deleteComment(req, res) {
    await handleOperation(req, res, async (id) => {
        return await Comment.findByIdAndDelete(id)
    })
}

async function updateComment(req, res) {
    await handleOperation(req, res, async (id) => {
        return await Comment.findByIdAndUpdate(id, req.body, { new: true })
    })
}

async function getOneComment(req, res) {
    await handleOperation(req, res, async (id) => {
        return await findCommentById(id)
    })
}

async function createComment(req, res) {
    try {
        const comment = await new Comment(req.body)
        await comment.save()
        // console.log(req.body.deal_id)
        let comments = (await Deal.findById(req.body.deal_id)).comment_id
        // console.log(comments)
        comments.push(comment._id)
        await Deal.findByIdAndUpdate(req.body.deal_id, {comment_id: comments}, { new: true })
        res.status(201).json(comment)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

module.exports = {
    getAllComments,
    getOneComment,
    deleteComment,
    updateComment,
    createComment
}
