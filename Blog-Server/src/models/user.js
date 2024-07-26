const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("User", UserModel, "users")