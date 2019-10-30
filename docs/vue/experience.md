# Vue

## vue的一些项目经验

01. 以vue-cli3为例，vue打包需要在vue.config.js设置 `publicPath` 属性

``` javascript
    module.exports = {
        publicPath: './'
    }
```

02. 前后分离开发时，需要进行跨域, 可在vue.config.js设置 `devServer` 属性

``` javascript
    module.exports = {
        devServer: {
            port: '8080',
            host: 'localhost',
            https: false,
            open: true,
            // 主要设置proxy属性
            proxy: {
                '/api': {
                    target: 'http://127.0.0.1:8088',
                    pathRewrite: {
                        '^/api': '' // 子域名
                    }
                }
            }

        }
    }
```

之后就可以使用 `/api` 作为域名拼接url请求后端，webpack则使用 `http-proxy-middleware` 这个中间件来进行正想代理跨域。

03. 关于接口管理，vue官方推荐使用[axios](https://www.kancloud.cn/yunye/axios/234845)

* [vue中Axios的封装和API接口的管理](https://juejin.im/post/5b55c118f265da0f6f1aa354)

04. 关于用vue写后台管理

* [手摸手系列](https://juejin.im/post/59097cd7a22b9d0065fb61d2)

05. 使用vue写的网站url往往都会带着 `#` , 如果不喜欢这样的url可以使用router的 `history` 模式，但是需要注意下几点
* router使用history模式，路由不能使用懒加载，否则不能正常跳转页面
* router使用history模式， `publicPath` 必须设为根目录(/)，否则图片等静态资源就无法正常显示。

在服务器上需要跑在使用 `connect-history-api-fallback` 中间件的node环境，具体例子：

``` javascript
const express = require('express');
const server = express();
const history = require('connect-history-api-fallback');
const path = require('path');
const port = 8090;
const hostName = '127.0.0.1';

server.use(
    history({
        // 覆盖Accepts，更改请求的dataType配置
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        verbose: true, // 打开日志
    })
);
const segments = __dirname.replace(/\/config/, '');
// 代理静态资源的请求。例如css、js、图片等。
server.use(express.static(path.join(segments, 'client', 'project')));
const html = path.join(path.join(segments, 'client', 'project', 'index.html'));

// 因为vue是单页面应用，确保用户刷新和输入地址都是跳转到index.html
server.get('*', (req, res) => {
    res.sendFile(html);
});

server.listen(port, hostName, () => {
    console.log( `服务运行在http://${hostName}:${port}` );
});
```

6.router的编程式导航一般有两种方式携带参数跳转，通过：

* `router.push({ name: '', params: {} });` 
* `router.push({ path: '', query: {} });` 

两种方式各有优缺点，使用 `query` 带参跳转会以? 的形式写在url上，页面刷新时不会掉参数，而使用 `params` 带参跳转不会出现在url上，具有隐蔽性，但是刷新时会掉参数，所以想了一个两全其美的办法，
使用 `params` 传参，通过 `router.beforeEach` 把参数存到sessionStorage，再通过 `router.afterEach` ，把参数取出，具体实现：

``` javascript
// 把params参数缓存起来
export default {
    save(args) {
        sessionStorage.setItem('argments', JSON.stringify(args));
    },
    set(routeParams) {
        let data = JSON.parse(sessionStorage.getItem('argments'));
        if (typeof data === 'object') {
            for (let k in data) {
                routeParams[k] = data[k];
            }
        }
    },
    deal(toRoute, fromRoute) {
        sessionStorage.setItem('from', fromRoute.name);
        if (!sessionStorage.getItem('now')) {
            sessionStorage.setItem('now', toRoute.name);
        }
        if (sessionStorage.getItem('now') !== toRoute.name) {
            if (fromRoute.name &&
                fromRoute.name !== 'login' &&
                toRoute.name !== 'login') {
                this.save(toRoute.params)
            };
            sessionStorage.setItem('now', toRoute.name);
        };

    }
};

// 在router.js
router.beforeEach((to, from, next) => {
    // 存储params
    collector.deal(to, from);
});

router.afterEach((to, from) => {
    // 取出params
    collector.set(to.params);
});
```

07. 通过导航守卫可以控制页面的访问权限，如果使用 `path` 进行逻辑判断时，最好对 `path` 进行大小写字母转换再判断，导航路由返回的是用户输入的地址，不能信任用户输入的东西。

08. 后端动态控制页面权限，侧边栏控制整个网站的页面路由，通过 `meta` 上的 `isSidebarItem` 属性隐藏侧边栏上详情、编辑页等入口
* `formatRoutes` 递归格式化后端路由为前端路由
* `findRedirectPath` 递归找首页路由路径(即侧边栏第一个的页面)
* `assembleRoutes` 组装所有路由 并挂载完整的路由

``` javascript
/**
 *
 * 递归格式化后端路由为前端路由
 * @param {Array} routes
 * @returns
 */
function formatRoutes(routes) {
    let _routes = [];

    routes.forEach(route => {
        let _route = {
            path: route.path,
            name: route.name,
            component: getComponent(
                route.name.slice(0, 1).toUpperCase() + route.name.slice(1)
            )
        };

        if (route.children) {
            _route = Object.assign({}, _route, {
                children: formatRoutes(route.children)
            });
        }

        if (route.meta) {
            let obj = {};
            route.meta
                .replace(/\{/g, "")
                .replace(/\}/g, "")
                .split(",")
                .forEach(m => {
                    let data = m
                        .split(":")
                        .map(m => m.replace(/\"|\'/g, "").trim());
                    let k = data[0];
                    let v = data[1];
                    obj[k] = v;
                });

            _route = Object.assign({}, _route, {
                meta: obj
            });
        }

        if (route.redirect) {
            _route = Object.assign({}, _route, {
                redirect: route.redirect
            });
        }

        _routes.push(_route);
    });

    return _routes;
}

/**
 * 递归找首页路由路径(即侧边栏第一个的页面)
 * @param {Object} route 
 */
function findRedirectPath(route) {
    let foundRoute;
    const find = _route => {
        if (_route.children) {
            find(_route.children.find(r => r.meta['isSidebarItem'] == '1'));
        } else {
            foundRoute = _route;
        }
    };

    find(route);

    return foundRoute;
}

/**
 *
 * 组装所有路由 并挂载完整的路由
 * @export
 * @returns
 */
export function assembleRoutes(callback) {
    // 重置路由
    resetRouter();
    // 先组装静态路由 保证登录页可以使用
    Router.options.routes = [...StaticRoutesMap];
    Router.addRoutes([...StaticRoutesMap]);

    // 如果没有token则不请求路由
    if (Store.getters.token) {
        api.getRoutes({
            token: Store.getters.token
        }).then(res => {
            if (res.data.data) {
                let requestedRoute = res.data.data[0];
                // 格式化后端路由
                requestedRoute = formatRoutes([requestedRoute]).pop();
                // 获取侧边栏第一路由作为首页的路径
                let redirectPath = findRedirectPath(requestedRoute).path;
                // 设置路由的redirect，使页面登录后首先跳到该页面
                requestedRoute.redirect = redirectPath;
                // 侧边栏需要用到options里数据
                Router.options.routes.push(requestedRoute);
                // 动态添加格式化后的后端路由
                // 404页面不能写在静态路由里否则会一直显示404页面
                Router.addRoutes([requestedRoute, NotFoundRoute]);
                Store.commit('SET_HOME_PAGE', redirectPath);
                // 挂载完路由后，调用callback
                callback && callback.call(null);
            } else {
                // 没有权限时只挂载404页面
                Router.addRoutes([NotFoundRoute]);
            }

        });
    }

}
```

页面一加载，就调用 `assembleRoutes` 获取该用户所能访问的路由，所以如果刷新页面可能会重复添加路由，这里有个hack方法 `resetRouter` 重置路由：

``` javascript
mport Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const createRouter = () => new Router({
    routes: []
});

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}

export default router;
```

09. 按钮权限，大概思路是，后端返回用户所能访问页面按钮的id数组(每个按钮id都是唯一的), 通过编写公共的按钮组件，对每个按钮的参数进行比对，如果不符合数组里的id则隐藏自身。

10.vue使用vue-echarts有些需要注意的点，vue-echarts使用饼图、柱状图等是按需引入的

``` javascript
import ECharts from "vue-echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legendScroll";
import "echarts/lib/component/legend";
```

11.vue使用vue-echarts制作地图，需要引入第三方比如[高德地图的JSON](http://datav.aliyun.com/tools/atlas/#&lat=33.521903996156105&lng=104.29849999999999&zoom=4)文件

```vue
<template>
    <div class="Foshan">
        <ECharts :options="map1" ref="map"/>
    </div>
</template>

<script>
    import ECharts from 'vue-echarts'
    import 'echarts/lib/chart/effectScatter'
    import 'echarts/lib/chart/map'
    import 'echarts/lib/component/geo'
    import 'echarts/lib/component/tooltip'
    
    // 地图的JSON文件
    import foshan from '@/assets/js/foshan_ali_full.js'

    export default {
        name: "Foshan",
        props: ['area'],
        data () {
            return {
                map1: {}
            }
        },
        created () {
            // 注意 需要注册地图
            ECharts.registerMap('foshan', foshan);
            if (this.area.length>0) {
                this.map1 = new this.mapInit(this.area);
            } else {
                let virtualData = [
                    { name: '南海区', item: ['0'], itemName: ['暂无数据']},
                    { name: '三水区', item: ['0'], itemName: ['暂无数据']},
                    { name: '禅城区', item: ['0'], itemName: ['暂无数据']},
                    { name: '顺德区', item: ['0'], itemName: ['暂无数据']},
                    { name: '高明区', item: ['0'], itemName: ['暂无数据']}
                ];
                this.map1 = new this.mapInit(virtualData);
            }

        },
        methods: {
            mapInit(data) {
                // console.log(foshan);
                let _region = {};
                foshan.features.forEach((res) => {
                    _region[res.properties.name] = res.properties.centroid;
                });
                // console.log(_region);
                let convertData = (data) => {
                    let res = [];
                    for (let i = 0; i < data.length; i++) {
                        let geoCoord = _region[data[i].name];
                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                /*组装数据，在下面formatter使用*/
                                item: [].concat(data[i].item),
                                itemName: [].concat(data[i].itemName)
                            });
                        }
                    }
                    return res;
                };
                return {
                    tooltip: {
                        trigger: 'item',
                        formatter(params) {
                            let { item, itemName } = params.data;
                            let tipHtml = `<div><div>${params.data.name}</div>` ;
                            for (let i=0;i<item.length;i++) {
                            tipHtml += `<div>${itemName[i]} : ${item[i]}</div>` ;
                            }
                            tipHtml += '</div>';
                            return tipHtml
                        }
                    },
                    geo: {
                        map: 'foshan',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: false,
                        regions: [
                            {
                                name: '三水区',
                                itemStyle: {
                                    areaColor: 'rgb(125,156,54)',
                                    color: 'white'
                                }
                            },
                            {
                                name: '南海区',
                                itemStyle: {
                                    areaColor: 'rgb(222,178,64)',
                                    color: 'white'
                                }
                            },
                            {
                                name: '禅城区',
                                itemStyle: {
                                    areaColor: 'rgb(197,102,47)',
                                    color: 'white'
                                }
                            },
                            {
                                name: '顺德区',
                                itemStyle: {
                                    areaColor: 'rgb(124,24,86)',
                                    color: 'white'
                                }
                            },
                            {
                                name: '高明区',
                                itemStyle: {
                                    areaColor: 'rgb(48,122,122)',
                                    color: 'white'
                                }
                            }
                        ]
                    },
                    series: [{
                        name: 'Maptip',
                        type: 'map',
                        mapType: 'foshan',
                        itemStyle: {
                            areaColor: 'transparent'
                        },
                        emphasis: {
                            label: {
                                show: false
                            },
                            itemStyle: {
                                areaColor: 'rgb(114,155,240)'
                            },
                        },
                        data: convertData(data)
                    }, {
                        name: 'Tooltip',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(data),
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'white',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        }
                    }]
                }
            }
        },
        components: {
            ECharts
        }
    }
