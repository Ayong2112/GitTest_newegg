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

		$("#menulist").on("mouseenter","li.menulist1",function(){
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
		})
// 大轮播图
	var curIndex = 0;
	var carouselTimer = setInterval(function(){
		if(curIndex < $(".imgList li").length-1){ 
	      curIndex ++; 
	    }else{ 
	      curIndex = 0;
	    }
	    changeTo(curIndex);
	},2500);
	  $(".indexList").find("li").each(function(item){ 
	    $(this).hover(function(){ 
	      clearInterval(carouselTimer);
	      changeTo(item);
	      curIndex = item;
	    },function(){ 
	      carouselTimer = setInterval(function(){ 
	        if(curIndex < $(".imgList li").length-1){ 
	          curIndex ++; 
	        }else{ 
	          curIndex = 0;
	        }
	        //调用变换处理函数
	        changeTo(curIndex); 
	      },2500);
	    });
	  });
  function changeTo(num){ 
    $(".imgList").find("li").removeClass("imgOn").hide().eq(num).fadeIn().addClass("imgOn");
    $(".indexList").find("li").removeClass("indexOn").eq(num).addClass("indexOn");
  }
// 右侧轮播图
$().extend({
	animate: function(json, callBack){
		for(var i = 0; i < this.elements.length; i++){
			startMove(this.elements[i], json, callBack);
		}
	}
})
	$(function(){
		var aBtns = $("#carouse2").find("#carouse2ol").find("li");
		var oUl = $("#carouse2").find("#carouse2img");
		var aLis = oUl.find("li");
		var iNow = 0;
		var timer = null;
		//按钮点击获取对应的下标
		aBtns.click(function(){
			iNow = $(this).index();
			tab();
		})
		function tab(){
			//清除btn按钮下的class名
			aBtns.attr("class","");
			//给点击的按钮添加class名字
			aBtns.eq(iNow).attr("class","carouse2li");
			//通过按钮下标去让图片运动相应的距离
			oUl.animate({left:-226*iNow},function(){
				if(iNow == aBtns.size()){
					oUl.css("left",0);
					iNow = 0;
				}
			})
		}
		function timerInner(){
			iNow++;
			tab();
			if(iNow == aBtns.size()){
				aBtns.eq(0).attr("class","carouse2li");
				}
		}
		timer = setInterval(timerInner,2000);
	})
// 倒计时
var starttime = new Date("2017/10/20");
  setInterval(function () {
    var nowtime = new Date();
    var time = starttime - nowtime;
    var hour = addZero(parseInt(time / 1000 / 60 / 60 % 24));
    var minute = addZero(parseInt(time / 1000 / 60 % 60));
    var seconds = addZero(parseInt(time / 1000 % 60));
    $('.timespan').html(hour + ":" + minute + ":" + seconds);
  }, 1000);
 function addZero(num){
	if(num < 10){
		return "0" + num;
	}else{
		return num;
	}
}
// 下侧左右轮播图
$(function(){

		var aBtns = $("#carouse3").find("ol").find("li");
		var oUl = $("#carouse3").find("ul");
		var aLis = oUl.find("li");
		var iNow = 0;
		var timer = null;
		$("#carouse3li1").onclick = function(){
			$("#carouse3").find("ul").animate({
				left:0
			},2000);
		}
		$("#carouse3li2").onclick = function(){
			$("#carouse3").find("ul").animate({
				left:-771
			},2000);
		}
		//按钮点击获取对应的下标
		aBtns.click(function(){
			iNow = $(this).index();
			tab3();
		})
		function tab3(){
			//清除btn按钮下的class名
			aBtns.attr("class","");
			//给点击的按钮添加class名字
			aBtns.eq(iNow).attr("class","carouse3btn");
			//通过按钮下标去让图片运动相应的距离
			oUl.animate({left:-771*iNow},function(){
				if(iNow == aBtns.size()){
					oUl.css("left",0);
					iNow = 0;
				}
			})
		}
		function timerInner(){	
			tab3();
			iNow++;
			if(iNow == aBtns.size()){
				iNow = 0;
				}
		}
		timer = setInterval(timerInner,6000);
})	
// 动图
 var curIndex1 = 0; 
  var autoChange1 = setInterval(function(){ 
    if(curIndex1 < $("#carouse4 li").length-1){ 
      curIndex1 ++; 
    }else{ 
      curIndex1 = 0;
    }
    //调用变换处理函数
    changeTo1(curIndex1); 
  },5000);
  function changeTo1(num){ 
    $("#carouse4").find("li").removeClass("imgOn").hide().eq(num).fadeIn().addClass("imgOn");
  }
  // 手风琴
  $('.reputationli').mouseover(function(){
        $(this).stop().animate({
            'width':'675px'
        }).siblings().stop().animate({
            'width':'160px'
        });
    });
  //商品展示
 $("#showgoods").find("button").click(function(){
	//点击按钮的时候
	$("#showgoods").find("button").attr("class", "");
	$("#showgoods").find("li").css("display", "none");
	//设置当前点击的按钮和对应div
	$(this).attr("class", "active");
	$("#showgoods").find("li").eq($(this).index()).css("display", "block");
})
 // 轮播图5
