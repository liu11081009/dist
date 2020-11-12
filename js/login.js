
$(function () {
    var inputs = $('#main aside form input');
    /*for(var i = 0 ;i < inputs.length;i++){
        $(inputs[i]).mouseenter(function () {
            $(this).css('borderColor','#ff0036')
        })
        $(inputs[i]).mouseleave(function () {
            $(this).css('borderColor','#6c6c6c')
        })
    }*/
    for(var i = 0 ;i < inputs.length;i++){
        $(inputs[i]).click(function () {
            $(this).css('borderColor','#ff0036').siblings('input').css('borderColor','#6c6c6c')
        })
    }


    // 处理数据
    var btn = document.getElementById('loginbtn');
    btn.onclick = function () {
        var inputs = $('#main form input')

        const Email = inputs[0].value;
        const emailrule = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (!emailrule.test(Email)) {
            alert("请输入有效邮箱");
            return false;
        }
        const psd = inputs[1].value;

        console.log(inputs[0].value);
        console.log(inputs[1].value);

        // 给后台发送数据
        $.ajax({
            type:'post',
            url:'../php/login.php',
            data:{
                email:inputs[0].value,
                psd:inputs[1].value
            },
            success:function (res) {
                console.log(res);
                console.log(res['code'])
                if(res == "登录成功"){

                    // sessionStorage.setItem(inputs[0].value ,inputs[1].value)
                    // var obj = {Email:psd}
                    sessionStorage.setItem('username',Email)

                    alert("登录成功");
                    window.location.href = '/index.html'
                }
            },
            error:function (msg) {
                console.log("register给php的错误信息"+msg)
            }
        })
    }
})