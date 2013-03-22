//<!--
JSoul.$(function(){
	JSoul("@textarea,reqire,ckeditor").initCkeditor();
});
/*******************JSoul原型扩展方法 [ckeditor]******************/
JSoul.fn.extend({
	/**
	 * 初始化编辑器
	 * @return {JSoul}
	 */
	initCkeditor:function(){
		this.bindEvent({
			onfocus: function(e){
				if(!this.hasEdit){
					this.hasEdit = true;
					var editor = CKEDITOR.replace(this);
				}
			}
		});
		return this;
	}
});
JSoul.extend({
	/**
	 * 初始化文本编辑器
	 */
	initEditer: function (){
		CKEDITOR.editorConfig = function( config ){
			config.language = 'zh-cn'; //配置语言
			//config.uiColor = '#edf2f8'; //背景颜色
			//config.width = 500; //宽度
			//config.height = 500; //高度
			config.skin = 'v2';
			//config.ignoreEmptyParagraph = true;
			//工具栏
			config.toolbar =
			[
				['Source','-','Preview'],
				['Cut','Copy','Paste','PasteText','PasteFromWord','-','SpellChecker', 'Scayt'],
				['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
				'/',
				['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
				['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
				['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
				['Link','Unlink','Anchor'],
				['Image','Flash','Table','HorizontalRule','SpecialChar','PageBreak'],
				'/',
				['Styles','Format','Font','FontSize','TextColor']
			];
		    //设置快捷键
		    config.keystrokes = [
				[ CKEDITOR.ALT + 121 /*F10*/, 'toolbarFocus' ],  //获取焦点
				[ CKEDITOR.ALT + 122 /*F11*/, 'elementsPathFocus' ],  //元素焦点
				[ CKEDITOR.SHIFT + 121 /*F10*/, 'contextMenu' ],  //文本菜单
				[ CKEDITOR.CTRL + 90 /*Z*/, 'undo' ],  //撤销
				[ CKEDITOR.CTRL + 89 /*Y*/, 'redo' ],  //重做
				[ CKEDITOR.CTRL + CKEDITOR.SHIFT + 90 /*Z*/, 'redo' ],  //
				[ CKEDITOR.CTRL + 76 /*L*/, 'link' ],  //链接
				[ CKEDITOR.CTRL + 66 /*B*/, 'bold' ],  //粗体
				[ CKEDITOR.CTRL + 73 /*I*/, 'italic' ],  //斜体
				[ CKEDITOR.CTRL + 85 /*U*/, 'underline' ],  //下划线
				[ CKEDITOR.ALT + 109 /*-*/, 'toolbarCollapse' ]
		    ];
		    //设置快捷键 可能与浏览器快捷键冲突 plugins/keystrokes/plugin.js. 
		    config.blockedKeystrokes = [
		        CKEDITOR.CTRL + 66 /*B*/,
		        CKEDITOR.CTRL + 73 /*I*/,
		        CKEDITOR.CTRL + 85 /*U*/
		    ];
		};
	}
}).initEditer();
//-->