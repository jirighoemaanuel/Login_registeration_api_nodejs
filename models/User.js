const mongoose = require('mongoose')
const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            required: true
        },
        location: {
            type: String,
            default: "Lagos"
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
)

const User = mongoose.model("User", UserSchema)

module.exports = User