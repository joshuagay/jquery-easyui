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
};
function _8(_9){
$(_9).hide();
var _a=$("<span class=\"combotree\"></span>").insertAfter(_9);
$("<input type=\"hidden\" class=\"combotree-value\"></input>").appendTo(_a);
$("<input class=\"combotree-text\" readonly=\"true\"></input>").appendTo(_a);
var _b=$("<span><span class=\"combotree-arrow\"></span></span>").appendTo(_a);
var _c=$("<div class=\"combotree-content\"><ul></ul></div>").appendTo("body");
var _d=$(_9).attr("name");
if(_d){
_a.find("input.combotree-value").attr("name",_d);
$(_9).removeAttr("name").attr("combotreeName",_d);
}
function _e(){
_c.css({display:"block",left:_a.offset().left,top:_a.offset().top+_a.outerHeight()});
if($.fn.window){
_c.css("z-index",$.fn.window.defaults.zIndex++);
}
};
$(document).unbind(".combotree").bind("mousedown.combotree",function(){
$(".combotree-content").hide();
});
_c.mousedown(function(){
return false;
});
_a.click(function(){
_e();
return false;
});
_b.find(".combotree-arrow").hover(function(){
$(this).addClass("combotree-arrow-hover");
},function(){
$(this).removeClass("combotree-arrow-hover");
});
return {combotree:_a,content:_c};
};
function _f(_10){
var _11=$.data(_10,"combotree").options;
var _12=$.data(_10,"combotree").combotree;
var _13=$.data(_10,"combotree").content;
_13.find(">ul").tree({url:_11.url,onClick:function(_14){
if(_11.onBeforeSelect.call(_10,_14)==false){
return;
}
var _15=_12.find("input.combotree-value").val();
_12.find("input.combotree-value").val(_14.id);
_12.find("input.combotree-text").val(_14.text);
_13.hide();
_16(_10,true);
_11.onSelect.call(_10,_14);
if(_15!=_14.id){
_11.onChange.call(_10,_14.id,_15);
}
}});
};
function _17(_18,_19){
var _1a=$.data(_18,"combotree").options;
var _1b=$.data(_18,"combotree").combotree;
var _1c=$.data(_18,"combotree").content.find(">ul");
var _1d,_1e;
var _1f=_1b.find("input.combotree-value").val();
if(typeof _19=="object"){
_1d=_19.id;
_1e=_19.text;
}else{
_1d=_19;
}
var _20=_1c.find("div.tree-node[node-id="+_1d+"]")[0];
_1c.tree("select",_20);
var _21=_1c.tree("getSelected");
if(_21){
_1d=_21.id;
_1e=_21.text;
}
_1b.find("input.combotree-value").val(_1d);
_1b.find("input.combotree-text").val(_1e);
_16(_18,true);
if(_1f!=_1d){
_1a.onChange.call(_18,_1d,_1f);
}
};
function _22(_23){
var _24=$.data(_23,"combotree").combotree;
return _24.find("input.combotree-value").val();
};
function _25(_26,url){
var _27=$.data(_26,"combotree").options;
var _28=$.data(_26,"combotree").content;
if(url){
_27.url=url;
}
_28.find(">ul").tree({url:_27.url}).tree("reload");
};
function _16(_29,_2a){
if($.fn.validatebox){
var _2b=$.data(_29,"combotree").options;
var _2c=$.data(_29,"combotree").combotree.find("input.combotree-text");
_2c.validatebox(_2b);
if(_2a){
_2c.validatebox("validate");
}
}
};
function _2d(_2e){
var _2f=$.data(_2e,"combotree").content;
return _2f.find(">ul.tree");
};
$.fn.combotree=function(_30,_31){
if(typeof _30=="string"){
switch(_30){
case "tree":
return _2d(this[0]);
case "setValue":
return this.each(function(){
_17(this,_31);
});
case "getValue":
return _22(this[0]);
case "reload":
return this.each(function(){
_25(this,_31);
});
}
}
_30=_30||{};
return this.each(function(){
var _32=$.data(this,"combotree");
if(_32){
$.extend(_32.options,_30);
}else{
var r=_8(this);
var t=$(this);
_32=$.data(this,"combotree",{options:$.extend({},$.fn.combotree.defaults,{width:(parseInt(t.css("width"))||undefined),treeWidth:t.attr("treeWidth"),treeHeight:t.attr("treeHeight"),url:t.attr("url"),required:(t.attr("required")?(t.attr("required")=="true"||t.attr("required")==true):undefined),missingMessage:(t.attr("missingMessage")||undefined)},_30),combotree:r.combotree,content:r.content});
}
_f(this);
_1(this);
_16(this);
});
};
$.fn.combotree.defaults={width:"auto",treeWidth:null,treeHeight:200,url:null,required:false,missingMessage:"This field is required.",onBeforeSelect:function(_33){
},onSelect:function(_34){
},onChange:function(_35,_36){
}};
})(jQuery);

