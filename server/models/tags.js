const mongoose = require('mongoose')
const schema = mongoose.Schema

const tagsSchema = new schema({
	name: String
})

exports = module.exports = mongoose.model('Tag', tagsSchema)