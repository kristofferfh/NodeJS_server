const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema =  new Schema({
  username: {
    type:String,
    required: true
  },
  roles: {
    User: {
      type: Number,
      default: 1101
    },
    Editor: Number,
    Admin: Number
  },
  username: {
    type:String,
    required: true
  },
  refreshToken: String
})

module.exports = mongoose.model("user", userSchema)