# 关于CSS

:::tip
Cascading Style Sheets **(层叠样式表)**</br>
CSS 能够对网页中元素位置的排版进行像素级精确控制</br>
CSS不仅可以静态地修饰网页，还可以配合各种脚本语言动态地对网页各元素进行格式化。</br>
拥有对网页对象和模型样式编辑的能力。
:::

### W3C的3个W

:::tip
W3C的三个w的指的是what、why、where。
:::

### css的关于w3c标准的三个答案。

1.**What** </br>
层叠样式表, 犹如一层包装纸，包裹在盒子(HTML架构)上。
2.**Why** </br>
提高开发效率 、功能、 架构。
3.**Where** </br>
用于美化HTML页面，配合各种脚本语言。

### css目的

:::tip
将表现与结构分离。
:::

## box-sizing

:::tip
改变盒子模型，为容器固定宽高。
默认值为content-box。
:::

### 属性值
|值|描述|
| :---: | :---: |
|content-box|width，height只是内容的宽和高|
|border-box|width, height算进了content大小+border的宽度+padding值，padding通过压缩content大小来保持容器大小不变。|

## float

:::tip

改变块级元素的占一行的特性，用来达到块级元素并排的效果。
任何元素都可以浮动。

:::

### 浮动的规律

1. 让设置的元素往指定的方向移动，直到碰到父元素的边界或碰到其他浮动元素。

2. 设置了浮动的元素，会丢失自己原来的能力。

3. 获取到新的能力。 类似块级的所有特点(除了占一行)。

4. 脱离了文档流(从左到右)脱离了“地面“(这也是后面的元素会顶替位置的原因，需要清除浮动)

### 清除浮动的方法

1. 在父元素上添加 `.clearfix` 

``` css
	.clearfix::after {
	    content: '';
	    display: block;
	    clear: both;
	}
```

2. 在浮动元素的后面添加 `<div class="clear"></div>` 

``` css
	.clear {
	    clear: both;
	}
```

### 属性值
|值|描述|
|:---:|:---:|
|left|向左边浮动|
|right|向右边浮动|
|none|取消浮动|

## letter-spacing
:::tip
设置对象中的字符之间的最小，最大和最佳间隙。
:::

|值|描述|
| :---: | :---: |
|length|设置像素等长度，可以为负值。|
|percentage|设置百分比, 可以为负值。|


## margin
:::tip
外边距。
margin-top, margin-bottom, margin-left, margin-right的复合属性
:::

### 属性值
|值|描述|
| :---: | :---: |
|length|margin设置像素值，可以负值|
|percentage|margin设置百分比，可以为负值|

### 设置多个属性值
1. 4个值的时候，值按 上 右 下 左的方式编写(顺时针)

2. 3个值的时候，值按上  左右  下的方式编写

3. 2个值的时候，值按 上下   左右的方式编写

4. 1个值的时候，四个方向的外边距都为该值。


## padding
:::tip
内边距
:::

### 属性值
|值|描述|
| :---: | :---: |
|length|设置像素值，不能为负值。|
|percentage|设置百分比，不能为负值。|

### 设置多个属性值
1. 4个值的时候，值按 上 右 下 左的方式编写(顺时针)

2. 3个值的时候，值按上  左右  下的方式编写

3. 2个值的时候，值按 上下   左右的方式编写

4. 1个值的时候，四个方向的外边距都为该值。

## text-align

:::tip
设置内容的水平对齐方式, 还可以设置行内元素。
:::

|值|描述|
| :---: | :---: |
|left|水平左对齐|
|center|水平居中|
|right|水平向右|
|justify|两端对齐(css3)|

:::warning
justify在ie浏览器只是部分支持。
:::

## text-overflow

:::tip
控制内容溢出的样式
:::

### 属性值
|值|描述|
| :---: | :---: |
|clip|当内联内容溢出块容器时，将溢出部分裁剪掉。|
|ellipsis|当内联内容溢出块容器时，将溢出部分替换为(...)。|

但是text-overflow只是用来说明文字溢出时用什么方式显示，
要实现溢出时产生省略号的效果，还须定义强制文本在一行内显示（white-space:nowrap）
及溢出内容为隐藏（overflow:hidden），只有这样才能实现溢出文本显示省略号的效果。

### 单行文字溢出
``` css
/*单行文字溢出处理*/
.div1 {
    width: 50px;
    background: skyblue;
    /*1禁用换行*/
    white-space: nowrap;
    /*2超出部分隐藏*/
    overflow: hidden;
    /*3 出现省略号1*/
    text-overflow: ellipsis;
}
```

### 多行文本溢出

``` css
.div2 {
    font-size: 16px;
    width: 50px;
    height: 87px;
    /*多行省略的时候，要注意该高度，最好是等于最大行数乘以行高*/
    background: skyblue;
    /*超出内容隐藏*/
    overflow: hidden;
    /*设置出现省略号*/
    text-overflow: ellipsis;
    /*设置为弹性伸缩盒子*/
    display: -webkit-box;
    /*设置内容出现最大行数*/
    -webkit-line-clamp: 4;
    /*设置排版方向从上到下*/
    -webkit-box-orient: vertical;
}
```

### 字母和数字溢出

```css 
.div3{
    margin-top: 100px;
    width: 500px;
    background: skyblue;
    /*可以让中文和单词在遇到容器边界的时候后自动换行，数字和字母不符合这个规则* */
    white-space: normal;
    /*所以这个时候就需要这个玩意出现了，控制非中文字符遇到边界的时候强制断行。*/
    word-break: break-all;
}    
```







				
				
    

