# 关于行内元素

:::tip
行内元素只占本身大小, 可以跟其他共处一行 但并不能设置宽高(除了这几位**替换元素**:img、audio、video、canvas)等<br/>	
ps: 然而img、audio、video、canvas其实是行内块元素, 只是w3c默认把行内块元素归为行内元素。
:::

### 常用的行内元素

* a
* span
* b
* i
* del
* sup
* sub
* em
* br
* strong
* mark

### 关于行内元素布局的特点

**当行内元素并排紧贴时, 行内元素之间会有个缝隙**解决方案：给其父元素的 `font-size：0` , 若元素需要设置 `font-size` 再在自行设置。

## a
:::tip
专门用于链接各个网页的传送门。
:::

### 常规用法

``` html
	超链接标签`<a href="page/index.html" target="_blank">回到首页</a>

	<a href="http://lol.qq.com">英雄联盟官网</a><br />
	<a href="index.html">跳去首页</a>

	<!--
			邮箱链接
		-->
	<a href="mailto:6731910143@qq.com">发送邮件给自己</a>
	<!--
			打电话
		-->
	<a href="tel:13713883527">一键拨号</a>
	<!--
			
		SMS
		
		-->
	<a href="sms:13713883527">发短信</a>
	<!--
			带连接的图片
		-->

	<a href="http://www.baidu.com">
	    <img src="img/StartupWp.jpg" alt="百度" width="100" height="100" />
	</a>
```

### 锚点

:::tip
锚点的应用
:::

``` html
	<a href="#hash_name">起点</a>
	<a name="hash_name">终点</a>
```

:::tip
只要保证锚点名字一致，他们就是cp(可以雌雄同体)
:::

``` html
<a href="#hash_name" name="hash_name2">起点</a>
<a name="hash_name" href="#hash_name2">终点</a>
```

### a标签格式

:::tip
ps: 浏览器会自动下载不能识别的文件格式, 但不是所有的浏览器都可以
:::

``` html
<a href="a.zip"></a>
```

### 拓展

锚点的升级版： `element.scrollIntoView()` ：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)

## b
:::tip
+ 表示的文本从正常文本不同文体的跨度，没有传送任何特殊的重要性或相关性。<br/>
+ 一般用来表示只想不同但没有强调的意思的内容。<br/>
+ 以粗体呈现。
+ 仅当没有更合适的语义元素时才使用此元素。
:::

## del
:::tip
- 定义删除文本。
- 通常以删除线为表现形式。
:::
```html
   <!-- 实现打折的效果 -->
   <del>&yen;50</del>
   <!-- 无法使用del的情况下 -->
   <span style="text-decoration: line-through;">&yen;50</span>
```

## em
:::tip
- 表示需要强调的文本。<br/> 
- 强调的程度比strong弱.<br/>
- 斜体的形式呈现。
:::

## i
:::tip
- 一般技术术语，外语短语，或虚构的人物想法，没有什么语义。
- 与em标签一样以斜体的形式呈现，但与em标签的语义不同。
- 仅当没有更合适的语义元素时才使用此元素。
:::

## mark
:::tip
它可以在显示搜索结果的页面中使用，以突出搜索词的每个实例
:::

## span
:::tip
span是个无色无味的容器，跟div相似但div是块级元素而span是行内元素。<br/>
主要用于将元素分组添加class或id属性，仅当没有语义元素时才使用它。
:::

```html
    <p><span>Some text</span></p>
    <li>
        <span>
            <a href="portfolio.html" target="_blank">See my portfolio</a>
        </span>
    </li>
```

## strong
:::tip
表示需要强调的文本。<br/>
强调的程度比em强，如果em是大叫,那么strong就是尖叫。<br/>
以粗体形式呈现。
通常用于”警告！这非常危险“这一类的文本。
:::

## sub
:::tip
定义下标字体。
:::

## sup
:::tip
定义上标字体。
:::





