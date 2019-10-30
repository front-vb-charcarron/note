# 什么是JavaScript

:::tip
脚本解析型语言(同样是脚本解析性语言php)
:::

## JavaScript的特点

1. 跨平台
2. 变量 弱类型，虽然对于开发过程比较自由，但是数据类型的使用上容易出现类型转换的问题

ps: 强类型: 对开发者要求比较高，保证代码的严谨性。

## JavaScript的构成

1. ECMAScript
2. Dom
3. Bom

## JavaScript的定位/javascript能做什么

1. 网页制作 (用户交互、动画特效、系统制作、页游等)
2. 混合APP (Js基于安卓或IOS的开发 微信小程序(微信小程序会拿到手机更底层的东西))
3. 桌面级应用程序(js基于c/c++开发的，适用于PC、MAC、或Linux)
4. 物联网应用开发（流行的有ruff）

### 拓展

1. JavaScript很吃CPU， 原因是其运行时才会开始解析(与其他编译型语言不同，编译型语言是由编译器编译好才运行，但是开发的时候要等待其编译，而js是开发时不用等待解析)。
2. chrome V8引擎把js解析上升一个档次,这也是js流行的一个原因之一,V8也是用C写的。
3. JavaScript有转成C++的预编译器(Accerably),未来有可能变成编译型语言。

## 如何引入JavaScript

1. 行内引入

```html
	<button onclick="javescript:alert('你点到我了')">点我</button>
```

2. 页内引入

```html
	<script>
		.....
	</script>
```

3. 页外引入

```html
	<script src="js/index.js"></script>
```

## 阻塞

```html
    <!--defer 同步加载-->
    <script src="js/test.js" defer></script>
		
```		

+ 如果把script标签写在页头(即body的前面)会出现阻塞现象，主要的原因是脚本和页面时同步运行，也就是说页面要等待脚本加载完才开始加载这样就会造成一段留白的时间，影响体验。
+ 脚本默认是同步的。

## 异步

如果执意要把script标签写在body前面,我们可以设置其为异步。

```html
	<!--async 异步加载（ 防止阻塞）-->
	<script src="js/test.js" async></script>
```

最好我们还是把script标签写在body结束标签前面。

