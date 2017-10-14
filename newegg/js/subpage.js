window.onload = function(){
	$.ajax({
		url:"../json/subpage.json",
		method:"get",
		success:function(data){
			var html = "";
			for(var i = 0; i < data.length; i++){

				html += "<div>" + '<img src = "'+ data[i].src+'"/>'+"<p><a href = '#'>"+data[i].describe +"</a></p>"+ "<p>"+data[i].price+"</p>"+ "<button>加入购物车</button>"+"</div>"
			}
			$("#goods").html(html);
		}
	})
}