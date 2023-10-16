const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const commentsSchema = new Schema(
    {
        deal_id: {type: Schema.Types.ObjectId, ref: 'Deal'},
        comment_text: {type: String, required: true},
        comment_rating: {type: String, required: true},
        user_id: {type: Schema.Types.ObjectId, ref: 'User'}
    },
    {timestamps: true}
)

module.exports = mongoose.model('Comment', commentsSchema)