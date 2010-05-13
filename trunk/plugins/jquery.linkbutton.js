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
$.fn.linkbutton=function(_1){
function _2(_3){
$(_3).addClass("l-btn");
if($.trim($(_3).html().replace(/&nbsp;/g," "))==""){
$(_3).html("&nbsp;").wrapInner("<span class=\"l-btn-left\">"+"<span class=\"l-btn-text\">"+"<span class=\"l-btn-empty\"></span>"+"</span>"+"</span>");
var _4=$(_3).attr("icon");
if(_4){
$(".l-btn-empty",_3).addClass(_4);
}
}else{
$(_3).wrapInner("<span class=\"l-btn-left\">"+"<span class=\"l-btn-text\">"+"</span>"+"</span>");
var cc=$(".l-btn-text",_3);
var _4=$(_3).attr("icon");
if(_4){
cc.addClass(_4).css("padding-left","20px");
}
}
};
return this.each(function(){
var _5;
var _6=$.data(this,"linkbutton");
if(_6){
_5=$.extend(_6.options,_1||{});
_6.options=_5;
}else{
_2(this);
_5=$.extend({},$.fn.linkbutton.defaults,_1||{});
if($(this).attr("plain")=="true"){
_5.plain=true;
}
if($(this).attr("disabled")){
_5.disabled=true;
$(this).removeAttr("disabled");
}
_6={options:_5};
}
if(_6.options.disabled){
var _7=$(this).attr("href");
if(_7){
_6.href=_7;
$(this).attr("href","javascript:void(0)");
}
var _8=$(this).attr("onclick");
if(_8){
_6.onclick=_8;
$(this).attr("onclick",null);
}
$(this).addClass("l-btn-disabled");
}else{
if(_6.href){
$(this).attr("href",_6.href);
}
if(_6.onclick){
this.onclick=_6.onclick;
}
$(this).removeClass("l-btn-disabled");
}
if(_6.options.plain==true){
$(this).addClass("l-btn-plain");
}else{
$(this).removeClass("l-btn-plain");
}
$.data(this,"linkbutton",_6);
});
};
$.fn.linkbutton.defaults={disabled:false,plain:false};
})(jQuery);

