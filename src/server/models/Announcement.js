const mongoose = require('mongoose')
const moment = require('moment-timezone')
const postDate = moment.tz("Asia/Seoul").format("YY-MM-DD") // format("YYYY-MM-DD"), format("YY-MM-DD")

const AnnouncementSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    contents: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: postDate,
    },
    viewCount: {
        type: Number,
        default: 0,
    }
})

const Announcement = mongoose.model('Announcement', AnnouncementSchema)
module.exports = Announcement