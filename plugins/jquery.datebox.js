/**
 * jQuery EasyUI 1.1
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
function _1(_2){
var _3=$(_2);
$(document).unbind(".datebox").bind("mousedown.datebox",function(){
_11(_2);
});
_3.focus(function(){
_c(_2);
}).click(function(){
_c(_2);
});
var _4=$("<div class=\"datebox-calendar\">"+"<div class=\"datebox-calendar-inner\">"+"<div></div>"+"</div>"+"<div class=\"datebox-button\"></div>"+"</div>").appendTo("body");
_4.find("div.datebox-calendar-inner>div").calendar({fit:true,border:false,onSelect:function(_5){
var _6=$.data(_2,"datebox").options;
var v=_6.formatter(_5);
$(_2).val(v);
_4.hide();
_6.onSelect.call(_2,_5);
}});
_4.hide().mousedown(function(){
return false;
});
return _4;
};
function _7(_8){
var _9=$.data(_8,"datebox").options;
var _a=$.data(_8,"datebox").calendar;
var _b=_a.find("div.datebox-button");
_b.empty();
$("<a href=\"javascript:void(0)\" class=\"datebox-current\"></a>").html(_9.currentText).appendTo(_b);
$("<a href=\"javascript:void(0)\" class=\"datebox-close\"></a>").html(_9.closeText).appendTo(_b);
_b.find(".datebox-current,.datebox-close").hover(function(){
$(this).addClass("datebox-button-hover");
},function(){
$(this).removeClass("datebox-button-hover");
});
_b.find(".datebox-current").click(function(){
_a.find("div.datebox-calendar-inner>div").calendar({year:new Date().getFullYear(),month:new Date().getMonth()+1,current:new Date()});
});
_b.find(".datebox-close").click(function(){
_a.hide();
});
};
function _c(_d){
var _e=$.data(_d,"datebox").options;
var _f=$.data(_d,"datebox").calendar;
_f.css({display:"block",left:$(_d).offset().left,top:$(_d).offset().top+$(_d).outerHeight()});
var _10=_e.parser($(_d).val());
_f.find("div.datebox-calendar-inner>div").calendar({year:_10.getFullYear(),month:_10.getMonth()+1,current:_10});
if($.fn.window){
_f.css("z-index",$.fn.window.defaults.zIndex++);
}
};
function _11(_12){
var _13=$.data(_12,"datebox").calendar;
_13.hide();
};
function _14(_15){
if($.fn.validatebox){
var _16=$.data(_15,"datebox").options;
$(_15).validatebox(_16);
}
};
$.fn.datebox=function(_17){
_17=_17||{};
return this.each(function(){
var _18=$.data(this,"datebox");
if(_18){
$.extend(_18.options,_17);
}else{
var _19=_1(this);
var t=$(this);
$.data(this,"datebox",{options:$.extend({},$.fn.datebox.defaults,{required:(t.attr("required")?(t.attr("required")=="true"||t.attr("required")==true):undefined),missingMessage:(t.attr("missingMessage")||undefined)},_17),calendar:_19});
}
_7(this);
_14(this);
});
};
$.fn.datebox.defaults={currentText:"Today",closeText:"Close",required:false,missingMessage:"This field is required.",formatter:function(_1a){
var y=_1a.getFullYear();
var m=_1a.getMonth()+1;
var d=_1a.getDate();
return m+"/"+d+"/"+y;
},parser:function(s){
var t=Date.parse(s);
if(!isNaN(t)){
return new Date(t);
}else{
return new Date();
}
},onSelect:function(_1b){
}};
})(jQuery);

