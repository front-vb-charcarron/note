# 一些工具函数

## 判断对象是否有空值
```javascript

/**
 * 判断是否是空对象
 * https://github.com/mqyqingfeng/Blog/issues/30
 * @param {*} obj
 * @returns {Boolean} true 为空对象
 */
const isEmptyObject = obj => {
    let name;
    for (name in obj) {
        return false;
    }
    return true;
}

/**
 * 判断一个对象里面是否有值为空
 * @param {Object} obj
 * @returns {Boolean} true 为有空值
 */
const hasEmptyValue = obj => {
    let result = false;

    function _hasEmptyValue(o) {
        if (isEmptyObject(o)) return true;
        for (let k in o) {
            if (result) break; // 发现控制后停止递归
            if (typeof o[k] === 'object') {
                result = _hasEmptyValue(o[k]) || result;
            } else {
                if (o[k] === '' || o[k] === undefined) 
                result = true;
            }
        }
    }

    _hasEmptyValue(obj);
    return result;
}

```