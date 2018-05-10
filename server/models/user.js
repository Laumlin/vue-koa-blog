const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
	username: String,
	password: String
})

exports = module.exports = mongoose.model('User', userSchema)