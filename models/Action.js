const mongoose = require('mongoose')

const ActionSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    posttitle: {
        type: String,
        required: true
    },
    type: {
        type: String, 
        enum: ['Like', 'Dislike', 'Comment'],
        required: true
    },
    posttopic: {
        type: [String], 
        enum: ['Politics', 'Health', 'Sport', 'Tech'],
        required: true
    },
    comment: {
        type: String
    },
    timeexpire: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('actions', ActionSchema)