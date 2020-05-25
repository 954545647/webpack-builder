if (typeof window === 'undefined') {
  global.window = {};
}

const Koa = require('koa');
const koaStatic = require('koa-static');
const reactSsr = require('./react-ssr');

const port = process.env.port || 3000;

const app = new Koa();
// 设置可访问的静态资源
app.use(koaStatic('./dist'));
app.use(reactSsr);

app.listen(port);
// eslint-disable-next-line
console.log('server is start .', `http://localhost:${port}`);
