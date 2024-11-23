const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const Action = require('../models/Action')
const verifyToken = require('../verifyToken')

// get all data
router.get('/', verifyToken, async(req, res) => {
    try{
        const getActions = await Action.find()
        res.send(getActions)
    }catch(err){
        res.send({message:err})
    }
})


// create data
router.post('/:postId', verifyToken, async(req,res) => {

    //try inserting
    try{
        const getPostById = await Post.findById(req.params.postId)
        const dd = Math.abs(Date.now() - getPostById.timestamp.getTime())/(1000*60)

        if(dd<getPostById.expiration){
            const actionData = new Action({
                user: req.body.user,
                type: req.body.type,
                posttitle: getPostById.title,
                posttopic: getPostById.topic,
                comment: req.body.comment,
                timeexpire: dd
            })

            actionToSave = await actionData.save()
            res.send(actionToSave)}
        else{
            res.send({message:'post expired - actions disabled'})
        }
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router