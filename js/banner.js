define(['jquery'], function ($) {

    // 1.对 女装/内衣 的数据请求  nv_neiyi
    nav_data('../data/banner/nv_neiyi.json', $('#main #banner aside .nav_cen #div1'))
    // 2.男装/户外运动  nan_huwai
    nav_data('../data/banner/nan_huwai.json', $('#main #banner aside .nav_cen #div2'))
    // 3.女鞋/男鞋/箱包  nv_xiangbao
    nav_data('../data/banner/nv_xiangbao.json', $('#main #banner aside .nav_cen #div3'))
    // 4.美妆/个人护理  huli
    nav_data('../data/banner/huli.json', $('#main #banner aside .nav_cen #div4'))
    // 5.腕表/眼镜/珠宝饰品
    nav_data('../data/banner/yanjing.json', $('#main #banner aside .nav_cen #div5'))
    // 6.手机/数码/电脑办公
    nav_data('../data/banner/shouji.json', $('#main #banner aside .nav_cen #div6'))
    // 7.母婴玩具
    nav_data('../data/banner/muying.json', $('#main #banner aside .nav_cen #div7'))
    // 8.零食/茶酒/进口食品
    nav_data('../data/banner/lingshi.json', $('#main #banner aside .nav_cen #div8'))
    // 9.生鲜水果
    nav_data('../data/banner/shuiguo.json', $('#main #banner aside .nav_cen #div9'))
    // 10.大家电
    nav_data('../data/banner/jiadian.json', $('#main #banner aside .nav_cen #div10'))
    // 11.家具建材
    nav_data('../data/banner/jiaju.json', $('#main #banner aside .nav_cen #div11'))
    // 12.汽车/配件/用品
    nav_data('../data/banner/qiche.json', $('#main #banner aside .nav_cen #div12'))
    // 13.家纺/家饰/鲜花
    nav_data('../data/banner/xianhua.json', $('#main #banner aside .nav_cen #div13'))
    // 14.医药保健
    nav_data('../data/banner/yiyao.json', $('#main #banner aside .nav_cen #div14'))
    // 15.厨具/收纳/宠物
    nav_data('../data/banner/chongwu.json', $('#main #banner aside .nav_cen #div15'))
    // 16.图书音像
    nav_data('../data/banner/tushu.json', $('#main #banner aside .nav_cen #div16'))

    // nav中左边选择，右边显示
    function nav_show() {
        var nav_show_ullis = $('#banner aside .nav_left ul li')
        var nav_show_navDivs = $('#banner aside .nav_cen div')
        for (var i = 0; i < nav_show_ullis.length; i++) {
            nav_show_ullis[i].index = i
            $(nav_show_ullis[i]).mouseenter(function () {
                $('#banner aside .nav_cen').css('display', 'block')
                var iidex = this.index;
                $(nav_show_navDivs).eq(iidex).css('display', 'flex').siblings().css('display', 'none')

                $(nav_show_navDivs[iidex]).mouseenter(function () {
                    $('#banner aside .nav_cen').css('display', 'block')
                })
                $(nav_show_navDivs[iidex]).mouseleave(function () {
                    $('#banner aside .nav_cen').css('display', 'none')
                })
            })
            $(nav_show_ullis[i]).mouseleave(function () {
                $('#banner aside .nav_cen').css('display', 'none')
            })
        }
    }

    nav_show()

    function nav_data(url, node) {
        $.ajax({
            type: 'get',
            url: url,
            success: function (obj) {
                for (var attr in obj) {
                    var dl = `<dl><dt>${obj[attr].title}<b>></b></dt>
                        <dd>`
                    var data = obj[attr].data;
                    for (var i = 0; i < data.length; i++) {
                        dl += ` <a href="${data[i].action}" target="_blank">${data[i].title}</a>
                        `
                    }
                    dl += `</dd></dl>`
                    // dl = $(dl)
                    // $('#main #banner aside .nav_cen div').html($(dl))
                    $(dl).appendTo($(node))
                }

            },
            error: function (msg) {
                console.log(msg)
            }
        })
    } // nav_data 方法


    // con-one的数据请求
    function conOne() {
        $.ajax({
            type: 'get',
            url: '../data/banner/conOne.json',
            success: function (obj) {
                var arr = obj.data[0].contents;
                var cobBs = $('#con-one .con-one-bot .cob-b')
                for (var i = 0; i < arr.length; i++) {
                    var node = $(`
                    <a href="${arr[i].clickUrl}" target="_blank">
                        <i>${arr[i].title}</i>
                        <b>${arr[i].subtitle}</b>
                        <img src="${arr[i].picPngUrl}" alt="">
                    </a>
`)
                    node.appendTo(cobBs[i])
                }
            },
            error: function (msg) {
                console.log("错误" + msg)
            }
        })
    }

    conOne()

    // con-two
    function conTwo() {
        $.ajax({
            url: '../data/banner/conTwo.json',
            success: function (arr) {
                var conTwos = $('#con-two .conTwo')
                for (var i = 0; i < arr.length; i++) {
                    var node = $(`
                 <aside>
                    <b class="cn">${arr[i].title_cn}</b>
                    <b class="en">${arr[i].title_en}</b>
                    <a href="${arr[i].action}">更多&nbsp;&nbsp;<i class="iconfont">&#xe606;</i></a>
                </aside>
                <a href="${arr[i].action}" class="aside_xa"><img src="${arr[i].imgUrl}" alt=""></a>
`)
                    node.appendTo(conTwos[i])
                }
            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }

    conTwo()

    // conThree
    function conThree() {
        $.ajax({
            url: '../data/banner/conThree.json',
            success: function (arr) {
                var youhui = null;
                var ele = $('#main #conTh_last')
                var i = 0
                for (i; i < 29; i++) {
                    if(arr[i].couponValue == 0){
                        youhui = arr[i].brandName
                    }else{
                        youhui = `优惠券&nbsp;&nbsp;￥${arr[i].couponValue}`
                    }
                    var node = $(`
                <li id="conTh_last">
                    <a href="${arr[i].action}" target="_blank" class="imglogo">
                        <img src="${arr[i].imgUrl}" alt="">
                    </a>
                    <a href="${arr[i].action}" target="_blank" class="imgmark">
                        <p>${youhui}</p>
                        <p>点击进入</p>
                    </a>
                </li>
`)
                    $(node).insertBefore($(ele))
                } // for

            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }

    conThree()

    return {
        // nv_neiyi
    }
})