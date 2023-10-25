const mongoose = require('mongoose')

const { Schema } = mongoose

const personSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    userId:{
        type: String,
        required: true,        
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },    
    isAdmin: {
        type: Boolean,
        default: false,
    },
    agree: {
        type: Boolean,
        required: true,
    },
    login: {
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    lastModifiedAt:{
        type: Date,
        default: Date.now,
    },
})

const Users = mongoose.model('user', personSchema)
module.exports = Users