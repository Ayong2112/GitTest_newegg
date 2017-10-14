// 验证码
window.onload = function(){
	var oP = document.getElementById("verification_p");
	var oBtn = document.getElementById("change")
	oP.innerHTML = authCode(4);
	oBtn.onclick = function(){
		oP.innerHTML = authCode(4);
	}

	$("phonenum").onblur = function(){
		//手机号的长度
		$("phonenum_em").style.display = "inline-block";
		var oValue = this.value.replace(/\s/ig, "");
		this.value = oValue;
		if(/^1\d{10}$/.test(oValue)){
			$("phonenum_em").innerHTML = "手机号正确";
			$("phonenum_em").style.backgroundPosition = "0 -17px";
			$("phonenum_em").style.color = "green";
		}else{
			$("phonenum_em").innerHTML = "请输入正确的手机号码";
		}
	}
	$("cipher").onblur = function(){
		//1、用户名的长度
		$("cipher_em").style.display = "inline-block";
		var oValue = this.value.replace(/\s/ig, "");
		this.value = oValue;
		if(!oValue.length){
			$("cipher_em").innerHTML = ("请设置密码");
		}else if(oValue.length > 18 || oValue.length < 6){
			$("cipher_em").innerHTML = ("密码的长度是6~18位");
		}else if(/^\d/.test(oValue)){
			$("cipher_em").innerHTML = ("密码首字符不能为数字");
		}else if(/\W/ig.test(oValue)){
			$("cipher_em").innerHTML = ("密码必须由数字字母下划线组成");
		}else{
			$("cipher_em").innerHTML = ("密码正确");
			$("cipher_em").style.backgroundPosition = "0 -17px";
			$("cipher_em").style.color = "green";
		}
	}
	$("cipher2").onblur = function(){
		$("cipher_em2").style.display = "inline-block";
		var oValue = this.value.replace(/\s/ig, "");
		this.value = oValue;
		if(!oValue.length){
			$("cipher_em2").innerHTML = ("请再次输入密码");
		}else if(oValue.length > 18 || oValue.length < 6){
			$("cipher_em").innerHTML = ("密码的长度是6~18位");
		}else if(/^\d/.test(oValue)){
			$("cipher_em").innerHTML = ("密码首字符不能为数字");
		}else if(/\W/ig.test(oValue)){
			$("cipher_em").innerHTML = ("密码必须由数字字母下划线组成");
		}else if(oValue != $("cipher").value){
			$("cipher_em2").innerHTML = ("与上次密码输入不一致");
		}else{
			$("cipher_em2").innerHTML = ("密码正确");
			$("cipher_em2").style.backgroundPosition = "0 -17px";
			$("cipher_em2").style.color = "green";
		}
	}
	$("verification").onblur = function(){
		$("verification_em").style.display = "inline-block";
		var oValue = this.value.replace(/\s/ig, "");
		this.value = oValue;
		if(!oValue.length){
			$("cipher_em").innerHTML = ("验证码不能为空");
		}else if($("verification").value != $("verification_p").innerHTML){
			$("verification_em").innerHTML = ("验证码输入错误");
		}else{
			$("verification_em").innerHTML = ("验证码正确");
			$("verification_em").style.backgroundPosition = "0 -17px";
			$("verification_em").style.color = "green";
		}
	}

	// 商城接口
	var aInputs = $("main").getElementsByTagName("input");
	$("registerbtn").onclick = function(){
		var data = `${aInputs[0].name}=${aInputs[0].value}&${aInputs[1].name}=${aInputs[1].value}`;
		data += "&status=register";
		$_ajax({
			method: "post",
			url: "http://datainfo.duapp.com/shopdata/userinfo.php",
			data: data,
			success: function(data){
				if(data == 0){
					alert("用户名重名")
				}else if(data == 2){
					alert("数据库报错");
				}else{
					//成功
					alert("注册成功");
				}
			}
		})
	}


}
function $(id){
	return document.getElementById(id);
}
// 验证码函数
function authCode(n){
	var arr = [];
	for(var i = 0; i < n; i++){
		var num = parseInt(Math.random() * 100);
		if(num >= 0 && num < 10){
			arr.push(num);
		}else if(num >= 10 && num <= 35){
			arr.push(String.fromCharCode(num + 87));
		}else if(num >= 65 && num <= 90){
			arr.push(String.fromCharCode(num));
		}else{
			//无用数
			i--;
			continue;
		}
	}
	return arr.join("");
}
		