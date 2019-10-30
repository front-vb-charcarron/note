# 行内块级元素

:::tip

* 行内块级元素，集合了两者的特点, 既可以设置宽高和内外边距, 还可以跟其它非块级元素共处一行。
* 是一个好元素。

:::

### 常用的行内块级元素

* img
* video
* audio
* input
* select
* textarea
* button
* canvas

## audio

:::tip
音频标签
:::

|属性名|描述|
| :---: | :---: |
|preload|预加载|
|autoplay|自动播放|
|controls|控制面板|
|loop|循环播放|

:::tip
可以缩写成 autoplay 等等。。
考虑多文件类型写法
:::

``` html
    <audio src="media/Audio/xxxxx.mp3" controls="controls" preload autoplay loop>
    </audio>
    <audio controls="controls" preload autoplay loop>
        <source src="media/Audio/xxxxx.mp3" type="audio/mp3">
        </source>
        <source src="media/Audio/xxxxx.ogg" type="audio/ogg">
        </source>
        <p>您的浏览器不支持音频播放请尽快<a href="http://www.baidu.com"></a></p>
    </audio>
```

:::tip
尽量使用mp3后缀名，基本可以兼容全部浏览器
:::

### 解决ios音乐在微信端不能播放的问题:

``` javascript
	document.addEventListener("WeixinJSBridgeReady", function() {
	    music.play();
	});
```

## button

:::tip
与input标签的button没有什么区别。
:::

## img

:::tip
图片标签
:::

|属性名|描述|
| :---: | :---: |
|src|图片的源，通常写图片文件的路径|
|alt|加载失败的时候会出现的文字|
|title|图片描述文字，鼠标悬停后出现|

### src路径问题

:::tip
../返回上级目录
:::

1. 相对路径 ：相对灵活，只要保证其父目录的完整性，但文件必须存放在本地。
2. 物理绝对路径 ：笨重，只要稍微改动目录结构或盘符，则失败，并且也不能被远程访问。
3. 网络绝对路径：更加广泛，文件存放在远程服务器上， 只要能联网，就可以访问

:::tip
ps: 图片其实是一堆二进制编码。
:::

## input

:::tip
- 接受来自用户的数据，以创建基于web的表单交互控制。
- 因其type属性不同，所以是个多样化的标签。
- ps: 最多花样的标签, 大概没有之一。
:::

### input基本属性

|属性名|描述|
| :---: | :---: |
|type|定义input不同的类型。|
|name|定义input不同的名字, 防止产生冲突|
|value|定义提交到后台的信息，一般会用字母或者数字来填写，但有些input类型的value定义不同，例如button, submit这样的按钮类型|
|id|标记input，可以与label联动|
|size|input的宽度|
|readonly|是否只读|
|maxlength|输入字符的最大长度|
|disable|是否禁用|
|placeholder|提示语|

:::tip
ps: 只要不是用户输入的值都要给该控件设置一个默认值(value)
:::

### type属性

|属性名|值|描述|
| :---: | :---: | :---: |
|type|text|输入普通的文本, 例如username等。|
|type|password|输入密码, 值会根据浏览器不同以圆点或星号显示。|
|type|submit|向后台提交表单，以按钮的形式显示。|
|type|radio|单选框，以圆点小框显示，常用来选择性别, 可与label标签联动。|
|type|checkbox|多选框，也可与label标签联动。|
|type|number|限制只能输入数字的文本框。|
|type|file|上传文件的文本框, 若要多重上传文件设置multiple。|
|type|search|定义搜索文本框, 可与submit一起用。|
|type|image|定义图像作为按钮。|
|type|hidden|提交不需要用户参与和修改的数据。|

### hidden类型

``` html
    <!--
        还是会按照正常的数据进行提交，只不过不需要用户的参与和修改而已
    -->
    <form action="">
        <input type="hidden" name="ip_address" value="127.0.0.1" />
        <input type="submit" value="提交" />
    </form>
```

