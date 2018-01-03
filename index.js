const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();
const login = require('./src/login');

router.get('/', (ctx, next) => {
	ctx.body = "Hello koa-router";
});

router.post("/login", login);

app.use(router.routes());

app.listen(3000);