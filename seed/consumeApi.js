const db = require('../db')
const Deal = require('../models/deals')
const User = require('../models/users')
const Comment = require('../models/comments')
const axios = require('axios')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const base = 'http://localhost:3001/'
const gamerpowerBase = 'https://www.gamerpower.com/api/giveaways'

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(fn, ...args) {
    await timeout(3000);
    return fn(...args);
}

const main = async () => {
    let gamerPower = (await axios.get(`${gamerpowerBase}`)).data
    // console.log(gamerPower)
    
    for (let i = 0; i < gamerPower.length; i++) {
        gamerPower[i].open_giveaway_url = await getRedirection(gamerPower[i].open_giveaway_url)
        await timeout(5000)
    }
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
    // console.log(gamerPowerFormatted)
    await Deal.insertMany(gamerPowerFormatted)
    console.log('data imported')
}

const run = async () => {
    await main()
    db.close()

}

run()

async function getRedirection(url) {
    try {
        console.log('Trying: ', url)
        const response = await fetch(url, { method: 'GET' });
        
        if (response.status === 200) {
            console.log('Request URL:', response.url);
            return response.url;
        } else {
            console.log('Not a 200 response: ', response.status);
            return url;
        }
    } catch (error) {
        console.error('Error:', error);
        return url
    }
    // db.close()
}
        // const response = await axios.get(gamerPower[0].open_giveaway_url)

        // if (response.status === 301 || response.status === 302) {
        //     const redirectedUrl = response.headers.location || response.headers.Location;
        //     console.log(redirectedUrl);
        // } else {
        //     console.log('The initial API request did not redirect.');
        // }
    
        // db.close(); // Assuming this is correct for your use case
 


// getRedirection('https://www.gamerpower.com/open/q-u-b-e-ultimate-bundle-epic-games-giveaway')

