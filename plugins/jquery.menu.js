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
$(_2).appendTo("body");
$(_2).addClass("menu-top");
var _3=[];
_4($(_2));
for(var i=0;i<_3.length;i++){
var _5=_3[i];
_6(_5);
_5.find(">div.menu-item").each(function(){
_7($(this));
});
_5.find("div.menu-item").click(function(){
if(!this.submenu){
_15(_2);
var _8=$(this).attr("href");
if(_8){
location.href=_8;
}
}
});
}
function _4(_9){
_3.push(_9);
_9.find(">div").each(function(){
var _a=$(this);
var _b=_a.find(">div");
if(_b.length){
_b.insertAfter(_2);
_a[0].submenu=_b;
_4(_b);
}
});
};
function _7(_c){
_c.hover(function(){
_c.siblings().each(function(){
if(this.submenu){
_18(this.submenu);
}
$(this).removeClass("menu-active");
});
_c.addClass("menu-active");
var _d=_c[0].submenu;
if(_d){
var _e=_c.offset().left+_c.outerWidth()-2;
if(_e+_d.outerWidth()>$(window).width()){
_e=_c.offset().left-_d.outerWidth()+2;
}
_1c(_d,{left:_e,top:_c.offset().top-3});
}
},function(e){
_c.removeClass("menu-active");
var _f=_c[0].submenu;
if(_f){
if(e.pageX>=parseInt(_f.css("left"))){
_c.addClass("menu-active");
}else{
_18(_f);
}
}else{
_c.removeClass("menu-active");
}
});
_c.unbind(".menu").bind("mousedown.menu",function(){
return false;
});
};
function _6(_10){
_10.addClass("menu").find(">div").each(function(){
var _11=$(this);
if(_11.hasClass("menu-sep")){
_11.html("&nbsp;");
}else{
var _12=_11.addClass("menu-item").html();
_11.empty().append($("<div class=\"menu-text\"></div>").html(_12));
var _13=_11.attr("icon");
if(_13){
$("<div class=\"menu-icon\"></div>").addClass(_13).appendTo(_11);
}
if(_11[0].submenu){
$("<div class=\"menu-rightarrow\"></div>").appendTo(_11);
}
if($.boxModel==true){
var _14=_11.height();
_11.height(_14-(_11.outerHeight()-_11.height()));
}
}
});
_10.hide();
};
};
function _15(_16){
var _17=$.data(_16,"menu").options;
_18($(_16));
$(document).unbind(".menu");
_17.onHide.call(_16);
return false;
};
function _19(_1a,pos){
var _1b=$.data(_1a,"menu").options;
if(pos){
_1b.left=pos.left;
_1b.top=pos.top;
}
_1c($(_1a),{left:_1b.left,top:_1b.top},function(){
$(document).unbind(".menu").bind("mousedown.menu",function(){
_15(_1a);
$(document).unbind(".menu");
return false;
});
_1b.onShow.call(_1a);
});
};
function _1c(_1d,pos,_1e){
if(!_1d){
return;
}
if(pos){
_1d.css(pos);
}
_1d.show(1,function(){
if(!_1d[0].shadow){
_1d[0].shadow=$("<div class=\"menu-shadow\"></div>").insertAfter(_1d);
}
_1d[0].shadow.css({display:"block",zIndex:$.fn.menu.defaults.zIndex++,left:_1d.css("left"),top:_1d.css("top"),width:_1d.outerWidth(),height:_1d.outerHeight()});
_1d.css("z-index",$.fn.menu.defaults.zIndex++);
if(_1e){
_1e();
}
});
};
function _18(_1f){
if(!_1f){
return;
}
_20(_1f);
_1f.find("div.menu-item").each(function(){
if(this.submenu){
_18(this.submenu);
}
$(this).removeClass("menu-active");
});
function _20(m){
if(m[0].shadow){
m[0].shadow.hide();
}
m.hide();
};
};
$.fn.menu=function(_21,_22){
if(typeof _21=="string"){
switch(_21){
case "show":
return this.each(function(){
_19(this,_22);
});
case "hide":
return this.each(function(){
_15(this);
});
}
}
_21=_21||{};
return this.each(function(){
var _23=$.data(this,"menu");
if(_23){
$.extend(_23.options,_21);
}else{
_23=$.data(this,"menu",{options:$.extend({},$.fn.menu.defaults,_21)});
_1(this);
}
$(this).css({left:_23.options.left,top:_23.options.top});
});
};
$.fn.menu.defaults={zIndex:110000,left:0,top:0,onShow:function(){
},onHide:function(){
}};
})(jQuery);

