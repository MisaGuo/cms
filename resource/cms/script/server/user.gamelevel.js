//<!--
JSoul.$(function () {
	$("#CategoryBox").find("@a,rel,*").ConfigerForm();
    JSoul("#AddForm").initAddTab("Add GameLevel").initScopeValid();
	JSoul("#UpdateForm").initScopeValid();
});
JSoul.fn.extend({
	/**
	 * 设置信息
	 * @param {json} json
	 */
	initScopeValid: function(json){
		this.find(">minScope,maxScope").addEvent("change",
			function(e){
				var minScope = parseInt(this.form['minScope'].value);
				var maxScope = parseInt(this.form['maxScope'].value);
				if(!isNaN(minScope)){
					if(isNaN(maxScope) || minScope > maxScope){
						this.form['maxScope'].value = minScope;
					}
				}else if(!isNaN(maxScope)){
					if(isNaN(minScope) || minScope > maxScope){
						this.form['minScope'].value = maxScope;
					}
				}
			}
		);
		return this;
	}
});
//-->