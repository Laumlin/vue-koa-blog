const User = require('../models/user.js')
const md5 = require('md5')
const config = require('../configs/config.js')

class UserController{
	static async login(ctx){
		const { username, password } = ctx.request.body;
		let result = await User
					.findOne({
						username
					})
					.exec()
					.catch((err) => {
						ctx.throw(500, '服务器内部错误-findUser错误！')
					})
		if(result){
			if(result.password === md5(password)){
				return ctx.success({
					msg: '登录成功！',
					data: {
						uid: result._id,
						username: result.username,
					},
					success: true
				})
			} else {
				return ctx.success({
					msg: '密码错误！',
					success: false
				})
			}
		} else {
			return ctx.success({
				msg: '用户名不存在！',
				success: false
			})
		}
	}

	static async logout(ctx){
		ctx.success({
			msg: '退出成功！',
			success: true
		})
	}
}

exports = module.exports = UserController