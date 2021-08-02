const mongoose = require('mongoose')

const applySchema = mongoose.Schema({
    name :{
        type: String,
        required : true
    },
    email :{
        type: String,
        required : true
    },
    code :{
        type: Number,
        required : true
    },
    mobile :{
        type: Number,
        required : true
    },
    state :{
        type: String,
        required : true
    },
    course :{
        type: String,
        required : true
    },
    date:{
        type: Date,
        default: Date.now()
    }

})
const apply = mongoose.model('apply',applySchema)
module.exports = apply