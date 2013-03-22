//<!--
JSoul.$(function(){
	JSoul.CategoryBox = JSoul("#CategoryBox").initCategoryBox();
    JSoul("#AddForm").initAddTab("Add LangKey");
});
JSoul.fn.extend({
	initCategoryBox: function(){
		var box = this.extend({
			langpath: this.getAttribute("langpath"),
			relLink: this.find("@a,rel,*").ConfigerForm(),
			extInfos: this.find("@tr,className,extinfo"),
			showExtInfos: function(elem){
				if(elem.isExpend){
					elem.isExpend = false;
					elem.innerHTML = "Expand";
				}else{
					elem.isExpend = true;
					elem.innerHTML = "Close";
				}
				this.setExtInfosState(elem.isExpend, elem.rev);
			},
			setExtInfosState: function(isExpend, rev){
				this.extInfos.each(function(i){
					if(this.getAttribute("rev") == rev){
						if(isExpend){
							JSoul.show(this, JSoul.browser.msie ? "block" : "table-row");
						}else{
							JSoul.hidden(this);
						}
					}
				});
			},
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
		this.langInfos = this.extInfos.find("td").bindEvent({
			ondblclick: function(e){
				if(this.isExpend) return;
				this.isExpend = true;
				box.buildTextarea(this, {
					countryTypeId: this.getAttribute("countryTypeId"),
					keyId: this.getAttribute("keyId"),
					detail: this.innerHTML.toHtml()
				});
			}
		});
		return this;
	}
});
JSoul.extend({
    /**
     * 展开详细语言信息
     * @param {json} json
     */
    expendDetailLang: function(elem){
		JSoul.CategoryBox.showExtInfos(elem);
    }
});
//-->
