const db = require('../db')
const Deal = require('../models/deals')
const User = require('../models/users')
const Comment = require('../models/comments')


db.on('error', console.error.bind(console, 'MongoDB connection error:'))


const main = async () => {
    const comments = await Comment.find()
    const deals = await Deal.find()
    for (let i = 0; i < deals.length; i++) {
        let commentArr = []
        for (let j = 0; j < comments.length; j++) {
            // console.log(deals[i]._id, comments[j].deal_id)
            if (deals[i]._id.equals(comments[j].deal_id)) {                
                commentArr.push(comments[j]._id)
            }
        }
        // console.log(deals[i]._id, {comment_id: commentArr})
        await Deal.findByIdAndUpdate(deals[i]._id, {comment_id: commentArr})
        console.log('Comments added to Deals')
    }
}

const run = async () => {    
    
    await main()
    db.close()

}

run()