</script>
```

12.vue通过[vue-amap](https://elemefe.github.io/vue-amap/#/zh-cn/introduction/install)使用高德地图, 由于使用vue-amap，可能没有等页面加载完就初始化地图，这时候可能就会报错，而且当页面同时使用echart和高德地图时可能会卡顿，最好的解决方式是使用路由懒加载。高德地图的卡顿问题需要使用高德正确的api解决。

``` javascript
initMap() {
    this.$nextTick(() => {
        // 使用高德原生api
        lazyAMapApiLoaderInstance.load().then(() => {
            // 通过接口返回坐标定位地点
            this.$api.map_index({}).then(res => {
                // 在lazyAMapApiLoaderInstance方法下可以获取原生高德地图实例 AMap
                _AMap = AMap;
                map_index = res.data.data;

                // 获取地图实例
                map = new AMap.Map("amapContainer", {
                    center: new AMap.LngLat(map_index.lon, map_index.lat),
                    mapStyle: "amap://styles/darkblue",
                    zoom: map_index.zoom,
                    resizeEnable: true
                });

                this.drawDistrict();

                timeoutTimer = setTimeout(() => {
                    this.setMarkers();
                }, 5000);
            });
        });
    });
}
```

12. `keep-alive` 细粒度控制，比如在移动端，填写表单时，只想第一次进来页面时启动缓存，只有在回退到上一页则删除 `keep-alive` 的缓存，跳转到其他页面引用缓存，这时需要手动删除 `keep-alive` (这个方法好像是vue2.6版能实现)；[Vue 全站缓存之 keep-alive ： 动态移除缓存](https://juejin.im/post/5b610da4e51d45195c07720d)

``` javascript
beforeRouteLeave(to, from, next) {
    if (to.path == "/disclaimer") {
        //删除keepAlive缓存的实例
        if (this.$vnode && this.$vnode.data.keepAlive) {
            if (
                this.$vnode.parent &&
                this.$vnode.parent.componentInstance &&
                this.$vnode.parent.componentInstance.cache
            ) {
                if (this.$vnode.componentOptions) {
                    var key =
                        this.$vnode.key == null ?
                        this.$vnode.componentOptions.Ctor.cid +
                        (this.$vnode.componentOptions.tag ?
`::${this.$vnode.componentOptions.tag}` :
                            "") :
                        this.$vnode.key;
                    var cache = this.$vnode.parent.componentInstance.cache;
                    var keys = this.$vnode.parent.componentInstance.keys;

                    if (cache[key]) {
                        if (keys.length) {
                            var index = keys.indexOf(key);
                            if (index > -1) {
                                keys.splice(index, 1);
                            }
                        }
                        delete cache[key];
                    }
                }
            }
        }

        this.$destroy();
    }

    next();
}
```

13. 移动端从当前页面回退到跨度很大的上层页面时，为了不再历史记录留下痕迹，最好使用 `router.go` 返回页面，但有时因为业务逻辑不同场景下返回的页面数量不同，所以需要动态去计算页面数量

``` javascript
// 通过导航守卫和vuex维护一个由路由name组成的页面栈
router.beforeEach((to, from, next) => {
    collector.deal(to, from);
    // 如果是点击返回按钮则不需要在tiers里添加name
    if (!Store.getters.isBackBtn) {
        Store.commit('SET_TIERS', to.name);
    }
    // 修改isBackBtn标记
    Store.commit('SET_IS_BACK_BTN', false);

    next();
});

