//<!--
$.$(function (){
	window.newBar = $("#Control").find("a").BindSide().SideDefault(0);
});
/*******************JSoul原型扩展方法 [特效类型]******************/
JSoul.fn.extend({
	/**
	 * 特效：列表控制
	 * @return {JSoul}
	 */
	BindSide:function(){
		var main = this;
		this.each(function(i){
			JSoul.BindSide(this,main,i);
		});
		return this;
	},
	/**
	 * 特效：设置默认侧边
	 * @param {Number} index 索引
	 * @return {JSoul}
	 */
	SideDefault:function(index){
		if(index < this.length)
			this[index].SetChoosed();
		return this;
	}
});
JSoul.extend({
	/**
	 * 特效：列表控制
	 * @param {Object} handler 控制器
	 * @param {JSoul} box 控制对象
	 * @param {Number} index 索引
	 */
	BindSide:function(handler, box, index){
		handler.Main = box;
		/**
		 * 特效：点击
		 */
		handler.onclick = function(){
			this.Choosed();
			return false;
		};
		/**
		 * 特效：选中
		 */
		handler.Choosed = function(){
			if(this.className != "choose"){
				if (this.href.length>0){
					parent.frames["configeration"].document.location=this.href;
				}
				this.SetChoosed();
			}
		};
		/**
		 * 特效：设置选中状态
		 */
		handler.SetChoosed = function(){
			if(this.className != "choose"){
				JSoul.attr(this,"className","choose");
				if(this.Main.SideCache)this.Main.SideCache.toBlur(this);
				else this.Main.SideCache = this;
			}
		};
		/**
		 * 特效：模糊
		 * @param {Object} oChoose 对象
		 */
		handler.toBlur = function(oChoose){
			if(this.className == "choose"){
				JSoul.attr(this,"className","");
			}
			this.Main.SideCache = oChoose;
		};
	}
});
//-->