const message = require('../models/messages.js')

class MessageController{
//创建留言
	static async createMessage(ctx){
		const { name, email, content } = ctx.request.body;
		if(!name) {
			ctx.throw(400, '姓名不能为空')
		}
		if(!email) {
			ctx.throw(400, '邮箱不能为空')
		}
		if(!content) {
			ctx.throw(400, '内容不能为空')
		}
		const createDate = moment().format('YYYY-MM-DD kk:mm:ss');
		let mes = new message({
			name,
			email,
			content,
			createDate
		});
		let result = await mes.save()
							.catch((err) => {
								ctx.throw(500, '服务器内部错误-数据存储错误！');
							})
		ctx.success({
			msg: '留言成功！',
			data: result
		})
	}

//获取全部留言
	static async messagesList(ctx){
		let limit = +ctx.query.limit
		let result = await message.find()
								  .sort({_id: -1})
								  .limit()
								  .exec()
								  .catch((err) => {
								  	ctx.throw(500, '服务器内部错误-获取留言错误！')
								  })
		ctx.success({
			msg: '获取留言成功',
			data: result
		})
	}
}

exports = module.exports = MessageController;