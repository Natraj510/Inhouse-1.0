const mongoose = require('mongoose')

// const faqSchema = mongoose.Schema({
//     question:String,
//     answer:String
// })

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
    curriculum :[
        {
            title:[
                {
                    title1:String,
                    title2:String,
                    title3:String
                }
            ],
            subjects:[
                {
                    courseCode:String,
                    subjectName:String,
                    credits:String
                }
            ]
        }
    ],
    features:{
        type:String
    },
    faq:[
        {
            question:String,
            answer:String
        }
    ],
    date:{
        type: Date,
        default: Date.now()
    }

})
const course = mongoose.model('course',courseSchema)
module.exports = course