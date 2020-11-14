define(['jquery'],function ($) {

    // 轮播图
    function banner() {
        // $(function () {
            var lunbo_box = $('#banner aside .nav_right')
            var lunbo_ul = $('#banner aside .nav_right ul');
            var lunbo_ol = $('#banner aside .nav_right ol')

            $.ajax({
                type:'get',
                url:'../data/banner/banner.json',
                success:function (arr) {
                    var ban_len = arr.length*35;
                    var timer = null;
                    var num = 0;
                    // 设置ul的宽度
                    lunbo_ol.css('width',ban_len)
                    for(var i = 0 ;i < arr.length ;i ++){
                        var node = $(`
                            <li id="${arr[i].id}"><a href="#"><img src="${arr[i].src}" alt=""></a></li>
                        `)
                        var hover_li = $(`
                               <li id="${arr[i].id}" class="hover_li"></li>
                        `)
                        node.appendTo(lunbo_ul)
                        hover_li.appendTo(lunbo_ol)
                    }
                    var banner_ullis = $('#banner aside .nav_right ul li');
                    var banner_ollis = $('#banner aside .nav_right ol li')
                    // 点击小hover时，图片显示
                    lunbo_box.on('click','.hover_li',function () {
                        // 获取点击的下标
                        var id = $(this).attr('id');
                        num = id;
                        // var banner_ullis = $('#banner aside .nav_right ul li');
                        banMove()
                    })

                    // 定时器
                    timer = setInterval(function () {
                        num++;
                        banMove()

                    },2000)

                    // 鼠标移入移出
                    $('#banner .nav_right').mouseenter(function () {
                        clearInterval(timer)
                    })
                    $('#banner .nav_right').mouseleave(function () {
                        timer = setInterval(function () {
                            num++;
                            banMove()
                        },2000)
                    })
                    function banMove() {
                        if(num == banner_ullis.length){
                            num = 0;
                        }
                        banner_ullis.eq(num).css('display','block').siblings().css('display','none')
                        banner_ollis.eq(num).css('backgroundColor','skyblue').siblings().css('backgroundColor','#fff')
                    }
                },
                error:function (msg) {
                    console.log("错误信息"+ msg)
                }
            })
        // })
    }

    //导航中的切换功能
    var nav_left_ps = $('#main #banner nav p');
    var nav_aside_leftUl = $('#main #banner aside .nav_left ul')
    var nav_aside_leftOl = $('#main #banner aside .nav_left ol')
    for(var i = 0;i < nav_left_ps.length;i++){
        $(nav_left_ps[i]).attr('index' , i)
        $(nav_left_ps[i]).mouseenter(function () {
            $(this).addClass('nav_hover').siblings().removeClass('nav_hover')
            if($(this).attr('index') == 0){
                $(nav_aside_leftUl).css('display','block')
                $(nav_aside_leftOl).css('display','none')
            }else{
                $(nav_aside_leftUl).css('display','none')
                $(nav_aside_leftOl).css('display','flex')
            }
        })
    }

    // 吸顶的效果
    function mountTop() {
        window.onscroll = function () {
            var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
            if(scrolltop >= 750){
                $('#mount').slideDown()
                $('#daohanglist').css('display','block')
            }else{
                $('#mount').slideUp()
                $('#daohanglist').css('display','none')
            }

            if(scrolltop >= 1400){
                //超市
                $('#daohanglist1').addClass('daohangAct').siblings().removeClass('daohangAct');
            }
            if(scrolltop >= 2100){ //life
                $('#daohanglist2').addClass('daohangAct').siblings().removeClass('daohangAct');
            }
            if(scrolltop >= 2800){ //play
                $('#daohanglist3').addClass('daohangAct').siblings().removeClass('daohangAct');
            }
            if(scrolltop >= 3500){ //love
                $('#daohanglist4').addClass('daohangAct').siblings().removeClass('daohangAct');
            }

        }
    }
    mountTop()
    
    
    // 判断是否有账号登录
    $(function () {
        // 用户信息
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

    })
    

    return {
        banner
    }
})