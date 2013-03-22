//<![CDATA[ 
/**
 * JSoul 2.11.2.16 - Base Library
 * 
 * JSoul is a Javascript Library to help programer raise working efficiency
 * 
 * @version Revision: $Rev: 40 $
 * @copyright Copyright (c) 2008 - 2012 1stCore.
 * @author Yeeoh Teem
 * @since The lastest fixed date: $Date: 2011-04-20 15:57:24 +0800 (一, 2008-12-15) $
 * @license LGPL
 */
///**
// * JSoul原型扩展方法 [方法类型]
// */
//JSoul.fn.extend({
//	/**
//	 * 方法介绍
//	 * @param {Object} arg 参数
//	 * @return JSoul
//	 */
//	instanceFunction:function(arg){
//		this.each(function(i){
//			//Do something...
//		});
//		return this;
//	}
//});
///**
// * JSoul静态扩展方法 [方法类型]
// */
//JSoul.extend({
//	/**
//	 * 方法介绍
//	 * @param {Object} item 对象
//	 * @param {Object} arg 参数
//	 * @return JSoul
//	 */
//	instanceFunction:function(item, arg){
//		this.each(function(i){
//			//Do something...
//		});
//		return this;
//	}
//});
///**
// * 检测Iframe
// * if(window!=parent) {
// * 	alert("Warning! The Iframe of behavior is invalid!");
// *	document.location="http://www.1stcore.com";
// */
(function() {
/**
 * 刪除字符串前后空格
 * @return String
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
/**
 * 取消转义字符
 * @return String
 */
String.prototype.toHtml = function() {
	var RexStr = /&lt;|&gt;|&quot;|&#39;|&amp;/ig;
	return this.replace(RexStr, function(MatchStr) {
		switch (MatchStr) {
			case "&lt;":
				return "<";
			case "&gt;":
				return ">";
			case "&quot;":
				return "\"";
			case "&#39;":
				return "'";
			case "&amp;":
				return "&";
			default:
				break;
		}
	});
};
/**
 * 转义字符
 * @return String
 */
String.prototype.toText = function() {
	var RexStr = /<|>|"|'|&/ig;
	return this.replace(RexStr, function(MatchStr) {
		switch (MatchStr) {
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case "\"":
				return "&quot;";
			case "'":
				return "&#39;";
			case "&":
				return "&amp;";
			default:
				break;
		}
	});
};
/**
 * 格式化字符串
 * @return String
 */
String.prototype.format = function() {
		if(arguments.length > 0){
			var args = arguments;
			return this.replace(/\{(\d+)\}/ig, function(matcher,group){
				return args[group];
			});
		}
		return "";
};
/**
 * 遍历數組
 * @param {Function} delegate 委托表达式
 */
Array.prototype.Foreach = function(delegate) {
	for (var i = 0, j = this.length; i < j; i++) {
		delegate.call(this[i], i);
	}
};
/**
 * 添加數組
 * @param {Array} itemList 添加的对象列表
 * @return Array
 */
Array.prototype.AddRange = function(itemList) {
	for (var i = 0, j = itemList.length; i < j; i++) {
		this.push(itemList[i]);
	}
	return this;
};
/**
 * 交换元素位置
 * @param {int} indexA 元素A索引
 * @param {int} indexB 元素B索引
 * @return Array
 */
Array.prototype.Swap = function(indexA, indexB) {
	if (this.length > indexA && this.length > indexB) {
		var cache = this[indexA];
		this[indexA] = this[indexB];
		this[indexB] = cache;
	}
	return this;
};
/**
 * 将元素B放到元素A前
 * @param {int} indexA 元素A索引
 * @param {int} indexB 元素B索引
 * @return Array
 */
Array.prototype.SwapBefore = function(indexA, indexB) {
	if (indexA != indexB && this.length > indexA && this.length > indexB) {
		var cache = [],_objA = this[indexA], _objB = this[indexB];
		for (var i = 0, j = this.length; i < j; i++) {
			if(this[i]==_objA){
				cache.push(_objB);
			}
			if(this[i]!=_objB){
				cache.push(this[i]);
			}
		}
		return cache;
	}
	return this;
};
/**
 * 将元素B放到元素A后
 * @param {int} indexA 元素A索引
 * @param {int} indexB 元素B索引
 * @return Array
 */
Array.prototype.SwapAfter = function(indexA, indexB) {
	if (indexA != indexB && this.length > indexA && this.length > indexB) {
		var cache = [],_objA = this[indexA], _objB = this[indexB];
		for (var i = 0, j = this.length; i < j; i++) {
			if(this[i]!=_objB){
				cache.push(this[i]);
			}
			if(_objA == this[i]){
				cache.push(_objB);
			}
		}
		return cache;
	}
	return this;
};
/**
 * 将元素插入指定索引之后
 * @param {Object} item 元素
 * @param {int} index 元素索引
 * @return Array
 */
Array.prototype.insertAfter = function(item, index) {
	if (this.length > 0 && this.length > index) {
		var _obj;
		for (var i = 0, j = this.length; i < j; i++) {
			if(i == index){
				_obj = this[i + 1];
				this[i + 1] = item;
			}else if(i > index){
				this[i + 1] = _obj;
				_obj = this[i + 2];
			}
		}
	}
	return this;
};
/**
 * 刪除數組子元素
 * @param {Object} item 删除的对象
 * @return Object
 */
Array.prototype.Remove = function(item) {
	for (var i = 0, j = this.length; i < j; i++) {
		if (this[i] === item) {
			return this.splice(i, 1);
		}
	}
};
/**
 * 删除数组对象指定名称相等值的元素
 * @param {String} attrName 属性名称
 * @param {String} value 属性值
 * @return Object
 */
Array.prototype.RemoveObject = function(attrName, value) {
	for (var i = 0, j = this.length; i < j; i++) {
		if (this[i][attrName] == value) {
			return this.splice(i, 1);
		}
	}
};
/**
 * 随机数据排序
 * @return Array
 */
Array.prototype.random = function() {
	return this.sort(function(a, b){
		return Math.ceil(Math.random() * 3) - 2;
	});
};
/**
 * 添加年数
 * @param {int} num 要添加的年数
 * @return Date
 */
Date.prototype.addYear = function(num) {
	this.setFullYear(this.getFullYear() + num);
	return this;
};
/**
 * 添加月数
 * @param {int} num 要添加的月数
 * @return Date
 */
Date.prototype.addMonth = function(num) {
	this.setMonth(this.getMonth() + num);
	return this;
};
/**
 * 添加天数
 * @param {int} num 要添加的天数
 * @return Date
 */
Date.prototype.addDay = function(num) {
	this.setDate(this.getDate() + num);
	return this;
};
/**
 * 添加小时数
 * @param {int} num 要添加的小时数
 * @return Date
 */
Date.prototype.addHour = function(num) {
	this.setHours(this.getHours() + num);
	return this;
};
/**
 * 添加分钟数
 * @param {int} num 要添加的分钟数
 * @return Date
 */
Date.prototype.addMinute = function(num) {
	this.setMinutes(this.getMinutes() + num);
	return this;
};
/**
 * 添加秒数
 * @param {int} num 要添加的秒数
 * @return Date
 */
Date.prototype.addSecond = function(num) {
	this.setSeconds(this.getSeconds() + num);
	return this;
};
/**
 * 添加毫秒数
 * @param {int} num 要添加的毫秒数
 * @return Date
 */
Date.prototype.addMS = function(num) {
	this.setMilliseconds(this.getMilliseconds() + num);
	return this;
};
/**
 * 添加周数
 * @param {int} num 要添加的周数
 * @return Date
 */
Date.prototype.addWeek = function(num) {
	this.setDate(this.getDate() + num * 7);
	return this;
};
/**
 * 得到本地时间
 * @param {String} formatStr 导出格式
 * @return String
 */
Date.prototype.format = function(formatStr) {
	if(!formatStr)return this.toLocaleString();
	var date = this;
	var rexStr = /yyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s/g;
	return formatStr.replace(rexStr, function(mstr) {
		var n = 0;
		switch (mstr) {
			case "yyyy":
				return date.getFullYear();
			case "yy":
				return date.getYear().toString().substr(2);
			case "MM":
			case "M":
				n = date.getMonth ()+1; break;
			case "dd":
			case "d":
				n = date.getDate (); break;
			case "HH":
			case "H":
				n = date.getHours (); break;
			case "mm":
			case "m":
				n = date.getMinutes (); break;
			case "ss":
			case "s":
				n = date.getSeconds (); break;
			default:
				return "";
		}
		return n.pad(mstr.length, "0");
	});
};
/**
 * 数字补前缀
 * @param {Number} max
 * @param {String} prefix
 * @return String
 */
Number.prototype.pad = function(max, prefix){
	var str = this.toString();
	while(str.length < max){
		str = prefix + str;
	}
	return str;
}
/**
 * debug 方法
 */
window.debug = function(){
	if(arguments && arguments.length > 0){
		var str = [];
		for (var i = 0, j = arguments.length; i < j; i++) {
			str.push(arguments[i]);
		}
		alert(str.join(', '));
	}else{
		alert("Empty arguments");
	}
};
/**
 * out 方法
 */
window.out = function(obj, trace){
	var info = "Empty Object";
	if(obj){
		var str = [];
		for (var key in obj) {
			str.push(key);
			str.push(": ");
			str.push(obj[key]);
			str.push("\r\n");
		}
		info = str.join('');
	}
	if(trace){
		return info;
	}else{
		alert(info);
	}
};
/**
 * 日志输出方法
 */
window.log = function(){
	var cs=window.console;
	if(cs && cs.log){
		cs.log.apply ? cs.log.apply(cs,arguments):cs.log(arguments); 
	}
};
/**
 * 对象选择器
 */
var JSoul;
/**
 * JSoul对象
 * @param {String | DocumentNode} selector 选择器表达式
 * @param {DocumentNode} context 上下文对象
 * @return JSoul
 */
JSoul = window.JSoul = function(selector, context) {
	return new JSoul.prototype.Init(selector, context);
};
/**
 * JSoul核心
 */
JSoul.fn = JSoul.prototype = {
	/**
	 * 初始化选择器
	 * @param {String | DocumentNode} selector 选择器表达式
	 * @param {DocumentNode} context 上下文对象
	 * @return JSoul
	 */
	Init: function(selector, context) {
		//保证有效的选择器
		selector = selector || document;
		//如果为DOM Node
		if (selector.nodeType) {
			return this.setSingle(selector);
			//如果为HTML字符串
		} else if (typeof (selector) == "string") {
			return JSoul(context).find(selector);
		}
		return this.setArray(
		// 匹配数组: $(array)
	selector.constructor == Array && selector ||
		// 匹配伪数组DOM nodes: $(arraylike)
	(selector.jsoul || selector.length && selector != window && !selector.nodeType && selector[0] !== undefined && selector[0].nodeType) && JSoul.makeArray(selector) ||
		// 匹配: $(*)
	[selector]);
	},
	/**
	 * 设置单个对象
	 * @param {Object} item 对象
	 * @return JSoul
	 */
	setSingle: function(item) {
		this[0] = item;
		this.length = 1;
		return this;
	},
	length: 0,
	jsoul: "1.0.0.0",
	/**
	 * 得到一个指定索引对象
	 * @param {int } num 查询的位置
	 * @return DocumentNode 如果查询的位置为空返回一个DOM对象数组
	 */
	get: function(num) {
		return num === undefined ?
		// 返回一个干净的 array
		JSoul.makeArray(this) :
		// 返回匹配对象
		this[num];
	},
	/**
	 * 使对象继承父JSoul
	 * @param {Array} elems 对象
	 * @return JSoul
	 */
	pushStack: function(elems) {
		var ret = JSoul(elems);
		// 添加对象引用
		ret.prevObject = this;
		this.nextObject = ret;
		// 返回一个新的对象
		return ret;
	},
	/**
	 * 设置为JSoul对象
	 * @param {Array} elems 对象数组
	 * @return JSoul
	 */
	setArray: function(elems) {
		this.length = 0;
		Array.prototype.push.apply(this, elems);
		return this;
	},
	/**
	 * 查找子对象
	 * @param {String} selector 选择器表达式
	 * @return JSoul
	 */
	find: function(selector) {
		var elems = JSoul.map(this, function(elem) {
			return JSoul.find(selector, elem);
		});
		return this.pushStack(elems);
	},
	/**
	 * 合并对象
	 * @param {Object} context
	 * @return JSoul
	 */
	merge: function(context) {
		Array.prototype.push.apply(this, JSoul.makeArray(context));
		return this;
	},
	/**
	 * 删除一个元素，并重新排列元素顺序
	 * @param {int} index 删除对象的序列
	 * @return 删除的对象
	 */
	remove: function(index){
		var elem = this[index];
		var array = JSoul.makeArray(this, elem);
		this[index] = null;
		this.setArray(array);
		return elem;
	},
	/**
	 * 遍历对象
	 * @param {Function} func 遍历方法
	 * @return JSoul
	 */
	each: function(func) {
		for (var i = 0, j = this.length; i < j; i++) {
			func.call(this[i], i);
		}
		return this;
	},
	/**
	 * 委托方法 function(elem,index)
	 * @param {Function} func
	 * @return JSoul
	 */
	forEach: function(func) {
		this.each(function(i) {
			func(this, i);
		});
		return this;
	},
	/**
	 * 初始化对象属性
	 * @param {String} name 属性名
	 * @param {Object} value 属性值
	 * @return JSoul
	 */
	initAttr: function(name, value) {
		this[name] = value;
		return this;
	},
	/**
	 * 销毁对象
	 */
	destroy: function(){
		this.removeNode();
		for (var item in this) {
			this[item] = null;
			delete this[item];
		}
	}
};
/**
 * 避免别名冲突
 */
window.$ = window.$ || JSoul;
/**
 * Give the init function the jQuery prototype for later instantiation
 * 为JSoul接续的实例得到Init函数
 */
JSoul.prototype.Init.prototype = JSoul.prototype;
/**
 * 静态方法扩展JSoul.extend与原型扩展JSoul.fn.extend
 * @param {Collection} properties 方法属性集合
 * @return JSoul
 */
JSoul.extend = JSoul.fn.extend = function(properties) {
	for (var i in properties) {
		this[i] = properties[i];
	}
	return this;
};
/**
 * JSoul核心静态支持方法
 */
JSoul.extend({
	/**
	 * 设置为一个数组
	 * @param {Array} array 数组对象
	 * @param {Element} elem 排除一个对象
	 * @return Array
	 */
	makeArray: function(array, elem) {
		var ret = [];
		// 将Node list转为array
		if (array.constructor != Array) {
			for (var i = 0, length = array.length; i < length; i++) {
				if(array[i] != elem){
					ret.push(array[i]);
				}
			}
		} else {
			ret = array.slice(0);
		}
		return ret;
	},
	/**
	 * 映射对象
	 * @param {Array} elems 对象
	 * @param {Function} callback 回调方法
	 * @return Array
	 */
	map: function(elems, callback) {
		var ret = [];
		for (var i = 0, j = elems.length; i < j; i++) {
			var value = callback(elems[i], i);
			if (value !== null && value !== undefined) {
				if (value.constructor != Array) {
					value = [value];
				}
				ret = ret.concat(value);
			}
		}
		return ret;
	},
	/**
	 * 查找对象
	 * @param {String} selector 选择器表达式
	 * @param {DocumentNode} context 上下文对象
	 * @return Array
	 */
	find: function(selector, context) {
		context = context || document;
		//匹配ID[#],ATTR[$],TAG[]
		var match = /^(.)/.exec(selector);
		//如果匹配到格式
		if (match && match[1]) {
			switch (match[1]) {
				case "#": return JSoul.getByID(JSoul.replaceToSplit(selector, "#"), context);
				case "@": return JSoul.getByAttr(JSoul.replaceToSplit(selector, "@"), context);
				case ">": return JSoul.getByFormSub(JSoul.replaceToSplit(selector, ">"), context);
				case "$": return JSoul.getByFrames(JSoul.replaceToSplit(selector, "$"), context);
				default: return JSoul.getByTag(JSoul.replaceToSplit(selector, ""), context);
			}
		}
	},
	/**
	 * 设置通过ID得到的对象 $("#aa,bb,cc,dd")
	 * @param {Array} names 名称数组
	 * @param {DocumentNode} context 上下文对象
	 * @return Array
	 */
	getByID: function(names, context) {
		var ret = [];
		for (var i = 0, j = names.length; i < j; i++) {
			var item = document.getElementById(JSoul.trim(names[i]));
			if (item) {
				ret.push(item);
			}
		}
		return ret;
	},
	/**
	 * 设置通过Tag得到的对象 $("div,a,ul,dl")
	 * @param {Array} names 名称数组
	 * @param {DocumentNode} context 上下文对象
	 * @return Array
	 */
	getByTag: function(names, context) {
		var ret = [];
		for (var i = 0, j = names.length; i < j; i++) {
			var items = context.getElementsByTagName(JSoul.trim(names[i]));
			for (var m = 0, n = items.length; m < n; m++) {
				ret.push(items[m]);
			}
		}
		return ret;
	},
	/**
	 * 设置通过属性得到的对象 $("@form|div,className|id|name,aa|form1|*choosed")
	 * @param {Array} names 名称数组
	 * @param {DocumentNode} context 上下文对象
	 * @return Array
	 */
	getByAttr: function(names, context) {
		var ret = [];
		if (names.length == 3) {
			var _tags = names[0].split("|"), _attrNames = names[1].split("|"), _attrValues = names[2] == "*" ? "*" : names[2].split("|");
			ret = JSoul.getByTag(_tags, context);
			for (var i = ret.length - 1; i > -1; --i) {
				if (!JSoul.checkAttr(ret[i], _attrNames, _attrValues)) {
					ret.splice(i, 1);
				}
			}
		}
		return ret;
	},
	/**
	 * 检查属性值是否成立
	 * @param {Object} item 对象
	 * @param {String} attrNames 属性名称
	 * @param {Object} attrValues 属性值
	 * @return bool
	 */
	checkAttr: function(item, attrNames, attrValues) {
		for (var m = 0, n = attrNames.length; m < n; m++) {
			var attri = (item[attrNames[m]] == undefined) ? item.getAttribute(attrNames[m]) : item[attrNames[m]];
			if (attri != null && attri.length > 0) {
				for (var x = 0, y = attrValues.length; x < y; x++) {
					if (attrValues == "*" || attri == attrValues[x]
						|| (/^\*/.test(attrValues[x]) && attri.indexOf(attrValues[x].replace("*","")) > -1)) {
						return true;
					}
				}
			}
		}
		return false;
	},
	/**
	 * 设置通过form name得到的对象 form.(">aa,bb,cc,dd")
	 * @param {Array} names 名称数组
	 * @param {DocumentNode} context 上下文对象
	 * @return Array
	 */
	getByFormSub: function(names, context) {
		var ret = [];
		if (context && context.tagName == "FORM") {
			for (var i = 0, j = names.length; i < j; i++) {
				var item = context[JSoul.trim(names[i])];
				if (item) {
					ret.push(item);
				}
			}
		}
		return ret;
	},
	/**
	 * 设置通过Frames name得到的对象 Frame.("$aa,bb,cc,dd")
	 * @param {Array} names 名称数组
	 * @param {DocumentNode} context 上下文对象
	 * @return Array
	 */
	getByFrames: function(names, context) {
		var ret = [];
		for (var i = 0, j = names.length; i < j; i++) {
			var item = window.frames[JSoul.trim(names[i])];
			if (item) {
				ret.push(item);
			}
		}
		return ret;
	}
});
/**
 * JSoul静态方法扩展 [浏览器设置]
 */
window.userAgent = navigator.userAgent.toLowerCase();
JSoul.extend({
	startTime: new Date().getTime(),
	$head: null,
	getHead: function(){
		if(!this.$head){
			this.$head = JSoul("head");
		}
		return this.$head;
	},
	/**
	 * 客户端浏览器设置
	 */
	browser: (function(){
		var bw = {version: 0, safari: 0, opera: 0, msie: 0, firefox: 0, mozilla: 0, chrome: 0, other: 0};
		var flag = /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/;
		if(window.ActiveXObject) {									bw.msie		= true; flag = /msie ([\d.]+)/;}
		else if(document.getBoxObjectFor) {							bw.firefox	= true; flag = /firefox\/([\d.]+)/;}
		else if(/chrome/.test(userAgent)) {							bw.chrome	= true; flag = /chrome\/([\d.]+)/;}
		else if(window.openDatabase) {								bw.safari	= true; flag = /version\/([\d.]+)/;}
		else if(window.opera) {										bw.opera	= true; flag = /opera.([\d.]+)/;}
		else if(/mozilla/.test(userAgent)){							bw.mozilla	= true;}
		else{														bw.other	= true;}
		bw.version = (userAgent.match(flag) || [0,'0'])[1];
		return bw; 
	})(),
	/**
	 * 设置客户端Cookie
	 * @param {String} id 客户端Cookie的ID名称
	 * @param {String} name Cookie键
	 * @param {String} value Cookie值
	 * @param {int} days 记录天数
	 */
	setCookie: function(name, value, days) {
		document.cookie = name + "=" + value + "; expires=" + new Date().addDay(days).toGMTString() + "; path=/";
	},
	/**
	 * 得到客户端Cookie
	 * 不设置参返回所有Cookie
	 * @param {String} name 客户端Cookie的ID名称
	 * @return json
	 */
	getCookie: function(name){
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     	if(arr != null) return unescape(arr[2]); return null;
	},
	/**
	 * 删除客户端Cookie
	 * @param {String} id 客户端Cookie的ID名称
	 */
	delCookie: function(name){
		var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval = JSoul.getCookie(name);
	    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	},
	root: document.documentElement,
	/**
	 * 得到滚动条顶部距离
	 * @return Integer
	 */
	scrollTop: function(){
		return JSoul.root.scrollTop || document.body.scrollTop;
	},
	/**
	 * 执行链接转向
	 * @param {String} url
	 */
	UrlRewrite: function(url) {
		window.location = url;
	},
	/**
	 * JSoul命名空间
	 */
	namespace: [],
	/**
	 * js根路径,调用JSoul组件时使用
	 */
	jsBase: (function(){
		var scripts = document.getElementsByTagName("script");
		for (var i = scripts.length - 1; i > -1; i--){
			var src = scripts[i].src;
			if (src && src.indexOf("jsoul.base.js") != -1) {
				if(src.lastIndexOf('?') != -1){
					JSoul.jsTmp = src.substring(src.lastIndexOf('?'));
				}
				var root = src.match(/^(http(s?):\/\/[^\/]+\/).*$/i);
				if(root && root.length > 1){
					return root[1];
				}
				var base = src.substring(0, src.lastIndexOf('/'));
				return base.substring(0, base.lastIndexOf('/'));
			}
		};
		return "";
	})(),
	/**
	 * 引用需要调用的JSoul插件
	 * @param {String} path 插件相对目录
	 */
	plugin: function(path){
		if(path && !JSoul.namespace[path]){
			JSoul.namespace[path] = true;
			document.write('<script type="text/javascript" src="' + JSoul.jsBase + '/' + path + '"></script>');
		}
	},
	/**
	 * 站点主域
	 */
	domain: (function(){
		var match = window.location.host.match(/(\w+\.(\w+|(com|net|org|gov)\.cn))(:\d+)?$/);
		if(match){
			return match[1];
		}
		return window.location.host;
	})()
});
/**
 * JSoul 静态方法扩展 [DOM加载检测]
 */
JSoul.extend({
	DomFuns: [],
	/**
	 * 执行方法队列
	 */
	DomRun: function() {
		if(arguments.callee.done){return;}
		else{
			arguments.callee.done = true;
			for(var i=0,j=JSoul.DomFuns.length;i<j;i++){
				var item = JSoul.DomFuns[i];
				item.func(item.args);
			}
		}
	},
	/**
	 * 加载Onload事件
	 * @param {Function} callback 需要加载的函数
	 * @param {Object} args 函数的参数
	 */
	$: function(callback, args) {
		this.DomFuns.push({func:callback, args:args});
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", JSoul.DomRun, null);
		}
		if (/KHTML|WebKit/i.test(navigator.userAgent)) {
			var _timer = setInterval(function() {
				if (/loaded|complete/.test(document.readyState)) {
					clearInterval(_timer);
					delete _timer;
					JSoul.DomRun();
				}
			}, 10);
		}
		if (this.browser.msie) {
			var proto = "src='javascript:void(0)'";
			if (location.protocol == "https:") { proto = "src=//0"; }
			document.write("<scr" + "ipt id=__ie_onload defer " + proto + "><\/scr" + "ipt>");
			var script = document.getElementById("__ie_onload");
			script.onreadystatechange = function() {
				if (this.readyState == "complete") {
					JSoul.DomRun();
				}
			};
		}
		if (!this.initLoad && typeof(window.onload) == "function") {
			this.initLoad = true;
			this.DomFuns.push({
				func: window.onload,
				args: null
			});
		}
		window.onload = JSoul.DomRun;
	}
});
/**
 * ajax组件 [原型扩展]
 */
JSoul.extend({
	/**
	 * ajax控件
	 * @param {Object} setting 设置参数
	 * setting = {
	 *  url String 服务器接收URL
	 * 	method String 发送数据方法 [ POST | GET ]
	 * 	onerror Function 错误事件
	 * 	post Object|String 需要发送的数据
	 * 	relate Object 上下文关联对象
	 * 	stateFuncs Array 状态方法
	 * 	json|text|xml|body|stream|onload Function 数据读取完成事件
	 * };
	 */
	$x: function(setting) {
		this.cfg = {};
		this.create(setting);
		if(setting && setting.url) this.connect();
	},
	/**
	 * Get ajax Json
	 * @param {Object} url 链接
	 * @param {Object} callback callball(Json) 回调方法
	 * @param {string} postStr POST数据
	 * @param {Function} onerror 错误事件
	 * @return $x
	 */
	$xJson: function(url, callback, postStr, onerror){
		return new JSoul.$x({
			url: url,
			json: callback,
			post: postStr,
			onerror: onerror
		});
	},
	/**
	 * Get ajax text
	 * @param {Object} url
	 * @param {Object} callback callball(Text)
	 * @param {string} postStr POST数据
	 * @param {Function} onerror 错误事件
	 * @return $x
	 */
	$xText: function(url, callback, postStr, onerror){
		return new JSoul.$x({
			url: url,
			text: callback,
			post: postStr,
			onerror: onerror
		});
	},
	/**
	 * Get ajax xml
	 * @param {Object} url
	 * @param {Object} callback callball(XML)
	 * @param {string} postStr POST数据
	 * @param {Function} onerror 错误事件
	 * @return $x
	 */
	$xXML: function(url, callback, postStr, onerror){
		return new JSoul.$x({
			url: url,
			xml: callback,
			post: postStr,
			onerror: onerror
		});
	}
});
JSoul.$x.prototype = {
	//设置参数
	init: function(setting){
		if(!setting)return;
		if(!setting.cover){
			this.rel = setting.relate;
			this.cfg = setting;
			this.cfg.method = setting.method || "POST";
			this.cfg.post = (setting.post && typeof(setting.post) != "string")? JSoul.toQuery(setting.post) : setting.post;
			this.cfg.onerror = setting.onerror || this.defaultError;
			this.cfg.url = setting.url;
		}else{
			for(var key in setting){
				if(key == "post" && setting.post && typeof(setting.post) != "string"){
					this.cfg[key] = JSoul.toQuery(setting.post);
				}else{
					this.cfg[key] = setting[key];
				}
			}		
		}
	},
	/**
	 * 初始化AJAX
	 */
	create: function(setting) {
		this.init(setting);
		if (window.XMLHttpRequest) {
			this.req = new XMLHttpRequest();
			//for unset http head type 'text/xml'
			if (this.cfg.overrideMimeType && this.req.overrideMimeType) {
				this.req.overrideMimeType('text/xml');
			}
		}else if (window.ActiveXObject) {
			var MSXML = ["Msxml3.XMLHTTP", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
			for (var i = 0, j = MSXML.length; i < j; i++) {
				try {
					this.req = new ActiveXObject(MSXML[i]); break;
				} catch (e) { }
			}
		}
	},
	//连接服务器
	connect: function(){
		if(!this.req) return;
		try {
			var loader = this;
			this.isCancel = false;
			this.req.onreadystatechange = function() {
				loader.onReadyState.call(loader);
			};
			var url = this.cfg.url + ((this.cfg.url.indexOf("?") == -1) ? "?" : "&") + "tt=" + new Date().getTime();
			this.req.open(this.cfg.method, url, true);
			this.req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			this.req.setRequestHeader("RequestType", "ajax");
			if(this.cfg.header){
				this.req.setRequestHeader(this.cfg.header.key, this.cfg.header.value);
			}
			this.req.withCredentials = 'true';
			this.req.send(this.cfg.post);
		} catch (err) {
			this.cfg.onerror.call(this);
		}
	},
	//重新连接服务器
	repeat: function(setting){
		this.cancel();
		this.init(setting);
		this.connect();
	},
	/**
	 * 读取状态
	 */
	onReadyState: function() {
		var ready = this.req.readyState;
		if (this.cfg.stateFuncs && ready > 0 && ready < 4) {
			this.cfg.stateFuncs[ready - 1].call(this);
		} else if (ready == 4) {
			try{
				var httpStatus = this.req.status;
				if (httpStatus == 200 || httpStatus === 0) {
					this.onload();
				} else {
					this.cfg.onerror.call(this);
				}
			} catch(e){}
		}
	},
	/**
	 * 加载数据 
	 */
	onload: function(){
		if(this.isCancel) return;
		if(this.cfg.json){
			this.cfg.json.call(this, JSoul.json(this.req.responseText));
		}else if(this.cfg.text){
			this.cfg.text.call(this, this.req.responseText); //将响应信息作为字符串返回.只读 
		}else if(this.cfg.xml){
			this.cfg.xml.call(this, this.req.responseXML); //将响应信息格式化为Xml Document对象并返回，只读 
		}else if(this.cfg.body){
			this.cfg.body.call(this, this.req.responseBody); //将回应信息正文以unsigned byte数组形式返回.只读 
		}else if(this.cfg.stream){
			this.cfg.stream.call(this, this.req.responseStream); //以Ado Stream对象的形式返回响应信息。只读 
		}else if(this.cfg.onload){
			this.cfg.onload.call(this);
		}
	},
	/**
	 * 读取错误
	 */
	defaultError: function() {
		var info = [];
		info.push("Data connection fail!\n");
		info.push("readyState: " + this.req.readyState);
		info.push("status: " + this.req.status);
		info.push("headers: " + this.req.getAllResponseHeaders());
		alert(info.join("\n"));
	},
	/**
	 * 取消请求
	 */
	cancel: function(){
		this.isCancel = true;
		this.req.abort();
	}
};
/**
 * JSoul静态扩展方法 [字符串方法]
 */
JSoul.extend({
	/**
	 * 分割为名称数组
	 * @param {String} text 字符串
	 * @param {String} flag 需要删除的标识
	 * @param {String} sign 分割符号
	 * @return Array
	 */
	replaceToSplit: function(text, flag, sign) {
		return text.replace(flag || "", "").split(sign || ",");
	},
	/**
	 * 去除前后空格
	 * @param {String} text 字符串
	 * @return String
	 */
	trim: function(text) {
		return (text || "").replace(/^\s+|\s+$/g, "");
	},
	/**
	 * 解析XML
	 * @param {String} txt 字符串
	 * @param {String} tagName 标签名称
	 * @return Array
	 */
	parseXml: function(txt, tagName) {
		var regexp = new RegExp("<" + tagName + ".*>([\\s\\S]*)<\/" + tagName + ">", "ig");
		text = regexp.exec(text);
		var objArray = [];
		for (var i = 1, j = text.length; i < j; i++) {
			objArray.push(strObj[i]);
		}
		return objArray;
	},
	/**
	 * 转换Json为对象
	 * @param {Object} txt 字符串
	 * @return Object
	 */
	json: function(txt) {
		if(txt != null){
			try{
				return eval("(" + txt + ")");
			}catch(e){return {}};
		}
		return null;
	},
	/**
	 * 匹配字符串
	 */
	rex: {
		buttons: /button|submit|reset/ig, //匹配所有按钮
		inputs: /textarea|text|password/ig, //匹配所有文本输入框
		text: /text/ig, //匹配单行文本输入框
		boxies: /checkbox|radio/ig, //匹配所有选择框
		select: /select/ig,//匹配下拉菜单
		mail: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/ //检查Email格式
	}
});
/**
 * JSoul原型扩展方法 [事件设置]
 */
JSoul.fn.extend({
	/**
	 * 绑定事件
	 * @param {Array} pairs 事件列表[["onclick",click],["onmoseover",moseover]] or {"onclick":click,"onmoseover":moseover}
	 * @return JSoul
	 */
	bindEvent: function(pairs) {
		this.each(function(i) {
			this.Num = i;
			JSoul.bindEvent(this, pairs);
		});
		return this;
	},
	/**
	 * DOM方法添加事件
	 * @param {String} method 事件名称
	 * @param {Function} func 引用的方法
	 * @return JSoul
	 */
	addEvent: function(method, func) {
		this.each(function(i) {
			this.Num = i;
			JSoul.addEvent(this, method, func);
		});
		return this;
	},
	/**
	 * 绑定监听事件
	 * @param {Object} pairs {"click":click,"moseover":moseover}
	 * @return JSoul
	 */
	addEvents: function(pairs) {
		this.each(function(i) {
			this.Num = i;
			JSoul.addEvents(this, pairs);
		});
		return this;
	},
	/**
	 * 执行Document Node事件
	 * @param {String|Function} method 事件名称 [click]
	 * @return JSoul
	 */
	run: function(method) {
		this.each(function(i) {
			this[method]();
		});
		return this;
	},
	/**
	 * 得到元素在父元素顶部的距离
	 * @return integer
	 */
	innerTop: function(){
		if(JSoul.browser.msie && !window.XDomainRequest){//IE6,7
			return this.attr("offsetTop");
		}else{
			var parentNode = this.parentNode();
			if(parentNode){
				return this.attr("offsetTop") - parentNode.attr("offsetTop");
			}
		}
		return 0;
	},
	/**
	 * 得到元素在文档顶部的高度
	 * @return integer
	 */
	offsetTop: function(){
		if(JSoul.browser.msie && !window.XDomainRequest && this.length > 0){//IE6,7
			var obj = this.get(0), top = obj.offsetTop;
			while((obj = obj.offsetParent) != null){
				top += obj.offsetTop
			}
			return top;
		}
		return this.attr("offsetTop");
	},
	/**
	 * 返回元素的位置信息
	 * @return Object {left:0, top:0, width:0, height:0}
	 */
	position: function(){
		if(this.length > 0){
			return JSoul.position(this.get(0));
		}
		return null;
	}
});
/**
 * JSoul静态扩展方法 [事件设置]
 */
JSoul.extend({
	/**
	 * 批量绑定事件
	 * @param {Object} item 对象
	 * @param {Array} pairs 事件列表[["onclick",click],["onmoseover",moseover]] or {"onclick":click,"onmoseover":moseover}
	 */
	bindEvent: function(item, pairs) {
		if(pairs instanceof Array){
			for (var i = 0, j = pairs.length; i < j; i++) {
				JSoul.attr(item, pairs[i][0], pairs[i][1]);
			}
		}else{
			JSoul.batchSetAttr(item, pairs);
		}
	},
	/**
	 * DOM方法添加事件
	 * @param {Object} item 对象
	 * @param {String} method 事件名称 click
	 * @param {Funtion} Func 回调方法
	 */
	addEvent: function(item, method, Func) {
		if (item.addEventListener) {
			item.addEventListener(method, Func, false);
		} else if (item.attachEvent) {
			item.attachEvent("on" + method, function(e){
				return Func.call(item, e);
			});
		} else {
			item["on" + method] = Func;
		}
	},
	/**
	 * 绑定监听事件
	 * @param {Object} item 对象
	 * @param {Object} pairs {"click":click,"moseover":moseover}
	 * @return JSoul
	 */
	addEvents: function(item, pairs) {
		for(var key in pairs){
			JSoul.addEvent(item, key, pairs[key]);
		}
	},
	/**
	 * 阻止事件冒泡
	 * @param {Event} e
	 */
	stopBubble: function(e) {
		e = JSoul.$e(e);
		if (e.preventDefault) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
			e.returnValue = false;    
		}
	},
	/**
	 * 得到事件容器
	 * @param {Event} e DOM事件容器
	 * @return Event
	 */
	$e: function(e) {
		return e || window.event;
	},
	/**
	 * 得到事件对象
	 * @param {Event} e DOM事件容器
	 * @return DocumnetNode
	 */
	$eNode: function(e) {
		e = JSoul.$e(e);
		return e.target || e.srcElement;
	},
	/**
	 * 得到相对元素的坐标
	 * @param {Object} e
	 * @return number
	 */
	$offsetY: function(e){
		e = JSoul.$e(e);
		if(typeof(e.offsetY) != "undefined"){
			return e.offsetY;
		}else{
			var node = JSoul.$eNode(e);
			return e.layerY - node.offsetTop;
		}
	},
	/**
	 * 得到键盘按键ID
	 * @param {Event} e DOM事件容器
	 * @return int
	 */
	$eKey: function(e) {
		e = JSoul.$e(e);
		return e.keyCode || e.which;
	},
	/**
	 * 得到鼠标按键ID
	 * @param {Event} e DOM事件容器
	 * @return int
	 */
	$eButton: function(e){
		e = JSoul.$e(e);
		return e.button || e.button;
	},
	/**
	 * 限制输入数字
	 * @param {Object} e DOM事件容器
	 * @return bool
	 */
	$eKeyNumber: function(e) {
		var Keys = JSoul.$eKey(e);
		if(Keys == 229){
			alert("请关闭输入法！");
		}
		var subtraction = ((Keys == 189 || Keys == 109) && JSoul.$eNode(e).value.length == 0);
		var numbers = ((Keys < 48 || Keys > 57) && (Keys < 96 || Keys > 105));
		var others = (Keys != 8 && Keys != 9 && Keys != 46 && Keys != 190 && Keys != 110);
		if (!subtraction && numbers && others) {
			return false;
		}
	},
	/**
	 * 关联对象
	 * @param {JSoul} Main JSoul父对象
	 * @param {Array} listA 列表A
	 * @param {Array} listB 列表B
	 * @param {Function} callback 回调方法
	 * @return bool
	 */
	setRelate: function(Main, listA, listB, callback) {
		if (listA.length == listB.length) {
			for (var i = 0, j = listA.length; i < j; i++) {
				listA[i].Relate = listB[i];
				listB[i].Relate = listA[i];
				listA[i].Main = listB[i].Main = Main;
				if (callback) { callback(listA[i], listB[i]); }
			}
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 返回元素的位置信息
	 * @param {Element} elem
	 * @return Object {left:0, top:0, width:0, height:0}
	 */
	position: function(elem){
		var pos = {left:0, top:0, width:elem.offsetWidth, height:elem.offsetHeight};
		while(elem.offsetParent){
			pos.left += elem.offsetLeft;
			pos.top += elem.offsetTop;
			elem = elem.offsetParent;
		}
		return pos;
	}
});
/**
 * JSoul原型扩展方法 [样式设置]
 */
JSoul.fn.extend({
	/**
	 * 检查对象属性是否相等
	 * @param {String} name 名称
	 * @param {Object} value 值
	 * @return bool
	 */
	equalAttr: function(name, value){
		return this.attr(name) == value;
	},
	/**
	 * 检查对象是否包含该属性
	 * @param {String} name 名称
	 * @param {Object} value 值
	 * @return Int
	 */
	containAttr: function(name, value){
		var attr = this.attr(name);
		if(attr){
			return attr.indexOf(value);
		}
		return -1;
	},
	/**
	 * 设置对象单独属性
	 * 不设置值时返回对象包含的第一个子对象该名称属性
	 * 
	 * @param {String} name 名称
	 * @param {Object} value 值
	 * @return JSoul
	 */
	attr: function(name, value) {
		if(value == undefined && this.length > 0){
			return this.get(0)[name];
		}else{
			this.each(function(i) {
				JSoul.attr(this, name, value);
			});
			return this;
		}
	},
	/**
	 * 设置对象单独样式
	 * 不设置值时返回对象包含的第一个子对象该名称属性
	 * @param {String} name 名称
	 * @param {Object} value 值
	 * @return JSoul
	 */
	setStyle: function(name, value) {
		if (value == undefined && this.length > 0) {
			return this.get(0).style[name];
		} else if (name == "opacity") {
			this.setAlpha(value);
		} else {
			this.each(function(i){
				JSoul.style(this, name, value);
			});
		}
		return this;
	},
	/**
	 * 设置对象单独样式
	 * setStyle别名方法
	 * 不设置值时返回对象包含的第一个子对象该名称属性
	 * @param {String} name 名称
	 * @param {Object} value 值
	 * @return JSoul
	 */
	style: function(name, value) {
		return this.setStyle(name, value);
	},
	/**
	 * 设置对象单独属性
	 * @param {String} name 名称
	 * @param {Object} value 值
	 * @return JSoul
	 */
	setAttr: function(name, value) {
		this.each(function(i) {
			JSoul.attr(this, name, value);
		});
		return this;
	},
	/**
	 * 得到元素自定义属性
	 * @param {Element} elem
	 * @param {String} name
	 * @return String
	 */
	getAttribute: function(name) {
		if(this.length > 0){
			return JSoul.getAttribute(this.get(0), name);
		}
		return null;
	},
	/**
	 * 
	 * @param {Object} name
	 * @param {Object} value
	 */
	setAttribute: function(name, value){
		this.each(function(i) {
			JSoul.setAttribute(this, name, value);
		});
		return this;
	},
	/**
	 * 插入html到容器
	 * @param {string} html
	 */
	innerHtml: function(html){
		if (html == undefined && this.length > 0) {
			return this.get(0).innerHTML;
		}else {
			this.each(function(i){
				JSoul.attr(this, 'innerHTML', html);
			});
			return this;
		}
	},
	/**
	 * 设置对象透明度
	 * @param {int} alpha 透明度[1-100]
	 * @return JSoul
	 */
	setAlpha: function(alpha) {
		this.each(function(i) {
			JSoul.setAlpha(this, alpha);
		});
		return this;
	},
	/**
	 * 设置对象样式 "color:#FFF;font-size: 12px;"
	 * @param {String} cssExp 样式表达式
	 * @return JSoul
	 */
	css: function(cssExp) {
		var _pairs = JSoul.spliteCSSExp(cssExp);
		return this.cssForPairs(_pairs);
	},
	/**
	 * 获取外部CSS属性
	 * @param {Element} elem
	 * @param {String} attr
	 * @return String
	 */
	getExtCss: function(attr){
		if (attr != undefined && this.length > 0) {
			return JSoul.getExtCss(this.get(0), attr);
		}
		return null;
	},
	/**
	 * 设置对象样式 {name:value,name2:value2}
	 * @param {String} pairs 样式表达式
	 * @return JSoul
	 */
	cssForPairs: function(pairs) {
		this.each(function(i) {
			JSoul.batchSetCss(this, pairs);
		});
		return this;
	},
	/**
	 * 设置样式表名称
	 * @param {String} name 样式表名称
	 * @return JSoul
	 */
	className: function(name) {
		if (name == undefined && this.length > 0) {
			return this.get(0).className;
		}else{
			this.each(function(i) {
				JSoul.attr(this, "className", name);
			});
			return this;
		}
	},
	/**
	 * 样式表名称交换
	 * @param {Object} aName 样式表A名称
	 * @param {Object} bName 样式表B名称
	 */
	classNameChanger: function(aName, bName) {
		if(this.attr("className") == aName){
			this.className(bName);
		}else{
			this.className(aName);
		}
		return this;
	},
	/**
	 * 设置弹出窗口链接
	 * @return JSoul
	 */
	externalLinks: function() {
		this.each(function(i) {
			JSoul.externalLinks(this);
		});
		return this;
	},
	/**
	 * 显示元素
	 * @param {String} value 显示元素的方式,默认为block
	 * @return JSoul
	 */
	show:function(value){
		this.each(function(i) {
			JSoul.show(this, value);
		});
		return this;
	},
	/**
	 * 隐藏元素
	 * @return JSoul
	 */
	hidden:function(){
		this.each(function(i) {
			JSoul.hidden(this);
		});
		return this;
	},
	/**
	 * 设置元素是否可见
	 * @param {bool} isVisible
	 * @param {string} info
	 */
	setVisible: function(isVisible, info){
		this.each(function(i) {
			JSoul.setVisible(this,isVisible, info);
		});
		return this;
	}
});
/**
 * JSoul静态扩展方法 [样式设置]
 */
JSoul.extend({
	/**
	 * 设置对象属性
	 * @param {Object} elem 对象
	 * @param {String} name 名称
	 * @param {Object} value 值
	 */
	attr: function(elem, name, value) {
		//防止表单存在多个重名对象
		if(JSoul.hasNames(elem)){
			for(var i=0, j=elem.length; i<j; i++){
				elem[i][name] = value;
			}
		}else{
			elem[name] = value;
		}
	},
	/**
	 * 设置对象样式
	 * @param {Object} elem 对象
	 * @param {String} name 名称
	 * @param {Object} value 值
	 */
	style: function(elem, name, value) {
		elem.style[name] = value;
	},
	/**
	 * 属性是否成立
	 * @param {Object} elem 对象
	 * @param {String} name 名称
	 * @param {Object} value 值
	 * @return bool
	 */
	isAttr: function(elem, name, value) {
		return elem[name] && elem[name] == value;
	},
	/**
	 * 设置对象属性 [DOM方式]
	 * @param {Object} elem 对象
	 * @param {String} name 名称
	 * @param {Object} value 值
	 */
	setAttribute: function(elem, name, value) {
		elem.setAttribute(name, value);
	},
	/**
	 * 得到元素自定义属性
	 * @param {Element} elem
	 * @param {String} name
	 * @return String
	 */
	getAttribute: function(elem, name) {
		return elem.getAttribute(name);
	},
	/**
	 * 批量设置属性 [[][]]
	 * @param {Object} elem 对象
	 * @param {Array} pairs 名值对 [[][]]
	 */
	batchAttrSet: function(elem, pairs) {
		for (var i = 0, j = pairs.length; i < j; i++) {
			JSoul.setAttribute(elem, pairs[i][0], pairs[i][1]);
		}
	},
	/**
	 * 批量设置属性 {name:value}
	 * @param {Object} elem 对象
	 * @param {Array} pairs 名值对 {name:value}
	 */
	batchSetAttr: function(elem, pairs) {
		for(var key in pairs){
			JSoul.attr(elem, key, pairs[key]);
		}
	},
	/**
	 * 设置对象透明度
	 * @param {Object} elem 对象
	 * @param {int} alpha 透明度[1-100]
	 */
	setAlpha: function(elem, alpha) {
		if (JSoul.browser.msie) {
			JSoul.style(elem, "filter", "alpha(opacity=" + alpha + ")");
		} else { JSoul.style(elem, "opacity", alpha / 100); }
	},
	/**
	 * 显示元素
	 * @param {Object} elem 对象
	 * @param {String} value 显示元素的方式,默认为block
	 */
	show:function(elem, value){
		JSoul.style(elem,"display",value !== undefined ? value:"block");
	},
	/**
	 * 隐藏元素
	 * @param {Object} elem 对象
	 */
	hidden:function(elem){
		JSoul.style(elem,"display","none");
	},
	/**
	 * 设置元素是否可见
	 * @param {Object} elem 对象
	 * @param {bool} isVisible
	 * @param {string} info
	 */
	setVisible: function(elem, isVisible, info){
		JSoul.style(elem,"visibility",isVisible?"inherit":"hidden");
		if(info != undefined){
			JSoul.attr(elem, "innerHTML", info);
		}
	},
	/**
	 * 转换样式表为Json "color:#FFF;font-size: 12px;" to {color:'#FFF',fontSize:'12px'}
	 * @param {String} cssExp 样式表达式
	 * @return Array
	 */
	spliteCSSExp: function(cssExp) {
		cssExp = JSoul.styleToScript(cssExp);
		var nameValues = cssExp.split(";"), ret = {};
		for (var i = 0, j = nameValues.length; i < j; i++) {
			if (nameValues[i] !== "") {
				var pair = nameValues[i].split(":");
				ret[JSoul.trim(pair[0])] = JSoul.trim(pair[1]);
			}
		}
		return ret;
	},
	/**
	 * 批量设置CSS {name:value,name2:value2}
	 * @param {Object} elem 对象
	 * @param {Array} pairs 名值对
	 */
	batchSetCss: function(elem, pairs) {
		for (var key in pairs) {
			if (key == "opacity") {
				JSoul.setAlpha(elem, pairs[key]);
			}else{
				JSoul.style(elem, key, pairs[key]);
			}
		}
	},
	/**
	 * 设置对象样式 "color:#FFF;font-size: 12px;"
	 * @param {Object} elem 对象
	 * @param {String} cssExp 样式表达式
	 */
	css: function(elem, cssExp) {
		var _pairs = JSoul.spliteCSSExp(cssExp);
		JSoul.batchSetCss(elem, _pairs);
	},
	/**
	 * CSS转换为脚本格式 font-size =>fontSize
	 * @param {String} cssExp 样式表达式
	 * @return String
	 */
	styleToScript: function(cssExp) {
		return cssExp.replace(/-\D/ig, function(MatchStr) {
			return MatchStr.slice(1).toUpperCase();
		});
	},
	/**
	 * 获取外部CSS属性
	 * @param {Element} elem
	 * @param {String} attr
	 * @return String
	 */
	getExtCss: function(elem, attr){
		if(elem.currentStyle){
			return elem.currentStyle[attr];
		}else if (window.getComputedStyle){
			return document.defaultView.getComputedStyle(elem,null)[attr];     
		}
		return null;
	},
	/**
	 * 设置弹出窗口链接
	 * @param {DocumentNode} anchor 链接对象
	 */
	externalLinks: function(anchor) {
		if (anchor.getAttribute("href")) {
			switch (anchor.getAttribute("rel")) {
				case "external": JSoul.batchSetAttr(anchor, {"className":"external", "target":"_blank"});
					break;
				default: break;
			}
		}
	}
});
/**
 * JSoul原型扩展方法 [表单方法]
 */
JSoul.fn.extend({
	/**
	 * 清除输入框的值
	 * @return JSoul
	 */
	clearInputValue: function() {
		this.each(function(i) {
			if (JSoul.rex.inputs.test(this.type || this.tagName)) {
				JSoul.attr(this, "value", "");
			}
		});
		return this;
	},
	/**
	 * 设置所有的按钮
	 * @param {bool} isDisabled 按钮状态
	 * @return JSoul
	 */
	setDisabled: function(isDisabled) {
		this.each(function(i) {
			JSoul.attr(this, "disabled", isDisabled);
		});
		return this;
	},
	/**
	 * 禁止浏览器输入框的自动完成提示
	 * @return JSoul
	 */
	disabledAutoComplete: function() {
		this.each(function(i) {
			JSoul.setAttribute(this, "autocomplete", "off");
		});
		return this;
	},
	/**
	 * 检查单选或多选是否被选中
	 * @return bool
	 */
	isCheckOn: function() {
		if (JSoul.isFormSub(this, JSoul.rex.boxies)) {
			return JSoul.isCheckOn(this[0]);
		}
	},
	/**
	 * 检查多選項目選中數目
	 * @return int
	 */
	checkCount: function() {
		if (JSoul.isFormSub(this, JSoul.rex.boxies)) {
			return JSoul.checkCount(this[0]);
		}
	},
	/**
	 * 检查下拉多选总数
	 * @return int
	 */
	selectCount: function() {
		if (JSoul.isFormSub(this, JSoul.rex.select)) {
			return JSoul.selectCount(this[0]);
		}
	},
	/**
	 * 得到表单查询参数
	 * @param {json} IsToTextList 是否需要对HTML转义
	 * @return string
	 */
	getQuery: function(IsToTextList){
		if(this.length > 0 && this.get(0).tagName == 'FORM'){
			return JSoul.getQuery(this.get(0), IsToTextList);
		}
		return null;
	},
	/**
	 * 清空表单所有值
	 */
	clearForm: function(){
		if(this.length > 0 && this.get(0).tagName == 'FORM'){
			return JSoul.clearForm(this.get(0));
		}
	},
    /**
     * 自动选中表单
     * @return JSoul
     */
    initAutoFocus: function(){
        this.bindEvent({
            onmouseover : function(e){
                this.select();
            }
        });
		return this;
    },
	/**
	 * 绑定表单内项事件
	 * @param {Array} pairs 事件列表[["onclick",click],["onmoseover",moseover]] or {"onclick":click,"onmoseover":moseover}
	 * @return JSoul
	 */
	bindFormEvent: function(pairs) {
		this.each(function(i) {
			JSoul.bindFormEvent(this, pairs);
		});
		return this;
	},
	/**
	 * 得到表单元素
	 * @param {Object} name
	 */
	getForm: function(name){
		if(this.length > 0){
			return this.get(0)[name];
		}
		return null;
	},
	/**
	 * 遍历表单中所有元素
	 * @param {Function} func
	 */
	eachForm: function(func){
		this.each(function(index) {
			JSoul.eachForm(this, func);
		});
		return this;
	},
	/**
	 * 设置或获取表单对象的值
	 * 不设置值时返回对象包含的第一个子对象该名称属性
	 * 
	 * @param {Object} value 值
	 * @return JSoul
	 */
	val: function(value) {
		if(value == undefined && this.length > 0){
			return this.get(0).value;
		}else{
			return this.attr("value", value);
		}
	}
});
/**
 * JSoul静态扩展方法 [表单方法]
 */
JSoul.extend({
	/**
	 * 检查是否为表单中的元素
	 * @param {JSoul} item 对象
	 * @param {RegExp} regx 匹配type的正则表达式
	 * @return bool
	 */
	isFormSub: function(item, regx) {
		return item.length > 0 && item[0].form && (regx.test(item[0].type || item[0].tagName));
	},
	/**
	 * 检查单选或多选是否被选中
	 * @param {Object} item 对象
	 * @return bool
	 */
	isCheckOn: function(item) {
		if (typeof (item.length) == "undefined") {
			return item.checked;
		} else {
			for (var i = 0, j = item.length; i < j; i++) {
				if (item[i].checked) {
					return true;
				}
			}
			return false;
		}
	},
	/**
	 * 檢查多選項目選中數目
	 * @param {Object} item 对象
	 * @return int
	 */
	checkCount: function(item) {
		var _count = 0;
		if (typeof (item.length) != "undefined") {
			for (var i = 0, j = item.length; i < j; i++) {
				if (item[i].checked) {
					_count++;
				}
			}
		}
		return _count;
	},
	/**
	 * 检查表单存在多个相同名字的元素
	 * @param {Object} elem
	 * @return bool
	 */
	hasNames: function(elem){
		if (typeof(elem.name) == "undefined" && typeof(elem.length) != "undefined") {
			return true;
		}else{
			return false;
		}
	},
	/**
	 * 检查下拉多选总数
	 * @param {Object} item 对象
	 * @return int
	 */
	selectCount: function(item) {
		var _count = 0;
		for (var i = 0, j = item.options.length; i < j; i++) {
			if (item.options[i].selected) {
				_count++;
			}
		}
		return _count;
	},
	/**
	 * 得到表单查询参数
	 * @param {Element} elem
	 * @param {json} IsToTextList 是否需要对HTML转义
	 * @return string
	 */
	getQuery: function(elem, IsToTextList){
		//字符串 是否为同名元素
		var pairs = {};
		for(var i=0, j=elem.length; i<j; i++){
			if(elem[i].name != undefined){
				var val = encodeURIComponent(elem[i].value);
				if((elem[i].type == "checkbox" || elem[i].type == "radio")){
					if(!elem[i].checked){
						val = null;
					}
				}else if(IsToTextList && IsToTextList[elem[i].name]){
					val = encodeURIComponent(elem[i].value.toText());
				}
				if(val != null){
					if(pairs[elem[i].name] != undefined){
						pairs[elem[i].name] += "," + val;
					}else{
						pairs[elem[i].name] = val;
					}
				}
			}
		}
		return JSoul.toQuery(pairs);
	},
	/**
	 * 清空表单所有值
	 * @param {Element} elem
	 */
	clearForm: function(elem){
		for(var i=0, j=elem.length; i<j; i++){
			if(elem[i].length){
				JSoul.clearForm(elem[i]);
			}else if(elem[i].name != undefined){
				if((elem[i].type == "checkbox" || elem[i].type == "radio")){
					if(elem[i].checked){
						elem[i].checked = false;
					}
				}else{
					elem[i].value = "";
				}
			}
		}
	},
	/**
	 * 转换对象为查询参数
	 * @param {json} json
	 */
	toQuery: function(json, isEncode){
		var query = [];
		for (var key in json) {
			if(json[key] === null){
				continue;
			}else if(typeof(json[key]) == "array"){
				json[key] = json[key].join(',');
			}
			query.push(key);
			query.push("=");
			if(isEncode){
				query.push(encodeURIComponent(json[key]));
			}else{
				query.push(json[key]);
			}
			query.push("&");
		}
		return query.join("");
	},
	/**
	 * 批量绑定事件
	 * @param {Element} item 对象
	 * @param {Array} pairs 事件列表[["onclick",click],["onmoseover",moseover]] or {"onclick":click,"onmoseover":moseover}
	 */
	bindFormEvent: function(item, pairs) {
		for (var i = 0, j = item.length; i < j; i++) {
			JSoul.bindEvent(item[i], pairs);
		}
	},
	/**
	 * 遍历表单中所有元素
	 * @param {Element} formElem
	 * @param {Function} func
	 */
	eachForm: function(formElem, func){
		if(formElem.tagName.search(/form/ig) != -1){
			for (var i = 0, j = formElem.length; i < j; i++){
				func(formElem[i], i);
			};
		}
	}
});
/**
 * JSoul原型扩展方法 [DOM方法]
 */
JSoul.fn.extend({
	/**
	 * 删除空白节点
	 * @param {Boolean} isIterate 是否迭代子对象
	 * @return JSoul
	 */
	cleanEmptyNode: function(isIterate) {
		this.each(function(i) {
			JSoul.cleanEmptyNode(this, isIterate);
		});
		return this;
	},
	/**
	 * 插入一个节点到当前节点前面
	 * @param {DocumentNode} node 节点
	 * @return JSoul
	 */
	insertBefore: function(node) {
		this.each(function(i) {
			JSoul.insertBefore(this, node);
		});
		return this;
	},
	/**
	 * 插入一个节点到当前节点后面
	 * @param {DocumentNode} node 节点
	 * @return JSoul
	 */
	insertAfter: function(node) {
		this.each(function(i) {
			JSoul.insertAfter(this, node);
		});
		return this;
	},
	/**
	 * 插入一个节点到最前
	 * @param {DocumentNode} node 节点
	 * @return JSoul
	 */
	insertFirst: function(node) {
		this.each(function(i) {
			JSoul.insertFirst(this, node);
		});
		return this;
	},
	/**
	 * 插入一个节点到最后
	 * @param {DocumentNode} node 节点
	 * @return JSoul
	 */
	insertLast: function(node) {
		this.each(function(i) {
			JSoul.insertLast(this, node);
		});
		return this;
	},
	/**
	 * 删除一个节点
	 * @param {Element} node 节点
	 * @return JSoul
	 */
	removeNode: function(node) {
		this.each(function(i) {
			JSoul.removeNode(node || this);
		});
		return this;
	},
	/**
	 * 克隆节点
	 * @param {Boolean} hasAll 是否克隆所有对象
	 * @return Element | Array
	 */
	cloneNode: function(hasAll){
		var nodes = [];
		this.each(function(i){
			nodes.push(JSoul.cloneNode(this));
		});
		if(hasAll){
			return nodes;
		}else if(nodes.length > 0){
			return nodes[0];
		}
		return null;
	},
	/**
	 * 得到下一个节点
	 * @param {JSoul} node
	 * @return JSoul 
	 */
	nextSibling: function(){
		return this.domGetter(JSoul.nextSibling);
	},
	/**
	 * 得到下一个节点
	 * @return JSoul 
	 */
	firstChild: function(){
		return this.domGetter(JSoul.firstChild);
	},
	/**
	 * 得到父节点
	 * @return JSoul 
	 */
	parentNode: function(){
		return this.domGetter(JSoul.parentNode);
	},
	/**
	 * Dom节点包装方法
	 * @param {Function} callMethod
	 * @return JSoul 
	 */
	domGetter: function(callMethod){
		if(this.length > 0){
			var node = callMethod(this.get(0));
			if(node){
				return JSoul(node);
			}
		}
		return null;
	},
	/**
	 * 分配对象组
	 * @param {Array} Args 子对象关系表达式[[],[]]
	 * @return JSoul
	 */
	partnerShip: function(Args) {
		var Main = this;
		this.each(function(i) {
			JSoul.partnerShip(this, Main, Args[i]);
		});
		return this;
	},
	/**
	 * 是在该节点范围内，判断鼠标范围
	 * @param {Object} node
	 * @return bool
	 */
	isOnNode: function(node){
		if(this.length > 0){
			return JSoul.isOnNode(this.get(0), node);
		}
		return false;
	}
});
/**
 * JSoul静态扩展方法 [DOM方法]
 */
JSoul.extend({
	/**
	 * 删除空白节点
	 * @param {DocumentNode} elem 对象
	 * @param {Boolean} isIterate 是否迭代子对象
	 */
	cleanEmptyNode: function(elem, isIterate) {
		//遍历element的子结点
		for (var i = elem.childNodes.length - 1; i > -1; --i) {
			var node = elem.childNodes[i];
			//判断是否是空白文本结点，如果是，则删除该结点
			if (node.nodeType == 3 && !(/\S/.test(node.nodeValue))) {
				node.parentNode.removeChild(node);
			}else if(isIterate && node.hasChildNodes()){
				//迭代子对象
				JSoul.cleanEmptyNode(node, isIterate);
			}
		}
	},
	/**
	 * 建立一个节点
	 * @param {String} nodeName 节点名称
	 * @param {json} attrs 需要绑定的属性
	 * @return {DocumentNode} Returns a reference to the element that is inserted into the document.
	 */
	$b: function(nodeName, attrs) {
		var elem = document.createElement(nodeName);
		if(attrs){
			JSoul.batchSetAttr(elem, attrs);
		}
		return elem;
	},
	/**
	 * 建立一个碎片节点
	 * @param {json} attrs  需要绑定的属性
	 * @return {DocumentNode} Returns a reference to the element that is inserted into the document.
	 */
	$bf: function(attrs){
		var elem = document.createDocumentFragment();
		if(attrs && attrs.innerHTML){
			var div = JSoul.$b("div", attrs);
			var nodes = div.childNodes;
			for(var i = 0, j = nodes.length; i < j; i++){
				if(nodes[i]){
					elem.appendChild(nodes[i]);
				}
			}
			div = null;
		}
		return elem;
	},
	/**
	 * 建立一个文本节点
	 * @param {String} text 文本
	 * @return Returns a reference to the element that is inserted into the document.
	 */
	$text: function(text) {
		return document.createTextNode(text);
	},
	/**
	 * 插入一个节点到当前节点前面
	 * @param {DocumentNode} elem 对象
	 * @param {DocumentNode} node 节点
	 * @return Returns a reference to the element that is inserted into the document.
	 */
	insertBefore: function(elem, node) {
		if(node.constructor == Array){
			node.Foreach(function(i){
				elem.parentNode.insertBefore(this, elem);
			});
			return node;
		}
		return elem.parentNode.insertBefore(node, elem);
	},
	/**
	 * 插入一个节点到当前节点后面
	 * @param {DocumentNode} elem 对象
	 * @param {DocumentNode} node 节点
	 * @return Returns a reference to the element that is inserted into the document.
	 */
	insertAfter: function(elem, node) {
		if (elem.nextSibling){
			return JSoul.insertBefore(elem.nextSibling, node); //插到对象后面
		}else{
			return JSoul.insertLast(elem.parentNode, node); //插到对象父系最后
		}
	},
	/**
	 * 插入一个节点到最前
	 * @param {DocumentNode} elem 对象
	 * @param {DocumentNode} node 节点
	 * @return Returns a reference to the element that is inserted into the document.
	 */
	insertFirst: function(elem, node) {
		if(elem.childNodes.length > 0){
			return JSoul.insertBefore(elem.childNodes[0], node);
		}else{
			return JSoul.insertLast(elem, node);
		}
	},
	/**
	 * 插入一个节点到最后
	 * @param {DocumentNode} elem 对象
	 * @param {DocumentNode} node 节点
	 * @return Returns a reference to the element that is inserted into the document.
	 */
	insertLast: function(elem, node) {
		if(node.constructor == Array){
			node.Foreach(function(i){
				elem.appendChild(this);
			});
			return node;
		}
		return elem.appendChild(node);
	},
	/**
	 * 删除一个节点
	 * @param {DocumentNode} node
	 * @return Returns a reference to the object that is removed.
	 */
	removeNode: function(node) {
		return node.parentNode.removeChild(node);
	},
	/**
	 * 克隆节点
	 * 
	 * @param {DocumentNode} node
	 * @return Element
	 */
	cloneNode: function(node){
		return node.cloneNode(true);
	},
	/**
	 * 得到下一个节点
	 * @param {DocumentNode} node
	 * @return Element
	 */
	nextSibling: function(node){
		while(node = node.nextSibling){
			if (node.nodeType != 3 && node.nodeType != 8) {
				return node;
			}
		}
		return null;
	},
	/**
	 * 得到第一个子节点
	 * @param {DocumentNode} node
	 * @return Element
	 */
	firstChild: function(node){
		node = node.firstChild;
		if(node){
			if(node.nodeType != 3 && node.nodeType != 8){
				return node;
			}else{
				return JSoul.nextSibling(node);
			}
		}
		return null;
	},
	/**
	 * 得到父节点
	 * @param {DocumentNode} node
	 * @return Element
	 */
	parentNode: function(node){
		return node.parentNode;
	},
	/**
	 * 关联对象
	 * @param {Object} elem 对象
	 * @param {JSoul} oJSoul JSoul对象
	 * @param {Array} Arg 子对象关系表达式[]
	 */
	partnerShip: function(elem, oJSoul, Arg) {
		oJSoul[Arg[0]] = JSoul.find(Arg[1], elem);
	},
	/**
	 * 是在该节点范围内，判断鼠标范围
	 * @param {Element} node
	 * @return bool
	 */
	isOnNode: function(elem, node){
		while(node.tagName != "HTML"){
			if(elem == node){
				return true;
			}
			node = node.parentNode;
		}
		return false;
	},
	/**
	 * 动态加载一个CSS
	 * @param {String} cssFile CSS URL
	 * @param {Function} callback 回调方法
	 * @return DocumentNode
	 */
	includeCss: function(cssFile, callback) {
		return JSoul.loadCss({
			src: cssFile,
			callback: callback
		});
	},
	/**
	 * 动态加载CSS
	 * @param {Object} setting
	 * @return DocumentNode
	 */
	loadCss: function(setting){
		var exCss = JSoul.$b("link", {"rel":"stylesheet", "type":"text/css", "href":setting.src});
		var head = JSoul.getHead();
		head.insertLast(exCss);
		if (JSoul.browser.msie || JSoul.browser.opera) {
			exCss.onload = function() {
				if (setting.callback) { setting.callback(exCss); }
			}; /*
		exCss.onreadystatechange = function () {
			if (this.readyState == "complete") {
				alert('CSS onreadystatechange fired');
			}
		}*/
		} else {
			if (setting.callback) { setting.callback(exCss); }
		}
		return exCss;
	},
	/**
	 * 动态加载一个JS
	 * @param {String} jsFile JS URL
	 * @param {Function} callback 回调方法
	 * @return DocumentNode
	 */
	includeJS: function(jsFile, callback, onerror) {
		return JSoul.loadJs({
			src: jsFile,
			callback: callback,
			onerror: onerror
		});
	},
	/**
	 * 动态加载一个JS
	 * @param {Object} setting
	 * @return DocumentNode
	 */
	loadJs: function(setting){
		var exJS = JSoul.$b("script", {"type":"text/javascript", "src":setting.src, "async": setting.async});
		var head = JSoul.getHead();
		head.insertLast(exJS);
		if (JSoul.browser.mozilla) {
			exJS.onload = exJS.onreadystatechange = function(){
				if ((!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
					if (setting.callback) {
						setting.callback(exJS);
					}
				}
			};
			exJS.onerror = function(){
				if (setting.onerror) {
					setting.onerror(exJS);
				}
			};
		}else if(setting.callback){
			setting.callback(exJS, true);
		}
		return exJS;
	},
	/**
	 * 动态加载图片
	 * @param {String} url
	 * @param {Function} loadedCallback 加载完毕回调函数
	 * @param {Function} errorCallback 加载失败回调函数
	 * @return Image
	 */
	loadImage:function(url, callback, onerror) {
		return JSoul.loadImg({
			src: url,
			callback: callback,
			onerror: onerror
		});
	},
	loadImg: function(setting){
		//创建一个Image对象，实现图片的预下载
	    var img = new Image();
	    img.src = setting.src;
		// 如果图片已经存在于浏览器缓存，直接调用回调函数
	    if (img.complete) {
	        setting.callback(img);
	        return; // 直接返回，不用再处理onload事件
	    }
		//图片下载完毕时异步调用callback函数。
	    img.onload = function () { 
	        setting.callback(img);
	    };
		img.onerror = function(){
			if(setting.onerror){
				setting.onerror(img)
			}
		};
		return img;
	}
});
/**
 * JSoul原型扩展方法 [拖拽方法]
 */
JSoul.fn.extend({
	/**
	 * 拖拽事件
	 * @param {Function} startCallback 鼠标按下时回调函数
	 * @param {Function} runCallback 鼠标移动时回调函数
	 * @param {Function} endCallback 鼠标释放时回调函数
	 * @return JSoul
	 */
	Drag: function(startCallback, runCallback, endCallback) {
		var Main = this;
		this.each(function(i) {
			JSoul.Drag(this, startCallback, runCallback, endCallback, Main);
		});
		return this;
	}
});
/**
 * JSoul静态扩展方法 [拖拽方法]
 */
JSoul.extend({
	/**
	 * 拖拽事件
	 * @param {DocumentNode} node 节点
	 * @param {Function} startCallback 鼠标按下时回调函数
	 * @param {Function} runCallback 鼠标移动时回调函数
	 * @param {Function} endCallback 鼠标释放时回调函数
	 * @param {JSoul} Main 关联父对象
	 */
	Drag: function(node, startCallback, runCallback, endCallback, Main) {
		node.start = startCallback;
		node.run = runCallback;
		node.end = endCallback;
		node.$ = Main;
		node.onmousedown = JSoul.dragEvent;
	},
	/**
	 * 拖拽事件模板
	 * @param {Event} e
	 */
	dragEvent: function(e){
		if (this.start && this.start(JSoul.$e(e))) {
			if (this.setCapture) {
				this.setCapture();
			} else if (window.captureEvents) {
				e.preventDefault();
				window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP | Event.MOUSEOVER);
			}
			var node = this;
			document.onmousemove = function(o) {
				if (node.run) { node.run(JSoul.$e(o)); }
			};
			document.onmouseup = function(o) {
				if (node.releaseCapture) {
					node.releaseCapture();
				} else if (window.captureEvents) {
					window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP | Event.MOUSEOVER);
				}
				if (node.end) { node.end(JSoul.$e(o)); }
				document.onmousemove = null;
				document.onmouseup = null;
			};
		}
	}
});
/**
 * JSoul静态扩展方法 [事件注册器]
 */
JSoul.extend({
	/**
	 * 事件注册器
	 * @param {Function} func 负载对象
	 */
	IProvider: function(func) {
		this.groups = [];
		this.state = false;
		this.func = func;
		/**
		 * 注册对象
		 * @param {String} groupName 分组名称
		 * @param {Object} obj 对象
		 * @param {Function} callBack 回调方法
		 */
		this.register = function(groupName, obj, callBack) {
			this.remove(groupName);
			this.groups.push({ Name: groupName, Provider: obj, Func: callBack });
		};
		/**
		 * 删除注册对象
		 * @param {Object} groupName
		 */
		this.remove = function(groupName){
			this.groups.RemoveObject("Name",groupName);
		},
		/**
		 * 执行状态改变
		 * @param {bool} state 状态
		 * @param {Object} attchs 附加对象
		 */
		this.notifyRun = function(state, attchs) {
			this.state = state;
			for (var i = 0, j = this.groups.length; i < j; i++) {
				if(this.groups[i]){
					this.groups[i].Provider[this.groups[i].Func](this.state, attchs);
				}else{
					--i;--j;
				}
			}
		};
		/**
		 * 通知状态改变
		 */
		this.notify = function() {
			if(!this.func || this.func.effect == 0){
				this.notifyRun(!this.state);
			}
		};
	}
});
/**
 * JSoul原型扩展方法 [延时方法类型]
 */
JSoul.fn.extend({
	/**
	 * 初始化定时器事件
	 * @param {int} delay 延时毫秒
	 * @param {String} callback 回调方法名
	 * @return JSoul
	 */
	initTimeOutEvent:function(delay,callback){
		this.delay = delay;
		this.timeOutCallback = this[callback];
		return this;
	},
	/**
	 * 初始化计时器事件
	 * 
	 * 如果不存在回调方法名, 将调用系统默认计数器方法
	 * 必须实现 this.callback 每次要执行的方法
	 * 可选实现 this.endCallback 计时器结束时执行的方法
	 * 
	 * @param {int} duration 动画需要运行毫秒
	 * @param {Function} tweenFunc 动画算法 可选参数 默认选择 JSoul.Tween.Quint.easeOut
	 * @param {int} as amplitude 振幅[Elastic] | s overshoot amount 负载范围[Back] 可选参数
	 * @param {int} period 周期 可选参数
	 * @return JSoul
	 */
	initTimeIntervarEvent:function(duration, tweenFunc, as, period, intervar){
		this.duration = duration;
		this.as = as;
		this.period = period;
		this.intervar = intervar || 10;
		this.tweenFunc = tweenFunc || JSoul.Tween.Quint.easeOut;
		return this;
	},
	/**
	 * 定时器事件
	 * 
	 * @param {bool} 是否清除已有事件
	 * @return JSoul
	 */
	timeOutEvent:function(isClear, arg){
		if(this.length == 0){
			return this;
		}
		if(isClear && this.timeEventTimeout){
			clearTimeout(this.timeEventTimeout);
		}
		var _obj = this;
		this.timeEventTimeout = setTimeout(function(){
			if(_obj.timeOutCallback){
				_obj.timeOutCallback(arg);
			}else{
				clearTimeout(_obj.timeEventTimeout);
			}
		}, this.delay);
		return this;
	},
	/**
	 * 计时器事件
	 * @param {bool} 是否清除已有事件
	 * @return JSoul
	 */
	timeIntervarEvent:function(isClear){
		if(isClear && this.timeEventInterval){
			clearInterval(this.timeEventInterval);
		}
		this._startTime = new Date().getTime();
		this._intervarPosit = 0;
		this.t = 0; //current time（当前时间）；	can be frames or seconds/milliseconds
		this.c = this.end - this.start; //change in value（变化量）
		this.b = this.start; //beginning value（初始值）

		var _obj = this;
		this.timeEventInterval = setInterval(function(){
			_obj.timeIntervarCallback();
		}, this.intervar);
		return this;
	},
	/**
	 * 清除延时事件
	 * @return JSoul
	 */
	clearTimeEvent: function(){
		if(this.timeEventTimeout){clearTimeout(this.timeEventTimeout); this.timeEventTimeout=null;};
		if(this.timeEventInterval){clearInterval(this.timeEventInterval); this.timeEventInterval=null;};
		return this;
	},
	/**
	 * 默认处理定时器动作
	 */
	timeIntervarCallback: function(){
		var diff = this.duration;
		if(this.sync){
			//同步线程时间，防止因设备差异导致时间不精确
			this._intervarPosit++;
			var difftime = (new Date().getTime() - this._startTime) - (this._intervarPosit * this.intervar);
			diff = this.duration - Math.round(difftime / this.intervar);
		}
		if (this.t < diff) {
			this.t++;
			this.start = Math.ceil(this.tweenFunc(this.t,this.b,this.c,diff, this.as, this.period));
		}else{
			clearInterval(this.timeEventInterval);
			this.start = this.end;
		}
		this.callback ? this.callback(this) : this.clearTimeEvent();
		if(this.start == this.end && this.endCallback){
			this.clearTimeEvent();
			this.endCallback(this);
		}
		return this;
	},
	/**
	 * 倒计时动作
	 */
	downInterval: function(){
		if (this.start == 0) {
			this.clearTimeEvent();
			if(this.endCallback){
				this.endCallback();
			}
		}else{
			this.start -= 1;
		}
		this.callback ? this.callback(this) : this.clearTimeEvent();
		return this;
	},
	/**
	 * 鼠标移动边界延时处理
	 * @param {int} delay 延时毫秒
	 * @param {String} callback 回调方法名
	 * @return JSoul
	 */
	mouseEdge: function(delay, endCallback, startCallback){
		var _obj = this;
		this.initTimeOutEvent(delay, endCallback).bindEvent({
			onmouseover: function(e){
				_obj[startCallback]();
			},
			onmouseout: function(e){
				_obj.timeOutEvent();
			}
		});
		return this;
	}
});
/**
 * 动画效果
 * 算法来源：http://www.robertpenner.com/easing/
 * @param {int} t current time 当前时间 can be frames or seconds/milliseconds
 * @param {int} b beginning value 初始值
 * @param {int} c change in value 变化量
 * @param {int} d duration 持续时间 can be frames or seconds/milliseconds
 * @param {int} a amplitude 振幅，可选参数
 * @param {int} p period 周期，可选参数
 * @param {int} s overshoot amount 负载范围，可选参数
 * s controls the amount of overshoot: higher s means greater overshoot
 * s has a default value of 1.70158, which produces an overshoot of 10 percent
 * s==0 produces cubic easing with no overshoot
 */
JSoul.extend({
	Tween : {
		//Linear：无缓动效果
		Linear: function(t,b,c,d){ return c*t/d + b; },
		//Quadratic：二次方的缓动（t^2）
		Quad: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t + b;
			},
			easeOut: function(t,b,c,d){
				return -c *(t/=d)*(t-2) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t + b;
				return -c/2 * ((--t)*(t-2) - 1) + b;
			}
		},
		//Cubic：三次方的缓动（t^3）
		Cubic: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return c*((t=t/d-1)*t*t + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t + b;
				return c/2*((t-=2)*t*t + 2) + b;
			}
		},
		//Quartic：四次方的缓动（t^4）
		Quart: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return -c * ((t=t/d-1)*t*t*t - 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
				return -c/2 * ((t-=2)*t*t*t - 2) + b;
			}
		},
		//Quintic：五次方的缓动（t^5）
		Quint: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
				return c/2*((t-=2)*t*t*t*t + 2) + b;
			}
		},
		//Sinusoidal：正弦曲线的缓动（sin(t)）
		Sine: {
			easeIn: function(t,b,c,d){
				return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
			},
			easeOut: function(t,b,c,d){
				return c * Math.sin(t/d * (Math.PI/2)) + b;
			},
			easeInOut: function(t,b,c,d){
				return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
			}
		},
		//Exponential：指数曲线的缓动（2^t）
		Expo: {
			easeIn: function(t,b,c,d){
				return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
			},
			easeOut: function(t,b,c,d){
				return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if (t==0) return b;
				if (t==d) return b+c;
				if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
				return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		},
		//Circular：圆形曲线的缓动（sqrt(1-t^2)）
		Circ: {
			easeIn: function(t,b,c,d){
				return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
			},
			easeOut: function(t,b,c,d){
				return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
				return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
			}
		},
		//Elastic：指数衰减的正弦曲线缓动
		Elastic: {
			easeIn: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			},
			easeOut: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
			},
			easeInOut: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
			}
		},
		//Back：超过范围的三次方缓动（(s+1)*t^3 - s*t^2）
		Back: {
			easeIn: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158;
				return c*(t/=d)*t*((s+1)*t - s) + b;
			},
			easeOut: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158;
				return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
			},
			easeInOut: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158; 
				if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
				return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
			}
		},
		//Bounce：指数衰减的反弹缓动
		Bounce: {
			easeIn: function(t,b,c,d){
				return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
			},
			easeOut: function(t,b,c,d){
				if ((t/=d) < (1/2.75)) {
					return c*(7.5625*t*t) + b;
				} else if (t < (2/2.75)) {
					return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
				} else if (t < (2.5/2.75)) {
					return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
				} else {
					return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
				}
			},
			easeInOut: function(t,b,c,d){
				if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
				else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
			}
		}
	}
});
})();
//]]>