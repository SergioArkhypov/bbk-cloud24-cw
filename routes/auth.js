const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

const User = require('../models/User')
const {registerValidation, loginValidation} = require('../validations/validation')

router.get('/', async (req,res)=>{
    try{
        const users = await User.find().limit(5)
        res.send(users)
    }
    catch(err){
        res.status(400).send({message:err})
    }
})


router.post('/register', async (req,res)=>{
    try{
        const msg = registerValidation(req.body)
        if('error' in msg){
            res.status(400).send({message:msg['error']['details'][0]['message']})
        }else{

            // validation 2 - check if user unique
            const userExist = await User.findOne({email: req.body.email})
            if(userExist){
                res.status(400).send({message:'user already exists'})
            }else{

                const salt = await bcryptjs.genSalt(5)
                const hashedPassword = await bcryptjs.hash(req.body.password, salt)

                const newuser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword
                })
                const savedUser = await newuser.save()
                res.send(savedUser)
            }
        }
    }
    catch(err){
        res.status(400).send({message:err})
    }
})

router.post('/login', async (req,res)=>{
    try{
        const msg = loginValidation(req.body)
        //console.log(msg)
        if('error' in msg){
            res.status(400).send({message:msg['error']['details'][0]['message']})
        }else{
            // check user exist
            const userExist = await User.findOne({email: req.body.email})
            if(userExist){
                // check pass
                const passwordValidation = await bcryptjs.compare(req.body.password, userExist.password)
                if(!passwordValidation){
                    res.send({message:'password is wrong'})
                }else{
                    //res.send({message:'logged in !'})
                    // generate auth token for user
                    const token = jsonwebtoken.sign({_id: userExist._id}, process.env.TOKEN_SECRET)
                    res.header('auth-token', token).send({'auth-token':token})
                }

            }else{
                res.send({message:'user does not exist'})
            }
        }
    }
    catch(err){
        res.status(400).send({message:err})
    }
})

module.exports = router