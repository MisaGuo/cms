//<![CDATA[
/***JSoul prototype extend Method [Combos Box]***/
JSoul.fn.extend({
	/**
	 * 初始化FLASH上传
	 * @param {json} parms
	 * @param {JSoul} main 外部引用对象
	 * @return JSoul
	 */
	initUploadFlash: function(parms, main){
		if(this.length != 1)return null;
		this.extend({
			//默认配置
			cfgs: {
				//文件上传路径
				uploadURL: "http://www.[yourDomain].com/yourUploadHandlerScript",
				//需要上传文件个数 0-不限制上传数
				count: 3,
				//是否已上传完成所有任务
				isComplete: true
				//buttonURL: "http://www.[yourDomain].com/btn.png" //上传组件按钮样式图片
			},
			//得到配置
			//当用户点击文件浏览对话框选择要上载或下载的文件前调度。
			getConfigHandler: function(){
				this.cfgs.cookies = document.cookie;
				return this.cfgs;
			},
			//设置配置
			setConfig: function(parms){
				if(parms){
					for(var key in parms){
						this.cfgs[key] = parms[key];
					}
				}
				//是否初始化内部
				this.cfgs.isInit = true;
				return this;
			},
			//设置是否已上传完成所有任务
			setIsComplete: function(isComplete){
				this.cfgs.isComplete = isComplete;
			},
			//设置是否已上传完成所有任务
			isComplete: function(){
				return this.cfgs.isComplete;
			},
			//flash对象
			oSwf: this.get(0),
			/**
			 * 调用FLASH方法
			 * @param {Object} funcName
			 * @param {json} oParms
			 */
			callAs: function(funcName, oParms){
				if(!this.oSwf || !this.oSwf.External){
					alert("Flash object had not init..."); return null;
				}
				return this.oSwf.External(funcName, oParms);
			},
			//开始上传 [fileName为空时上传所有]
			start: function(file){
				return this.callAs("start", file);
			},
			//取消上传
			cancel: function(file){
				return this.callAs("cancel", file);
			},
			/**
			 * 删除一个上传文件
			 * @param {Object} file
			 * @return Boolean 是否还有队列文件
			 */
			deleteFile: function(file){
				var hasQueue = this.callAs("deleteFile", file);
				if(!hasQueue){
					main.deleteEndCallback(file);
				}
				return hasQueue;
			},
			//当用户从文件浏览对话框选择要上载或下载的文件时调度。
			selectHandler: function(oFile){
				main.selectCallback(oFile);
			},
			//当用户通过文件浏览对话框取消文件上载或下载时调度。
			cancelHandler: function(eventType){
				main.cancelCallback(eventType);
			},
			//当下载操作完成或上载操作生成 HTTP 状态代码 200 时调度，不保证文件已经在服务器端成功处理。
			//正确判断是否成功上传文件使用uploadCompleteDataHandler
			completeHandler: function(oFile){
				main.chooseFile(oFile, function(file){
					file.setComplete();
				});
			},
			//当上载或下载操作开始时调度。
			openHandler: function(oFile){
				main.chooseFile(oFile, function(file){
					file.setContinue();
				});
			},
			//在文件上载或下载操作期间定期调度。
			progressHandler: function(oFile){
				main.chooseFile(oFile, function(file){
					file.setPercent(((oFile.bytesLoaded * 100) / oFile.bytesTotal).toFixed(2));
				});
			},
			//成功上载并从服务器接收数据之后调度。
			uploadCompleteDataHandler: function(oFile){
				main.chooseFile(oFile, function(file){
					file.setSecceed(JSoul.json(oFile.statusInfo));
				});
			},
			//所有上传任务完成 [单个时相当于completeHandler,批量时为所有队列完成]
			allCompleteHandler: function(eventType){
				this.setIsComplete(true);
				main.allCompleteCallback(eventType);
			},
			//当上载失败并且存在可用来描述失败的 HTTP 状态代码时调度。
			httpStatusHandler: function(oFile){
				this.fileErrorHandler(oFile, oFile.statusInfo == 500 ? "应用服务器错误" : "上传路径错误");
			},
			//当上载或下载失败时调度。
			ioErrorHandler: function(oFile){
				this.fileErrorHandler(oFile, "本地文件发送或加载操作失败");
			},
			//尝试将文件上载到调用方安全沙箱外部的服务器，或是从调用方安全沙箱外部的服务器上下载文件时进行调度。
			securityErrorHandler: function(oFile){
				this.fileErrorHandler(oFile, "安全设置限制不允许上传该文件");
			},
			//文件错误信息
			fileErrorHandler: function(oFile, info){
				main.chooseFile(oFile, function(file){
					file.setError(info || oFile.statusInfo);
				});
			},
			//返回信息
			returnInfoHandler: function(info){
				main.setReturnInfo(info);
			},
			/**
			 * 设置上传文件类型
			 * @param {String} flag 类型名称
			 * @param {json} pair 类型参数
			 * @param {Boolean} isInit 是否初始化所有类型
			 */
			setTypeFilter: function(flag, pair, isInit){
				if(!this.cfgs.fileFilter || isInit){
					this.cfgs.fileFilter = {};
				}
				this.cfgs.fileFilter[flag] = pair;
			},
			//设置图片文件类型
			setImageTypeFilter: function(isInit){
				this.setTypeFilter("image", JSoul.imageTypeFilter, isInit);
			},
			//设置文本文件类型
			setTextTypeFilter: function(isInit){
				this.setTypeFilter("text", JSoul.textTypeFilter, isInit);
			},
			//设置影片文件类型			
			setMovieTypeFilter: function(isInit){
				this.setTypeFilter("movie", JSoul.movieTypeFilter, isInit);
			}
		});
		if(parms){
			this.setConfig(parms);
		}
		return this;
	}
});
/***JSoul prototype extend Method [Default upload Box]***/
JSoul.fn.extend({
	/**
	 * 默认文件上传
	 * @param {json} buildParms
	 * @param {String} vars
	 * @param {json} iniParms
	 * @return JSoul
	 */
	defaultUploadContext: function(buildParms, vars, iniParms){
		//文件上传控件头部
		this.header = this.find("h5");
		var main = this.extend({
			//全局提示信息
			totalInfo: this.header.find("span"),
			//文件列表
			filesBox: this.find("@ul,className,upfiles").initFilesBox(this),
			//关闭上传控件
			closer: this.header.find("a").bindEvent({
				onclick: function(e){
					main.hiddenBox();
				}
			}),
			//显示上传控件
			showBox: function(callback){
				if(!this.oFlash.isComplete()){
					alert("正在处理上传文件中...");
				}else{
					this.filesBox.clear();
					this.totalInfo.innerHtml("");
					this.gCancel.setVisible(false);
					this.show();
					if(callback)callback(this);
				}
			},
			//关闭上传控件
			hiddenBox: function(callback){
				if(!this.oFlash.isComplete()){
					alert("正在处理上传文件中...");
				}else{
					this.hidden();
					if(callback)callback(this);
				}
			},
			//选择一个文件执行
			chooseFile: function(oFile, func){
				var file = this.filesBox.getFile(oFile);
				if(null != file){
					func(file);
				}
			},
			//全局开始上传
			totalStart: function(){
				this.gCancel.setVisible(false);
				this.oFlash.setIsComplete(false);
				this.oFlash.start();
			},
			/**
			 * 所有列表删除后回调事件
			 * @param {json} file
			 */
			deleteEndCallback: function(file){
				this.gCancel.setVisible(false);
			},
			//上传文件选择后回调事件
			selectCallback: function(oFile){
				this.gCancel.setVisible(true);
				this.filesBox.insertFile(oFile);
				this.oFlash.cfgs.isInit = false;
			},
			//上传文件取消后回调事件
			cancelCallback: function(eventType){
				//TODO 上传文件取消后回调事件
			},
			//设置返回的全局信息
			setReturnInfo: function(info){
				this.totalInfo.innerHtml(info);
			},
			//文件上传并且服务器处理成功后回调事件
			secceedCallback: function(file, data){
				//TODO 文件上传并且服务器处理成功后回调事件
			},
			//所有文件上传完成
			allCompleteCallback: function(eventType){
				//所有文件上传完成
			},
			//flash外包装
			flashWrap: this.find("@div,className,upall")
		});
		//flash对象
		window["_" + buildParms.id] = this.oFlash = this.flashWrap.insertFlash(buildParms, vars);
		if(this.oFlash.initUploadFlash(iniParms, this) == null)return null;
		
		//初始化全局取消按钮
		var oCancel = JSoul.$b("a",{href:"javascript:void(0);", innerHTML:"开始上传"});
		this.flashWrap.insertFirst(oCancel);
		this.gCancel = JSoul(oCancel).bindEvent({
			onclick: function(e){
				main.totalStart();
			}
		}).setVisible(false);
		return this;
	},
	/**
	 * 初始化文件列表
	 * @param {JSoul} main
	 * @return JSoul
	 */
	initFilesBox: function(main){
		var filesBox = this.extend({
			//文件列表
			files:[],
			//全局取消上传
			totalCancel: function(){
				this.files.Foreach(function(index){
					if(this.status == JSoul.fileStatus.UPLOADING){
						this.setCancel(true);
					}
				});
			},
			//清除文件列表
			clear: function(file){
				if(file){
					this.files.Remove(file);
				}else{
					this.innerHtml("");
					this.files = [];
				}
			},
			//插入一个文件
			insertFile: function(oFile){
				if(main.oFlash.cfgs.count == 1){
					this.clear();
				}
				
				var fileWrap = JSoul.$b("li", {
					innerHTML: '<h6><a href="javascript:void(0);">删除</a><span>0%</span>'+oFile.name
						+'</h6><blockquote><p><ins>process</ins></p></blockquote>' 
				});
				this.insertLast(fileWrap);
				var file = JSoul(fileWrap).initFileBox(oFile, this, main);
				this.files.push(file);
			},
			//得到一个文件对象
			getFile: function(oFile){
				for(var i = 0, j= this.files.length; i < j; i++){
					if(this.files[i].id == oFile.id){
						return this.files[i];
					}
				}
				return null;
			}
		});
		return this;
	},
	/**
	 * 初始化单个文件
	 * @param {json} oFile
	 * @param {JSoul} filesBox
	 * @param {JSoul} main
	 * @return JSoul
	 */
	initFileBox: function(oFile, filesBox, main){
		var file = this.extend({
			//状态 -1 错误 0-默认 1-正在上传 2-取消上传 3-上传成功
			status: JSoul.fileStatus.DEFAULT,
			//文件名
			name: oFile.name,
			//文件时间戳
			id: oFile.id,
			//得到AS内需要的文件参数
			getParms: function(){
				return {
					status: this.status,
					name: this.name,
					id: this.id
				};
			},
			//取消按钮
			cancelBtn: this.find("a").bindEvent({
				onclick: function(e){
					switch(file.status) {
						case JSoul.fileStatus.DEFAULT:
						    file.setDelete();
							break;
						case JSoul.fileStatus.UPLOADING:
						    file.setCancel();
							break;
						case JSoul.fileStatus.CANCEL:
						    file.setContinue();
							break;
						default: 
							break;
					}
				}
			}),
			//消息标题
			infoTitle: this.find("span"),
			//进度条
			processBar: this.find("p").extend({
				setWidth: function(percent){
					this.style("width", percent + "%");
				}
			}),
			//设置百分比
			setPercent: function(percent){
				this.processBar.style("width", percent + "%");
				this.infoTitle.innerHtml(percent + "%");
				if(percent == 100){
					this.cancelBtn.hidden();
					this.infoTitle.innerHtml("100%，服务器正在处理文件请稍候...");
				}
			},
			//删除一个文件
			setDelete: function(isGlobal){
				if (!isGlobal) {
					main.oFlash.deleteFile(this.getParms());
				}
				filesBox.removeNode(this.get(0));
				return filesBox.clear(this);
			},
			//取消一个文件
			setCancel: function(isGlobal){
				if (!isGlobal) {
					main.oFlash.cancel(this.getParms());
				}
				this.infoTitle.innerHtml("已取消上传");
				this.cancelBtn.innerHtml("继续");
				this.status = JSoul.fileStatus.CANCEL;
			},
			//继续上传一个文件
			setContinue: function(isGlobal){
				if (!isGlobal) {
					main.oFlash.start(this.getParms());
				}
				this.status = JSoul.fileStatus.UPLOADING;
				this.setPercent(0);
				this.cancelBtn.innerHtml("取消");
			},
			//设置文件上传错误
			setError: function(errorInfo){
				this.status = JSoul.fileStatus.ERROR;
				this.infoTitle.innerHtml(errorInfo);
				this.cancelBtn.hidden();
			},
			//设置上传完成
			setComplete: function(){
				this.status = JSoul.fileStatus.COMPLETE;
				this.infoTitle.innerHtml("文件上传成功，等待服务器返回信息...");
			},
			//设置上传成功状态
			setSecceed: function(data){
				if(null == data){
					this.setError("文件上传错误");
				}else if(!data.isSucceed){
					this.setError(data.errorInfo);
				}else{
					this.status = JSoul.fileStatus.SECCEED;
					this.cancelBtn.hidden();
					this.infoTitle.innerHtml("上传成功");
					main.secceedCallback(this, data);
				}
			}
		});
		return this;
	}
});
JSoul.fn.extend({
	/**
	 * 设置表单POST参数
	 * @param {Boolean} IsToTextList 是否需要对HTML转义
	 * @return json
	 */
	getQueryJson: function(IsToTextList){
		if(this.length > 0 && this.get(0).tagName == 'FORM'){
			return JSoul.getQueryJson(this.get(0), IsToTextList);
		}
		return null;
	}
});
JSoul.extend({
	/**
	 * AS外部调用
	 * @return *
	 */
	extendAS: function(){
		if(arguments && arguments.length > 1){
			var oRef = window["_" + arguments[0]];
			if(oRef != null){
				//var obj = JSoul("#eventSortBox");
				//obj.innerHtml(obj.innerHtml() + "<p>" + arguments[1] + "</p>");
				if(arguments.length > 2){
					var args = Array.prototype.slice.apply(arguments);
					return oRef[arguments[1]].apply(oRef, args.slice(2));
				}else{
					return oRef[arguments[1]].call(oRef);
				}
			}
		}
	},
	//状态 -1 错误 0-默认 1-正在上传 2-取消上传 3-上传成功
	fileStatus: {
		ERROR: -1,
		DEFAULT: 0,
		UPLOADING: 1,
		CANCEL: 2,
		COMPLETE: 3,
		SECCEED: 4
	},
	//图片文件类型
	imageTypeFilter: {title:"Images (*.jpg, *.jpeg, *.gif, *.png)", types: "*.jpg;*.jpeg;*.gif;*.png"},
	//文本文件类型
	textTypeFilter: {title:"Text Files (*.txt, *.rtf)", types: "*.txt;*.rtf"},
	//影片文件类型
	movieTypeFilter: {title:"Movie Files (*.flv)", types: "*.flv"},
	/**
	 * 设置表单POST参数
	 * @param {Element} elem
	 * @param {Boolean} IsToTextList 是否需要对HTML转义
	 * @return json
	 */
	getQueryJson: function(elem, IsToTextList){
		var parms = {};
		for(var i=0, j=elem.length; i<j; i++){
			if(elem[i].name != ""){
				if((elem[i].type == "checkbox" || elem[i].type == "radio")){
					if(elem[i].checked){
						parms[elem[i].name] = true;
					}
				}else{
					if(IsToTextList && IsToTextList[elem[i].name]){
						parms[elem[i].name] = elem[i].value.toText();
					}else{
						parms[elem[i].name] = encodeURIComponent(elem[i].value);
					}
				}
			}
		}
		return parms;
	}
});
//]]>