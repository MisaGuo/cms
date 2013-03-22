//<!--
/**
 * 默认事件
 */
JSoul.$(function (){
	//window.cmsLang = ["确定","取消","您是否要", "该操作可能导致关联信息的删除，同时不可恢复！","消息提示说明"];
	window.cmsLang = ["OK","Cancel","Do you want to", "This action may result in the deletion of associated information, while irreversible！","Tips"];

	window.oParent = parent.frames["header"].window.Header;
	var siteBar = parent.frames["sidebar"].newBar;
	if(siteBar) siteBar.SideDefault(ServerLevel);
	//全局定义仅允许输入数字
    JSoul("@input,reqire,number").bindEvent([["onkeydown",JSoul.$eKeyNumber]]);
    //给textarea添加扩展功能
    JSoul("textarea").AddTextAreaSizeBar();
    //添加Form提交验证
    JSoul("form").ValidSubmit();
    //设置提交返回信息
    if(ResponseInfo) SetReturnHandle(ResponseInfo);
	//设置返回按钮
	JSoul("#backButton").initBackButton();
});
/*******************JSoul原型扩展方法 [特效类型]******************/
JSoul.fn.extend({
	/**
	 * 特效：给文本输入加入伸缩功能
	 * @return {JSoul}
	 */
	AddTextAreaSizeBar:function(){
		this.each(function(i){
			JSoul.AddTextAreaSizeBar(this,i);
		});
		return this;
	},
	/**
	 * 验证：验证提交表单数据的有效性
	 * @return {JSoul}
	 */
	ValidSubmit:function(){
		var Main = this;
		this.each(function(i){
			JSoul.ValidSubmit(this,Main,i);
		});
		return this;
	},
	/**
	 * 验证：判断输入框值是否为空
	 * @return {JSoul}
	 */
	ValidInputEmpty:function(){
		this.each(function(i){
			JSoul.ValidInputEmpty(this,i);
		});
		return this;
	}
});
JSoul.extend({
	/**
	 * 特效：给文本输入加入伸缩功能
	 * @param {Object} handler 控制器
	 * @param {Number} index 索引
	 */
	AddTextAreaSizeBar:function(handler, index){
		var oDiv = JSoul.$b("div");
		oDiv.className = "sizebar";
		oDiv.appendChild(JSoul.$b("ins"));
		oDiv.invoke = handler;
		JSoul.Drag(oDiv, JSoul.flexSizeBarDragDown, JSoul.flexSizeBarDragMove);
		handler.parentNode.appendChild(oDiv);
	},
	/**
	 * flexSizeBar
	 * @param {Event} e
	 * @return {boolean}
	 */
	flexSizeBarDragDown: function(e) {
		this.intObjY = e.clientY;
		this.InvokeDefaultHeight = this.invoke.offsetHeight - 10;
		return true;
	},
	/**
	 * flexSizeBar
	 * @param {Event} e
	 */
	flexSizeBarDragMove: function(e) {
		var NewHeight = this.InvokeDefaultHeight + e.clientY - this.intObjY;
		if(NewHeight < 30)NewHeight = 30;
		JSoul.batchSetCss(this.invoke,{"height":NewHeight + "px"});
	},
	/**
	 * 验证提交表单数据的有效性
	 * @param {Object} handler 控制器
	 * @param {JSoul} main 主对象
	 * @param {Number} index 索引
	 */
	ValidSubmit:function(handler, main, index){
		handler.Main = main;
		handler.Forbids = [];
		handler.errorStyle = JSoul.spliteCSSExp("background-image: url(/cms/skins/icon/mark_error.gif);background-color: #ffecec;");
		handler.defaultStyle = JSoul.spliteCSSExp("background-image: none;background-color: #edf2f8;");
		handler.Childs = JSoul(handler).find("@input|textarea|select,type,text|password|textarea|select-one|select-multiple");
		handler.ClearForbid = function(){
			for(var i=0, j=this.Forbids.length; i<j; i++){
				JSoul.batchSetCss(this.Forbids.shift(), this.defaultStyle);
			}
		};
		/**
		 * 绑定提交事件
		 * @return {boolean}
		 */
		handler.onsubmit = function(){
			this.ClearForbid();
			this.Childs.ValidInputEmpty();
			if(this.Forbids.length > 0){
				this.Forbids[0].focus();
				return false;
			}else if(this.Main.nextObject){
				this.Main.nextObject.setDisabled(true);
			}
			return true;
		};
		/**
		 * 设置单个项样式
		 * @param {Element} elem
		 * @param {Number} sort
		 */
		handler.Childs.forEach(function(elem, sort){
			if(elem.readOnly){
				elem.className += " readonly";
			}
		});
	},
	/**
	 * 判断输入框值是否为空以以及是否超过规定长度
	 * @param {Element} elem 控制器
	 * @param {Number} index 索引
	 */
	ValidInputEmpty:function(elem, index){
		var attr = elem.getAttribute("reqire");
		if((attr != "uncheck" && elem.value == "")
			|| (attr == "maxsize" && elem.getAttribute("maxlength") < elem.value.length)){
			elem.form.Forbids.push(elem);
			JSoul.batchSetCss(elem, elem.form.errorStyle);
		}
	},
	/**
	 * 设置对象的绝对位置
	 * @param {Element} elem 控制器
	 * @param {Event} e 事件对象
	 */
	initSelecter:function(elem, e){
		elem.Set = function(e){
			JSoul.css(this,"left:"+(e.clientX + JSoul.root.scrollLeft) + "px;top:"+(e.clientY + JSoul.root.scrollTop) + "px;");
		}
		elem.Set(e);
		if(!elem.close){
			elem.close = function(){this.style.display = "none";this.display = false;};
			elem.open = function(e){this.Set(e);this.style.display = "block";this.display = true;};
		}
	},
	/**
	 * toolPanel
	 * @param {Event} e
	 * @return {boolean}
	 */
	toolPanelDragDown: function(e) {
		var _obj = JSoul.$eNode(e);
		if(this == _obj){
    		this.intObjX = e.clientX - parseInt(this.parentNode.style.left);
    		this.intObjY = e.clientY - parseInt(this.parentNode.style.top);
			JSoul.batchSetCss(this.parentNode, {"borderColor":"#333", "zIndex":"61"});
			return true;
		}else{
			return false;
		}
	},
	/**
	 * toolPanel
	 * @param {Event} e
	 */
	toolPanelDragMove: function(e) {
		JSoul.batchSetCss(this.parentNode,{"left":(e.clientX - this.intObjX) + "px", "top":(e.clientY - this.intObjY) + "px"});
	},
	/**
	 * toolPanel
	 * @param {Event} e
	 */
	toolPanelDragUp: function(e){
		JSoul.batchSetCss(this.parentNode, {"borderColor":"#999", "zIndex":"60"});
	},
	/**
	 * 拖拽父对象
	 * @param {Element} elem 对象
	 */
	DrogTitle:function(elem){
		JSoul.Drag(elem, JSoul.toolPanelDragDown, JSoul.toolPanelDragMove, JSoul.toolPanelDragUp);
	}
});
/*******************JSoul原型扩展方法 [表单方法]******************/
JSoul.fn.extend({
	/**
	 * 表单：处理表单功能
	 * @param {Function} callback 回调方法
	 * @param {boolean} isUpload 是否开启上传控件
	 * @return {JSoul}
	 */
	ConfigerForm:function(callback, isUpload){
		this.msgBox = JSoul("#MainBox").BuildDiagram().BuildMessageBox().BuildEditLay();
		if (isUpload) {
			this.msgBox.BuildUpload();
		}
		this.msgBox.callback = callback;
		var Main = this;
		this.each(function(i){
			this.Main = Main;
			this.onclick = JSoul.ConfigerForm;
		});
		return this;
	}
});
JSoul.extend({
	/**
	 * 表单：处理表单功能
	 * @return {boolean}
	 */
	ConfigerForm:function(){
		switch(this.rel){
			case "updateActive":
				this.Main.msgBox.ShowMessageBox(this,cmsLang[2]+this.title+"?");//您是否要
				break;
			case "getEditModel":
				this.Main.msgBox.GetEditDate(this);
				break;
			case "addContent":
				return true;
			case "goDetail":
				return JSoul.GetDetailLink(this);
			case "delete":
				this.Main.msgBox.ShowMessageBox(this,cmsLang[2]+this.title+"？<br />"+cmsLang[3]);//该操作可能导致关联信息的删除，同时不可恢复！
				break;
			default:
				if(JSoul[this.rel])
					JSoul[this.rel](this);
				break;
		}
		return false;
	},
	/**
	 * 设置详细信息链接
	 * @param {Link} elem
	 */
	GetDetailLink: function(elem){
		if(oParent){
			oParent.referer = window.location.toString();
		}
		return true;
	}
});
/*******************JSoul原型扩展方法 [表单方法]******************/
JSoul.fn.extend({
	/**
	 * 表单：建立模式窗口背景
	 * @return {JSoul}
	 */
	BuildDiagram:function(){
		if(this.length > 0){
			var Main = this;
			this.diagram = JSoul.$b("div");
			this.diagram.className = "diagram";
			JSoul.addEvent(window,"resize",function(){
				Main.SetDiagram();
			});
			this.insertLast(this.diagram);
		}
		return this;
	},
	/**
	 * 表单：设置模式窗口背景
	 * @return {JSoul}
	 */
	SetDiagram:function(){
		if(this.length > 0){
			JSoul.css(this.diagram,"width:"+(this[0].offsetWidth + 20)+"px;height:"
				+(JSoul.root.clientHeight < JSoul.root.scrollHeight ? JSoul.root.scrollHeight: JSoul.root.clientHeight)+"px;");
		}
		return this;
	},
	/**
	 * 表单：显示模式窗口背景
	 * @return {JSoul}
	 */
	ShowDiagram:function(){
		this.SetDiagram();
		JSoul.css(this.diagram,"display:block;");
		return this;
	},
	/**
	 * 表单：隐藏模式窗口背景
	 * @return {JSoul}
	 */
	DisplayDiagram:function(){
		JSoul.css(this.diagram,"display:none;");
		return this;
	},
	/**
	 * 表单：建立消息对话框
	 * @return {JSoul}
	 */
	BuildMessageBox:function(){
		JSoul.BuildMessageBox(this);
		return this;
	},
	/**
	 * 表单：设置消息对话框
	 * @return {JSoul}
	 */
	SetMessageBox:function(){
	    this.messageBox.style.left = "25%";
	    this.messageBox.style.top = (JSoul.root.clientHeight-200)/2 + JSoul.root.scrollTop + "px";
	    JSoul.css(this.messageBox, "left:25%;top:"+((JSoul.root.clientHeight-200)/2 + JSoul.root.scrollTop)+"px;");
	    return this;
	},
	/**
	 * 表单：显示消息对话框
	 * @param {Element} elem 对象
	 * @param {String} msgInfo 消息内容
	 * @return {JSoul}
	 */
	ShowMessageBox:function(elem, msgInfo){
		this.ShowDiagram();
		this.SetMessageBox();
		this.RequestElem = elem;
		this.messageBox.MsgInfo.innerHTML = msgInfo;
		JSoul.css(this.messageBox,"display:block;");
		this.messageBox.CancelButton.focus();
		return this;
	},
	/**
	 * 表单：隐藏消息对话框
	 * @return {JSoul}
	 */
	DisplayMessageBox:function(){
		this.DisplayDiagram();
		JSoul.css(this.messageBox,"display:none;");
		return this;
	},
	/**
	 * 表单：建立编辑表单
	 * @return {JSoul}
	 */
	BuildEditLay:function(){
		this.EditLay = JSoul("#EditLay");
		this.UpdateForm = this.find("#UpdateForm");
		var Main = this;
		this.EditLay.CloseButton = this.UpdateForm.find(">cancel");
		this.EditLay.find("caption").find("span").merge(this.EditLay.CloseButton).bindEvent([["onclick",function(){
			Main.DisplayEditLay();
		}]]);
		JSoul.addEvent(window,"resize",function(){
			Main.SetEditLay();
		});
		return this;
	},
	/**
	 * 表单：设置编辑表单
	 * @return {JSoul}
	 */
	SetEditLay:function(){
		this.EditLay.css("top:"+(JSoul.root.scrollTop + 126)+"px;");
		return this;
	},
	/**
	 * 表单：显示编辑框
	 * @return {JSoul}
	 */
	ShowEditLay:function(){
		this.SetEditLay();
		this.EditLay.css("display:block;");
		this.EditLay.CloseButton.run("focus");
		return this;
	},
	/**
	 * 表单：隐藏编辑框
	 * @return {JSoul}
	 */
	DisplayEditLay:function(){
		this.EditLay.css("display:none;");
		this.DisplayDiagram();
		return this;
	},
	/**
	 * 表单：从服务器得到数据
	 * @param {Link} linkElem 节点对象
	 * @return {JSoul}
	 */
	GetEditDate:function(linkElem){
		this.ShowDiagram();
		var Main = this;
		JSoul.$xJson(linkElem.href, function(json){
		        if (json.isSucceed) {
		            Main.UpdateForm.eachForm(function(elem, index){
					JSoul.setDefaultValue(elem, json);
			    });
			    if(Main.callback){
				Main.callback(json);
			    }
			    Main.ShowEditLay();
		        } else {
		            Main.DisplayEditLay();
		        }
		}, {act:linkElem.rel,id:linkElem.rev});
	}
});
JSoul.extend({
	/**
	 * 表单：建立消息对话框
	 * @param {JSoul} Main 主对象
	 */
    BuildMessageBox: function(Main) {
        Main.messageBox = JSoul.$b("form", {
			method: "post",
			className: "messagebox"
		});
        //建立标题
        var title = JSoul.$b("h3");
        var CloseButton = JSoul.$b("span");
        var ins = JSoul.$b("ins");
        ins.appendChild(JSoul.$text("Close"));
        CloseButton.appendChild(ins);
        title.appendChild(CloseButton);
        title.appendChild(JSoul.$text(cmsLang[4]+"："));//消息提示说明
        Main.messageBox.appendChild(title);

        //建立内容
        Main.messageBox.MsgInfo = JSoul.$b("p");
        Main.messageBox.appendChild(Main.messageBox.MsgInfo);

        //建立控制选项
        var controlBox = JSoul.$b("div");
        controlBox.className = "submit";
        //确定按钮
        var OkButton = JSoul.$b("input", {type:"submit", value:cmsLang[0], className:"button"});//确定
        controlBox.appendChild(OkButton);

        //取消按钮
        Main.messageBox.CancelButton = JSoul.$b("input",{type:"button", value:cmsLang[1], className:"button"});//取消
        controlBox.appendChild(Main.messageBox.CancelButton);
		
		//提交方法标签
		Main.messageBox.ActHidden = JSoul.$b("input", {type:"hidden", name:"act"});
		controlBox.appendChild(Main.messageBox.ActHidden);

		//提交ID标签
		Main.messageBox.IDHidden = JSoul.$b("input", {type:"hidden", name:"id"});
		controlBox.appendChild(Main.messageBox.IDHidden);
		
        //关闭消息对话框
        CloseButton.onclick = Main.messageBox.CancelButton.onclick = function() {
            Main.DisplayMessageBox();
        }
        JSoul.MessageBoxChangeButton(OkButton, Main.messageBox.CancelButton);

		//表单：执行提交
		Main.messageBox.onsubmit = function(e){
			this.action = Main.RequestElem.href;
			this.ActHidden.value = Main.RequestElem.rel;
			this.IDHidden.value = Main.RequestElem.rev;
			return true;
		};

        Main.messageBox.appendChild(controlBox);

        JSoul.addEvent(window, "resize", function() {
            Main.SetMessageBox();
        });
        Main.insertLast(Main.messageBox);

    },
	/**
	 * 表单：模拟交换按钮选项
	 * @param {Element} a
	 * @param {Element} b
	 */
    MessageBoxChangeButton: function(a, b) {
        a.Relate = b;
        b.Relate = a;
        a.onkeypress = b.onkeypress = function(e) {
            var Keys = JSoul.$eKey(e);
            if (Keys == 52 || Keys == 54 || Keys == 0) {
                this.Relate.focus();
            }
        }
    },
	/**
	 * 表单：单独绑定INPUT默认值与值
	 * @param {Element} elem 节点对象
	 * @param {json} json
	 */
    setDefaultValue: function(elem, json) {
		var defaultValue = json[elem.name];
		if((typeof(defaultValue) == "undefined"))return;
		if (elem.type == "password") {
			elem.value = "";
        } else if (elem.type == "checkbox") {
            defaultValue = (typeof (defaultValue) == "string") ? eval(defaultValue.toLowerCase()) : defaultValue;
            elem.defaultChecked = elem.checked = defaultValue;
        } else if (elem.type == "radio"){
			if(elem.value == defaultValue){
				elem.defaultChecked = elem.checked = true;
			}
        } else if (elem.type == "select-one") {
            elem.defaultValue = elem.value = defaultValue;
            if (elem.selectedIndex > 0) {
                elem.options[elem.selectedIndex].defaultSelected = true;
            }
	} else if(elem.type == "select-multiple"){
		//todo
        } else{
		//if (isNaN(defaultValue) && defaultValue != ""){defaultValue = defaultValue.toHtml();};
            defaultValue = (elem.format) ? elem.format(defaultValue) : defaultValue;
            elem.defaultValue = elem.value = defaultValue;
            if(elem.callBack){
            	elem.callBack(elem);
            }
        }
    }
});
/**
 * 设置返回事件
 * @param {String} sInfo
 */
