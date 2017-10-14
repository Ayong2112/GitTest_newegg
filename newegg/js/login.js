window.onload = function(){
	$("username").onblur = function(){
		//1、用户名的长度
		$("username_p").style.display = "block";
		var oValue = this.value.replace(/\s/ig, "");
		this.value = oValue;
		// if(oValue.length > 18 || oValue.length < 6){
		// 	$("username_p").innerHTML = ("用户名的长度是6~18位");
		// }else if(/^\d/.test(oValue)){
		// 	$("username_p").innerHTML = ("用户名首字符不能为数字");
		// }else if(/\W/ig.test(oValue)){
		// 	$("username_p").innerHTML = ("用户名必须由数字字母下划线组成");
		// }else{
		// 	$("username_p").innerHTML = ("用户名正确");
		// 	$("username_p").style.backgroundPosition = "0 -17px";
		// 	$("username_p").style.color = "green";
		// }

		if(/^1\d{10}$/.test(oValue)){
			$("username_p").innerHTML = "手机号正确";
			$("username_p").style.backgroundPosition = "0 -17px";
			$("username_p").style.color = "green";
		}else{
			$("username_p").innerHTML = "请输入正确的手机号码";
		}
	}
	$("cipher").onblur = function(){
		//1、用户名的长度
		$("cipher_p").style.display = "block";
		var oValue = this.value.replace(/\s/ig, "");
		this.value = oValue;
		if(oValue.length > 18 || oValue.length < 6){
			$("cipher_p").innerHTML = ("密码的长度是6~18位");
		}else if(/^\d/.test(oValue)){
			$("cipher_p").innerHTML = ("密码首字符不能为数字");
		}else if(/\W/ig.test(oValue)){
			$("cipher_p").innerHTML = ("密码必须由数字字母下划线组成");
		}else{
			$("cipher_p").innerHTML = ("密码正确");
			$("cipher_p").style.backgroundPosition = "0 -17px";
			$("cipher_p").style.color = "green";
		}
	}
	// 商城接口登录
	var aInputs = $("login").getElementsByTagName("input");
			$("loginbtn").onclick = function(){
				var data = `${aInputs[0].name}=${aInputs[0].value}&${aInputs[1].name}=${aInputs[1].value}`;
				data += "&status=login";
				$_ajax({
					method: "post",
					url: "http://datainfo.duapp.com/shopdata/userinfo.php",
					data: data,
					success: function(data){
						if(data == 0){
							alert("用户名不存在")
						}else if(data == 2){
							alert("用户名与密码不符");
						}else{
							//成功
							alert(data);
						}
					}
				})
			}
	
}
function $(id){
	return document.getElementById(id);
}
