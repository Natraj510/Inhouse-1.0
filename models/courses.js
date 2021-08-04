const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    courseName :{
        type: String,
        required : true
    },
    overview:{
        type: String
    },
    vision :{
        type: String
    },
    mission :{
        type: String
    },
    elegibility :{
        type: String
    },
    curriculum  :{
        type: String,
    },
    features:{
        type:String
    },
    faq:{
        type:String
    },
    date:{
        type: Date,
        default: Date.now()
    }

})
const course = mongoose.model('course',courseSchema)
module.exports = course