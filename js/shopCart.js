define(['jquery', 'jquery-cookie'], function ($) {

    // 显示用户
    $('#useraccount').mouseenter(function () {
        $('#useraccount1').fadeIn()
    })
    $('#useraccount').mouseleave(function () {
        $('#useraccount1').fadeOut()
    })
    var username = sessionStorage.getItem('username')
    if(username){
        $('#useraccount #useraccount1').html(`${username}`)
    }


    var newArr = []; // 定义的一个新数组，添加渲染到购物车的数组
    var zongji_sum = 0;

    sc_num()

    // 将数据渲染到页面上
    function sc_msg() {

        // 1.调用的play的
        shopCart1('../data/supermarket/supermarketr.json', true)
        shopCart1('../data/supermarket/liferight.json', true)
        shopCart1('../data/supermarket/playright.json', true)
        shopCart1('../data/supermarket/loveone.json', false)
        shopCart1('../data/supermarket/lovetwo.json', false)

    }

    sc_msg()


    // 封装调用play，life，supermarketr的调用函数，遍历出cookie中和数据中相同的数据
    function shopCart1(url, isTrue) {
        $.ajax({
            url: url,
            success: function (obj) {
                var arr = isTrue ? obj.result : obj['201509290'].data;
                // var arr = obj.result;
                var cookieStr = $.cookie("goods");
                if (cookieStr) {
                    var cookieArr = JSON.parse(cookieStr)
                    for (var i = 0; i < arr.length; i++) {
                        for (var j = 0; j < cookieArr.length; j++) {
                            var id2 = isTrue ? arr[i].categoryId : arr[i].id;
                            if (id2 == cookieArr[j].id) {
                                arr[i].num = cookieArr[j].num;
                                arr[i].date = cookieArr[j].date;
                                newArr.push(arr[i]);
                                break;
                            }
                        }
                    }
                    datahtml_sc()
                    shop_yixuan()
                    loo()

                }  // if cookieStr
            },
            error: function (msg) {
                console.log(msg + "错误")
            }
        })
    }

    // 将数据渲染到页面上
    function datahtml_sc() {
        $('#datahtml').empty();
        $('.sp-num').html(newArr.length)
        $('.head-num').html(newArr.length)
        var contrast = function (obj1, obj2) {
            var val1 = obj1.date;
            var val2 = obj2.date;
            if (val1 > val2) {
                return -1;
            } else if (val1 < val2) {
                return 1;
            } else {
                return 0;
            }
        }
        newArr.sort(contrast)
        for (var i = 0; i < newArr.length; i++) {
            var xiaoji1 = (newArr[i].num * newArr[i].price).toFixed(1)
            if (newArr[i].pic != undefined) {
                var node = $(`
                    <div id="${newArr[i].categoryId}">
                        <aside><b>店铺：</b><a>${newArr[i].shopName}</a><span></span></aside>
                        <ul id="${newArr[i].categoryId}">
                            <li><input type="checkbox" name="xuan"></li>
                            <li><img src="${newArr[i].pic}" alt=""></li>
                            <li>${newArr[i].itemName}</li>
                            <li>￥ <em class="danjia">${newArr[i].price}</em></li>
                            <li>
                                <button>-</button>
                                <input type="text" value="${newArr[i].num}" readonly>
                                <button>+</button>
                            </li>
                            <li>￥<em class="xiaoji">${xiaoji1}</em></li>
                            <li><a href="javascript:;" id="${newArr[i].categoryId}" class="delbtn">删除</a></li>
                        </ul>
                    </div>   `)
            } else {
                var node = $(`
                    <div id="${newArr[i].id}">
                        <aside><b>店铺：</b><a>${newArr[i].bizId}</a><span></span></aside>
                        <ul id="${newArr[i].id}">
                            <li><input type="checkbox" name="xuan"></li>
                            <li><img src="${newArr[i].imgUrl}" alt=""></li>
                            <li>${newArr[i].title}</li>
                            <li>￥ <em class="danjia">${newArr[i].price}</em></li>
                            <li>
                                <button>-</button>
                                <input type="text" value="${newArr[i].num}" readonly class="numbero">
                                <button>+</button>
                            </li>
                            <li>￥<em class="xiaoji">${xiaoji1}</em></li>
                            <li><a href="javascript:;" id="${newArr[i].id}" class="delbtn">删除</a></li>
                        </ul>
                    </div>    `)
            }
            node.appendTo($('#datahtml'))
        }

    }

    // 计算数量
    function sc_num() {
        var sum = 0;
        var cookieStr = $.cookie("goods");
        if (cookieStr) {
            var cookieArr = JSON.parse(cookieStr)
            for (var i = 0; i < cookieArr.length; i++) {
                sum += parseInt(cookieArr[i].num)
            }
        }
        $('#scmain .scmain1 .sp-sum').html(sum)
    }

    // 按钮+ 或—
    function sc_add() {
        $('#datahtml').on('click', 'button', function () {
            var input = $(this).siblings('input')
            var id = $(this).closest('ul').attr('id');
            var cookieArr = JSON.parse($.cookie("goods"))
            var index = cookieArr.findIndex(item => item.id == id)

            // +
            if (this.innerHTML == "+") {
                cookieArr[index].num++
            } else {
                cookieArr[index].num == 1 ? cookieArr[index].num = 1 : cookieArr[index].num--;
            }
            $(input).val(cookieArr[index].num);
            var danjiaElem = $(this).closest('li').prev('li').children('em')[0];
            var xiaoji = (cookieArr[index].num * $(danjiaElem).html()).toFixed(1)
            $($(this).closest('li').next('li').children('em')[0]).html(xiaoji)
            //z总计
            // 获取checkbox
            var zong = 0;
            var checkboxs = $('#scmain').find('input[name=xuan]');
            for (var i = 0; i < checkboxs.length; i++) {
                if (checkboxs[i].checked == true) {
                    var xiaoji = parseFloat($(checkboxs[i]).closest('ul').find('.xiaoji')[0].innerHTML);
                    zong += xiaoji;
                }
            }
            var jiesuans = $('#scmain').find('.jiesuan')
            for (var i = 0; i < jiesuans.length; i++) {
                jiesuans[i].innerHTML = zong.toFixed(1)
            }
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
            sc_num()
            shop_yixuan()
        })
    }
    sc_add()


    // 全选
    $('.scmain1,.scmain2,.scmain3').on('click', 'input[name=quan],input[name=xuan]', function () {
        if ($(this).attr('name') == 'quan') {
            // var scmain2 = $(this).closest('#scmain').children('.scmain2')[0]
            var inputxuans = $('.scmain2').find('input[name=xuan]')
            var inputquans = $('#scmain ').find('input[name=quan]')
            var jiesuans = $('#scmain .jiesuan')

            for (var j = 0; j < inputquans.length; j++) {
                for (var i = 0; i < inputxuans.length; i++) {
                    if (this.checked == true) {
                        inputxuans[i].checked = true;
                        inputquans[j].checked = true;
                    } else {
                        inputxuans[i].checked = false;
                        inputquans[j].checked = false;
                        jiesuans[0].innerHTML = 0.0
                        jiesuans[1].innerHTML = 0.0
                        $('#scmain .shop-num').eq(0).html(0)
                    }
                }
            }
            // 将总价计算
            if (inputquans[0].checked == true) {
                var xiaojis = $('#scmain').find('.xiaoji');
                var jiesuans = $('#scmain').find('.jiesuan')
                for (var i = 0; i < xiaojis.length; i++) {
                    zongji_sum += parseFloat(xiaojis[i].innerText);
                }
                for (var i = 0; i < jiesuans.length; i++) {
                    jiesuans[i].innerHTML = zongji_sum.toFixed(1)
                }
            }
            if (jiesuans[0].innerHTML != 0) {
                $('.jiesuanbtn').css('backgroundColor', '#ff0036')
                $('.jiesuanbtn').addClass('red')
            } else {
                $('.jiesuanbtn').css('backgroundColor', '#b0b0b0')
                $('.jiesuanbtn').removeClass('red')
            }

        }
        shop_yixuan()
    })

    // 单选从而全选
    $('.scmain2').on('click', 'input[name=xuan]', function () {
        // if($(this).attr('name') == 'xuan'){
        var xuan_sum = 0;
        var xuans = $('#scmain .scmain2').find('input[name=xuan]')
        var quans = $('#scmain').find('input[name=quan]')
        var xiaojis = $('#scmain').find('.xiaoji')
        var jiesuans = $('#scmain').find('.jiesuan')
        var zongjiaV = 0;
        var shop_num = 0;
        for (var i = 0; i < xuans.length; i++) {
            if (xuans[i].checked == true) {
                xuan_sum++;
                // 获取到小计的值
                zongjiaV += parseFloat(xiaojis[i].innerHTML);
                shop_num++
            }
        }
        $('#scmain .scmain3').find('.shop-num').eq(0).html(shop_num)
        if (xuans.length == xuan_sum) {
            for (var i = 0; i < quans.length; i++) {
                quans[i].checked = true;
            }
        } else {
            for (var i = 0; i < quans.length; i++) {
                quans[i].checked = false;
            }
        }
        // 结算
        for (var i = 0; i < jiesuans.length; i++) {
            jiesuans[i].innerHTML = zongjiaV.toFixed(1)
        }
        if (jiesuans[0].innerHTML != 0) {
            $('.jiesuanbtn').css('backgroundColor', '#ff0036')
            $('.jiesuanbtn').addClass('red')
        } else {
            $('.jiesuanbtn').css('backgroundColor', '#b0b0b0')
            $('.jiesuanbtn').removeClass('red')
        }
        // }
        shop_yixuan()
    })

    // 删除功能
    $('#scmain .scmain2').on('click', '.delbtn', function () {
        var res = confirm("确定删除该商品吗？")
        if (res) {
            var id = $(this).closest('div').remove().attr('id')
            del(id);
        }
        shop_yixuan()
        loo()
    })

    // 删除选中商品的
    $('#scmain .scmain3').on('click', '#del', function () {
        var xuanbtns = $('#scmain .scmain2').find('input[name=xuan]');
        var res = confirm("确定删除选中商品吗？")
        if (res) {
            for (var i = 0; i < xuanbtns.length; i++) {
                if (xuanbtns[i].checked == true) {
                    var id = $(xuanbtns[i]).closest('div').remove().attr('id')
                    del(id);
                }
            }
            var jiesuans = $('#scmain .jiesuan')
            jiesuans[0].innerHTML = '0.0'
            jiesuans[1].innerHTML = '0.0'
        }
        shop_yixuan()
        loo()
    })

    // 封装的删除函数
    function del(id) {
        var cookieArr = JSON.parse($.cookie("goods"));
        if (cookieArr.length != 0) {
            for (var i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    cookieArr.splice(i, 1)
                    break;
                }
            }
            if (cookieArr.length == 0) {
                $.cookie("goods", null)
            } else {
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            }
        }
        // 数量
        $('.sp-num').html(cookieArr.length)
        $('.head-num').html(cookieArr.length)
        sc_num()
        if (cookieArr.length == 0) {
            console.log(11);
            var quans = $('#scmain').find('input[name=quan]')
            for (var i = 0; i < quans.length; i++) {
                quans[i].checked = false;
            }
        }
    }

    // 结算
    $('#scmain').on('click', '.jiesuanbtn', function () {
        jiesuanfn()
        loo()
    })

    function jiesuanfn() {
        var jiesuans = $('#scmain').find('.jiesuanbtn');
        var xuans = $('#scmain').find('input[name=xuan]')
        var quans = $('#scmain').find('input[name=quan]')
        if ($(jiesuans[0]).hasClass('red')) {
            if(quans[0].checked == true){
                alert("购买成功，商品正准备发货~")
                $.cookie("goods", null);
                $('#datahtml').empty();
                sc_num();
                $('.head-num').html(0)
                $('.sp-num').html(0)
                $('.shop-num').html(0)
                $('.jiesuan').html(0.0)
            }else{
                for (var i = 0; i < xuans.length; i++) {
                    if (xuans[i].checked == true) {
                        var id = $(xuans[i]).closest('div').remove().attr('id')
                        del(id);
                    }
                }
                alert("购买成功，商品正准备发货~")
                $('.jiesuan').html(0.0)
                $('.shop-num').html(0)
            }

        } else {
            alert("请先选择商品")
        }
        var cookieStr = $.cookie("goods");
        if (cookieStr == null) {
            // var quans = $('#scmain').find('input[name=quan]')
            for (var i = 0; i < quans.length; i++) {
                quans[i].checked = false;
            }
        }
    }

    function shop_yixuan() {
        // 获取所有的xuan按钮
        var shopNum = 0;
        var xuans = $('#scmain .scmain2').find('input[name=xuan]');
        for(var i = 0 ;i < xuans.length ;i ++){
            if(xuans[i].checked == true){
               var val =  parseFloat($(xuans[i]).closest('div').find('input[type=text]').val())
                shopNum += val;
            }
        }
        $('#scmain .shop-num').html(shopNum)
    }



    // 其他功能

    function loo() {
        var scmain3 = $('#scmain').find('.scmain3');
        var scmain3top = $('#scmain').find('.scmain3').offset().top;
        var a = $('#datahtml').offset().top*2.16
        console.log($('#datahtml').offset().top);
        scmain3top = scmain3top-a

        $(scmain3).css({
            position:'relative'
        })

        window.onscroll = function () {
            var windowScrollTop = $(window).scrollTop();
            var footertop = $('#footer').offset().top;

            if(footertop > a){
                 if((scmain3top - windowScrollTop) < 0){
                     $(scmain3).css({
                         position:'relative'
                     })
                 }else{
                     $(scmain3).css({
                         position:'fixed',
                         bottom:0,
                         left:'50%',
                         marginLeft:'-495px'
                     })
                 }
             }
        }
    }

    return {}
})