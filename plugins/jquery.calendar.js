/**
 * jQuery EasyUI 1.2.6
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
function _1(_2){
var _3=$.data(_2,"calendar").options;
var t=$(_2);
if(_3.fit==true){
var p=t.parent();
_3.width=p.width();
_3.height=p.height();
}
var _4=t.find(".calendar-header");
if($.boxModel==true){
t.width(_3.width-(t.outerWidth()-t.width()));
t.height(_3.height-(t.outerHeight()-t.height()));
}else{
t.width(_3.width);
t.height(_3.height);
}
var _5=t.find(".calendar-body");
var _6=t.height()-_4.outerHeight();
if($.boxModel==true){
_5.height(_6-(_5.outerHeight()-_5.height()));
}else{
_5.height(_6);
}
};
function _7(_8){
$(_8).addClass("calendar").wrapInner("<div class=\"calendar-header\">"+"<div class=\"calendar-prevmonth\"></div>"+"<div class=\"calendar-nextmonth\"></div>"+"<div class=\"calendar-prevyear\"></div>"+"<div class=\"calendar-nextyear\"></div>"+"<div class=\"calendar-title\">"+"<span>Aprial 2010</span>"+"</div>"+"</div>"+"<div class=\"calendar-body\">"+"<div class=\"calendar-menu\">"+"<div class=\"calendar-menu-year-inner\">"+"<span class=\"calendar-menu-prev\"></span>"+"<span><input class=\"calendar-menu-year\" type=\"text\"></input></span>"+"<span class=\"calendar-menu-next\"></span>"+"</div>"+"<div class=\"calendar-menu-month-inner\">"+"</div>"+"</div>"+"</div>");
$(_8).find(".calendar-title span").hover(function(){
$(this).addClass("calendar-menu-hover");
},function(){
$(this).removeClass("calendar-menu-hover");
}).click(function(){
var _9=$(_8).find(".calendar-menu");
if(_9.is(":visible")){
_9.hide();
}else{
_16(_8);
}
});
$(".calendar-prevmonth,.calendar-nextmonth,.calendar-prevyear,.calendar-nextyear",_8).hover(function(){
$(this).addClass("calendar-nav-hover");
},function(){
$(this).removeClass("calendar-nav-hover");
});
$(_8).find(".calendar-nextmonth").click(function(){
_b(_8,1);
});
$(_8).find(".calendar-prevmonth").click(function(){
_b(_8,-1);
});
$(_8).find(".calendar-nextyear").click(function(){
_11(_8,1);
});
$(_8).find(".calendar-prevyear").click(function(){
_11(_8,-1);
});
$(_8).bind("_resize",function(){
var _a=$.data(_8,"calendar").options;
if(_a.fit==true){
_1(_8);
}
return false;
});
};
function _b(_c,_d){
var _e=$.data(_c,"calendar").options;
_e.month+=_d;
if(_e.month>12){
_e.year++;
_e.month=1;
}else{
if(_e.month<1){
_e.year--;
_e.month=12;
}
}
_f(_c);
var _10=$(_c).find(".calendar-menu-month-inner");
_10.find("td.calendar-selected").removeClass("calendar-selected");
_10.find("td:eq("+(_e.month-1)+")").addClass("calendar-selected");
};
function _11(_12,_13){
var _14=$.data(_12,"calendar").options;
_14.year+=_13;
_f(_12);
var _15=$(_12).find(".calendar-menu-year");
_15.val(_14.year);
};
function _16(_17){
var _18=$.data(_17,"calendar").options;
$(_17).find(".calendar-menu").show();
if($(_17).find(".calendar-menu-month-inner").is(":empty")){
$(_17).find(".calendar-menu-month-inner").empty();
var t=$("<table></table>").appendTo($(_17).find(".calendar-menu-month-inner"));
var idx=0;
for(var i=0;i<3;i++){
var tr=$("<tr></tr>").appendTo(t);
for(var j=0;j<4;j++){
$("<td class=\"calendar-menu-month\"></td>").html(_18.months[idx++]).attr("abbr",idx).appendTo(tr);
}
}
$(_17).find(".calendar-menu-prev,.calendar-menu-next").hover(function(){
$(this).addClass("calendar-menu-hover");
},function(){
$(this).removeClass("calendar-menu-hover");
});
$(_17).find(".calendar-menu-next").click(function(){
var y=$(_17).find(".calendar-menu-year");
if(!isNaN(y.val())){
y.val(parseInt(y.val())+1);
}
});
$(_17).find(".calendar-menu-prev").click(function(){
var y=$(_17).find(".calendar-menu-year");
if(!isNaN(y.val())){
y.val(parseInt(y.val()-1));
}
});
$(_17).find(".calendar-menu-year").keypress(function(e){
if(e.keyCode==13){
_19();
}
});
$(_17).find(".calendar-menu-month").hover(function(){
$(this).addClass("calendar-menu-hover");
},function(){
$(this).removeClass("calendar-menu-hover");
}).click(function(){
var _1a=$(_17).find(".calendar-menu");
_1a.find(".calendar-selected").removeClass("calendar-selected");
$(this).addClass("calendar-selected");
_19();
});
}
function _19(){
var _1b=$(_17).find(".calendar-menu");
var _1c=_1b.find(".calendar-menu-year").val();
var _1d=_1b.find(".calendar-selected").attr("abbr");
if(!isNaN(_1c)){
_18.year=parseInt(_1c);
_18.month=parseInt(_1d);
_f(_17);
}
_1b.hide();
};
var _1e=$(_17).find(".calendar-body");
var _1f=$(_17).find(".calendar-menu");
var _20=_1f.find(".calendar-menu-year-inner");
var _21=_1f.find(".calendar-menu-month-inner");
_20.find("input").val(_18.year).focus();
_21.find("td.calendar-selected").removeClass("calendar-selected");
_21.find("td:eq("+(_18.month-1)+")").addClass("calendar-selected");
if($.boxModel==true){
_1f.width(_1e.outerWidth()-(_1f.outerWidth()-_1f.width()));
_1f.height(_1e.outerHeight()-(_1f.outerHeight()-_1f.height()));
_21.height(_1f.height()-(_21.outerHeight()-_21.height())-_20.outerHeight());
}else{
_1f.width(_1e.outerWidth());
_1f.height(_1e.outerHeight());
_21.height(_1f.height()-_20.outerHeight());
}
};
function _22(_23,_24,_25){
var _26=$.data(_23,"calendar").options;
var _27=[];
var _28=new Date(_24,_25,0).getDate();
for(var i=1;i<=_28;i++){
_27.push([_24,_25,i]);
}
var _29=[],_2a=[];
while(_27.length>0){
var _2b=_27.shift();
_2a.push(_2b);
var day=new Date(_2b[0],_2b[1]-1,_2b[2]).getDay();
if(day==(_26.firstDay==0?7:_26.firstDay)-1){
_29.push(_2a);
_2a=[];
}
}
if(_2a.length){
_29.push(_2a);
}
var _2c=_29[0];
if(_2c.length<7){
while(_2c.length<7){
var _2d=_2c[0];
var _2b=new Date(_2d[0],_2d[1]-1,_2d[2]-1);
_2c.unshift([_2b.getFullYear(),_2b.getMonth()+1,_2b.getDate()]);
}
}else{
var _2d=_2c[0];
var _2a=[];
for(var i=1;i<=7;i++){
var _2b=new Date(_2d[0],_2d[1]-1,_2d[2]-i);
_2a.unshift([_2b.getFullYear(),_2b.getMonth()+1,_2b.getDate()]);
}
_29.unshift(_2a);
}
var _2e=_29[_29.length-1];
while(_2e.length<7){
var _2f=_2e[_2e.length-1];
var _2b=new Date(_2f[0],_2f[1]-1,_2f[2]+1);
_2e.push([_2b.getFullYear(),_2b.getMonth()+1,_2b.getDate()]);
}
if(_29.length<6){
var _2f=_2e[_2e.length-1];
var _2a=[];
for(var i=1;i<=7;i++){
var _2b=new Date(_2f[0],_2f[1]-1,_2f[2]+i);
_2a.push([_2b.getFullYear(),_2b.getMonth()+1,_2b.getDate()]);
}
_29.push(_2a);
}
return _29;
};
function _f(_30){
var _31=$.data(_30,"calendar").options;
$(_30).find(".calendar-title span").html(_31.months[_31.month-1]+" "+_31.year);
var _32=$(_30).find("div.calendar-body");
_32.find(">table").remove();
var t=$("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><thead></thead><tbody></tbody></table>").prependTo(_32);
var tr=$("<tr></tr>").appendTo(t.find("thead"));
for(var i=_31.firstDay;i<_31.weeks.length;i++){
tr.append("<th>"+_31.weeks[i]+"</th>");
}
for(var i=0;i<_31.firstDay;i++){
tr.append("<th>"+_31.weeks[i]+"</th>");
}
var _33=_22(_30,_31.year,_31.month);
for(var i=0;i<_33.length;i++){
var _34=_33[i];
var tr=$("<tr></tr>").appendTo(t.find("tbody"));
for(var j=0;j<_34.length;j++){
var day=_34[j];
$("<td class=\"calendar-day calendar-other-month\"></td>").attr("abbr",day[0]+","+day[1]+","+day[2]).html(day[2]).appendTo(tr);
}
}
t.find("td[abbr^=\""+_31.year+","+_31.month+"\"]").removeClass("calendar-other-month");
var now=new Date();
var _35=now.getFullYear()+","+(now.getMonth()+1)+","+now.getDate();
t.find("td[abbr=\""+_35+"\"]").addClass("calendar-today");
if(_31.current){
t.find(".calendar-selected").removeClass("calendar-selected");
var _36=_31.current.getFullYear()+","+(_31.current.getMonth()+1)+","+_31.current.getDate();
t.find("td[abbr=\""+_36+"\"]").addClass("calendar-selected");
}
var _37=6-_31.firstDay;
var _38=_37+1;
if(_37>=7){
_37-=7;
}
if(_38>=7){
_38-=7;
}
t.find("tr").find("td:eq("+_37+")").addClass("calendar-saturday");
t.find("tr").find("td:eq("+_38+")").addClass("calendar-sunday");
t.find("td").hover(function(){
$(this).addClass("calendar-hover");
},function(){
$(this).removeClass("calendar-hover");
}).click(function(){
t.find(".calendar-selected").removeClass("calendar-selected");
$(this).addClass("calendar-selected");
var _39=$(this).attr("abbr").split(",");
_31.current=new Date(_39[0],parseInt(_39[1])-1,_39[2]);
_31.onSelect.call(_30,_31.current);
});
};
$.fn.calendar=function(_3a,_3b){
if(typeof _3a=="string"){
return $.fn.calendar.methods[_3a](this,_3b);
}
_3a=_3a||{};
return this.each(function(){
var _3c=$.data(this,"calendar");
if(_3c){
$.extend(_3c.options,_3a);
}else{
_3c=$.data(this,"calendar",{options:$.extend({},$.fn.calendar.defaults,$.fn.calendar.parseOptions(this),_3a)});
_7(this);
}
if(_3c.options.border==false){
$(this).addClass("calendar-noborder");
}
_1(this);
_f(this);
$(this).find("div.calendar-menu").hide();
});
};
$.fn.calendar.methods={options:function(jq){
return $.data(jq[0],"calendar").options;
},resize:function(jq){
return jq.each(function(){
_1(this);
});
},moveTo:function(jq,_3d){
return jq.each(function(){
$(this).calendar({year:_3d.getFullYear(),month:_3d.getMonth()+1,current:_3d});
});
}};
$.fn.calendar.parseOptions=function(_3e){
var t=$(_3e);
return {width:(parseInt(_3e.style.width)||undefined),height:(parseInt(_3e.style.height)||undefined),firstDay:(parseInt(t.attr("firstDay"))||undefined),fit:(t.attr("fit")?t.attr("fit")=="true":undefined),border:(t.attr("border")?t.attr("border")=="true":undefined)};
};
$.fn.calendar.defaults={width:180,height:180,fit:false,border:true,firstDay:0,weeks:["S","M","T","W","T","F","S"],months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],year:new Date().getFullYear(),month:new Date().getMonth()+1,current:new Date(),onSelect:function(_3f){
}};
})(jQuery);

