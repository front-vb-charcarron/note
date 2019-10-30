# 什么是 http ?

## 常见的响应头

``` javascript
// 跨域响应头
"Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
"Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
// 表单提交 响应类型
"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
// express 隐藏响应头的服务器信息
app.disable('x-powered-by');
// 下载响应头 搭配Content-Disposition 前端使用a连接请求接口下载任何文件
"Content-Type": "application/x-download",
// 搭配x-download可以为下载文件命名
"Content-Disposition": `attachment; filename=${ filename }` 
```

