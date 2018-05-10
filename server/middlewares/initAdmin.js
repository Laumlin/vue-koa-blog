const config = require('../configs/config.js')
const md5 = require('md5')
const User = require('../models/user.js')

module.exports = async(ctx, next) => {
	let username = config.admin.username;
	let password = md5(config.admin.password);
	let result = await User.find()
		.exec()
		.catch((err) => {
			ctx.throw(500, '服务器内部错误-查找admin错误！')
		});
	if(result.length === 0){
		let user = new User({
			name,
			password
		})
		await user.save().catch((err) => {
			ctx.throw(500, '服务器内部错误-存储admin错误！')
		})
		console.log('初始化admin账号密码完成!')
	}
	await next();
}