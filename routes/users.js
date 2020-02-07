const express = require('express')
const router = express.Router()
const Users = require ('../models/users')

//creating a users
router.post('/', async (req, res) => { 
    const users = new Users({
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
    })
    try {
        const newUsers = await users.save()
        res.status(201).json(newUsers)
    } catch (err) {
     res.status(400).json({ message: err.message})
    }
})
//retrieve user by email
router.get('/:email', getUsers, (req, res) => {
    res.json(res.users.password)   
})


async function getUsers(req, res, next) {
    let users
    try {
        users = await Users.findByEmail(req.params.id)
        if (users == null) {
            return res.status(404).json({ message: 'cant find a user'})
        }
    } catch (err){
        return res.status(500).json({message: err.message})
    }
    res.users = users
    next()
}

module.exports = router