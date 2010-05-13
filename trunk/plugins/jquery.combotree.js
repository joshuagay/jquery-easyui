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
var _3=$.data(_2,"combotree").options;
var _4=$.data(_2,"combotree").combotree;
var _5=$.data(_2,"combotree").content;
if(isNaN(_3.width)){
_3.width=_4.find("input.combotree-text").outerWidth();
}
var _6=_4.find(".combotree-arrow").outerWidth();
var _7=_3.width-_6-(_4.outerWidth()-_4.width());
_4.find("input.combotree-text").width(_7);
if(_3.treeWidth){
_5.width(_3.treeWidth);
}else{
_5.width($.boxModel==true?_4.outerWidth()-(_5.outerWidth()-_5.width()):_4.outerWidth());
}
if(_3.treeHeight){
_5.height(_3.treeHeight);
}
_5.find(">ul").tree({url:_3.url,onClick:function(_8){
if(_3.onBeforeSelect.call(_2,_8)==false){
return;
}
var _9=_4.find("input.combotree-value").val();
_4.find("input.combotree-value").val(_8.id);
_4.find("input.combotree-text").val(_8.text);
_5.hide();
_a(_2,true);
_3.onSelect.call(_2,_8);
if(_9!=_8.id){
_3.onChange.call(_2,_8.id,_9);
}
}});
};
function _b(_c){
$(_c).hide();
var _d=$("<span class=\"combotree\"></span>").insertAfter(_c);
$("<input type=\"hidden\" class=\"combotree-value\"></input>").appendTo(_d);
$("<input class=\"combotree-text\" readonly=\"true\"></input>").appendTo(_d);
var _e=$("<span><span class=\"combotree-arrow\"></span></span>").appendTo(_d);
var _f=$("<div class=\"combotree-content\"><ul></ul></div>").appendTo("body");
var _10=$(_c).attr("name");
if(_10){
_d.find("input.combotree-value").attr("name",_10);
$(_c).removeAttr("name").attr("combotreeName",_10);
}
function _11(){
_f.css({display:"block",left:_d.offset().left,top:_d.offset().top+_d.outerHeight()});
if($.fn.window){
_f.css("z-index",$.fn.window.defaults.zIndex++);
}
};
$(document).unbind(".combotree").bind("mousedown.combotree",function(){
$(".combotree-content").hide();
});
_f.mousedown(function(){
return false;
});
_d.click(function(){
_11();
return false;
});
_e.find(".combotree-arrow").hover(function(){
$(this).addClass("combotree-arrow-hover");
},function(){
$(this).removeClass("combotree-arrow-hover");
});
return {combotree:_d,content:_f};
};
function _12(_13,_14){
var _15=$.data(_13,"combotree").options;
var _16=$.data(_13,"combotree").combotree;
var _17=$.data(_13,"combotree").content.find(">ul");
var _18,_19;
var _1a=_16.find("input.combotree-value").val();
if(typeof _14=="object"){
_18=_14.id;
_19=_14.text;
}else{
_18=_14;
}
var _1b=_17.find("div.tree-node[node-id="+_18+"]")[0];
_17.tree("select",_1b);
var _1c=_17.tree("getSelected");
if(_1c){
_18=_1c.id;
_19=_1c.text;
}
_16.find("input.combotree-value").val(_18);
_16.find("input.combotree-text").val(_19);
_a(_13,true);
if(_1a!=_18){
_15.onChange.call(_13,_18,_1a);
}
};
function _1d(_1e){
var _1f=$.data(_1e,"combotree").combotree;
return _1f.find("input.combotree-value").val();
};
function _20(_21,url){
var _22=$.data(_21,"combotree").options;
var _23=$.data(_21,"combotree").content;
if(url){
_22.url=url;
}
_23.find(">ul").tree({url:_22.url}).tree("reload");
};
function _a(_24,_25){
if($.fn.validatebox){
var _26=$.data(_24,"combotree").options;
var _27=$.data(_24,"combotree").combotree.find("input.combotree-text");
_27.validatebox(_26);
if(_25){
_27.validatebox("validate");
}
}
};
function _28(_29){
var _2a=$.data(_29,"combotree").content;
return _2a.find(">ul.tree");
};
$.fn.combotree=function(_2b,_2c){
if(typeof _2b=="string"){
switch(_2b){
case "tree":
return _28(this[0]);
case "setValue":
return this.each(function(){
_12(this,_2c);
});
case "getValue":
return _1d(this[0]);
case "reload":
return this.each(function(){
_20(this,_2c);
});
}
}
_2b=_2b||{};
return this.each(function(){
var _2d=$.data(this,"combotree");
if(_2d){
$.extend(_2d.options,_2b);
}else{
var r=_b(this);
var t=$(this);
_2d=$.data(this,"combotree",{options:$.extend({},$.fn.combotree.defaults,{width:(parseInt(t.css("width"))||undefined),treeWidth:t.attr("treeWidth"),treeHeight:t.attr("treeHeight"),url:t.attr("url"),required:(t.attr("required")?(t.attr("required")=="true"||t.attr("required")==true):undefined),missingMessage:(t.attr("missingMessage")||undefined)},_2b),combotree:r.combotree,content:r.content});
}
_1(this);
_a(this);
});
};
$.fn.combotree.defaults={width:"auto",treeWidth:null,treeHeight:200,url:null,required:false,missingMessage:"This field is required.",onBeforeSelect:function(_2e){
},onSelect:function(_2f){
},onChange:function(_30,_31){
}};
})(jQuery);

