const Deal = require('../models/deals')
const mongoose = require('mongoose')

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id)
}

async function findDealById(id) {
    // return await Deal.findById(id).populate('comment_id').exec()
    return await Deal.findById(id)
        .populate({
            path: 'comment_id',
            populate: {
                path: 'user_id',
                model: 'User',
            },
        })
        .exec()
}

async function handleOperation(req, res, operation) {
    try {
        const id = req.params.id
        if (!isValidObjectId(id)) {
            return res.status(400).send('Invalid ID')
        }

        const deal = await operation(id)

        if (!deal) {
            return res.status(404).send('Deal not found')
        }

        res.json(deal);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

async function getAllDeals(req, res) {
    const deals = await Deal.find()
    res.json(deals)
}

async function deleteDeal(req, res) {
    await handleOperation(req, res, async (id) => {
        return await Deal.findByIdAndDelete(id)
    });
}

async function updateDeal(req, res) {
    await handleOperation(req, res, async (id) => {
        return await Deal.findByIdAndUpdate(id, req.body, { new: true })
    });
}

async function getOneDeal(req, res) {
    await handleOperation(req, res, async (id) => {
        return await findDealById(id)
    });
}

async function createDeal(req, res) {
    try {
        const deal = await new Deal(req.body);
        await deal.save();
        res.status(201).json(deal);
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

async function addToCommentsList(req, res) {
    await handleOperation(req, res, async (id) => {
        let comments = (await User.findById(id)).comment_id
        comments.push(req.body.comment_id)
        return await Deal.findByIdAndUpdate(id, {comment_id: comments}, { new: true })
    })
}


module.exports = {
    getAllDeals,
    getOneDeal,
    deleteDeal,
    updateDeal,
    createDeal,
    addToCommentsList
}
