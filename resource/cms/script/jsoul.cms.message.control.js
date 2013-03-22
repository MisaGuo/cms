//<!--
$.$(function(){
	$("#CategoryBox").find("@a,rel,*").ConfigerForm();
	$("#BaseForm").FormSelect("DeleteID[]").bindDetailTab(">detail").bindSubmitType(">save, delete");
});
/*******************JSoul原型扩展方法 [评论类型]******************/
JSoul.fn.extend({
	/**
	 * 绑定显示详细信息标签
	 * @param {string|Element} selector
	 * @return JSoul
	 */
	bindDetailTab: function(selector){
		var detailBoxes = this.find("@tr,className,extended");
		this.find(selector).bindEvent({
			onclick: function(){
				if(this.checked){
					detailBoxes.show();
				}else{
					detailBoxes.hidden();
				}
			}
		});
		return this;
	},
	/**
	 * 绑定提交按钮状态
	 * @param {string|Element} selector
	 * @return JSoul
	 */
	bindSubmitType: function(selector){
		var Core = this;
		this.act = this.find(">act");
		this.SubmitTypes = this.find(selector).bindEvent({
			onclick: function(e){
				this.form["act"].value = this.name + "Batch";
				if(this.name == "delete" && !confirm("Do you need to bulk delete user comments?")){
					return false;
				}else{
					this.form.submit();
				}
			}
		});
	}
});
//-->