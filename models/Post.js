const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    topic: {
        //type: {type: [String], enum: ['Politics', 'Health', 'Sport', 'Tech'] },
        type: [String], 
        enum: ['Politics', 'Health', 'Sport', 'Tech'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    expiration: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('posts', PostSchema)