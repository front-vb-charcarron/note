# 变量

## 简单类型和复杂类型的一些区别

01. 简单类型复制是进行值的拷贝，而复杂类型赋值是复制内存地址的指针。
02. 基本类型有6种：string、number、boolean、undefined、null、Symbol(es6新增)。
03. 复杂类型可以笼统归纳为1种：object。

## 字符串(string)

:::tip
用于文字上的表述
:::

### 特点

用单引号或双引号包裹起来

### 字符串的多行显示

``` javascript
	//反单引号，专门用来多行显示，会把文本的所有格式完整保留下来。	
	//es6新语法${}只能在反单引号里面用({}放变量名)
	var content = `
        我叫${name}
        haha\$\{\},
        hahahaahah,
        我是反单引号.
    `;
```

### 字符串比较

:::tip
字符串比较的是Unicode编码(每个字符相互比较), 小写字母比大写字母大。
:::

### 拓展

* 字符串是不可变的！字符串不可以是指字符串的成员函数不会改变其原始值，而是创建并返回一个新的字符串，而数组的成员函数都是在其原始值上操作的。

``` javascript
	c = a.toUpperCase();
	a === c; // false
	a; // "foo"
	b; // "FOO"
```

* 许多数组函数用来处理字符串很方便，可以通过借用数组'非变更方法'来处理字符串(即是用call、apply 借用数组非成员函数), 但字符串无法借用数组成员函数(例如 Array.prototype.reverse)。
* 操作比较复杂字符(Unicode, 如星号、多字节字符等)需要通过 Unicode 的工具库(参考Esrever)。

## 数值(number)

:::tip
用于表达或操作数字进行运算的类型
:::

### Javascript中的数字字面量一般用十进制表示，例如:

``` javascript
	var a = 42;
	var b = 42.3;
```

### 小数点前面的0可以省略:

``` javascript
	var a = 0.42;
	var b = .42;
```

### 小数点后小数部分最后面的0也可以省略:

``` javascript
	var a = 42.0;
	var b = 42.;
```

:::tip
省略0的写法没有问题，只是不常见，但从代码的可读性考虑，不建议这样写。
:::

### 数字变量和数字字面量的方法

`toExponential()` : 用来转换指数形式

``` javascript
	var a = 5E10;
	a; //50000000000
	a.toExponential(); //"5e+10"

	var b = a * a;
	b; //2.5e+21

	var c = 1 / a;
	c; //2e-11
```

:::tip
特别大和特别小的数字默认用指数格式显示，与 `toExponential()` 函数的输出结果相同。
:::

`toFixed()` : 可指定小数部分的显示位数。

``` javascript
	var a = 42.59;

	a.toFixed(0); //"43"
	a.toFixed(1); //"42.6"
	a.toFixed(2); //"42.59"
	a.toFixed(3); //"42.590"
	a.toFixed(4); //"42.5900"
```

:::tip
多出四舍五入，少了补零。
:::

`toPrecision()` : 用来指定有效数位的显示数位

``` javascript
	var a = 42.59;

	a.toPrecision(1); //"4e+1"
	a.toPrecision(2); //"43"
	a.toPrecision(3); //"42.6"
	a.toPrecision(4); //"42.59"
	a.toPrecision(5); //"42.590"
	a.toPrecision(5); //"42.5900"
```

:::tip
指定总数位。
:::

### 注意

对于 `.` 运算符需要给予特别注意，因为它是一个有效的数字字符，会被优先识别为数字字面量的一部分，然后才是对象属性访问运算符。

``` javascript
	// 无效语法

	42. toFixed(); //SyntaxError

	// 下面的语法都有效：
	(42).toFixed(3); // "42.000"
	0.42.toFixed(3); // "0.420"
	42..toFixed(3); // "42.000"

	42. toFixed(3); // "42.000"  然而这样的语法容易引起误会， 不建议使用。

```

### 遵循IEEE754规范的语言的问题

` 0.1 + 0.2 === 0.3 // false ` ; 

`0.1 + 0.2 ` 的结果并非等于 `0.3` , 而是等于 `0.30000000000000004` 

如果解决这个问题？

* 绝大多数的程序只需要处理整数，最大不超过百万或万亿，此时使用Javascript的数字类型是绝对安全的。

* 判断 `0.1+0.2` 等于 `0.3` 的方法

