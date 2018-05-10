module.exports = async (ctx, next) => {
	ctx.success = ({ data, msg, total, success }) => {
		ctx.body = { code:200, data, msg, total, success };
	}
	await next();
}