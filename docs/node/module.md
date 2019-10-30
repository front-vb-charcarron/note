# 常用的一些模块

## fs-文件系统
:::tip
fs 模块提供了一些接口用于以一种类似标准 POSIX(可移植操作系统接口（Portable Operating System Interface of UNIX，缩写为 POSIX ）) 函数的方式与文件系统进行交互。
:::

### 属性和方法

1. `fs.readdir(path, callback)`
:::tip
异步读取目录的内容。 回调有两个参数 (err, files)，其中 files 是目录中文件名的数组，不包含 '.' 和 '..'。
:::

2. `fs.readdirSync(path)`
:::tip
异步读取目录的内容，返回目录中文件名的数组。
:::

3. `fs.rename(oldPath, newPath, callback)`
:::tip
异步修改文件名。 回调有一个参数 (err)，oldPath， newPath 可以相对路径或绝对路径。
`fs.rename`不只修改文件名，也能复制移动文件，触发了`fs.rename`，可改变`fs.watch()`的事件类型参数。
`fs.rename`与`fs.writeFile`不同，不能像`fs.writeFile`重写文件内容，但`fs.writeFile`也能做到`fs.rename`做到的事。
利用`fs.readdir()`和`fs.rename()`把名字包含'-'的图片替换成'_':
:::

``` javascript
const fs = require('fs');
const src = './icons';

fs.readdir(src, function(err, files) {
	if (err) {
		console.log(err);
	}
	files.forEach(function(file) {
		if (/_/.test(file)) {
			let oldPath = src + '/' + file,
				newPath = src + '/' + file.replace(/_/g, '-');
				console.log('newPath', newPath);
			fs.rename(oldPath, newPath, function(err) {
				if (!err) {
					console.log('done!');
				} else {
					console.log(err);
				}
			});
		}
	});
});
```

4. `fs.writeFile(file, data, callback)`
:::tip
异步地写入数据到文件，如果文件已经存在，则覆盖文件。 data 可以是字符串或 buffer。callback参数err，file参数可以是路径可以是字符串。
:::

5. `fs.readFile(path, callback)`
:::tip
异步读取文件，callback有两个参数(err, data), data是Buffer类型，调用`toString()`即可变成字符串。
:::

利用`fs.readFile()`和`fs.writeFile()`修改文件内容：
```javascript
    // 修改index.html文件内容
    const fs = require('fs');
    const path = require('path');
    fs.readFile(path.resolve(__dirname, 'index.html'), (err, html) => {
        if (err) {
            console.log(err);
        }
        let tpml = html.toString();
        fs.writeFile('second.html', tpml, err => {
            if (err) {
                console.log(err);
            }

            console.log('文件已经保存');
        });
    });
```

6. `fs.createReadStream(path)`
:::tip
读取流数据。
:::
```javascript
// 流数据
const fs = require('fs');

// 可以读取json的内容
let stream = fs.createReadStream('./package.json');
    stream.on('data', chunk => {
        console.log('finished chunk:' + chunk);
    });

// 可以读取js的内容    
let otherStream = fs.createReadStream('./helloWorld.js');
    otherStream.on('data', chunk => {
        console.log('other chunk:' + chunk);
    });
```

如何把一张图片流到客户端：

```javascript
    const http = require('http');
    const fs = require('fs');

    http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'image/png'});
        // 设置一个从读取流到写出流的管道
        fs.createReadStream('./node.png').pipe(res); 
    }).listen(3000,'127.0.0.1');

    console.log('Server running at http://localhost:3000/');
```

7. `fs.mkdir(path, callback)`
:::tip
异步地创建目录，callback有一个参数error，但是不能一次生成多层文件夹，需要多次叠加调用。
:::

8. `fs.mkdirSync(path, callback)`
:::tip
同步地创建目录，callback有一个参数error，同样也不能一次生成多层文件夹，需要多次叠加调用。
:::

利用`fs.mkdirSync()`生成多层目录：

```javascript
    let dir = './dir/subdir/father/son';

    const mkMutiDir = (dir) => {
        let fragments = '';
        dir.split('/').forEach((subdir, i) => {
            fragments += '/' + subdir;
            if (i === 0) {
                fragments = fragments.slice(1);
                return;
            }
            console.log(fragments);
            fs.mkdirSync(fragments, err => {
                if (err) throw err;
            });
        });

        console.log('finished', fragments);
    };

    mkMutiDir(dir);
```

9. `fs.watch(filname, callback)`
:::tip
监视 filename 的变化，filename 可以是一个文件或一个目录。监听器回调（callback）有两个参数 (eventType, filename)。 eventType 可能是 'rename' 或 'change'，filename 是触发事件的文件的名称。在大多数平台，当目录中一个文件出现或消失时，就会触发 'rename' 事件。fs.watch 的接口不是 100％ 跨平台一致的，且在某些情况下不可用。
:::

## http-协议
:::tip
要使用 HTTP 服务器与客户端，需要 require('http')。
:::

### nodejs搭建简单的web服务器
```javascript
    // get、post都能请求
    const http = require('http');
    
    http.createServer((req, res) => {
        res.writeHead(200, {'ContentType': 'text/plain'});
        res.end('HelloWorld\n');
    }).listen(3000);

    console.log('Server running at http://localhost:3000/');
```

## net-网络
:::tip
net 模块提供了创建基于流的 TCP 或 IPC 服务器(net.createServer())和客户端(net.createConnection()) 的异步网络 API。
:::

1. `net.createServer(callback)`
:::tip
创建一个新的TCP或IPC服务，callback有一个参数socket，可以在回调里面监听socket的一些事件。
:::

## path-路径
:::tip
`path`模块提供了一些工具函数，用于处理文件与目录的路径。
:::

### 属性和方法

1. `path.resolve([...paths])`
:::tip
把路径或路径片段的序列从右到左解析成为一个绝对路径（末尾的斜杠会被删除），如果解析后还没生成绝对路径，当前工作目录会被用上。如果不传入path片段,path.resolve()会返回当前工作目录的绝对路径。
:::

2. `path.join([...paths])`
:::tip
用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。长度为零的 path 片段会被忽略。 如果连接后的路径字符串是一个长度为零的字符串，则返回 '.'，表示当前工作目录。
:::

## process-进程
:::tip
`process`对象是一个全局变量，它提供当前Node.js进程的有关信息，以及控制当前Node.js进程。因为是全局变量，所以不需要`require()`。
:::

### 属性和方法

1. `process.cwd()`
:::tip
是当前执行node命令时候的文件夹地址 ——工作目录。`__dirname`: 全局变量，返回当前运行js文件所在的文件夹目录。通常与`process.cwd()`返回的路径是一样的。
:::

2. `process.env`
:::tip 
返回一个包含用户环境信息的对象。
:::

可以修改这个对象：
```javascript
    // 在命令行输入
    node -e 'process.env.foo = "bar"' // 但不会生效

    // 下面这种方法会生效
    process.env.foo = 'bar';
```

在process.env新增属性会转换成字符串。

``` javascript
    process.env.test = null;
    console.log(process.env.test);
    // => 'null'
    process.env.test = undefined;
    console.log(process.env.test);
    // => 'undefined'
```
用`delete`删除process.env的属性

```javascript
    process.env.TEST = 1;
    delete process.env.TEST;
    console.log(process.env.TEST);
```

在window系统下，环境变量是不区分大小写的。

```javascript
    process.env.TEST = 1;
    console.log(process.env.test);
    // => 1
```
:::tip
在vue-cli可以使用process.env来切换开发环境api和测试环境api。
:::