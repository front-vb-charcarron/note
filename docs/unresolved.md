# 未完全解决的需求

## 1. 写一个只支持输入小数点后两位的数字(包括粘贴的情况，且支持移动端和pc)

:::tip
目前不是很完美的解决方案,思路有点混乱但是还是勉强解决了
:::

``` javascript
    let lastValue = '';
    // 移动端和pc端都支持input事件
    // 且输入和粘贴都能触发input事件
    input.addEventListener('input', function() {
        // 匹配除数字和一个小数点以外的所有情况
        const not_number_reg = /[^(0-9)(\.?)]|[^(\.?)(0-9)]/g;
        // 匹配符合小数点后保留两位小数的情况
        const decimal_places_reg = /^(\d+)(\.?)(\d{0,2})$/g;
        let v = this.value;
        // 上一次字符的长度
        let l1 = lastValue.length;
        // 当前字符串的长度
        let l2 = this.value.length;
        // 匹配所有小数点得到一个数组
        let hasMorePoint = this.value.match(/\./g);
        // match方法匹配小数点，如果是空数组则会返回null
        let pointNum = hasMorePoint ? hasMorePoint.length : 0;
        // 如果输入的值不是数字和小数点，则判断当前值与上一次输入的值的长度
        // 通过长度相差2个以上粗略地判断当前是粘贴还是输入，不是后两位小数
        // 则完全清除，且使用lastValue充当内容显示在input内
        if (not_number_reg.test(this.value)) {
            if (Math.abs(l1 - l2) > 1) {
                if (not_number_reg.test(lastValue)) {
                    v = '';
                } else {
                    v = lastValue
                }

            }
        }
        if (!decimal_places_reg.test(this.value)) {
            if (v != lastValue) {
                this.value = v.slice(0, -1);
            }
        }
        if (not_number_reg.test(this.value) || pointNum > 1) {
            if (not_number_reg.test(lastValue)) {
                this.value = '';
            } else {
                this.value = lastValue;
            }

        }

        lastValue = this.value;
    });
```

## 2. 问最后的打印结果
```javascript

    var a = 1;
    (function a() {
        a = 2;
        console.log(a);
    })()
```

