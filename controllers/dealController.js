const Deal = require('../models/deals')

const getAllDeals = async (req,res) => {
    try {
        const deals = await Deal.find()
        return res.json(deals)
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

const getOneDeal = async (req,res) => {
    try {
        const id = req.params.id
        const deal = await Deal.findById(id)
        if (deal) {
            return res.json(deal)
        }
        return res.status(404).send('Deal with specified ID does not exist')
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

module.exports = {
    getAllDeals,
    getOneDeal
}