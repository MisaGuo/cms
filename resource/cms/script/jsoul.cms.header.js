//<!--
$.$(function(){
	window.Header = $("#ResultBox").initHeader();
});
/*******************JSoul原型扩展方法 [特效类型]******************/
JSoul.fn.extend({
	/**
	 * 初始化头
	 */
	initHeader: function(){
		this.extend({
			referer: null,
			/**
			 * 特效：控制信息显示
			 * @param {String} sInfo
			 * @return {JSoul}
			 */
			$info: function(sInfo){
				this.each(function(i){
					JSoul.$info(this,sInfo,i);
				});
				return this;
			}
		});
		return this;
	}
});
JSoul.extend({
	/**
	 * 特效：控制信息显示
	 * @param {Object} handler 控制器
	 * @param {String} sInfo 控制对象
	 * @param {Number} index 索引
	 */
	$info:function(handler, sInfo, index){
		if(handler.Status)clearTimeout(handler.Status);
		handler.innerHTML = sInfo;
		handler.style.display = "block";
		handler.Status = setTimeout(function(){
			handler.innerHTML = "";
			handler.style.display = "none";
		},5000);
	}
});
//-->