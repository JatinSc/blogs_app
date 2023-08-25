const express = require('express')
const userRoutes = express.Router()
const { User } = require('../db/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const userAuth = require('../middlewares/userAuth')


userRoutes.post('/register', async (req, res) => {

    const { username, email, password } = req.body;

    if (username == "" || email == "" || password == "")
        return res
            .status(400)
            .json({ error: 'please enter all the required fields' })

    const ifUserAlreadyExists = await User.findOne({
        where: { email },
    });

    if (ifUserAlreadyExists)
        return res
            .status(400)
            .json({ error: 'User Already Exists with the given email' })

    if (password.length < 10)
        return res
            .status(400)
            .json({ error: 'password must be 10 char long' })

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({ username, email, password: hashedPassword });
        return res.status(201)
            .json({
                newUser: newUser,
                message: "account created successfully"
            });
    } catch (error) {
        return res.status(500)
            .json({ error: 'Failed to create account' });
    }

})

userRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(409)
            .json({ error: 'please enter all the fields' })
    }

    try {
        // Check if the user exists with the provided email
        const doesUserExists = await User.findOne({
            where: { email },
        });

        if (!doesUserExists)
            return res
                .status(400)
                .json({ error: "invalid email or password" });

        // @ if there any user exists so we match the plain text password with hashed password
        const doesPasswordMatch = await bcrypt.compare(password, doesUserExists.password)

        if (!doesPasswordMatch)
            return res
                .status(400)
                .json({ error: " invalid email or password " })

        // # if everything is fine we will generate token
        // # it takes id , secret key and we can give expiration duration 
        const payload = {id:doesUserExists.id}
        const token = jwt.sign(payload, process.env.JWT_secret_key)
        //#not sending password in response
        doesUserExists.password = undefined
        return res
            .status(200)
            .json({
                message: "Logged in Successfully",
                token: token,
                user: doesUserExists
            })
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: error.message });
    }

})

userRoutes.get('/me' , userAuth, async (req, res) => {
    return res
      .status(200)
      .json({user : req.user});
  })

module.exports = userRoutes