//<!--
JSoul.$(function(){
	JSoul.CategoryBox = JSoul("#CategoryBox").initCategoryBox();
});
JSoul.fn.extend({
	initCategoryBox: function(){
		var box = this.extend({
			langpath: this.getAttribute("langpath"),
			langInfos: this.find("@td,countryTypeId,*").bindEvent({
				ondblclick: function(e){
					box.buildTextarea(this, {
						countryTypeId: this.getAttribute("countryTypeId"),
						keyId: this.getAttribute("keyId"),
						detail: this.innerHTML.toHtml()
					});
				}
			}),
			//更新语言
			updateLang: function(setting){
				JSoul.$xJson(this.langpath, function(json){
					SetReturnHandle(json.returnInfo);
				}, setting);
			},
			buildTextarea: function(oParent, setting){
				var textarea = JSoul.$b("textarea", {
					value: setting.detail,
					className: "textarea",
					ondblclick: function(e){
						JSoul.stopBubble(e);
					},
					onblur: function(e){
						if(this.value != setting.detail){
							setting.detail = encodeURIComponent(this.value);
							box.updateLang(setting);
						}
						oParent.innerHTML = this.value.toText();
						oParent.isExpend = false;
						textarea.ondblclick = null;
						textarea.onblur = null;
						textarea = null;
					}
				});
				oParent.innerHTML = "";
				oParent.appendChild(textarea);
				JSoul.AddTextAreaSizeBar(textarea);
				textarea.focus();
			}
		});
		return this;
	}
});
//-->