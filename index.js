const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();
const login = require('./src/login');
const Eos = require('eosjs');
const EosApi = require('eosjs-api')

const headers = {
	douxing: "dx4"
}

// Optional configuration..
const config = {
	keyProvider: ['5JBRCFmN6QYr1sP2xpH7XWFkgPWZZ37xT8TSQdf86Bau5PJq6Fy'], // 配置私钥字符串
	httpEndpoint: 'http://178.62.196.196:8888', //DEV开发链url与端口
	chainId: "0b08e71a2f8caaccc2dc13244b788f5eba29462ecd5d5dea1ad8cbe9581e885a", // 通过cleos get info可以获取chainId
	mockTransactions: () => null, // 如果要广播，需要设为null
	transactionHeaders: (expireInSeconds, callback) => {
		callback(null/*error*/, headers) //手动设置交易记录头，该方法中的callback回调函数每次交易都会被调用
	},
	expireInSeconds: 60,
	broadcast: true,
	debug: false,
	sign: true,
	authorization: null // 该参数用于在多签名情况下，识别签名帐号与权限,格式如：account@permission
}
const eos = Eos(config)

eos.getInfo({}).then(info => {
	console.log(info, "info")
});

function callback(err, res) {
	err? console.error(err): console.log(res)
}


eos.getInfo({}).then(result => {
	console.log(result.head_block_producer, "info")
});

eos.getBlock(200000).then(result => {console.log(result, "???")});

router.get('/', (ctx, next) => {
	ctx.body = "Hello koa-router";
});

router.post("/login", login);

app.use(router.routes());

app.listen(3000);