//<!--
JSoul.$(function () {
    JSoul("#CategoryBox").find("@a,rel,*").ConfigerForm(JSoul.setAdminData);
    JSoul("#AddForm").initAddTab("Add GameServer");
});
JSoul.extend({
	/**
	 * 设置信息
	 * @param {json} json
	 */
	setAdminData: function(json){
		var date = new Date(Number(json.createDate));
		this.UpdateForm.getForm("createDate").value = date.format("yyyy-MM-dd HH:mm");
	}
});
//-->