:::tip
ps:</br>
- file类型的input在使用时，要在form标签里指定method为post并设置enctype属性为multipart/form-data，
- file类型的input还可以添加accept属性来限制上传文件的类型
:::

```html 
	<input accept="image/gif, image/jpeg, audio/mp3"/>
``` 

### 与label联动
:::tip
radio与label的联动
:::
``` html
		<input type="radio" name="sex" id="man" value="" />
		<label for="man">男</label>
		<input type="radio" name="sex" id="women" value="" />
		<!--防止冲突 name属性-->
		<label for="women">女</label>
```

### checkbox与label联动

```html 
    <input type="checkbox" name="che" id="num1" value="" />
    <label for="num1">1</label>
    <input type="checkbox" name="che" id="num2" value="" />
    <label for="num2">2</label>
    <input type="checkbox" name="che" id="num3" value="" />
    <label for="num3">3</label>
```

## select

:::tip
下拉框
:::

|属性名|描述|
| :---: | :---: |
|name|说明|
|size|下拉列表框的显示行数|
|multiple|是否多选|
|disabled|是否禁用|
|selected|设置默认选中的值|

```html
    <select name="city">
        <optgroup label="广东省">
            <option value="广州">广州</option>
            <!--value 提交到后台-->
        </optgroup>
            <option value="深圳">深圳</option>
            <option value="佛山">佛山</option>
    </select>
```

:::tip
+ optgroup 可与label属性一起用</br>
+ select的最后结果就是选中option的value</br>
+ 可以把 multiple 属性与 size 属性配合使用，来定义可见选项的数目
:::

## textarea
:::tip
文本域
:::

|属性名|描述|
| :---: | :---: |
|name|说明|
|rows|指定文本框的高度|
|cols|指定文本框的宽度|

```html
	<textarea name="" rows="10" cols="30" placeholder="请输入100字以内的内容">
    </textarea>
```
:::tip
为了不影响布局可以使用css样式resize:none;来设置textarea的拖放。
:::

## video

:::tip
视频标签
:::

|属性名|描述|
| :---: | :---: |
|src|文件源|
|loop|循环播放|
|autoplay|自动播放|
|preload|预加载|
|controls|控制面板|
|width|视频播放器的宽度|
|height|视频播放器的高度|

### 常规用法
```html
	<video src="xxx.mp4" preload autoplay controls width="300" height="200">
		<source src="xxx.mp4" type="video/mp4"></source>
		<source src="xxx.mp4" type="video/mpeg"></source>
		<source src="xxx.mp4" type="video/avi"></source>
		<p>您的浏览器不支持video标签</p>
	</video>
```

### 关于微信h5视频类型推广页面的问题：

|属性|属性值|描述
| :---: | :---:|:---: |
|preload|none|禁止了自动加载，由用户决定加载的时机|
|webkit-playsinline|true|是ios 10中设置可以让视频在小窗内播放，也就是不是全屏播放|
|playsinline|true|微信浏览器支持小窗内播放|
|x-webkit-airplay|allow|这个属性应该是使此视频支持ios的AirPlay功能|
|x5-video-player-type|h5|启用H5播放器,可以让视频全屏播放并不显示进度条，并且支持在视频上叠放任意元素，但在安卓上会有一下的闪屏.|
|x5-video-player-fullscreen|true|全屏设置,它有两个属性值，ture和false，true支持全屏播放，false不支持全屏播放|
|x5-video-orientation|portraint|播放器支持的方向，landscape横屏，portraint竖屏，默认值为竖屏|

:::tip
1. android视频能在本地服务器测试播放 ，而ios需要上传到服务器在微信内置浏览器才能正常播放(貌似是因为合法域名，可以尝试phpStudy来转一下域名测试)。
2. 视频格式为H.264,码率能影响视频的质量。
3. 如果想要在微信端自动播放视频可以使用wx.ready();
