
console.log("首页引入require  加载成功")

// 引入多个路径
require.config({
    paths:{
        index:'index',
        banner:'banner',
        supermarket:'supermarket',
        jquery:'jquery-1.10.1.min',
        "jquery-cookie":'jquery.cookie'
    },
    // jquery-cookie  是依赖于jquery开发的
    shim:{
        // 设置依赖关系
        "jquery-cookie":['jquery'],
        // parabola  不遵从AMD规范的
        // parabola:{
        //     exports:'_'
        // }
    }
})

require(['index','banner','supermarket'],function (index,banner,supermarket) {
    index.banner()
    // banner.nv_neiyi()
})