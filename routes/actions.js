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


// get board
router.get('/:allbytopic', verifyToken, async(req, res) => {
    try{
        const query  = { posttopic: req.params.allbytopic}
        console.log(query)
        
        const getActions = await Action.find(query)
        console.log(getActions)
        
        const test = getActions.reduce((acc, {posttitle, type, comment, user}) =>
        {
            acc[posttitle] = acc[posttitle] || {TotalInterest: 0, Likes: 0, Dislikes: 0, Comments: ''};
            acc[posttitle]['TotalInterest'] += 1
            if(type=='Like'){acc[posttitle]['Likes'] += 1}
            if(type=='Dislike'){acc[posttitle]['Dislikes'] += 1}
            if(type=='Comment'){acc[posttitle]['Comments'] += '>' + user + ': ' + comment + '; '}
            
            return acc;
        }, {})

        res.send(test)
    }catch(err){
        res.send({message:err})
    }
})


// get top board
router.get('/top/:allbytopic', verifyToken, async(req, res) => {
    try{
        const query  = { posttopic: req.params.allbytopic}
        console.log(query)
        
        const getActions = await Action.find(query)
        console.log(getActions)
        
        const test = getActions.reduce((acc, {posttitle, type, comment, user}) =>
        {
            acc[posttitle] = acc[posttitle] || {Title: posttitle, TotalInterest: 0, Likes: 0, Dislikes: 0, Comments: ''};
            acc[posttitle]['TotalInterest'] += 1
            if(type=='Like'){acc[posttitle]['Likes'] += 1}
            if(type=='Dislike'){acc[posttitle]['Dislikes'] += 1}
            if(type=='Comment'){acc[posttitle]['Comments'] += '>' + user + ': ' + comment + '; '}
            
            return acc;
        }, {})

        //res.send(test.sort((a, b) => b.TotalInterest - a.TotalInterest))
        res.send(Object.values(test).sort((a, b) => b.TotalInterest - a.TotalInterest)[0])
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
        console.log(getPostById.user)
        console.log(req.body.user)

        if(getPostById.user == req.body.user && req.body.type == 'Like'){
            res.send({message:'user cannot like his own messages'})
        }else{
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
        }
    }catch(err){
        res.send({message:err})
    }
})



module.exports = router