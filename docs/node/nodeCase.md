# Node.js可以做什么？

## 1. Node.js通过`http-proxy-middleware`进行跨域。

### Node代码
```javascript
const express = require('express');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware');
const hostName = '127.0.0.1';
const port = 8888;

app.use(express.static(path.resolve(__dirname)));
app.use(
    '/zone',
    proxy({ 
        target: 'http://cargo.9-leaf.com/index.php/_api/Services/query_service', 
        changeOrigin: true
    })
);
app.listen(
    port, 
    hostName, 
    () => console.log(`服务运行在http://${ hostName }:${ port }`)
);
```
### 前端代码
```javascript
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(JSON.parse(xhr.responseText));
    }
};
xhr.open('POST', 'http://127.0.0.1:8888/zone', false);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send(Qs.stringify({
    method: 'app_get_oil_product_list',
    servername: 'Cargo_OilProductZoneService',
    params: ""
}));
```

## 2. node 实现下载各种文件
### 前端：
通过 `a` 标签调用 node`get` 接口通过`?`传参的方式下载相应的文件。
### express 的做法：
1. 接口方面使用的是 `express` ，可通过 `res.query` 获取参数。
2. 添加 `"Content-Type": "application/x-download"` 响应头。
3. 添加 `"Content-Disposition": attachment; filename=filename}` 响应头来定义下载文件名。
4. 通过流把文件流到 `res` 具体代码：`fs.createReadStream(文件详细路径).pipe(res)` 。

### koa 的做法：
```javascript
router.get('/download', ctx => {
    const { filename } = ctx.request.query;
    const filePath = `${process.cwd()}/uploads/${ filename }`;
    // 设置文件名称 相当于设置'Content-disposition'
    ctx.attachment(filename);
    ctx.response.status = 200;
    // 文件格式 extname = path.extname
    ctx.response.type = extname(filePath);
    // 等同于 readStream.pipe(res);
    ctx.body = fs.createReadStream(filePath);
});
```