```javascript
	// Javascript的误差范围值'2^-52'
    // 从ES6开始这个值存在'Number.EPSILON'
    // EPSILON 小的正数
	// ES6之前版本的polyfill：
	if (!Number.EPSILON) {
		Number.EPSILON = Math.pow(2, -52);
	}
	
	// 可以使用Number.EPSILON来比较两个数字是否相等(在指定的范围内)
	function numberCloseEnoughToEqual(n1, n2) {
		return Math.abs(n1 - n2) < Number.EPSILON;
	}
	
	var a = 0.1 + 0.2;
	var b = 0.3;
	
	numberCloseEnoughToEqual(a, b);                  //true
	numberCloseEnoughToEqual(0.0000001, 0.0000002)   //false
	
```

### 浮点数
+ 最大浮点数定义在 `Number.MAX_VALUE` 中。 最小的浮点数定义在 `Number.MIN_VALUE` , 但是它不是负数，无限接近于0！

### 整数的安全范围

1. 能够被安全呈现的最大整数 `Number.MAX_SAFE_INTEGER`(16位),能够被安全呈现的最小整数` Number. MIN_SAFE_INTEGER`(16位)。

2. 对于较大的数字(例如数据库中的64位ID等)可以选择转换为字符串进行比较，如果需要计算的话还是需要借助相关的工具库。

### 整数的检测

1. 可以使用ES6中的`Number.isInteger(...)`方法。
2. 也可写ES6之前的polyfill Number.isInteger方法。

```javascript
	if (!Number.isInteger) {
		Number.isInteger = function(num) {
			return typeof num == "number" && num % 1 == 0；
		}
	}
```

3. 要检测一个值是否是安全的整数，可以用 `Number.isSafeInteger(...)` 方法。
4. ES6之前的polyfill Number.isSafeInteger方法。

```javascript 
	if (!Number.isSafeInteger) {
		Number.isSafeInteger = function(num) {
			return Number.isInteger(num) && Math.abs(num) <= Number.MAX_SAFE_INTEGER;
		}
	}
```

### 不是数字的数字
1. `NaN` ，一个“警戒值”(特殊用途的常规值)，用于指出数字类型中的错误情况，即"执行数学运算没有成功，这是失败后返回的结果"，但仍然是数字类型，它也是唯一一个不与自身相等的特殊值。

```javascript
	var a = 2 / "foo";
	
	a == NaN; // false
	a === NaN; // false
```
:::tip
利用自身不相等的特性 `NaN !== NaN // true` 来判断是不是NaN。
:::

2. `isNaN` 的缺陷。

```javascript
	var a = 2 / "foo";
	var b = "foo";
	
	a; // NaN
	b; "foo"
	
	window.isNaN(a); // true
	window.isNaN(b); // true -- 晕！
```
:::tip
"foo"不是一个数字，但也不是NaN， `isNaN` 判断的不够准确。
:::

3. ES6的 `Number.isNaN(..)` 修复了bug, polyfill Number.isNaN。

```javascript 
	if (!Number.isNaN) {
		Number.isNaN = function(n) {
			return (
				typeof n === "number" && 
				window.isNaN(n)
			);
		}
	}
	
	
	var a = 2 / "foo";
	var b = "foo";
	
	Number.isNaN(a); // true
	Number.isNaN(b); // false-----好！
```

### Infinity

1. Javascript运算结果溢出，此时的结果为 `Infinity` 或 `-Infinity` 
2. 当 Javascript 运算溢出的时候，会根据 IEEE754 规范中的"就近取整"(round-to-nearest)模式决定结果, 假如有个数相对Infinity, 与 Number.MAX_VALUE 更近则会"向下取整", 如果与 Infinity 更接近则会"向上取整"。
3. Infinity / Infinity, 结果是NaN, 因为这是个未定义操作。

### 零值

1. 为什么会得到-0？

```javascript 
	var a = 0 / -3;   // -0
	var b = 0 * -3;   // -0
```
:::tip
加法和减法不会得到-0 
:::

2. 对负零字符串化会得到0，反过来从字符串转为数字，得到结果准确('-0' -> 0)。

3. 区分0和-0

实际上 `0 === -0 // true` , 所以：

```javascript 
	function isNegZero(n) {
		n = Number(n);
		return (n === 0) && (1 / n === -Infinity);
	}
	
	isNegZero(-0); 	   // true
	isNegZero(0 / -3); // true
	isNegZero(0);      // false
```
4. 我们为什么需要-0？ 有些时候应用程序中需要以级数形式表示(比如动画帧的移动速度)，数字的符号位(sign)用来代表其他信息(比如移动的方向)。此时如果一个值为0的变量失去了它的符号位，他的方向信息就丢失了。所以保留0值的符号位可以防止这种情况发生。

### 注意
`NaN 也是 number类型的` 

