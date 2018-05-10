const mongoose = require('mongoose')
const schema = mongoose.Schema

const articleSchema = new schema({
	title: String,
	tag: [String],
	describtion: String,
	createDate: String,
	content: String,
	comment: [
	  {
	  	name: String,
	  	email: String,
	  	content: String,
	  	dateTime: String,
	  	comment_response: [
	  		{
	  		  "response_name": String,
	          "response_email": String,
	          "response_content": String,
	          "response_dateTime": String
	  		}
	  	]
	  }
	]
})
exports = module.exports = mongoose.model('Article', articleSchema)