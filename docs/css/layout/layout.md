# 布局

## 格式化上下文(formatting contexts)

:::tip
什么是格式化上下文？它是CSS2.1规范中提出的一个概念，定义的是页面中的一块渲染区域，
类似编程语言中的“独立作用域”，格式化上下文分为两种：1. 块级格式化上下文（Block 
Formatting Contexts, BFC) 2. 内联格式化上下文（Inline Formatting Contexts, IFC）。
:::

## BFC

**1. 如何形成BFC？**

满足一下任意条件可以创建一个新的BFC:

* 根元素
* 脱离普通文档流的元素（浮动、绝对定位、固定定位）
* 非块级元素（ `display` 属性为 `inline-block` 、 `table` 、 `flex` 等）
* overflow属性值不为 `visible` 的块级元素

**2. BFC的对布局的影响**

* 同一个BFC内垂直方向相邻的块级元素会发生 `margin` 重叠，即两者 `margin` 取决于双方 `margin` 最大值而不是 `margin` 之和，但水平方向不会发生 `margin` 重叠。

:::tip
**解决方法：**

1. 修改其中一个块级元素为内联元素或者浮动元素。
2. 只在同一个垂直方向设置 `margin` 。
3. 可以用border隔开。

:::

* 两个元素为上边相邻的父子元素，设置子元素 `margin-top` 变成了父元素的 `margin-top` 。

:::tip
**解决方法：**

1. 设置其父元素的padding值来达到目标元素设置外边距。
2. 为其父元素添加一个透明边框。
3. 为父元素创建一个新的BFC，父元素加上 `overflow: auto` 。

:::

* BFC是页面上隔离的独立容器，内部元素不会与外部元素相互影响。
* 在计算BFC高度时，内部的浮动元素也会被计算在内。

## IFC

**1. 如何形成BFC？**

当多个内联（块级）元素排列在一起的时候就会形成一个IFC，这些内联（块级）元素之间不能穿插有块级元素，否则会被切割成多个IFC。

**2. IFC对布局的影响**

主要有三个方面:

* 一个IFC内的元素都是水平排列的。
* 横向的 `margin` 、 `border` 、 `padding` 都是有效的。
* 垂直方向可以调整对齐方式

:::tip
内联块级元素与内联块级元素并排时，是有小间隙的，可以为其父元素设置 `font-size:0` , 若目标元素要设置字体大小再自行设置。
:::

## 一些注意事项

1. 行内元素在垂直方向上不能设置外边距。
2. 行内元素的容器大小由其内容和内边距决定，line-height不能改变容器大小，只能改变容器距离其他元素的上下距离。

3.line-height值比其font-size值小时，line-height就等于font-size。

4. 关于PC端缩放布局混乱的解决方法，定宽布局，特别是是用ul, li布局时要给ul和每个li定宽。

## 定位

### 绝对定位（ `position: absolute` ）和固定定位（ `position: fixed` ）

:::tip
两者都是完全脱离文档流，在普通文档流中完全不占据任何空间，相邻元素无法感知到它们的存在。
:::

### 绝对定位的特性

* 独立性：绝对定位元素不会干扰普通文档流中的其他元素排布。
* 定位上下文：支持用top、right、bottom、left四个属性来设置元素上、右、下、左各边的位置，参考定位的元素为由下往上第一个不为静态定位的祖先元素或根元素。
* 层叠：通过 `z-index` 属性设置与其他元素的层叠关系。
* 滚动：虽然不能撑起父元素高度，但是父元素可以感知其存在，当父元素支持滚动条且绝对定位元素超出父元素大小时将出现滚动条，同时绝对定位元素会一起跟随滚动。

### 固定定位的特性

固定定位与绝对定位的前3个特性基本一致，不同的是它不会随父元素滚动，而是固定在浏览器某个位置，同时它是相对于整个窗口进行上、右、下、左、各边设置的。

## 视口(viewport)

|viewport|描述|
| :---: | :---: |
|视觉视口|设备的物理可视区域|
|布局视口|默认980px宽度用于布局的视口|
|完美视口|与设备大小一致的布局视口|

``` html
	一般做移动端设置
	<meta name="viewport" content="width=device-width,
	initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
	即可。
```

:::tip
为什么iphone6的布局视口是375px而设计图是750px?
:::

``` 
 	因为iphone的屏幕是Retina屏(视网膜屏),
 	即所说的2k屏/3k屏等（其原理是用2个/3个像素去显示一个像素，使得屏幕更为细腻。）,
 	如果用375px作为设计图的话，图片会变得模糊，所以设计图是750px。
```

## rem

:::tip
rem 在html根的位置设置font-size，rem就是根据这个font-size来计算的相对单位。
:::

## em 

> 相对于父元素的相对单位。

### em和rem的区别：开关与总闸。

### 移动端的适配。