function SetReturnHandle(sInfo){
	if(oParent)
		oParent.$info(sInfo);
}
/*******************JSoul原型扩展方法 [表单多选类型]******************/
/**
 * 表单选项功能
 * @param {String} ItemName 选项名称
 * @return {JSoul}
 */
JSoul.fn.extend({
	FormSelect:function(ItemName){
		this.SelectSubs = this.find(">"+ItemName).bindEvent({
			SetCheck: JSoul.FormItemCheck,
			SetUnCheck: JSoul.FormItemUnCheck,
			onclick: JSoul.FormItemClick
		}).each(function(i){
			JSoul.FormItemEvent(this);
		});
		this.SelectAlls = this.find(">selectall").bindEvent({
			Core:this,
			onclick: JSoul.FormSelectAll
		});
		this.Inverses = this.find(">inverse").bindEvent({
			Core:this,
			onclick: JSoul.FormInverse
		});
		this.Resets = this.find(">reset").bindEvent({
			Core:this,
			onclick: JSoul.FormReset
		});
		return this;
	}
});
/*******************JSoul静态扩展方法 [表单多选类型]******************/
JSoul.extend({
	/**
	 * 子选项事件
	 * @param {Array} items 子对象列表
	 * @return {Array}
	 */
	FormItemEvent:function(items){
		for(var i = 0, j= items.length;i<j;i++){
			items[i]["DefaultClassName"] = items[i].parentNode.parentNode.className;
		}		
		return items;
	},
	/**
	 * 子选项选中
	 */
	FormItemCheck:function(){
		this.checked = true;
		JSoul.attr(this.parentNode.parentNode, "className", "choosed");
	},
	/**
	 * 子选项未选中
	 */
	FormItemUnCheck:function(){
		this.checked = false;
		JSoul.attr(this.parentNode.parentNode, "className", this.DefaultClassName);
	},
	/**
	 * 子选项点击
	 */
	FormItemClick:function(){
		if(this.checked){
			this.SetCheck();
		}else{
			this.SetUnCheck();
		}
	},
	/**
	 * 全选
	 */
	FormSelectAll:function(){
		this.Core.SelectSubs.each(function(i){
			for(var i = 0, j= this.length;i<j;i++){
				this[i].SetCheck();
			}
		});
	},
	/**
	 * 反选
	 */
	FormInverse:function(){
		this.Core.SelectSubs.each(function(i){
			for(var i = 0, j= this.length;i<j;i++){
				if(this[i].checked){
					this[i].SetUnCheck();
				}else{
					this[i].SetCheck();
				}
			}
		});
	},
	FormReset:function(){
		this.Core.SelectSubs.each(function(i){
			for(var i = 0, j= this.length;i<j;i++){
				this[i].SetUnCheck();
			}
		});
	}
});
/*******************JSoul原型扩展方法 [Add Tab]******************/
JSoul.fn.extend({
	/**
	 * 初始化添加导航标签
	 * @param {String} title
	 * @return {JSoul}
	 */
	initAddTab: function(title){
		var _a = JSoul.$b("a", {
			href: "javascript:void(0);",
			"title" : title,
			innerHTML: "<span>"+title+"</span>"
		});
		_a.style.marginRight = "0";
		var _li = JSoul.$b("li");
		_li.style.styleFloat = "right";
		_li.style.cssFloat = "right";
		//_li.style.float = "right";
		_li.appendChild(_a);
		var Main = this;
		_a.onclick = function(){
			this.className = this.className == "choose" ? "" : "choose";
			if(this.className == "choose"){
				Main.show();
			}else{
				Main.hidden();
			}
		};
		JSoul("@ul,className,navigator").insertFirst(_li);
		return this;
	}
});
/*******************JSoul原型扩展方法 [Return button]******************/
JSoul.fn.extend({
	/**
	 * 初始化返回前页按钮
	 * @return {JSoul}
	 */
	initBackButton: function(){
		this.bindEvent({
			onclick: function(e){
				if(oParent && oParent.referer){
					JSoul.UrlRewrite(oParent.referer);
				}
			}
		});
	}
});
/***JSoul prototype extend Method [Flash]***/
JSoul.fn.extend({
    /**
    * 插入FLASH
    * @param {json} param 传递的json参数
    * @param {String} vars 传递给FLASH的HTML变量
    * @return JSoul flash包装对象
    */
    insertFlash: function (param, vars) {
        var defaultparam = {
            id: "previewItem",
            src: "common/player.swf",
            width: this.attr("offsetWidth") + "px",
            height: this.attr("offsetHeight") + "px",
            allowScriptAccess: "always",
            allowNetworking: "all",
            allowFullScreen: "false",
            wmode: "transparent",
            salign: "LT",
            scale: "noscale",
            quality: "autohigh",
            flashvars: ""
        };
        if (param) {
            for (k in defaultparam) {
                if (param[k]) {
                    defaultparam[k] = param[k];
                }
            }
        }
        if (vars) {
            defaultparam.flashvars = vars + "&stretching=exactfit";
        } else if (defaultparam.flashvars) {
            defaultparam.flashvars = defaultparam.flashvars + "&stretching=exactfit";
        }
        if (!defaultparam.name) {
            defaultparam.name = defaultparam.id;
        }
        this.innerHtml(JSoul.buildFlash(defaultparam, "10,0,0,0"));
        return this.find("#" + defaultparam.id);
    }
});
JSoul.extend({
    /**
    * 建立FLASH代码
    * @param {json} param 传递的json参数
    * @param {Object} version 需要的版本
    * @return Flash html代码
    */
    buildFlash: function (param, version) {
        var params = [], embedArgm = [], objArgm = [];
        for (k in param) {
            switch (k) {
                case "movie":
                    continue;
                    break;
                case "id":
                case "name":
                case "width":
                case "height":
                case "style":
                    JSoul.flashKeyValue(objArgm, k, param[k]);
                    JSoul.flashKeyValue(embedArgm, k, param[k]);
                    break;
                default:
                    JSoul.flashParams(params, k, param[k]);
                    JSoul.flashKeyValue(embedArgm, k, param[k]);
            }
        }
        if (version) {
            objArgm.push('codeBase=\'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=');
            objArgm.push(version);
            objArgm.push('\' ');
        }
        if (JSoul.browser.msie) {
            return '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ' + objArgm.join('') + '>' + params.join('') + '</object>';
        } else {
            return '<embed ' + embedArgm.join('') + ' pluginspage="http://www.adobe.com/go/getflashplayer_cn" type="application/x-shockwave-flash"></embed>';
        }
    },
    /**
    * flash名值对
    * @param {json} list
    * @param {String} key
    * @param {String} value
    */
    flashKeyValue: function (list, key, value) {
        list.push(key);
        list.push('=\'');
        list.push(value);
        list.push('\' ');
    },
    /**
    * flash参数
    * @param {json} list
    * @param {String} key
    * @param {String} value
    */
    flashParams: function (list, key, value) {
        list.push('<param name=\'');
        list.push((key == "src") ? "movie" : key);
        list.push('\' value=\'');
        list.push(value);
        list.push('\' />');
    }
});
/*******************JSoul原型扩展方法 [Build Upload]******************/
/**
* JSoul原型扩展方法 [方法类型]
*/
JSoul.extend({
    /**
    * 获取默认上传对象
    * @param {string} 上传From ID
    * @param {string} 上传Flash 对象 ID
    * @return JSoul
    */
    getDefaultUploadBox: function (boxId, flashId) {
        return JSoul("#" + (boxId == null ? "uploadBox" : boxId)).defaultUploadContext({
            id: (flashId == null ? "fileUploadBox" : flashId),
            src: JSoul.jsBase + "/common/object/LasqueUpload.swf",
            width: "100",
            height: "30"
        }, "aa=bb", null);
    }
});
JSoul.fn.extend({
    /**
    * 设置表单上传
    * @param {JSoul} uploadBox
    * @return JSoul
    */
    setFormUpload: function (uploadBox) {
        var main = this;
        this.extend({
            entryBtn: this.find("@a,rev,upload").bindEvent({
                onclick: function (e) {
                    main.setDisableAll(true);
                    uploadBox.showBox(function (uploadBox) {
                        //初始化配置
                        uploadBox.oFlash.setConfig({
                            postParms: main.getQueryJson(true)
                        });
                    });
                }
            }),
            /**
            * 设置元素状态
            * @param {Boolean} isDisable
            */
            setDisableAll: function (isDisable) {
                var form = main.get(0);
                for (var i = 0, j = form.length; i < j; i++) {
                    JSoul.attr(form[i], "disabled", isDisable);
                }
            }
        });
        uploadBox.oFlash.setConfig({
            uploadURL: main.getAttribute("upload"),
            count: 1
        });
        //uploadBox.oFlash.setTypeFilter("file", { title: "Files (*.*)", types: "*.*" }, true);
        //成功上传后的回调
        uploadBox.secceedCallback = function (file, data) {
            //debug(data.video.title, data.video.lastDate, data.video.filePath);
            JSoul.ReturnInfo.infoWithStatus(true, data.returnInfo);
            uploadBox.closer.run("onclick");
            main.clearForm();
        };
        uploadBox.closer.bindEvent({
            onclick: function (e) {
                uploadBox.hiddenBox(function (uploadBox) {
                    main.setDisableAll(false);
                });
            }
        });
        return this;
    }
});
//-->