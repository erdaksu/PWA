const mongoose = require('mongoose')

const coursesSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true  
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }, 
    
})

module.exports = mongoose.model('Courses', coursesSchema)