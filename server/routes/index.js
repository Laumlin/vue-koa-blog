const Router = require('koa-router'),
	  config = require('../configs/config.js'),
	  router = new Router({
	  		prefix: config.app.routerBaseApi
	  }),
	  T = require('../controllers/tag.js'),
	  U = require('../controllers/user.js'),
	  M = require('../controllers/messages.js')
	  A = require('../controllers/articles.js')

router
	.post('/login', U.login)

	.get('/tags', T.getAllTags)
	.post('/tagsDelete', T.deleteTag)
	.post('/tags', T.createTag)

	.get('/messages', M.messagesList)
	.post('/createMessage', M.createMessage)

	.get('/articles', A.getAllArticles)
	.get('/articlesDetial', A.articleDetial)
	.post('/articleModify', A.modifyArticle)
	.post('/articleDelete', A.deleteArticle)
	.get('/articlesByTag', A.articlesByTag)
	.post('/articleSub', A.createArticle)

exports = module.exports = router;