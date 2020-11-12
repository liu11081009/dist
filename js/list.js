define(['supermarket','jquery'], function (supermarket,$) {
    // 轮播图
    function listlunbo() {
        var arr = ['../images/listlun1.jpg', '../images/listlun2.jpg', '../images/listlun3.jpg', '../images/listlun4.jpg', '../images/listlun5.jpg', '../images/listlun6.jpg']
        var isNow = 0;
        var listtimer = null;

        // 设置ul 的宽度
        var arrwidth = (arr.length + 1)*990;
        $('#listlunimg').css('width', arrwidth)
        for (var i = 0; i < arr.length; i++) {
            var node = $(`
            <li><a href="#"><img src="${arr[i]}" alt=""></a></li>
`)
            node.appendTo($('#listlunimg'))
        }
        // 克隆第一个图片的
        var node2 = $('#listlunimg li').first().clone(true)
        node2.appendTo($('#listlunimg'))
        // 创建小li
        var liwidth = (arr.length)*25;
        $('#listlunli').css('width', liwidth)
        for(var i = 0 ;i < arr.length;i++){
            var nodeli = $(`
            <li></li>
`)
            nodeli.appendTo($('#listlunli'));
        }

        // 点击小li
        $('#listlunli').on('click','li',function () {
            isNow = $(this).index()
            $(this).addClass('active').siblings().removeClass('active')
            $('#listlunimg').animate({
                left:-isNow*990
            },500)

        })
        $('#listlunli li').eq(0).addClass('active')
        // 定时器
        listtimer = setInterval(dsqfn,1000)

        // 鼠标移入
        $('#list-lunbo .listlun-con').mouseenter(function () {
            clearInterval(listtimer)
        })
        $('#list-lunbo .listlun-con').mouseleave(function () {
            listtimer = setInterval(dsqfn,1000)
        })

        function dsqfn() {
            isNow++
            $('#listlunli li').eq(isNow).addClass('active').siblings().removeClass('active')
            if(isNow == arr.length){
                $('#listlunli li').eq(0).addClass('active').siblings().removeClass('active')
            }
            $('#listlunimg').animate({
                left:-isNow*990
            },500,function () {
                if(isNow == arr.length){
                    $('#listlunli li').eq(0).addClass('active').siblings().removeClass('active')
                    $('#listlunimg').css('left',0)
                    isNow = 0;
                }
            })
        }

    }

    listlunbo()

    // 渲染数据
    function listdata() {
        supermarket.lovefn('../data/supermarket/loveone.json',$('#shoplist'),false)
        supermarket.lovefn('../data/supermarket/lovetwo.json',$('#shoplist'),false)
    }
    listdata()


    // 判断是否有账号登录
    // $(function () {
        var username = sessionStorage.getItem('username')
        if(username){
            $('.head_left').html(`<a href='#'>${username}</a>`)
            $('#shopcarindex').html(`<b class="iconfont">&#xe501;</b><a href="html/shopCart.html">购物车</a>`)
        }else{
            $('#shopcarindex').html(`<b class="iconfont">&#xe501;</b><a href="javascript:;">购物车</a>`)
            $('#shopcarindex').click(function () {
                alert("您还没有登录，请先登录~")
            })
        }

    // })

    return {}
})