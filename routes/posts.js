const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../verifyToken')

// get all data
router.get('/', verifyToken, async(req, res) => {
    try{
        const getPosts = await Post.find()
        res.send(getPosts)
    }catch(err){
        res.send({message:err})
    }
})

// get one record
router.get('/:postId', verifyToken, async(req, res) => {
    try{
        const getPostById = await Post.findById(req.params.postId)
        res.send(getPostById)
    }catch(err){
        res.send({message:err})
    }
})

// update data (patch)
router.patch('/:postId', verifyToken, async(req, res) => {
    try{
        const updatePostById = await Post.updateOne(
            {_id: req.params.postId},
            {$set:
                {
                    user: req.body.user,
                    title: req.body.title,
                    topic: req.body.topic,
                    message: req.body.message,
                    expiration: req.body.expiration,
                }
            }
        )
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }

})

// delete data
router.delete('/:postId', verifyToken, async(req, res) => {
    try{
        const deletePostById = await Post.deleteOne(
            {_id:req.params.postId}
        )
        res.send(deletePostById)
    }catch(err){
        res.send({message:err})
    }
})

// create data
router.post('/', verifyToken, async(req,res) => {
    //console.log(req.body)
    const postData = new Post({
        user: req.body.user,
        title: req.body.title,
        topic: req.body.topic,
        message: req.body.message,
        expiration: req.body.expiration,
    })

    //try inserting
    try{
        postToSave = await postData.save()
        res.send(postToSave)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router