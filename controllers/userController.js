const User = require('../models/users')
const mongoose = require('mongoose')

function isValidUserId(id) {
    return mongoose.Types.ObjectId.isValid(id)
}

async function findUserById(id) {
    return await User.findById(id).populate('deal_id').exec()
}

async function handleOperation(req, res, operation) {
    try {
        const id = req.params.id;
        if (!isValidUserId(id)) {
            return res.status(400).send('Invalid User ID')
        }

        const user = await operation(id)

        if (!user) {
            return res.status(404).send('User not found')
        }

        res.json(user);
    } catch (e) {
        res.status(500).send(e.message)
    }
}

async function getAllUsers(req, res) {
    const users = await User.find()
    res.json(users)
}

async function deleteUser(req, res) {
    await handleOperation(req, res, async (id) => {
        return await User.findByIdAndDelete(id)
    });
}

async function updateUser(req, res) {
    await handleOperation(req, res, async (id) => {
        return await User.findByIdAndUpdate(id, req.body, { new: true })
    });
}

async function getOneUser(req, res) {
    await handleOperation(req, res, async (id) => {
        return await findUserById(id)
    });
}

async function createUser(req, res) {
    try {
        const user = await new User(req.body)
        await user.save();
        res.status(201).json(user)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

async function addToWishlist(req, res) {
    await handleOperation(req, res, async (id) => {
        let wishList = (await User.findById(id)).deal_id
        let wishListString = wishList.map(id => id.toString())
        console.log('add', req.body)
        if (!wishListString.includes(req.body.deal_id.toString())) {
            wishListString.push(req.body.deal_id.toString()) 
            console.log(wishListString)
            const uniqueWishList = Array.from(new Set(wishListString));
            console.log(uniqueWishList)
            await User.findByIdAndUpdate(id, {deal_id: uniqueWishList}, { new: true })
        }       
        return User.findById(id)
    })
}

async function deleteFromWishlist(req, res) {
    await handleOperation(req, res, async (id) => {
        console.log('body',req.body)
        
        // console.log('dealobj',dealObjectId)
        const user = await User.findByIdAndUpdate(id, {
            $pull: {deal_id: req.body.deal_id}
        }, {new:true})
        
        return user
    });
}

async function existsOnWishlist(req, res) {
    await handleOperation(req, res, async (id) => {
        const user = await User.findById(req.params.id);

        if (user && user.deal_id.includes(req.body.deal_id)) {
            return {exists: true}
        } else {
            return {exists: false}
        }       
        
    })
}


module.exports = {
    getAllUsers,
    getOneUser,
    deleteUser,
    updateUser,
    createUser,
    addToWishlist,
    deleteFromWishlist,
    existsOnWishlist
}
