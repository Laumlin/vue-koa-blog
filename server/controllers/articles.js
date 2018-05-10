const Article = require('../models/articles.js')

class ArticlesController{
//发布文章
	static async createArticle(ctx){
		const { title, tag, describtion, content } = ctx.request.body;
		const createDate = moment().format('YYYY-MM-DD kk:mm:ss');
		if(!title){
            ctx.throw(400, '标题不能为空!');
        }
        if(!content){
            ctx.throw(400, '内容不能为空!');
        }
		let article = new Article({
			title,
			tag,
			describtion,
			createDate,
			content
		})
		let result = await article.save().catch((err) => {
			ctx.throw(500, '服务器内部错误-数据存储错误！')
		})
		ctx.success({
			msg: '发布文章成功！',
			data: result
		})
	}
//删除文章
	static async deleteArticle(ctx){
		let articleId = ctx.request.body.articleId;
		let result = await Article.findByIdAndRemove(articleId)
								  .exec()
								  .catch((err) => {
								  	ctx.throw(500, '服务器内部错误-findByIdAndRemove错误!')
								  })
		ctx.success({
			msg: '删除文章成功！',
			data: result
		})						  
	}
//修改文章
	static async modifyArticle(ctx){
		const id = ctx.request.body.articleId;
		const { title, tag, describtion, content } = ctx.request.body;
		let result = await Article.findByIdAndUpdate(id, 
			{$set:
				{
				title,
				tag,
				describtion,
				content	
				}	
		}, { new: true })
		.exec()
		.catch((err) => {
			ctx.throw(500, '服务器内部错误-findByIdAndUpdate错误!')
		})
		ctx.success({
			msg: '修改成功！',
			data: result
		})
	}
//获取全部文章
	static async getAllArticles(ctx){
		let limit = +ctx.query.limit; //加号：把字符串转化为数字
		let page = +ctx.query.page;
		if(page <= 0){
			page = 1;
		}
		let result, total;
		if(page && limit){
			result = await Article.find().sort({'createDate': -1})
								  .skip(limit*(page-1))
								  .limit(limit)
								  .exec()
								  .catch((err) => {
								  	ctx.throw(500, '服务器内部错误-分页查找错误!')
								  })
		} else {
			result = await Article.find().sort({'createDate': -1})
							.exec()
							.catch((err) => {
								ctx.throw(500, '服务器内部错误-查找所有文章错误!')
							})
		}
		total = await Article.count().exec()
			.catch((err) => {
				 ctx.throw(500, '服务器内部错误-总数查询错误!')
			})
		ctx.success({
			msg: '查询文章成功！',
			data: result,
			total
		})
	}
//文章详情
	static async articleDetial(ctx){
		const id = ctx.query.ArticleId;
		let result = await Article.findById(id).catch((err) => {
			ctx.throw(500, '服务器内部错误-数据查找错误!')
		})
		ctx.success({
			msg: '查询成功!',
			data: result
		})
	}
//根据标签显示文章
	static async articlesByTag(ctx){
		const tag = ctx.query.tag;
		const page = +ctx.query.page;
		const limit = +ctx.query.limit;
		if(page <= 0){
			page = 1
		}
		let result, total;
		if(page && limit){
			result = await Article.find({tag: tag}).sort({'createDate': -1})
								  .skip(limit*(page-1))
								  .limit(limit)
								  .exec()
								  .catch((err) => {
								  	ctx.throw(500, '服务器内部错误-分页查找错误!')
								  })
		} else {
			result = await Article.find({tag: tag}).sort({'createDate': -1})
							.exec()
							.catch((err) => {
								ctx.throw(500, '服务器内部错误-查找所有文章错误!')
							})
		}
		total = await Article.count({tag: tag}).exec()
			.catch((err) => {
				 ctx.throw(500, '服务器内部错误-总数查询错误!')
			})
		ctx.success({
			msg: '查询文章成功！',
			data: result,
			total
		})
	}
}

exports = module.exports = ArticlesController