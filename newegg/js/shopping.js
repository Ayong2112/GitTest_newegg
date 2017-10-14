
// 加载商品
window.onload = function(){
	sc_msg()
	sc_car();
	$.ajax({
		url:"../json/shopping.json",
		method:"get",
		success:function(data){
			var html = "";
			for(var i = 0; i < data.length; i++){

				html += "<div>" + '<img src = "'+ data[i].src+'"/>'+"<p><a href = '#'>"+data[i].describe +"</a></p>"+ "<p>"+data[i].price+"</p>"+ "<button id = '"+data[i].id+"' class = 'sc_btn'>加入购物车</button>"+"</div>"
			}
			// html  = "<p>"+"<span>"疯抢商品"</span>"+"</p>" + "html";
			$("#goods").html(html);
		}
	})
	// 给购物车按钮添加事件
	$("#goods").on("click",".sc_btn",function(){
		// 是否是第一次添加cookie
		// $("#shoppingcar").css("display","none");
		// $("#shoppingprice").css("display","block");
		var id = this.id;
		var first = $.cookie("goods") == null ? true : false;
		if(first){
			// $.cookie("name=value)
			$.cookie("goods", '[{id:' + id + ',num:1}]', {
				// name=value
				expires: 7
			});
		}else{
			var str = $.cookie("goods");
			var arr = eval(str);
			var same = false; //代表是否有相同商品
			//遍历所有的对象，判断是否id相同，num++
			for(var i in arr){
				if(arr[i].id == id){
					arr[i].num = arr[i].num + 1;
					var cookieStr = JSON.stringify(arr);
					$.cookie("goods", cookieStr,  {
						expires: 7
					});
					same = true;
					break;
				}
			}
			//没有相同的商品
			if(!same){
				// var str = $.cookie("goods");
				// var arr = eval(str);
				// console.log(arr);
				var obj = {id: id, num: 1};
				arr.push(obj);
				var cookieStr = JSON.stringify(arr);
				$.cookie("goods", cookieStr, {
					expires: 7
				});
			}
			sc_car();
		}
		sc_msg()

		// return false;
	})
	//商品数量增加
		$("#loaddata").on("click",".addNum",function(){
			// alert($(this).attr("id"));
			var sc_arr = eval($.cookie("goods"));
			// console.log(sc_arr);
			for(var i in sc_arr){

				if (sc_arr[i].id == $(this).attr("id")) {
					sc_arr[i].num ++;
					var num = sc_arr[i].num;
					console.log(num)
					var iNow = i;
					var this_ = $(this);
					$.ajax({
						url:"../json/shopping.json",
						type:"get",
						success:function(data){
							// alert(1);
							// alert(this_.parent().siblings(".allPrice").html())
							this_.parent().siblings(".allPrice").html('￥'+parseInt(data[sc_arr[iNow].id].price)*sc_arr[iNow].num);
							
						}
					})
					
					$(this).parent().siblings("#shopNum").val(num);
					var arr = JSON.stringify(sc_arr);
				}
			}
			$.ajax({
				url:"../json/shopping.json",
				type:"get",
				success:function(data){
					var sc_arr = eval($.cookie("goods"));
					var html = "";
					var Allprice = 0;
					for(var i in sc_arr){
						Allprice += parseInt(data[sc_arr[i].id].price)*sc_arr[i].num;
					}
					$(".totalPriceAll").html('￥'+Allprice);
				

				}
			})
			$.cookie("goods", arr,{expires:7} )
		})
		//商品数量减少
		$("#loaddata").on("click",".delNum",function(){
			// alert($(this).attr("id"));
			var sc_arr = eval($.cookie("goods"));
			// console.log(sc_arr);
			for(var i in sc_arr){

				if (sc_arr[i].id == $(this).attr("id")) {

					sc_arr[i].num --;
					if (sc_arr[i].num < 1) {
						sc_arr[i].num = 1;
					}
					var num = sc_arr[i].num;

					console.log(num)
					var iNow = i;
					var this_ = $(this);
					$.ajax({
						url:"../json/shopping.json",
						type:"get",
						success:function(data){
							// alert(1);
							// alert(this_.parent().siblings(".allPrice").html())
							this_.parent().siblings(".allPrice").html('￥'+parseInt(data[sc_arr[iNow].id].price)*sc_arr[iNow].num)
						}
					})
					
					$(this).parent().siblings("#shopNum").val(num);
					var arr = JSON.stringify(sc_arr);
				}
			}
			$.ajax({
				url:"../json/shopping.json",
				type:"get",
				success:function(data){
					var sc_arr = eval($.cookie("goods"));
					var html = "";
					var Allprice = 0;
					for(var i in sc_arr){
						Allprice += parseInt(data[sc_arr[i].id].price)*sc_arr[i].num;
					}
					$(".totalPriceAll").html('￥'+Allprice);
				

				}
			})
			$.cookie("goods", arr,{expires:7} )
		})
		//删除商品
		$("#loaddata").on("click",".delete",function(){
			// alert($(this).attr("id"));
			var sc_arr = eval($.cookie("goods"));
			// console.log(sc_arr);
			for(var i in sc_arr){

				if (sc_arr[i].id == $(this).attr("id")) {
					sc_arr.splice(i,1);
					/*sc_arr[i].num --;
					var num = sc_arr[i].num;
					console.log(num)
					var iNow = i;
					var this_ = $(this);
					$.ajax({
						url:"../json/shopping.json",
						type:"get",
						success:function(data){
							// alert(1);
							// alert(this_.parent().siblings(".allPrice").html())
							this_.parent().siblings(".allPrice").html('￥'+parseInt(data[sc_arr[iNow].id].price)*sc_arr[iNow].num)
						}
					})
					
					$(this).parent().siblings("#shopNum").val(num);*/
					var arr1 = JSON.stringify(sc_arr);
					console.log(arr1);
				}
			}
			console.log(arr1);
			$.cookie("goods", arr1,{expires:7} )
			$(this).parent().parent().remove();
			// alert($(".shopgoods").length)
			if ($(".shopgoods").length < 1) {
				// alert(1);
				// console.log(arr1);
				$("#shoppingprice").remove();
				$("#shoppingcar").css("display","block")
				$.cookie("goods", null);
			}
		});
		console.log($(".shopgoods").length)
	//页面加载的时候如果存在cookie
	/*$.ajax({
			url: "../json/shopping.json",
			type: "GET",
			success: function(data){
				var arr = eval($.cookie("cargo")); 

				if(!arr){
					alert(1)
					$("#shoppingcar").css("display", "block");
					$("#shoppingprice").css("display", "none");
				}else if(arr){
					alert(2);
				}
			}
	})*/
	//购物车数字
	function sc_car(){
		var sc_str = $.cookie("goods");
		if(sc_str){ //判断字符串是否存在
			var sc_arr = eval(sc_str);
			var sc_num = 0;
			for(var i in sc_arr){
				sc_num = Number(sc_arr[i].num) + sc_num;
			}
			$(".sc_num").html(sc_num);
		}
	}
	//已经存储在cookie数据进行加载
	function sc_msg(){
		$.ajax({
			url:"../json/shopping.json",
			type:"get",
			success:function(data){
				var sc_arr = eval($.cookie("goods"));
				var html = "";
				var Allprice = 0;
				for(var i in sc_arr){
					// alert(sc_arr);
					html +=	"<div class = 'shopgoods'>"+'<input type="checkbox"/>'+'<img src="'+data[sc_arr[i].id].src+'"/>'+'<p>'+data[sc_arr[i].id].describe+'</p>'+'<p class="singleprice">¥'+data[sc_arr[i].id].price+'</p>'+'<input type="text" value = "'+sc_arr[i].num+'" id="shopNum"/>'+'<div><p id="'+ sc_arr[i].id+'" class="addNum">+</p><p id="'+sc_arr[i].id+'" class="delNum">-</p></div>'+'<p class="allPrice">￥'+parseInt(data[sc_arr[i].id].price)*sc_arr[i].num+'</p>'+'<div><p id="'+sc_arr[i].id+'" class="delete">删除</p><p>移入收藏夹</p></div>'+'</div>'
					Allprice += parseInt(data[sc_arr[i].id].price)*sc_arr[i].num;
				}
				// alert(html);
				$(".totalPriceAll").html('￥'+Allprice);
				$("#loaddata").html(html);
				if (!sc_arr) {
					// alert(1);
					$("#shoppingcar").css("display", "block");
					$("#shoppingprice").css("display", "none");
				}else{
					// alert(2);
					$("#shoppingcar").css("display", "none");
					$("#shoppingprice").css("display", "block");
				}
			}
		})
	}
}
