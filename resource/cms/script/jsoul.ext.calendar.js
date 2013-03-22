/// <reference path="jsoul_base.js" />
JSoul.fn.extend({
	/**
	 * 日歷類
	 * @param {JSoul} oRelate 关联的JSoul对象
	 * @param {Function} callBack 调用方法
	 * @return JSoul
	 */
	Calendar:function(oRelate, callBack){
		if(!oRelate) oRelate = this;
		return new JSoul.Calendar(this, oRelate, callBack);
	}
});
JSoul.extend({
	/**
	 * 日歷類 [arg:觸發對象，結果對象] 返回方法
	 * @param {JSoul} oHandles JSoul对象
	 * @param {JSoul} oRelate 关联的JSoul对象
	 * @param {Function} callBack 调用方法
	 * @return JSoul
	 */
	Calendar:function(oHandles,oRelate, callBack){
		this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31,30, 31, 30, 31];
		this.days = ["Sun","Mon", "Tue", "Wed","Thu", "Fri", "Sat"];
		//this.days = ["日","一", "二", "三","四", "五", "六"];
		this.LimitYears = 80;
		this.Init(oHandles,oRelate,callBack);
		return this;
	}
});
JSoul.Calendar.prototype = {
    //初始化日期類
    Init:function(oHandles,oRelate,callBack){
		for(var i=0,j=oHandles.length;i<j;i++){
			oHandles[i].Relate = oRelate[i];
			oHandles[i].Main = oRelate[i].Main = this;
			oHandles[i].onclick = this.EntryClick;
			oRelate[i].Callback = callBack;
		}
    },
    //觸發對象點擊行為
    EntryClick:function(e){
		this.Main.Entry = this;
		this.Main.Output = this.Relate;
        if(!e)e = window.event;
        if(!this.Main.Timer)this.Main.CreateTimer(e);
        else if(!this.Main.Timer.display)this.Main.TimerOpen(e);
        else this.Main.TimerClose();
    },
    //得到初始化時間日期
    GetInitDay:function(yearNum){
        this.now = new Date().addYear(yearNum)
	    this.year = this.now.getFullYear();
	    this.month = this.now.getMonth();
	    this.day = this.now.getDate();
		if(!this.MinYear)this.MinYear = this.year - this.LimitYears;
		if(!this.MaxYear)this.MaxYear = this.year + this.LimitYears;
    },
    //判斷閏年
    GetDays:function(month, year) {
        if (this.month == 1) return ((this.year % 4 == 0) && ((this.year % 100) != 0)) ||(this.year % 400 == 0) ? 29 : 28;
        else return this.daysInMonth[month];
    },
    //建立日歷載體
    CreateTimer:function(e){
        this.Timer = $.$b("div");
        this.Timer.className = "timebox";
        this.Timer.innerHTML = this.BuildTimerInner();
        document.body.appendChild(this.Timer);
        this.InitEvent($("#calendar,year,month,closeSet,CalendarTitle,PreYear,NextYear,PreMonth,NextMonth").bindEvent([["Main", this]]));
        JSoul.initSelecter(this.Timer,e);//修正日歷顯示位置
        this.TimerOpen(e);
    },
    //初始化日歷行為
    InitEvent:function(InnerObj){
        this.DateBox = InnerObj[0];
        this.YearBox = InnerObj[1];
        this.MonthBox = InnerObj[2];
        this.CloseButton = InnerObj[3];
        this.DragBar = InnerObj[4];
		this.PreYear = InnerObj[5];
		this.NextYear = InnerObj[6];
		this.PreMonth = InnerObj[7];
		this.NextMonth = InnerObj[8];
		$(this.DateBox).find("td").bindEvent([["Main", this],["onmouseover",this.DateOver],["onmouseout", this.DateOut],["onclick",this.getDiary]]);
        this.YearBox.onchange = this.YearChange;
        this.MonthBox.onchange = this.MonthChange;
		this.PreYear.onclick = this.PreYearClick;
		this.NextYear.onclick = this.NextYearClick;
		this.PreMonth.onclick = this.PreMonthClick;
		this.NextMonth.onclick = this.NextMonthClick;
        this.CloseButton.onclick = this.EntryClick;
        $.DrogTitle(this.DragBar);//加載拖拽行為
    },
    //打開日歷
    TimerOpen:function(e){
		this.GetInitDay(0);
		this.InitYearOptionValue();
		this.InitMonthOptionValue();
		this.InitPreNextBtn();
        this.InitDate();
        this.Timer.open(e);
    },
	//初始化年份选项
	InitYearOptionValue:function(){
		this.YearBox.value = this.year;
	},
	//初始化月份选项
	InitMonthOptionValue:function(){
		this.MonthBox.value = this.month+1;
	},
    //關閉日歷
    TimerClose:function(){
        if(this.Timer)this.Timer.close();
    },
    //鼠標經過日期行為
    DateOver:function(){
        this.style.backgroundColor = "#FFF";
    },
    //鼠標離開日期行為
    DateOut:function(){
	    var obj = this;
	    window.setTimeout(function(){obj.style.backgroundColor = "";},300);
    },
    //返回日期
    getDiary:function(){
        if(this.innerHTML != ""){
            this.Main.Output.value = this.Main.YearBox.value+"-"+this.Main.MonthBox.value+"-"+this.innerHTML;
			if(this.Main.Output.Callback)this.Main.Output.Callback();
            this.Main.TimerClose();
        }
    },
    //年份改變行為
    YearChange:function(){
        this.Main.year = this.value;
	    this.Main.InitDate();
		this.Main.InitPreNextBtn();
    },
    //月份改變行為
    MonthChange:function(){
        this.Main.month = this.value-1;
	    this.Main.InitDate();
		this.Main.InitPreNextBtn();
    },
	//初始化前进后退按钮
	InitPreNextBtn:function(){
		this.SetInitBtnStyle(this.year <= this.MinYear,this.PreYear);
		this.SetInitBtnStyle(this.year >= this.MaxYear,this.NextYear);
		this.SetInitBtnStyle(this.month <= 0 && this.year <= this.MinYear,this.PreMonth);
		this.SetInitBtnStyle(this.month >= 11 && this.year >= this.MaxYear,this.NextMonth);
	},
	//设置初始化样式
	SetInitBtnStyle:function(bool, obj){
		if(bool)
			obj.style.visibility = "hidden";
		else
			obj.style.visibility = "visible";
	},
	//向前一年
	PreYearClick:function(){
		this.Main.YearBox.value--;
		this.Main.YearBox.onchange();
	},
	//向后一年
	NextYearClick:function(){
		this.Main.YearBox.value++;
		this.Main.YearBox.onchange();
	},
	//向前一月
	PreMonthClick:function(){
		if(this.Main.MonthBox.value == 1){
			this.Main.year--;
			this.Main.YearBox.value--;
			this.Main.MonthBox.value = 12;
		}else{
			this.Main.MonthBox.value--;
		}
		this.Main.MonthBox.onchange();
	},
	//向后一月
	NextMonthClick:function(){
		if(this.Main.MonthBox.value == 12){
			this.Main.year++;
			this.Main.YearBox.value++;
			this.Main.MonthBox.value = 1;
		}else{
			this.Main.MonthBox.value++;
		}
		this.Main.MonthBox.onchange();
	}
}
//建立日歷內容
JSoul.Calendar.prototype.BuildTimerInner = function(){
	this.GetInitDay(0);
    //日歷Caption 年月選擇
    var HtmlBody = ['<h3 id="CalendarTitle"><span id="closeSet"><ins>Close</ins></span>Current ['];
	HtmlBody.push(this.year);HtmlBody.push('-');HtmlBody.push(this.month+1);HtmlBody.push('-');HtmlBody.push(this.day);
	HtmlBody.push(']</h3><table border="0" cellpadding="0" cellspacing="1" class="Calendar" id="caltable">');
	HtmlBody.push('<caption><a href="javascript:void(0);" id="PreYear" title="Previous year">&laquo;</a>');
	HtmlBody.push('<a href="javascript:void(0);" id="PreMonth" title="Previous month">&lsaquo;</a><select id="year" class="selectdate">');
	for(var i=this.MinYear;i<=this.MaxYear;i++){
	    HtmlBody.AddRange(this.BuildOption(this.year,i));
	}
	HtmlBody.push('</select>年 - <select id="month" class="selectdate">');
	for(var i=1;i<=12;i++){
	    HtmlBody.AddRange(this.BuildOption(this.month+1,i));
	}
	//日歷星期標題
	HtmlBody.push('</select>月<a href="javascript:void(0);" id="NextMonth" title="Next month">&rsaquo;</a>');
	HtmlBody.push('<a href="javascript:void(0);" id="NextYear" title="Next year">&raquo;</a></caption><thead><tr><td class="DaySunTitle">');
	HtmlBody.push(this.days[0]); 
	HtmlBody.push('</td>');
	for (var i = 1; i < this.days.length-1;i++){
		HtmlBody.push('<td>');
		HtmlBody.push(this.days[i]); 
		HtmlBody.push('</td>');
	} 
	HtmlBody.push('<td class="DaySatTitle">' + this.days[this.days.length-1] + "</td>"); 
	HtmlBody.push('</tr></thead><tbody id="calendar">');
	//日歷日期
	for (var i = 0; i < 6; i++){
		HtmlBody.push("<tr>");
		for (var j = 0; j < this.days.length;j++)
			HtmlBody.push("<td></td>");
		HtmlBody.push("</tr>");
	}
	HtmlBody.push("</tbody></table>");
	return HtmlBody.join("");
}
//建立年月選擇
JSoul.Calendar.prototype.BuildOption = function(condition,value){
    var HtmlBody = ['<option value="'];
    HtmlBody.push(value);
    HtmlBody.push('"');
    if(value == condition)
        HtmlBody.push(' selected="selected"');
    HtmlBody.push('>');
    HtmlBody.push(value);
    HtmlBody.push(' </option>');
    return HtmlBody;
}
//初始化日歷顯示內容
JSoul.Calendar.prototype.InitDate = function(){
	var newCal = new Date(this.year,this.month,1);
	var daily = 0;
	var startDay = newCal.getDay();
	var intDaysInMonth =this.GetDays(newCal.getMonth(), newCal.getFullYear());
	for (var intWeek = 0; intWeek < this.DateBox.rows.length;intWeek++){
		for (var intDay = 0;intDay < this.DateBox.rows[intWeek].cells.length;intDay++){
			var cell = this.DateBox.rows[intWeek].cells[intDay];
			if ((intDay == startDay) && (daily == 0)){
			    daily = 1;
			}
			if(this.day==daily) cell.className="DayNow";
			else if(intDay==6) cell.className = "DaySat";
			else if(intDay==0) cell.className ="DaySun";
			else cell.className="Day";
			if ((daily > 0) && (daily <= intDaysInMonth)){
				cell.innerHTML = daily;
				daily++;
			}else{
				cell.className="CalendarTD";
				cell.innerHTML = "";
			}
		}
    }
}