$().extend({
	animate: function(json, callBack){
		for(var i = 0; i < this.elements.length; i++){
			startMove(this.elements[i], json, callBack);
		}
	}
})
	$(function(){
		var aBtns = $("#carouse5").find("#carouse5ol").find("li");
		var oUl = $("#carouse5").find("#carouse5img");
		var aLis = oUl.find("li");
		var iNow = 0;
		var timer = null;
		//按钮点击获取对应的下标
		aBtns.click(function(){
			iNow = $(this).index();
			tab1();
		})
		function tab1(){
			//清除btn按钮下的class名
			aBtns.attr("class","");
			//给点击的按钮添加class名字
			aBtns.eq(iNow).attr("class","carouse5li");
			//通过按钮下标去让图片运动相应的距离
			oUl.animate({left:-238*iNow},function(){
				if(iNow == aBtns.size()){
					oUl.css("left",0);
					iNow = 0;
				}
			})
		}
		function timerInner(){
			iNow++;
			tab1();
			if(iNow == aBtns.size()){
				aBtns.eq(0).attr("class","carouse5li");
				}
		}
		timer = setInterval(timerInner,2000);
	})
// 轮播图6

var aBtns = $(".carouse6").find("#carouse6ol").find("li");
		var oUl = $(".carouse6").find("#carouse6img");
		var aLis = oUl.find("li");
		var iNow = 0;
		var timer = null;
		//按钮点击获取对应的下标
		aBtns.click(function(){
			iNow = $(this).index();
			tab6();
		})
		function tab6(){
			//清除btn按钮下的class名
			aBtns.attr("class","");
			//给点击的按钮添加class名字
			aBtns.eq(iNow).attr("class","carouse6li");
			//通过按钮下标去让图片运动相应的距离
			oUl.animate({left:-480*iNow},function(){
				if(iNow == aBtns.size()){
					oUl.css("left",0);
					iNow = 0;
				}
			})
		}
		function timerInner(){	
			tab6();
			iNow++;
			if(iNow == aBtns.size()){
				iNow = 0;
				}
		}
		timer = setInterval(timerInner,5000);
// 右侧热销榜
$(".hotgoods1").find("button").click(function(){
	$(".hotgoods1").find("button").attr("class", "");
	$(".hotgoods1").find(".hotgoodsli").css("display", "none");
	//设置当前点击的按钮和对应div
	$(this).attr("class", "hotgoodsbtn");
	$(".hotgoods1").find(".hotgoodsli").eq($(this).index() - 1).css("display", "block");
})















}