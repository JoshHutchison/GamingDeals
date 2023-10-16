const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const dealsSchema = new Schema(
    {
        worth: {type: String, required: true},
        thumbnail: {type: String, required: true},
        image: {type: String, required: true},
        description: {type: String, required: true},
        instructions: {type: String, required: true},
        giveaway_url: {type: String, required: true},
        published_date: {type: String, required: true},
        type: {type: String, required: true},
        platforms: {type: String, required: true},
        end_date: {type: String, required: true},
        users: {type: Number, required: true},
        status: {type: String, required: true},
        site_url: {type: String, required: true},
        title: {type: String, required: true},
        comment_id: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
        
    },
    {timestamps: true}
)

module.exports = mongoose.model('Deal', dealsSchema)