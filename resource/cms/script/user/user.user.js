//<!--
$.$(function () {
    $("#CategoryBox").find("@a,rel,*").ConfigerForm(JSoul.setAdminData);
});
JSoul.extend({
	/**
	 * 设置信息
	 * @param {json} json
	 */
	setAdminData: function(json){
		var date = new Date(Number(json.createDate));
		this.UpdateForm.getForm("createDate").value = date.format("yyyy-MM-dd HH:mm");
		
		date = new Date(Number(json.birthday));
		this.UpdateForm.getForm("birthday").value = date.format("yyyy-MM-dd HH:mm");
	}
});
//-->