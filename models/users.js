const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const usersSchema = new Schema(
    {
        user_name: {type: String, required: true},
        deal_id: [{type: Schema.Types.ObjectId, ref: 'Deal'}]       
        
    },
    {timestamps: true}
)

module.exports = mongoose.model('User', usersSchema)