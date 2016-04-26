// QQ表情插件
(function($){  
	$.fn.qqFace = function(options){
		var defaults = {
			id : 'facebox',
			path : 'face/',
			assign : 'content',
			tip : 'em_'
		};
		var option = $.extend(defaults, options);
		var assign = $('#'+option.assign);
		var id = option.id;
		var path = option.path;
		var tip = option.tip;
		
		if(assign.length<=0){
			alert('缺少表情赋值对象。');
			return false;
		}
		
		$(this).click(function(e){
			var strFace, labFace;
			if($('#'+id).length<=0){
				strFace = '<div id="'+id+'" style="position:absolute;display:none;z-index:1000;" class="qqFace">' +
							  '<table border="0" cellspacing="0" cellpadding="0"><tr>';
				for(var i=1; i<=75; i++){
					labFace = '['+tip+i+']';
					strFace += '<td><img src="'+path+i+'.gif" onclick="$(\'#'+option.assign+'\').insertAtCaret(\'' + labFace + '\');" /></td>';
					if( i % 15 == 0 ) strFace += '</tr><tr>';
				}
				strFace += '</tr></table></div>';
			}
			$(this).parent().append(strFace);
			var offset = $(this).position();
			var top = offset.top + $(this).outerHeight();
			$('#'+id).css('top',top-270);
			$('#'+id).css('left',offset.left);
			$('#'+id).show();
			e.stopPropagation();
		});

		$(document).click(function(event){
			if($(event.target).isChildAndSelfOf("img") ||  !$(event.target).isChildAndSelfOf("#"+id) ){
				$('#'+id).hide();
				$('#'+id).remove();
			}
		});
	};

})(jQuery);

 
jQuery.fn.extend({ 
	insertAtCaret: function(textFeildValue){
		var textObj = $(this).get(0); 	
		var text=$(textObj).html();		
		textFeildValue = textFeildValue.replace(/\</g,'&lt;');
		textFeildValue = textFeildValue.replace(/\>/g,'&gt;');
		textFeildValue = textFeildValue.replace(/\n/g,'<br/>');
		textFeildValue = textFeildValue.replace(/\[em_([0-9]*)\]/g,'<img src="emotion/$1.gif" border="0" />');
		
		var range, node;
		 if(!textObj.hasfocus) {
		  textObj.focus();
	 	}
    if (window.getSelection && window.getSelection().getRangeAt) {
        range = window.getSelection().getRangeAt(0);
		  range.collapse(false);
		        node = range.createContextualFragment(textFeildValue);
		  var c = node.lastChild;
		        range.insertNode(node);
		  if(c){
		   range.setEndAfter(c);
		   range.setStartAfter(c)
 	 		}
		  var j = window.getSelection();
		  j.removeAllRanges();
		  j.addRange(range);
  
	    } else if (document.selection && document.selection.createRange) {
	        document.selection.createRange().pasteHTML(textFeildValue);
	    }
	} 
});

jQuery.fn.isChildAndSelfOf = function(b){ return (this.closest(b).length > 0); };


