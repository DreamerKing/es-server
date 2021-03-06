const connetion = require('../db/connetion');
/**
* 查找用户
* params name
* params pwd
*/
function lookUser(name, pwd){
	var sql = "select * from user where name=? and pwd=?;"
    return new Promise((resole, reject) => {
    	connetion.query(sql,[name, pwd], function(error, results, fieds){
			if(error){
				reject(error);
			} else {
				resole(results);
			}
		});
    })
}

/*
* 用户登录
*
*/
async function login(ctx, next) {
	await lookUser("king","123").then(results => {
		if(results.length){
			ctx.body = { message: "登陆成功", code:0, data: results };
		} else {
			ctx.body = { message: "登陆失败", code: -1 };
		}
	});
	await next();
}
module.exports = login;