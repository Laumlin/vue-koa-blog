const mongoose = require('mongoose')
const schema = mongoose.Schema

const messageSchema = new schema({
	name: String,
	email: String,
	content: String,
	createDate: String
})

exports = module.exports = mongoose.model('Message', messageSchema)