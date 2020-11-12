define(['jquery','jquery-cookie'], function ($) {

    // 判断用户
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

    // 放大镜的功能
    function loupe() {
        // $(function () {

            $('#seller').on('mouseenter','.simgbox,.bimgbox,.dtl-mark',function () {
                $('.bimgbox').css('display', 'block')
                $('.dtl-mark').css('display', 'block')
            })
            $('#seller').on('mouseleave','.simgbox,.bimgbox,.dtl-mark',function () {
                $('.bimgbox').css('display', 'none')
                $('.dtl-mark').css('display', 'none')
            })

            $('#seller').on('mousemove','.simgbox,.bimgbox,.dtl-mark,.bimgbox img',function (e) {
                var e = e || window.event;
                var l = e.pageX - $('.simgbox').offset().left - $('.dtl-mark').width() / 2;
                var t = e.pageY - $('.simgbox').offset().top - $('.dtl-mark').height() / 2;

                var x = $('.simgbox').width() - $('.dtl-mark').width()
                var y = $('.simgbox').height() - $('.dtl-mark').height()

                l = Math.min(l, x)
                l = Math.max(0, l);
                t = Math.min(t, y)
                t = Math.max(0, t);

                $('.dtl-mark').css({left: l, top: t})
                $('.bimgbox img').css({left: -l * 2, top: -t * 2})
            })
        // })
    }

    // 将数据载入到页面中
    function downloadData() {
        var location1 = window.location.href;
        var url = location1.split("?")[1]
        var id = url.slice(3)
        if (id) {
            // 请求的第一个ajax即life的
            data1('../data/supermarket/liferight.json',id,true)

            // 请求第二个ajax 即 超市
            data1('../data/supermarket/supermarketr.json',id,true)

            // 第三个ajax 即 play
            data1('../data/supermarket/playright.json',id,true)

            // 猜你喜欢
            data1('../data/supermarket/loveone.json',id,false)
            data1('../data/supermarket/lovetwo.json',id,false)
        }
    }

    // 数量的增加 减少
    function dtl_num(){
        $('#seller').on('click','.dtlm-r .dtlm-r2 button',function () {
            var input = $(this).siblings('input')[0]
            var dtl_val = $(input).val();
            if(this.innerText == "-"){
                // 数量减少的
                dtl_val == 1 ? dtl_val = 1 : dtl_val--;
                $(input).val(dtl_val);
            }else{
                // 数量增加
                 dtl_val >= 100 ? dtl_val = 100 : dtl_val++;
                $(input).val(dtl_val);
            }
        })
    }

    // 封装的函数  life  play 超市的 这三个的数据请求 + love
    function data1(url,id,isTrue){
        $.ajax({
            url: url,
            success: function (obj) {
                if(isTrue){
                    var arr = obj.result;
                }else{
                    var arr = obj['201509290'].data;
                }
                for (var i = 0; i < arr.length; i++) {
                    if(isTrue){
                        var id2 = arr[i].categoryId;
                        var imgurl = arr[i].pic;
                        var bigtitle = arr[i].itemName;
                        var smatitle = arr[i].subItemName;
                        var bshop = arr[i].shopName;
                    }else{
                        var id2 = arr[i].id;
                        var imgurl = arr[i].imgUrl;
                        var bigtitle = arr[i].title;
                        var smatitle = '';
                        var bshop = arr[i].bizId;
                    }
                    if (id == id2) {
                        var node = $(`
        <div class="dtlm-l">
            <div class="simgbox">
                <img src="${imgurl}" alt="">
                <span class="dtl-mark"></span>
            </div>
            <div class="bimgbox">
                <img src="${imgurl}" alt="">
            </div>
        </div>
        <div class="dtlm-r">
            <b>${bigtitle}</b>
            <p>${smatitle}</p>
            <div class="dtlm-r1"><span>价格</span>￥&nbsp;<em>${arr[i].price}</em></div>
            <div class="dtlm-r2">
                <span>数量</span>
                <section>
                    <input type="text" value="1" readonly>
                    <button>+</button>
                    <button>-</button>
                </section>
                <i>件</i>
            </div>
            <div class="dtlm-r3">
                <span></span>
                <button>立即购买</button>
                <button class="addCar" id="${id2}"><i class="iconfont">&#xe501;&nbsp;</i>加入购物车</button>
            </div>
            <div class="dtlm-r4">
                <span>商品店铺</span>
                <b>${bshop}</b>
            </div>
        </div>     `)
                        node.appendTo($('#seller'));
                        $('head title').html(bigtitle);
                        return;
                    }
                }
            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }

    downloadData()

    // 调用的放大镜的函数
    loupe()
    dtl_num()


    // 点击加入购物车的时候
    // function clickadd(){
        $('#seller').on('click','.addCar',function () {



            // 判断用户
            var username = sessionStorage.getItem('username')
            if(username){


                var id = this.id;
                var input = $(this).closest('.dtlm-r3').siblings('.dtlm-r2').find('input')[0]
                var num = input.value;

                // 判断是不是第一个
                var first = $.cookie("goods") == null ? true : false;
                if(first){
                    num = input.value;
                    var date = new Date().getTime()
                    var cookieArr = [{id:id,num:num,date:date}]
                    $.cookie('goods',JSON.stringify(cookieArr),{
                        expires:7
                    })
                }else{
                    // 查找之前是不是添加过该商品
                    var cookieArr = JSON.parse($.cookie("goods"))
                    var same = false; // 假设没有添加过
                    var ii = 0;
                    for(var i = 0 ;i < cookieArr.length ;i++){
                        if(cookieArr[i].id == id){
                            same = true;
                            ii = i;
                        }
                    }
                    if(same){
                        cookieArr[ii].num++
                    }else{
                        var date = new Date().getTime()
                        var newobj = {id:id,num:num,date:date}
                        cookieArr.push(newobj)
                    }
                    $.cookie("goods",JSON.stringify(cookieArr),{
                        expires: 7
                    })
                }
                // 跳转页面
                window.location.href = '/html/shopCart.html'




            }else{
                alert("请先登录用户~")
            }












        })  // 点击的click 函数
    // }
    // clickadd()
    return {}
})