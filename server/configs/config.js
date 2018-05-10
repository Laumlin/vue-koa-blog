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