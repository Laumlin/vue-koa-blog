const Tag = require('../models/tags.js')

class TagController{
//获取全部标签
	static async getAllTags(ctx) {
		let result = await Tag.find();					
		ctx.success({
			msg: '获得所有标签成功!',
			data: result,
		})
	}
//删除标签
	static async deleteTag(ctx){
		const tagDel = ctx.request.body.tagDel;
        let result = await Tag
            .findOneAndRemove(tagDel)
            .exec()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-delete错误!');
            });
        ctx.success({
            msg: '删除标签成功!',
            data: result,
            success: true
        });
	}
//创建标签
	static async createTag(ctx){
		const name = ctx.request.body.name;
		if(!name){
			ctx.throw(400, '标签类型不能为空');
		}
		let isOldTag = await Tag
				.findOne({ name })
				.exec()
				.catch((err) => {
					 ctx.throw(500, '服务器内部错误-fingOneTag错误!');
					});
		if(isOldTag !== null){
			return ctx.success({
				msg: '这是已经存在的标签！',
                data: isOldTag
			})
		}
		let tag = new Tag({
            name
        });
        // console.log(tag.save() instanceof Promise); 返回true。save的时候直接返回promise,查询的时候通过exec()来返回promise
        let result = await tag
            .save()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-createTag错误!');
            });
        ctx.success({
            msg: '添加标签成功！',
            data: result
        });
	}
//修改标签
	static async modifyTag(ctx){
		const id = ctx.params.id;
		const name = ctx.body.name;
		let result = await tag.findByIdAndUpdate(id, {
			name
		}, {
			new: true
		})
		.exec()
		.catch((err) => {
			ctx.throw(500, '服务器内部错误-modifyTag错误!')
		})
		ctx.success({
			msg: '修改标签成功！',
			data: result
		})
	}
}

exports = module.exports = TagController