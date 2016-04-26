//高度适应
$(".people-list").height($(window).height()-120+"px");
$(".contents").height($(window).height()-260+"px");
$(".descript-group").height($(window).height()-55+"px");
$(".descript-file").height($(window).height()-55+"px");

$(window).resize(function() {
  $(".people-list").height($(window).height()-120+"px");
  $(".contents").height($(window).height()-260+"px");
  $(".descript-group").height($(window).height()-55+"px");
  $(".descript-file").height($(window).height()-55+"px");
});

/*sidebar导航切换*/
$(".tabs>.item").click(function(){
	var _index=$(this).index();
	$(this).addClass("active").siblings(".item").removeClass("active");
	$(".people-list").eq(_index).show().siblings(".people-list").hide();
})

/*提示点击展示*/
$(".tips").click(function(){
	$(this).toggleClass("active");
})


/*新会话点击添加*/
$(".list-search>ul>li").click(function(){
	if($(this).attr("data-role")=="no"){
		$(this).attr("data-role","yes").find(".glyphicon").css("color","#000");
		var li=$('<li class="chosen-item" data-index='+$(this).index()+'>'+$(this).find(".chat-name").text()+'<span class="glyphicon glyphicon-remove"></span></li>');
		$(".chosen-list").append(li);
		/*删除会话人员*/
		li.find("span").click(function(){
			var _index=parseInt($(this).parent().attr("data-index"));
			$(this).parent().remove();
			$(".list-search>ul>li").eq(_index).find(".glyphicon").css("color","#ccc");
		})
	}else{
		$(this).attr("data-role","no").find(".glyphicon").css("color","#ccc");
		var _this=$(this);
		$(".chosen-list>li").each(function(){
			if($(this).attr("data-index")==_this.index()){
				$(this).remove();
			}
		})
	}
	
})

/*加入*/
$(".info-contoler>a").click(function(){
	if($(this).text()=="加入"){
		$(this).text("已加入").css("color","#777");
	}
	return false;
})


/*加会话点击继续*/
$("#myModal-chat .btn-info").click(function(){
	if($(".chosen-list>li").length==0){
		$(".alert-mask .block-content").html("请至少选择一名团队成员");
		$(".alert-mask").show();
	}else{
		$("#myModal-chat").modal("hide");
	}
	
})

/*创建群组点击继续*/
$("#myModal-create .btn-info").click(function(){
	if($(".group-name").val()==""){
		$(".alert-mask .block-content").html("名称不能为空");
		$(".alert-mask").show();
	}else{
		$("#myModal-create").modal("hide");
	}
	
})

/*邀请成员点击继续*/
$("#myModal-invite .btn-info").click(function(){
	if($(".chosen-list>li").length==0){
		$(".alert-mask .block-content").html("请至少选择一名团队成员");
		$(".alert-mask").show();
	}else{
		$("#myModal-invite").modal("hide");
	}
	
})

/*点击ok*/
$(".confirm").click(function(){
	$(".alert-mask").hide();
})


/*点击单个人员出现对话内容*/
$(".people-list>.people-item").click(function(){
	$(".chat-content").show();
	$(this).addClass("active").siblings(".people-item").removeClass("active");
	$(this).parent().siblings().find(".people-item").removeClass("active");
	if($(this).attr("data-type")==1){
		$(".top-user").show();
		$(".top-group").hide();
		$(".descript-user").show().siblings(".descript").hide();
	}else{
		$(".top-user").hide();
		$(".top-group").show();
		$(".descript-group").show().siblings(".descript").hide();
	}
	
})

/*点击单个人出现用户介绍*/
$(".top-user>a").click(function(){
	$(".descript-user").show().siblings(".descript").hide();
})


/*点击群组出现群组介绍*/
$(".top-group>a").click(function(){
	$(".descript-group").show().siblings(".descript").hide();
	return false;
})

/*点击出现文件*/
$(".file-btn").click(function(){
	$(".descript-file").show().siblings(".descript").hide();
})

/*点击关闭*/
$(".remove-btn").click(function(){
	$(this).parent().parent().parent().hide();
	return false;
})


/*打开自己的资料*/
$(".own-btn").click(function(){
	$(".descript-own").toggle();
	$(".descript-own").siblings(".descript").hide()
	return false;
})


/*切换密码可见不可见*/
$(".eye-btn").click(function(){
	if($(this).find("span").attr("class").indexOf("glyphicon-eye-open")!=-1){
		$(this).find("span").removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close");
		$(this).parent().prev("input").attr("type","text");
	}else{
		$(this).find("span").removeClass("glyphicon-eye-close").addClass("glyphicon-eye-open");
		$(this).parent().prev("input").attr("type","password");
	}
})

/*保存密码*/
$("#myModal-psd .btn-info").click(function(){
	if($(".psd").val()==""){
		$(".alert-mask .block-content").html("名称不能为空");
		$(".alert-mask").show();
		return false;
	}else if($(".psd").val().length<6){
		$(".alert-mask .block-content").html("至少输入6个字符");
		$(".alert-mask").show();
		return false;
	}
	else{
		$("#myModal-psd").modal("hide");
	}
	
})


/*上传照片预览*/
function setImagePreview(docObj,imgObjPreview) {
	var docObj=document.getElementById(docObj);

	var imgObjPreview=document.getElementById(imgObjPreview);
	if(docObj.files &&docObj.files[0])
	{
	//火狐下，直接设img属性
	imgObjPreview.style.display = 'block';
	//imgObjPreview.src = docObj.files[0].getAsDataURL();

	//火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
	imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
	}
	else
	{
	//IE下，使用滤镜
	docObj.select();
	var imgSrc = document.selection.createRange().text;
	var localImagId = document.getElementById("localImag");
	//必须设置初始大小
	localImagId.style.width = "180px";
	localImagId.style.height = "160px";
	//图片异常的捕捉，防止用户修改后缀来伪造图片
	try{
	localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
	localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
	}
	catch(e)
	{
	alert("您上传的图片格式不正确，请重新选择!");
	return false;
	}
	imgObjPreview.style.display = 'none';
	document.selection.empty();
	}
	return true;
	}




/*表情插件*/
$('.emoji').qqFace({
		id : 'facebox', 
		assign:'saytext', 
		path:'emotion/'	//表情存放的路径
	});



 
 $("#txt_file").fileinput({
    language: 'zh', //设置语言
    uploadUrl: "uploadUrl", //上传的地址
    //allowedFileExtensions: ['jpg', 'gif', 'png','txt'],//接收的文件后缀
    showUpload: true, //是否显示上传按钮
    showCaption: false,//是否显示标题
    browseClass: "btn btn-primary", //按钮样式	 
    //dropZoneEnabled: false,//是否显示拖拽区域
    //minImageWidth: 50, //图片的最小宽度
    //minImageHeight: 50,//图片的最小高度
    //maxImageWidth: 1000,//图片的最大宽度
    //maxImageHeight: 1000,//图片的最大高度
    //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
    //minFileCount: 0,
    maxFileCount: 10, //表示允许同时上传的最大文件个数
    enctype: 'multipart/form-data',
    validateInitialCount:true,
    previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
    msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
  });
  
  
  $('#txt_file').on('fileloaded', function(event, file, previewId, index, reader) {
    console.log("fileloaded");
});

