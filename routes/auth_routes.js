const {Router} = require('express')
const router = Router()
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/user')
router.post('/register', 
    [
        check('password', "Vulnerable password").isLength({min: 8 })
    ],
    async (req, res) =>{
    try {
        console.log('Body:', req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Ishkal"
            })
        }
        const {email, password} = req.body
        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({message: "It is not available"})
        }
        const hashPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashPassword})
        await user.save()
        res.status(201).json({message: "User is created"})

    }
    catch(e) {
        res.status(500).json({ message: "Ishkal" })
    }
})















// Login endpoint


router.post('/login', 
    [
        check('email', "invalid email").normalizeEmail().isEmail(),
        check('password', "Input password").exists()
    ],
    async (req, res) =>{
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Ishkal"
            })
        }
        
        const {email, password} = req.body
        const user = await usr.findOne({ email })

        if (!user) {
            return res.status(400).json({message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(400).json({message: "Incorrect password"})
        }
        const token = jws.sign(
            {userId: user.id}, config.get('jswSecret'),
            {expireIn: '1h'}
        )

        res.json(token, {userId: user.id})

    }
    catch(e) {
        res.status(500).json({ message: "Ishkal" })
    }
})





module.exports = router