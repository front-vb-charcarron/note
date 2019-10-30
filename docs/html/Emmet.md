# Emmet

### 常用语法
 - '>' 父子关系
 - '+' 兄弟关系
 - '[]' 属性
 - '{}' 内容
 -  '*'  数量
 - '$' 自增符号 , 序号是从1 开始
 - '$$$' 不足补零

:::tip
+ $@*5  从1到5
+ $@-倒叙
+ $@-*5 从5到1
:::

```html
	<ul>li[align="center"]{新闻$}*10
	
	<ul>
		<li align="center">新闻1</li>
		<li align="center">新闻2</li>
		<li align="center">新闻3</li>
		<li align="center">新闻4</li>
		<li align="center">新闻5</li>
		<li align="center">新闻6</li>
		<li align="center">新闻7</li>
		<li align="center">新闻8</li>
		<li align="center">新闻9</li>
		<li align="center">新闻10</li>
	</ul>
	
	
	
	dl>(dt{新闻标题$}+dd{新闻内容描述$})*3
	
	
	<dl>
		<dt>新闻标题1</dt>
		<dd>新闻内容描述1</dd>
		<dt>新闻标题2</dt>
		<dd>新闻内容描述2</dd>
		<dt>新闻标题3</dt>
		<dd>新闻内容描述3</dd>
	</dl>
```