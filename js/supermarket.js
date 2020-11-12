define(['jquery'], function ($) {

    // 超市  今日抢购 的数据
    function fq() {
        $.ajax({
            url: '../data/supermarket/fq.json',
            success: function (obj) {
                // 插入左边的天猫超市
                var node1 = $(`
                    <a href="${obj[201709122].action}">
                        <img src="${obj[201709122].imgUrl}" alt="">
                        <p>
                            <span>${obj[201709122].lefttitle}</span>
                            <b>${obj[201709122].righttitle}</b>
                            <b>${obj[201709122].righttitle1}</b>
                        </p>
                        <i class="iconfont">&#xe606;</i>
                    </a>
`)
                $(node1).appendTo($('#supermarket .sm-left'))

                // 插入今日疯抢
                var da = obj['201709123'].data
                for (var i = 0; i < da.length; i++) {
                    var node2 = $(`
                            <div class="smFq">
                                <img src="${da[i].imgUrl}" alt="">
                                <p>
                                    <b><i class="iconfont">&#xe6a7;</i>${da[i].titleac}</b>
                                    <em>${da[i].title}</em>
                                </p>
                            </div>
`)
                    $(node2).appendTo($("#supermarket #smrTou"))
                }

                // 切换和定时器
                var smrTouLis = $('#smrTou ul li')
                var smFqs = $('#smrTou .smFq')
                for (var i = 0; i < smrTouLis.length; i++) {
                    smrTouLis[i].index = i;
                    $(smrTouLis[i]).mouseenter(function () {
                        var a = this.index;
                        $(smFqs[a]).css('display', 'block').siblings('.smFq').css('display', 'none')
                    })
                }
                var b = 0;
                var fqas = $('#smrTou ul li')
                var timerFq = null;
                timerFq = setInterval(timerQiang, 1000)
                var smrTou = $('#smrTou');
                smrTou.mouseenter(function () {
                    clearInterval(timerFq)
                })
                smrTou.mouseleave(function () {
                    timerFq = setInterval(timerQiang, 1000)
                })
                // $(smFqs[0]).get().location.href = 'https://pages.tmall.com/wow/z/cs/act/wupr?wh_biz=tm&pos=1&wh_pid=act/wzzww&acm=201709123-1.1003.2.8766785&scm=1003.2.201709123-1.OTHER_1603348181342_8766785'
                // $(smFqs[1]).get().location.href = 'https://pages.tmall.com/wow/z/cs/act/wupr?wh_biz=tm&pos=2&wh_pid=act%2Fzyyksyn&acm=201709123-2.1003.2.8766786&scm=1003.2.201709123-2.OTHER_1603910354433_8766786'
                $(smFqs[0]).click(function () {
                    window.location.href = 'https://pages.tmall.com/wow/z/cs/act/wupr?wh_biz=tm&pos=1&wh_pid=act/wzzww&acm=201709123-1.1003.2.8766785&scm=1003.2.201709123-1.OTHER_1603348181342_8766785'
                })
                $(smFqs[1]).click(function () {
                    window.location.href = 'https://pages.tmall.com/wow/z/cs/act/wupr?wh_biz=tm&pos=2&wh_pid=act%2Fzyyksyn&acm=201709123-2.1003.2.8766786&scm=1003.2.201709123-2.OTHER_1603910354433_8766786'
                })

                function timerQiang() {
                    if (b % 2 == 0) {
                        // 偶数
                        $(fqas[0]).children('a').first().addClass('fq')
                        $(fqas[1]).children('a').first().removeClass('fq')
                        $(smFqs[0]).css('display', 'block')
                        $(smFqs[1]).css('display', 'none')
                    } else {
                        $(fqas[1]).children('a').first().addClass('fq')
                        $(fqas[0]).children('a').first().removeClass('fq')
                        $(smFqs[1]).css('display', 'block')
                        $(smFqs[0]).css('display', 'none')
                    }
                    b++;
                }
            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }

    fq()

    // 超市右边，今日疯抢右边
    function fq_r() {
        $.ajax({
            url: '../data/supermarket/supermarketr.json',
            success: function (obj) {
                var arr = obj.result;
                for (var i = 0; i < 6; i++) {
                    var nodeA = $(`
                    <a href="html/details.html?id=${arr[i].categoryId}" class="spa" id="${arr[i].categoryId}">
                        <div>
                            <aside>
                                <img src="${arr[i].pic}" alt="">
                                <span class="mark"></span>
                            </aside>
                            <p>${arr[i].itemName}</p>
                            <em>￥&nbsp;${arr[i].price}</em>
                        </div>
                    </a>
`)
                    $(nodeA).appendTo($('#supermarket .sm-right'))
                }
            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }

    fq_r()

    // 美丽生活
    function life() {
        // 左边
        $.ajax({
            url: '../data/supermarket/lifeleft.json',
            success: function (obj) {
                var arr = obj['201709143'].data[0];
                var nodelefe = $(`
                    <a href="${arr.action}">
                        <img src="${arr.imgUrl}" alt="">
                        <p>
                            <span>${arr.lefttitle}</span>
                            <b>${arr.righttitle}</b>
                            <b>${arr.righttitle1}</b>
                        </p>
                        <i class="iconfont">&#xe606;</i>
                    </a>
`)
                nodelefe.appendTo($('#life .left-l'))
            },
            error: function (msg) {
                console.log(msg)
            }
        })

        // 右边
        $.ajax({
            url: '../data/supermarket/liferight.json',
            success: function (obj) {
                var arr = obj.result;
                for (var i = 0; i < 8; i++) {
                    var nodelife2 = $(`
                     <a href="html/details.html?id=${arr[i].categoryId}" class="spa" id="${arr[i].categoryId}">
                        <div>
                            <aside>
                                <img src="${arr[i].pic}" alt="">
                                <span class="mark"></span>
                            </aside>
                            <p>${arr[i].itemName}</p>
                            <em>￥&nbsp;${arr[i].price}</em>
                        </div>
                    </a>
`)
                    nodelife2.appendTo($('#life .left-r'))
                }
            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }

    life()

    // 潮店酷玩
    function play() {
        // 左边
        $.ajax({
            url: '../data/supermarket/playleft.json',
            success: function (obj) {
                var arr = obj['201709142'].data[0];
                var nodelefe = $(`
                    <a href="${arr.action}">
                        <img src="${arr.imgUrl}" alt="">
                        <p>
                            <span>${arr.lefttitle}</span>
                            <b>${arr.righttitle}</b>
                            <b>${arr.righttitle1}</b>
                        </p>
                        <i class="iconfont">&#xe606;</i>
                    </a>
`)
                nodelefe.appendTo($('#play .left-l'))
            },
            error: function (msg) {
                console.log(msg)
            }
        })

        // 右边
        $.ajax({
            url: '../data/supermarket/playright.json',
            success: function (obj) {
                var arr = obj.result;
                for (var i = 0; i < 8; i++) {
                    var nodelife2 = $(`
                     <a href="html/details.html?id=${arr[i].categoryId}" class="spa" id="${arr[i].categoryId}">
                        <div>
                            <aside>
                                <img src="${arr[i].pic}" alt="">
                                <span class="mark"></span>
                            </aside>
                            <p>${arr[i].itemName}</p>
                            <em>￥&nbsp;${arr[i].price}</em>
                        </div>
                    </a>
`)
                    nodelife2.appendTo($('#play .left-r'))
                }
            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }
    play()
    
    // 猜你喜欢
    function love() {
        lovefn('../data/supermarket/loveone.json',$('#love .love-main'),true)
        lovefn('../data/supermarket/lovetwo.json',$('#love .love-main'),true)
    }
    love()
    // 猜你喜欢的函数
    function lovefn(url,nodehtml,isIndex) {
        $.ajax({
            url:url,
            success:function (obj) {
                var arr = obj['201509290'].data;
                if(isIndex){
                    var html = 'html'
                }else{
                    var html = '.'
                }
                for(var i = 0; i<arr.length;i++){
                    if(isIndex){
                        var nodelove = $(`
                <a href="${html}/details.html?id=${arr[i].id}" class="spa" id="${arr[i].id}">
                    <div>
                        <aside>
                            <img src="${arr[i].imgUrl}" alt="">
                            <span class="mark"></span>
                        </aside>
                        <p>${arr[i].title}</p>
                        <em>￥&nbsp;${arr[i].price}</em>
                    </div>
                </a>
`)
                    }else{
                        var nodelove = $(`
                <a href="${html}/details.html?id=${arr[i].id}" class="spa" id="${arr[i].id}">
                    <div>
                        <aside>
                            <img src="${arr[i].imgUrl}" alt="">
                            <span class="mark"></span>
                        </aside>
                        <p>${arr[i].title}</p>
                        <em>￥&nbsp;${arr[i].price}</em>
                        <section>立即购买</section>
                    </div>
                </a>
`)
                    }
                    nodelove.appendTo(nodehtml)
                }
            }
        })
    }




    return {
        lovefn
    }
})