``` javascript
通过js动态算出不同设配的独立视口的逻辑像素。

//移动端头尾的固定
document.body.style.height = window.innerHeight + 'px';
//动态求Rem的大小
function recalc() {
    var clientWidth = document.documentElement.clientWidth;
    if (!clientWidth) return;
    document.documentElement.style.fontSize = 40 * (clientWidth / 750) + 'px';
    //字体大小 = 	  1个rem单位表示多少像素 (设备的宽度  / 设计宽度)  

    // 设计字体大小/设计图大小 = 屏幕字体大小/屏幕的大小
}
//监听手机是否有横屏
function initRecalc() {
    recalc();
    var resizeEvt = 'orientationchange' in window ?
        'orientationchange' :
        'resize';

    if (!document.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
}
initRecalc();
```

### 拓展

#### vw

把屏幕宽度分成100份，1vw即是屏幕宽度的1%。与rem一样都是相对单位，但兼容性不够rem好。
[一些关于vw的方案](https://www.cnblogs.com/moqiutao/archive/2019/03/04/10473415.html)

## 移动端布局

PS：设计图最好要 640 * 1040

### 布局技巧

1. 如果想让多个连续的行内块垂直方向对齐，需要在多个行内块元素的父元素设置一个行高，然后这几个行内块元素设置 `vertical-align` 。

2. 若行内元素或行内块垂直对齐时上方存在小缝隙可用 `vertical-align:top` 对齐。

3. 在移动端定位会由于不同机型高度不同而导致布局高度有所偏差，这时候最好用百分比来定位。

4. 可通过 `transform:scale` 和媒体查询进行不同移动端进行适配。

### 两列式布局 一列固定 一列自适应

1. 让固定的一列设置固定宽度并且设置浮动属性。
2. 然后在固定列的的后面，写自适应列。不需要设置宽度，记得设置 `overflow:hidden` ; 这样自适应的内容就不会出现在浮动列的后面

``` html
<style>
    .left {
        width: 100px;
        float: left;
        background: pink;
    }

    .right {
        width: auto;
        background: skyblue;
        overflow: auto;
    }
</style>
</head>

<body>
    <div class="container">
        <div class="left">left</div>
        <div class="right">rightright
            rightrightrightrightright
            rightrightrightrightrightright
            rightrightrightright</div>
    </div>
</body>
```

### 三列式布局（利用浮动的原理）

1. 最左边元素 `float: left` 。
2. 最右边元素 `float: right` 。
3. 中间元素设置宽度然后 `margin: 0 auto` 。

``` html
<style>
    .left {
        background: pink;
        width: 100px;
        float: left;
    }

    .right {
        background: orange;
        width: 100px;
        float: right;
    }

    .center {
        background: skyblue;
        width: auto;
        margin: 0 auto;
    }
</style>
</head>

<body>
    <div class="container">
        <div class="left">left</div>
        <div class="right">right</div>
        <div class="center">center</div>
    </div>
</body>
```

### 让图片自适应固定的容器

第一种方法：

``` html
    <style>
        .img-wrap {
            width: 100px;
            height: 50px;
            position: relative;
        }

        .img-wrap img {
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    </style>
    </head>

    <body>
        <div class="img-wrap">
            <img src="" alt="">
        </div>
    </body>
```

第二种方法：

``` html
    <style>
        .img-wrap {
            width: 100px;
            height: 50px;
            background: url(imgUrl) center / contain no-repeat;
        }
    </style>
    </head>

    <body>
        <div class="img-wrap">
        </div>
    </body>
```

### ios在微信浏览器一些坑

1. `input` 里的文字会被吃掉，需要设置 `line-height` ，与 `height` 相等即可。
2. 设置 `::-webkit-scroll-bar` 无法消除ios滚动条, 目前只能给有滚动条的元素外部容器缩小高度设置 `overflow: hidden;` 隐藏滚动条

## 媒体查询

:::tip
在不同尺寸设备宽度下，应用不同的样式。
:::

### 两种写法

``` html
<link rel="stylesheet" href="css/index768.css" media="screen and (max-width:768px)" />
<link rel="stylesheet" href="css/index991.css" media="screen and (min-width:768px) 
and (max-width:991px)" />
```

``` css
	@media screen and (min-width:1200px) {
	    .son {
	        width: 25%;
	    }

	}
```

### 不同屏幕下的阀值

:::tip
超小屏幕  < 768px (xs)</br>
小型屏幕  768px < x < 992px (sm)</br>
中型屏幕 992px < x < 1200px (md)</br>
大型屏幕 1200px < x (lg)
:::

## 响应式布局

:::tip
在不同的设备下，对布局和样式做出不同的调整。
:::

### 什么情况下采用?

1. 成不不足，只有一套设计图想要不同的效果时。
2. 网站内容相对简单，预选不够，追求简单、单一。

### 缺点

1. 体验不够
2. 代码慵余

### 原理

媒体查询+float(流式布局)+百分比

## 移动端1px解决方案

### 1条边

```css 
.setOnePx{
  position: relative;
  &::after{
    position: absolute;
    content: '';
    background-color: #e5e5e5;
    display: block;
    width: 100%;
    height: 1px; 
    transform: scale(1, 0.5);
    top: 0;
    left: 0;
  }
}

```

### 4条边

```css
.setBorderAll{
    position: relative;
    &:after{
        content:" ";
        position:absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        transform: scale(0.5);
        transform-origin: left top;
        box-sizing: border-box;
        border: 1px solid #E5E5E5;
        border-radius: 4px;
    }
}
```
