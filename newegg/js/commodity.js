//搜索框接受数据
function func(data){
		var oDiv = document.getElementById("search_menu");
		var html = "";
		if(data.s.length){
			oDiv.style.display = "block";
			for(var i = 0; i < data.s.length;i++){
				html += "<a>" + data.s[i]　+ "</a>";
			}
			oDiv.innerHTML = html;
		}else{
			oDiv.style.display = "none";
		}	
	}
window.onload = function(){
	//搜索框根据输入内容加载内容
	var oSearchText = document.getElementById("search_text");
		var oDiv = document.getElementById("search_menu");
		oSearchText.onkeyup = function(){
			if(this.value != ""){
				var oScript = document.createElement("script");
				oScript.src = "http://suggestion.baidu.com/su?wd=" + this.value + "&cb=func";
				document.body.appendChild(oScript);
			}else{
				oDiv.style.display = "none";
			}
		}
		oSearchText.onclick = function(){
			oDiv.style.display = "none";
		}

		/*$("#menulist").on("mouseenter","li.menulist1",function(){
			var iNow = $(this).index();
			$.ajax({
				url:"../json/menu.json",
				method:"get",
				success:function(data){
					var html1 = "";
					var html = "";
					for(var attr in data[iNow]){
						var html2 ="";
						var html3 = "";
						if(attr == "img"){
							for(var j = 0;j<data[iNow].img.length;j++){
								html3 += "<p class = 'hotimg' style = 'background:url("+ data[iNow].img[j] +") no-repeat'></p>";
								// '<img src = "'+ data[iNow].img[j] +'"/>';
							}
							html3 = "<div id = 'menuimg'><h4>"+'热门品牌'+"</h4>"+ "<div id = bigmenuimg>" + html3+ "</div>"+"</div>";
							
						}else{
							for(var i = 0;i < data[iNow][attr].length - 1;i++){

							if(i == 0){
								html1 = "<h4>" + data[iNow][attr][0] + "</h4>";
							}
							else{
								html2 += "<a href = ''>"+data[iNow][attr][i]+"</a>"
							}	
						}	
						html += html1 + "<div class ='text'>" + html2 + "</div>";
						}						
					}
						$("#openmenu").html(html+html3);
						

				}
			})
		})*/
// 底部图片加载
	$.ajax({
		url:"../json/commodity.json",
		method:"get",
		success:function(data){
			var html = "";
			for(var i = 0;i<data.length;i++){
				html += '<img src = "'+data[i].src+'"/>'
			}
			$("#footimg").html(html);
		}
	})
// goodsimg
// 点击按钮显示不同的图片
	$("#goodsimg").find("ul").on("click","li",function(){
		$(this).css("border","1px solid #f60");
		$(this).siblings("li").css("border","1px solid #fff");
		$("#goodsimg").find("div").find("img").css("display", "none");
		$("#goodsimg").find("div").find("img").eq($(this).index()).css("display", "block")
		$("#allbox").find("img").css("display", "none");
		$("#allbox").find("img").eq($(this).index()).css("display", "block")
	})
	$("#upbox").click(function(){
		document.body.scrollTop = "0px";
		document.documentElement.scrollTop = "0px";
	})
	window.onscroll = function(){
		var t = document.body.scrollTop || document.documentElement.scrollTop;
		if(t == 0){
			$("#upbox").css("display","none");
		}else{
			$("#upbox").css("display","block");
		}
		
	}
	// 放大镜
	var oLbox = document.getElementById("l_box");
			//图片上看局部的盒子
			var oSbox = document.getElementById("smallbox");
			//和左边盒子一样大的盒子
			var oBox1 = document.getElementById("box1");
			//右边显示照片的区域
			var oRbox = document.getElementById("r_box");
			//右边整个照片的位置
			var oAbox = document.getElementById("allbox");
			oBox1.onmouseover = function(){
				oSbox.style.display = "block";
				oRbox.style.display = "block";
			}
			oBox1.onmouseout = function(){
				oSbox.style.display = "none";
				oRbox.style.display = "none";
			}
			oBox1.onmousemove = function(event){
				var e = event || window.event;
				//左右移动
				var left = e.offsetX - oSbox.offsetWidth / 2;
				if(left < 0){
					left = 0;
				}else if(left > oLbox.offsetWidth - oSbox.offsetWidth){
					left = oLbox.offsetWidth - oSbox.offsetWidth;
				}
				oSbox.style.left = left + "px";
				//上下移动
				var top = e.offsetY - oSbox.offsetHeight / 2;
				if(top < 0){
					top = 0;
				}else if(top > oLbox.offsetHeight - oSbox.offsetHeight){
					top = oLbox.offsetHeight - oSbox.offsetHeight;
				}
				oSbox.style.top = top + 'px';
				//移动的比例 把xy值换成比例
				var leftX = left / (oLbox.offsetWidth - oSbox.offsetWidth);
				var topY = top / (oLbox.offsetHeight - oSbox.offsetHeight);
				//利用比例计算右边图片偏移出去的距离
				oAbox.style.left = -leftX * (oAbox.offsetWidth - oRbox.offsetWidth) + 'px';

				oAbox.style.top= -topY * (oAbox.offsetHeight - oRbox.offsetHeight) + 'px';
			}

		
}