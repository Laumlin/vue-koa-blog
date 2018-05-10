const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser');
const moment = require('moment');
global.moment = moment;
const config = require('./configs/config.js')

const response = require('./middlewares/response.js')
const router = require('./routes')
const initAdmin = require('./middlewares/initAdmin.js')

//连接数据库
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoUrl = `mongodb://${ config.mongodb.user }:${ config.mongodb.password }@${ config.mongodb.host }:${ config.mongodb.port }/${ config.mongodb.database }`; 
mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.on('error', () => {
    console.log('数据库连接出错!');
});
db.once('open', () => {
    console.log('数据库连接成功！');
});

app.use( async(ctx, next) => {
	let start = new Date();
	await next();
	let ms = new Date() - start;
	console.log(`${ ctx.method } ${ ctx.url }- ${ ms } ms`)
})


app.use(bodyParser());

app.use(response);

app.use(initAdmin);

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => {
	console.log('The server is running at http://localhost:3000')
})
