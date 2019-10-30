# 事件发射器

:::tip
利用Node.js内置的 `events` 模块，实现事件发射器处理重复事件。
:::

### 一个简单事件发射器：

``` javascript
    const net = require('net');
    const server = net.createServer(socket => {
        console.log('socket', socket);
        socket.once('data', data => { // 只接收一次并且第一条信息
            socket.write(data);
        });
    });

    server.listen(8888);
    console.log('Server open at http://localhost:8888/');
```

### 利用事件发射器和telnet实现多个命令行界面之间聊天室：

``` javascript
    // 利用事件发射器和telnet实现聊天室。
    // 事件发射器的原理有点像js设计模式的订阅-发布模式（观察者模式）

const net = require('net');
const events = require('events');
const channel = new events.EventEmitter(); // 生成事件发射器的一个实例

channel.clients = {}; // socket 存储用户
channel.subScriptions = {};

channel.on('join', (id, client) => { // 加入聊天
    channel.clients[id] = client;
    channel.subScriptions[id] = (senderId, msg) => {
        // 这里对监听了'broadcast'类型的事件函数进行循环调用
        // 使得每个在频道的socket都能收到信息
        if (id !== senderId) { // 排除自己收到信息。
            channel.clients[id].write(msg); //发送信息
        }
    }
    channel.on('broadcast', channel.subScriptions[id]); // 广播

    client.write('welcome!\nGuest online:' 
    + channel.listeners('broadcast').length); // 返回在线人数
});

channel.on('leave', id => { // 离开聊天
    //删除id指定的'broadcast'事件监听
    channel.removeListener('broadcast', channel.subScriptions[id]);
    delete channel.subScriptions[id];
    channel.emit('broadcast', id, id + 'has left.');
});

channel.on('shutdown', () => { 
    channel.emit('broadcast', '', 'chat has shut down.\n');
    // 删除broadcast类型的所有监听事件，达到关闭聊天服务但服务器还运行
    channel.removeAllListeners('broadcast');
})

const server = net.createServer(socket => {
    // 连接开始... net.createServer没有on('connect')连接事件，连接成功则在这运行。
    let id = socket.remoteAddress + ':' + socket.remotePort;

    console.log('connected...' + id);

    channel.emit('join', id, socket);

    socket.on('data', msg => { // 接收信息
        msg = msg.toString();

        // 输入shutdown命令关闭聊天
        if (msg === 'shutdown\r\n') { 
            channel.emit('shutdown');
            channel.subScriptions = null;
            console.log('channel', channel);
        } else {
            channel.emit('broadcast', id, msg);
        }

    });

    socket.on('close', () => { // 关闭socket
        channel.emit('leave', id);
    });
});

server.listen({
    port: 4000,
    host: '127.0.0.1'
});

console.log('Server open at http://127.0.0.1:4000');
```

利用 `fs.watch` 、 `fs.rename` 、 `util模块` 、 `事件发射器` 实现监听一个文件夹并把改变复制到另一文件夹:

``` javascript
    var events = require('events');
    var util = require('util');
    var fs = require('fs');

    var watchDir = './watchDir';
    var processedDir = './processedDir';

    function Watcher(watchDir, processedDir) {
        this.watchDir = watchDir;
        this.processedDir = processedDir;
    }

    // 用util.inherits继承events.EventEmitter的行为 
    // 类似 Watcher.prototype = new events.EventEmitter();
    util.inherits(Watcher, events.EventEmitter);

    Watcher.prototype.watch = function() {
        fs.readdir(this.watchDir, function(err, files) {
            files.forEach(function(file) {
                watcher.emit('process', file);
            });
        });
    };

    Watcher.prototype.start = function() {
        fs.watch(watchDir, function(eventType, filename) {
            console.log(eventType + ' ' + filename);
            watcher.watch();
        });
    };

    var watcher = new Watcher(watchDir, processedDir);

    watcher.on('process', function(file) {
        var newWatchDir = watchDir + '/' + file,
            newProcessedDir = processedDir + '/' + file;

        console.log('watchDir', newWatchDir);
        console.log('processedDir', newProcessedDir);
        fs.rename(newWatchDir, newProcessedDir, function(err) {
            if (err) throw err;
            console.log(file + ' done!');
        })
    });

    watcher.start();

    console.log('on watching...');
```

### 关于TCP、HTTP、Socket

:::tip
TCP-用于网络通信的协议, HTTP-用于数据传输的协议，Socket-网络上的两个程序通过一个双向的通信连接实现数据的交换，这个连接的一端称为一个socket。建立网络通信连接至少要一对端口号(socket)。socket本质是编程接口(API)，对TCP/IP的封装。
:::

