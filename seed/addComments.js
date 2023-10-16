const db = require('../db')
const Deal = require('../models/deals')
const User = require('../models/users')
const Comment = require('../models/comments')


db.on('error', console.error.bind(console, 'MongoDB connection error:'))

let allDeals = []
let allUsers = []


const main = async () => {
    
    const gameComments = [
        {
          comment_text: "This game is incredible! The graphics are mind-blowing, and the gameplay is addictive. 10/10!",
          comment_rating: 5,
        },
        {
          comment_text: "I've spent hours exploring the open world in this game. It's so immersive!",
          comment_rating: 4,
        },
        {
          comment_text: "The storyline is captivating, and the character development is top-notch. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "I wish the loading times were shorter, but the game is worth the wait. 4/5",
          comment_rating: 4,
        },
        {
          comment_text: "The multiplayer mode is a blast. I can't stop playing with my friends!",
          comment_rating: 5,
        },
        {
          comment_text: "The art style is unique, and it adds a lot to the game's charm. 4/5",
          comment_rating: 4,
        },
        {
          comment_text: "The microtransactions are a bit annoying, but you can still enjoy the game without them. 3 stars.",
          comment_rating: 3,
        },
        {
          comment_text: "The music in this game is epic. It enhances the overall experience. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "I can't wait for the sequel! This game has me hooked. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "Occasional crashes and bugs can be frustrating, but updates are improving it. 3/5",
          comment_rating: 3,
        },
        {
          comment_text: "This game is a hidden gem! It's not very popular, but it's amazing. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "The level design is outstanding. Each area feels unique and challenging. 4/5",
          comment_rating: 4,
        },
        {
          comment_text: "The in-game community is friendly and helpful. It's a great place to meet other gamers. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "The boss battles are epic, and the sense of accomplishment is so rewarding. 4/5",
          comment_rating: 4,
        },
        {
          comment_text: "The game could use more character customization options. 3 stars.",
          comment_rating: 3,
        },
        {
          comment_text: "I love the Easter eggs and references to classic games. It's a nostalgia trip! 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's optimization is poor on lower-end systems. 2/5",
          comment_rating: 2,
        },
        {
          comment_text: "This game is a must-play for any gaming enthusiast. It's a masterpiece. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "I can't get enough of the game's crafting system. It's so satisfying. 4 stars.",
          comment_rating: 4,
        },
        {
          comment_text: "The game's voice acting is phenomenal. It adds depth to the characters. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's difficulty can be punishing, but that's what makes it great. 4/5",
          comment_rating: 4,
        },
        {
          comment_text: "The game's open-world environment is vast, and there's always something to do. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's DLCs are a bit overpriced, but they do add new content. 3 stars.",
          comment_rating: 3,
        },
        {
          comment_text: "The game's tutorials are confusing for new players. It could be more user-friendly. 2/5",
          comment_rating: 2,
        },
        {
          comment_text: "This game is a true masterpiece. It's a work of art. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "I've lost track of time while playing this game. It's that engaging! 4 stars.",
          comment_rating: 4,
        },
        {
          comment_text: "The game's world-building is exceptional. It feels like a living, breathing universe. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's difficulty curve is well-balanced. It keeps you challenged but not frustrated. 4/5",
          comment_rating: 4,
        },
        {
          comment_text: "The game's modding community is active and creative. It adds endless replayability. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's puzzles are brain-teasing and satisfying to solve. 4/5",
          comment_rating: 4,
        },
        {
          comment_text: "The game's cinematics are like a Hollywood blockbuster. They're stunning. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's microtransactions are intrusive and ruin the experience. 2 stars.",
          comment_rating: 2,
        },
        {
          comment_text: "This game is worth every penny. It's a masterpiece. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's humor and wit in the dialogues are a delight. It's a joy to play. 4 stars.",
          comment_rating: 4,
        },
        {
          comment_text: "The game's in-game events and updates keep things fresh and exciting. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's level of detail is astounding. Every nook and cranny has something interesting. 4/5",
          comment_rating: 4,
        },
        {
          comment_text: "The game's user interface is cluttered and confusing. It needs improvement. 2 stars.",
          comment_rating: 2,
        },
        {
          comment_text: "This game is a true gem. It's a masterpiece of storytelling. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's side quests are as engaging as the main storyline. They're worth doing. 4 stars.",
          comment_rating: 4,
        },
        {
          comment_text: "The game's soundtrack is memorable and fits the game perfectly. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's community is welcoming, and it's easy to find friends to play with. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's enemy AI is sometimes too predictable. It could be more challenging. 3/5",
          comment_rating: 3,
        },
        {
          comment_text: "This game is a hidden gem. Not many people know about it, but it's fantastic. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's weapon variety and customization options are a blast. 4 stars.",
          comment_rating: 4,
        },
        {
          comment_text: "The game's boss battles are epic and require strategic thinking. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's performance issues on older hardware can be frustrating. 3 stars.",
          comment_rating: 3,
        },
        {
          comment_text: "This game is a true work of art. It's a masterpiece in the gaming world. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "I can't get enough of this game's world. It's massive and filled with secrets. 4 stars.",
          comment_rating: 4,
        },
        {
          comment_text: "The game's character development is outstanding. You really get attached to them. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's challenges are tough but rewarding. You feel accomplished when you succeed. 4/5",
          comment_rating: 4,
        },
        {
          comment_text: "The game's community events bring players together and make the world feel alive. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's in-game purchases are expensive, and it feels like a cash grab. 2 stars.",
          comment_rating: 2,
        },
        {
          comment_text: "This game is worth every minute of your time. It's a masterpiece. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's side activities are diverse and add depth to the experience. 4 stars.",
          comment_rating: 4,
        },
        {
          comment_text: "The game's sound design is superb. It immerses you in the game world. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's community is friendly and helpful. It's easy to find coop partners. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's AI is sometimes too aggressive, making it frustrating. 3/5",
          comment_rating: 3,
        },
        {
          comment_text: "This game is a hidden gem. It's not well-known, but it's a fantastic experience. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's progression system keeps you hooked, always striving for more. 4 stars.",
          comment_rating: 4,
        },
        {
          comment_text: "The game's world is so well-crafted that you could get lost exploring for hours. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's tutorials are lacking. It could do a better job explaining mechanics. 2 stars.",
          comment_rating: 2,
        },
        {
          comment_text: "This game is a masterpiece in every sense. It's a true work of art. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's humor and wit in the dialogues are a highlight. It's a joy to play. 4 stars.",
          comment_rating: 4,
        },
        {
          comment_text: "The game's events and updates are exciting and keep players engaged. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's attention to detail is astonishing. Every corner is filled with surprises. 4/5",
          comment_rating: 4,
        },
        {
          comment_text: "The game's user interface is clunky and confusing. It needs an overhaul. 2 stars.",
          comment_rating: 2,
        },
        {
          comment_text: "This game is a hidden gem. It deserves more recognition for its brilliance. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's side quests are as engaging as the main story. They're worth the time. 4 stars.",
          comment_rating: 4,
        },
        {
          comment_text: "The game's soundtrack is memorable and fits perfectly with the game's atmosphere. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's community is welcoming, and you'll quickly find friends to play with. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's enemy AI needs improvement. It's too easy to predict their actions. 3/5",
          comment_rating: 3,
        },
        {
          comment_text: "This game is a true masterpiece. It's an art form within the gaming world. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "I've lost track of time playing this game. It's that engaging! 4 stars.",
          comment_rating: 4,
        },
        {
          comment_text: "The game's world-building is exceptional. It feels like a living, breathing world. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's difficulty curve is perfectly balanced. It's challenging but not frustrating. 4/5",
          comment_rating: 4,
        },
        {
          comment_text: "The game's modding community is creative and active. It adds endless replayability. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's puzzles are brain-teasers that feel satisfying to solve. 4/5",
          comment_rating: 4,
        },
        {
          comment_text: "The game's cinematics are like a Hollywood blockbuster. They're breathtaking. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's microtransactions are invasive and negatively impact the experience. 2 stars.",
          comment_rating: 2,
        },
        {
          comment_text: "This game is worth every cent. It's a gaming masterpiece. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's humor and wit in the dialogues are a joy to experience. It's fun to play. 4 stars.",
          comment_rating: 4,
        },
        {
          comment_text: "The game's in-game events and updates keep the experience fresh and exciting. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's attention to detail is astonishing. Every nook and cranny has something interesting. 4/5",
          comment_rating: 4,
        },
        {
          comment_text: "The game's user interface is cluttered and confusing. It needs an overhaul. 2 stars.",
          comment_rating: 2,
        },
        {
          comment_text: "This game is a true gem. It's not very well-known, but it's an amazing experience. 5 stars!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's weapon variety and customization options are a blast. 4 stars.",
          comment_rating: 4,
        },
        {
          comment_text: "The game's boss battles are epic and require strategic thinking. 5/5!",
          comment_rating: 5,
        },
        {
          comment_text: "The game's performance on older hardware can be problematic. 3 stars.",
          comment_rating: 3,
        },
      ]
    
      allDeals = await getDeals()  
      allUsers = await getUsers()

      
    const gameCommentsWithUsersDeals = gameComments.map((comment) => ({
        comment_text: comment.comment_text,
        comment_rating: comment.comment_rating,
        deal_id: getRandomDeal()._id,
        user_id: getRandomUser()._id
    })) 

    
    
      
    await Comment.insertMany(gameCommentsWithUsersDeals)
    console.log(gameCommentsWithUsersDeals)
    console.log('Comments created')
}

async function getDeals() {
    return (await Deal.find())
}



function getRandomDeal() {    
    // console.log(allDeals[getRandomInt(allDeals.length)])
    return allDeals[getRandomInt(allDeals.length)]
}

async function getUsers() {
    return (await User.find())
}



function getRandomUser() {
    console.log(allUsers[getRandomInt(allUsers.length)]._id)
    return allUsers[getRandomInt(allUsers.length)]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) 
}

const run = async () => {
    
    
    await main()
    db.close()

}

run()

// const allDeals = await Deal.find()

