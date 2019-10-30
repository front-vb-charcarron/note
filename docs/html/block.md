# 关于块级元素

:::tip
块级元素独自占一行，不愿意跟其他元素共处一行，可设置宽高和设置内外边距。
:::

### 常用的块级元素

* div
* p
* h1~h6
* hr
* ul
* ol
* dl
* form
* table
* td
* iframe
* section
* aside
* header
* footer
* html
* body

### 块级元素基本属性

#### width

:::tip
块级元素的宽度
:::

#### height

:::tip
块级元素的高度
:::

|属性名|描述|值1|值2|值3|
| :---: | :---: | :---: | :---: | :---: |
|align|控制块级元素的水平位置|left|center|right|
|valign|控制块级元素的水平位置|top|middle|bottom|
|bgcolor|控制元素的背景颜色|

:::tip
ps: align 居中的方式 块级元素align使块级里面内容居中， 而 `<table align="center"></table>` 使table自身居中
:::

## header

:::tip
语义化标签, 用来作为页面头部内容的容器。
:::

## section

:::tip
语义化标签, 用来作为页面中部内容的容器。
:::

## acticle

:::tip
语义化标签, 用来作为文章内容的容器。
:::

### aside

:::tip
语义化标签, 用来作为侧边栏的容器。
:::

## footer

:::tip
语义化标签, 用来作为页脚的容器。
:::

## div

:::tip
无色无味的容器，但是它是一个标准的块级元素
:::

## dl

:::tip
自定义列表, 如其名有不同的格式。
:::

``` html
		<dl>
		    <dt>新闻标题</dt>
		    <dd>新闻内容描述</dd>
		    <dt>新闻标题2</dt>
		    <dd>新闻内容描述2</dd>
		    <dt>新闻标题3</dt>
		    <dd>新闻内容描述3</dd>
		</dl>

		<h1>其余组合</h1>
		<dl>
		    <dt>xin</dt>
		    <dt>xin</dt>
		    <dt>xin</dt>
		    <dt>xin</dt>
		</dl>

		<dl>
		    <dt>1</dt>
		    <dd>2</dd>
		    <dd>3</dd>
		    <dd>4</dd>
		</dl>
```

## form

:::tip
包裹在table、input标签外层的标签，像提交问卷调查一样提交信息到后台。
:::

### 属性

* action

提交方式

|属性名|描述|
| :---: | :---: |
|method|get|
|method|post|

### get特点

* 在url上拼接form表单里的数据，以？隔开, 以&符号拼接不同的数据

### post特点

* 在url没有任何的表单信息，并且需要用服务器接收数据

### get和post区别

* get数据是裸露的，安全性较低 数据量小的
* post 数据相对隐秘，数据量大的

:::tip
所以一般传输图片、视频文件都是用post方式。
:::

### 拓展

1. 当 POST 请求是通过除 HTML 表单之外的方式发送时, 例如使用 XMLHttpRequest, 那么请求主体可以是任何类型.

enctype

2. 当 method 属性值为 post 时, enctype 是提交form给服务器的内容的 MIME 类型(媒体类型) 。可能的取值有:
* application/x-www-form-urlencoded: 如果属性未指定时的默认值。
* multipart/form-data: 这个值用于一个 type 属性设置为 "file" 的 `<input>` 元素。
* text/plain (HTML5)
* 这个值可以被 `<button>` 或者 `<input>` 元素中的 formenctype 属性重载（覆盖）。

3.formenctype HTML5

* 如果button是submit类型，此属性值指定提交表单到服务器的内容类型。可选值：
* application/x-www-form-urlencoded: 未指定时的默认值。
* multipart/form-data: 如果使用input标签type属性设置文件，使用此值。
* text/plain
* 如果指定此属性，它将重写button的表单拥有者的enctype属性。

4. 可通过打开chrome的Network来查看form提交的情况
  + 200 表示成功完成请求和响应。
  + 300表示请求和响应的过程中出现第三者...
  + 400表示文件丢失。
  + 500表示请求成功但是服务器没有响应。

5.post方法用js以formdata的形式提交时需要对参数对象进行序列化操作， 不然后台无法获取前端传的参数，

本质上其实是操作是：

``` javascript
    {
        name: 'foo',
        subname: 'bar'
    }

    // 转成这样的形式
    'name=foo&subname=bar'
```

:::tip
序列化：简单来说就是把对象转成字符串的形式，方便存储和网络传输。
:::
:::tip
如果使用axios库可以使用node的一个包 `qs` 去序列化参数对象
:::

## h1~h6

:::tip
标题标签，数字越小字体越小，一般一个页面只有一个h1。
:::

``` html
    <h1>1级标题</h1>
    <h2>2级标题</h2>
    <h3>3级标题</h3>
    <h4>4级标题</h4>
    <h5>5级标题</h5>
    <h6>5级标题</h6>
```

## hr

:::tip
分割线
:::

* 具有独特的属性size，范围1~7，数字越大越粗。

## html

