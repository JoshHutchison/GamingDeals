const db = require('../db')
const Deal = require('../models/deals')
const User = require('../models/users')
const Comment = require('../models/comments')


db.on('error', console.error.bind(console, 'MongoDB connection error:'))

let allDeals = []
let allUsers = []



const addUsers = async () => {
    
    const users = [      
    ]
    for (let i = 1; i <= 20; i++) {
        users.push({user_name: `User${i}`})
    }
    console.log(users)
    await User.insertMany(users)
    console.log('Users created')
}

const addDealsToWishList = async () => {
    allDeals = await getDeals()
    allUsers = await getUsers()
    
    for (let i = 0; i < allUsers.length; i++) {
        await User.findByIdAndUpdate(allUsers[i]._id, {deal_id: [getRandomDeal()._id, getRandomDeal()._id, getRandomDeal()._id]})
    }
    
    // allUsers.forEach(async (user) => {
    //     console.log(user)
    //     console.log(user._id, {deal_id: [getRandomDeal()._id, getRandomDeal()._id, getRandomDeal()._id]})
    //     await User.findByIdAndUpdate(user._id, {deal_id: [getRandomDeal()._id, getRandomDeal()._id, getRandomDeal()._id]})
    // })
    // await User.findByIdAndUpdate()
    db.close()
}

async function getDeals() {
    return (await Deal.find())
}

async function getUsers() {
    return (await User.find())
}

function getRandomDeal() {    
    // console.log(allDeals[getRandomInt(allDeals.length)])
    return allDeals[getRandomInt(allDeals.length)]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) 
}

const run = async () => {
    await addUsers()
    try {
        await addDealsToWishList()
    } catch (error) {
        
        console.log('error caught')
        console.error('Error: ', error)
    }
    

    db.close()

}

run()

