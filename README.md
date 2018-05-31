# vue-koa-blog
自己用vue2和koa2搭建的个人博客
### myblog server篇

> vue2,koa2和mongodb搭建的单用户博客

效果展示:

![登录页面](http://owu8c85uh.bkt.clouddn.com/login.png)

![后台主页](http://owu8c85uh.bkt.clouddn.com/show.png)

![文章管理页](http://owu8c85uh.bkt.clouddn.com/articles.png)

#### 目录设计

*  configs ----------配置文件
*  controllers ---------实现功能的控制器
*  middlewares -------- 自己封装的中间件
*  models --------- 数据库模式
*  routes ---------- 路由
*  index.js ------------- 入口文件
*  package.json ------- 项目依赖包

#### 封装一个统一回复的中间件

*response.js*

```javascript
module.exports = async (ctx, next) => {
	ctx.success = ({ data, msg, total, success }) => {
		ctx.body = { code:200, data, msg, total, success };
	}
	await next();
}
```

#### 初始化账号和密码的中间件

*initAdmin.js*

```javascript
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
```

#### 统一的时间处理模块 

*moment*

用法: `const createDate = moment().format('YYYY-MM-DD kk:mm:ss');`

显示为: `2018-05-08 18:31:32`

#### 分页查询

```javascript
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
		}
```

#### 自定义配置

*config.js*

```javascript
let config = {
	admin: {
		username: 'admin', //初始化账号和密码
		password: 'admin'
	},
	//jwt是token的配置，由于自己的项目比较简单，最后没有用token
	jwt: {
		secret: 'secret',  
		exprisesIn: '3600s'
	},
	mongodb: {
		host: '127.0.0.1',
		database: 'blog3',
		port: 27017,
		user: '',
		password: ''
	},
	app: {
		routerBaseApi: '/api'
	}
}

module.exports = config
```

---

基本实现的功能：

1. 发布文章、修改文章、删除文章
2. 创建标签、删除标签、修改标签
3. 用户登录
4. 游客留言

未完善的部分：游客的留言还没有管理模块，因为这段时间比较忙，可能之后再慢慢优化。。。