:::tip
超文本标记语言hypetext markup language
:::

* 超文本, 指文本、音频、视频、链接、图片等等的内容
* 标记语言，表示这门语言会有类似箭头标记的风格，指明每个内容的具体区域
* 并且它是一门语言，所以会有自己的语法

### head

:::tip
头部标签专门存放我们看不到的内容： 例如meta标签、标题title、样式的引入
:::

### meta 

* 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。
* 标签位于文档的头部，不包含任何内容。<meta> 标签的属性定义了与文档相关联的名称/值对

### body

:::tip
页面上可视元素的父元素
:::

* 有自己的内边距和外边距
* 严格上来说body是一个块级元素

### base

:::tip
base标签的作用, 其实就指定了一个路径前缀，在该页面中出现的所有相对路径，都会自动拼接上这个一个路径前缀。
设置了base标签后不需要出只需要进。
:::

``` html
	<!DOCTYPE html>
	<html>

	<head>
	    <meta charset="UTF-8">
	    <title>base</title>
	    <base href="/20170721HTML/" />
	</head>

	<body>
	    <img src="img/map.jpg" alt="" />
	</body>

	</html>
```

## iframe

:::tip
内嵌窗口
:::

|属性名|描述|
| :---: | :---: |
|frameborder|框架的宽度|
|scrolling|是否允许窗口内滚动|

:::tip
iframe可以搭配form表单, 可以实现无刷新提交, 做到类似ajax的效果, 通过form标签的target属性和iframe标签的name属性结合
:::

``` html
    <iframe name="ifr" style="display: none;"></iframe>
    <form action="http://127.0.0.1:8088/formdata" method="POST" target="ifr">
        <label>金额：</label>
        <input type="text" name="price">
        <input type="submit" value="提交">
    </form>
```

## ol

:::tip
表示列表，具有顺序。
也有type属性，值默认为1，即列表前的数字。
:::

### type属性

* A(大写字母)
* a(小写字母)
* 1(阿拉伯数字)
* i(小写罗马数字)
* I(大写罗马数字)

### start属性

:::tip
表示顺序的起始位置， 但要注意，这里的值表示具体字符的位置，所以必须是数字(下标索引)
:::

``` html
    <ol type="A" start="7">
        <!--G --下标7-->
        <li>新闻0001</li>
    </ol>
```

## p

:::tip
段落标签p，内部不能再嵌套块级元素。
:::

* p标签本身具有边距，而div是无色无味的，这也是div比它更合适当容器的原因。
* 如果在p标签里面嵌套p标签会生成3个p标签 。
* 不要在p标签里写块级元素标签，否则会具有奇怪的”间隙“

:::tip
ps：一般人是不会p标签嵌套p标签，也不是没有块级元素嵌套块块级元素，例如div嵌套div。
:::

``` html
<p align="center">我是一个段落标签</p>
```

# table标签
:::tip
表单标签。</br>
可用于布局但会留有缝隙, 所以不是主流的布局方式。
:::

|属性名|描述|
| :---: | :---: |
|border|边框粗细|
|cellpadding|边框以内的边距|
|cellspacing|单元格之间的距离|
|bgcolor|颜色|

### 布局方式

* 列的合并
1. 找到要合并的列的最左边的那个
2. 给他加上colspan属性， 属性为要合并的列的个数
3. 把合并的单元格删除或注释
* 行的合并
1. 找到要合并的行的最上边的那个
2. 给他加上rowspan属性， 属性为要合并的行的个数
3. 把合并的单元格删除或注释
* 制作一个纯色细边框
1. 设置border=0,
2. 设置cellspacing,值为边框的粗细
3. 给table设置bgcolor，值为边框颜色
4. 给tr设置bgcolor，值为页面的背景色
* 制作一个纯色细边框2
1. 设置只设置td的`border-left`和`border-top`
2. 设置table的`border-left`和`border-top`
3. table的伪类作为右边的边框和底部的边框

## ul
:::tip
表示列表，并且无序化。<br/>
具有特有type属性,值默认为disc,用于修改列表前的圆点。
:::
### type属性
- circle(空心圆)
- square(实心方形)
- disc(实心圆)
```html
    <ul>
        <li align="center">新闻1</li>
        <li align="center">新闻2</li>
        <li align="center">新闻3</li>
    </ul>			
```

## map
:::tip
用来实现图片热区的标签。
:::
```html
	<img src="img/map.jpg" alt="" usemap="#hotmap"/>
	<map name="hotmap">
		<area 
			shape="rect" 
			coords="181,118,278,204" 
			href="http://zhihu.com" 
			alt="知乎" 
			target="_blank"
		/>
		<area 
			shape="circle" 
			coords="372,181,7" 
			href="http://csdn.net" 
			alt="csdn程序员社区" 
		/>
		<area 
			shape="poly" 
			coords="638,276,633,173,526,208" 
			href="http://sports.qq.com" 
			alt="NBA" 
		/>
	</map>
```
 
<!-- more -->
    
    
    
    

