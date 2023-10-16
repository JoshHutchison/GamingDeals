const db = require('../db')
const Deal = require('../models/deals')
const User = require('../models/users')
const Comment = require('../models/comments')
const axios = require('axios')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const base = 'http://localhost:3001/'
const gamerpowerBase = 'https://www.gamerpower.com/api/giveaways'


const main = async () => {
    let gamerPower = (await axios.get(`${gamerpowerBase}`)).data
    // console.log(gamerPower)
    const gamerPowerFormatted = gamerPower.map((deal) => ({
        worth: deal.worth,
        thumbnail: deal.thumbnail,
        image: deal.image,
        description: deal.description,
        instructions: deal.instructions,
        giveaway_url: deal.open_giveaway_url,
        published_date: deal.published_date,
        type: deal.type,
        platforms: deal.platforms,
        end_date: deal.end_date,
        users: deal.users,
        status: deal.status,
        site_url: deal.id,
        title: deal.title
        
    }))
    console.log(gamerPowerFormatted)
    await Deal.insertMany(gamerPowerFormatted)
    console.log('data imported')
}

const run = async () => {
    await main()
    db.close()

}

run()