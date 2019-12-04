# options 请求

## 什么是 options 请求？
:::tip
在跨域的情况下，浏览器在发送真正请求之前，先发送一个方法为 OPTIONS 的预检请求，这个请求用来验证本次请求是否安全。
:::

## 引起 options 请求的原因
+ 请求方法不是 GET/HEAD/POST 。
+ POST 请求的 `Content-Type` 并非 `application/x-www-form-urlencoded`，`multipart/form-data` 或 `text/plain` 。
+ 请求设置了自定义的 header 字段。

:::tip
以上情况都是在跨域的情况下才会触发 options 。
:::

## 禁止 options 请求
+ 确保请求在同域下进行，则不会触发 options 。
+ 在跨域情况下，options 请求无法禁用或取消， 只能通过服务端对 options 请求做出正确回应，这样才能保证 options 请求之后，put、post 等请求才可以被发出，如果 options 请求不满足，则可以返回403取消接下来的原有 put/post 请求。
+ 设置 `Access-Control-Max-Age: 秒数` ，缓存 options 请求，每隔设置的时间才触发 options 请求。

:::tip
 `403 Forbidden` 是HTTP协议中的一个状态码(Status Code)。可以简单的理解为没有权限访问此站，该状态表示服务器理解了本次请求但是拒绝执行该任务。
:::