/**
 * headerBar 组件 
 */
back() {
    if (this.returnToApp) {
        window.location.href = window.location.href + "?returnIndex=1";
    } else {
        let pageNum;
        let {
            tiers
        } = this.$store.getters;

        if (this.page) {
            this.$router.go(-this.page);
            pageNum = this.page;
        } else {
            this.$router.go(-1);
        }

        if (pageNum) {
            this.$store.commit('RESET_TIERS', tiers.slice(0, tiers.length - pageNum));
        } else {
            this.$store.commit('DELETE_TIER');
        }

        this.$store.commit('SET_IS_BACK_BTN', true);

    }
},
```

页面逻辑：

``` vue
<template>
    <HeaderBar :title="'上传支付凭证'" :page="backTier"></HeaderBar>
</template>
<script>
export default {
    mounted() {
        let { tiers } = this.$store.getters;
        let zonesIndex = tiers.indexOf("zones");
        let uploadCertificateIndex = tiers.length - 1;

        if (zonesIndex != -1) {
            this.backTier = uploadCertificateIndex - zonesIndex;
        } else {
            let passIndex = tiers.indexOf("pass");
            this.backTier = uploadCertificateIndex - passIndex;
        }
    }
}
</script>
```

由于业务场景在点击头部组件返回按钮进行页面回退，所以把所有回退逻辑通过模拟点击返回按钮触发页面回退到指定页面

