const Koa = require('koa')
// const Static = require('koa-static')
const conditional = require('koa-conditional-get')
const path = require('path')
const fs = require('fs')
const app = new Koa();

app.use(conditional())

app.use((ctx) => {
    // console.log(ctx.request);
    // ctx.set('expires',)public, max-age=3600, s-maxage=3600
    // if (ctx.url === '/favicon.ico') return

    if (ctx.url === '/') {
        const html = fs.readFileSync(path.join(__dirname, './static/index.html'), 'utf-8')
        ctx.set('Cache-Control', 'max-age=3')
        ctx.set('Content-Type', 'text/html')
        ctx.body = html
    } else if (ctx.url.endsWith('.js')) {
        const js = fs.readFileSync(path.join(__dirname, './static/index.js'), 'utf-8')
        ctx.set('Cache-Control', 'max-age=3')
        ctx.set('Content-Type', 'application/javascript')
        ctx.body = js
    }

})

// app.use(conditional())

// app.use(Static(
//     path.join(__dirname, './static'), {
//         maxage:10 * 1000
//     }
// ))

app.listen('3000', () => {
    console.log('app start port 3000');
})