
console.log("register注册页面引入require  加载成功")

// 引入多个路径
require.config({
    paths:{
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

require(['jquery','jquery-cookie'],function ($) {

    var btn = document.getElementById('registerbtn');

    btn.onclick = function () {

        var inputs = $('#main form input')

        const Email = inputs[0].value;
        const emailrule = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (!emailrule.test(Email)) {
            alert("请输入有效邮箱");
            return false;
        }
        const psd = inputs[1].value;
        const psd2 = inputs[2].value;
        if(psd !== psd2){
            alert("两次输入的密码不一样");
            return false;
        }

        // 给后台发送数据
        $.ajax({
            type:'post',
            url:'../php/register.php',
            data:{
                email:inputs[0].value,
                psd:inputs[1].value
            },
            success:function (res) {
                if(res == "注册成功"){
                    alert("成功")
                    window.location.href = '/login.html';
                    return;
                }
                if(res == "已有"){
                    alert("该用户已注册，请直接登录~")
                    return;
                }
            },
            error:function (msg) {
                console.log("register给php的错误信息"+msg)
            }
        })
    }

})