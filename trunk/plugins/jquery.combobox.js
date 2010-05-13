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
var _3=$.data(_2,"combobox").options;
var _4=$.data(_2,"combobox").combobox;
var _5=$.data(_2,"combobox").content;
if(isNaN(_3.width)){
_3.width=_4.find("input.combobox-text").outerWidth();
}
var _6=_4.find(".combobox-arrow").outerWidth();
var _7=_3.width-_6-(_4.outerWidth()-_4.width());
_4.find("input.combobox-text").width(_7);
if(_3.listWidth){
_5.width(_3.listWidth);
}else{
_5.width($.boxModel==true?_4.outerWidth()-(_5.outerWidth()-_5.width()):_4.outerWidth());
}
if(_3.listHeight){
_5.height(_3.listHeight);
}
};
function _8(_9){
$(_9).hide();
var _a=$("<span class=\"combobox\"></span>").insertAfter(_9);
var _b=$("<input type=\"hidden\" class=\"combobox-value\"></input>").appendTo(_a);
var _b=$("<input type=\"text\" class=\"combobox-text\"></input>").appendTo(_a);
var _c=$("<span><span class=\"combobox-arrow\"></span></span>").appendTo(_a);
var _d=$("<div class=\"combobox-content\"></div>").appendTo("body");
var _e=$(_9).attr("name");
if(_e){
_a.find("input.combobox-value").attr("name",_e);
$(_9).removeAttr("name").attr("comboboxName",_e);
}
$(document).unbind(".combobox").bind("mousedown.combobox",function(){
$(".combobox-content").hide();
});
_d.mousedown(function(){
return false;
});
_b.attr("autocomplete","off").focus(function(){
_37(_9,"");
}).keyup(function(e){
var _f=_d.find("div.combobox-item-selected");
switch(e.keyCode){
case 38:
var _10=_f.prev();
if(_10.length){
_f.removeClass("combobox-item-selected");
_10.addClass("combobox-item-selected");
}
break;
case 40:
var _11=_f.next();
if(_11.length){
_f.removeClass("combobox-item-selected");
_11.addClass("combobox-item-selected");
}
break;
case 13:
_12(_9,_f.attr("value"));
_d.hide();
break;
case 27:
_d.hide();
break;
default:
_37(_9,$(this).val());
}
return false;
});
_c.find(".combobox-arrow").click(function(){
_b.focus();
}).hover(function(){
$(this).addClass("combobox-arrow-hover");
},function(){
$(this).removeClass("combobox-arrow-hover");
});
return {combobox:_a,content:_d};
};
function _12(_13,_14){
var _15=$.data(_13,"combobox").data;
var _16=$.data(_13,"combobox").options;
var _17=$.data(_13,"combobox").combobox;
var _18=$.data(_13,"combobox").content;
_18.find("div.combobox-item-selected").removeClass("combobox-item-selected");
for(var i=0;i<_15.length;i++){
var rec=_15[i];
if(rec[_16.valueField]==_14){
var _19=_17.find("input.combobox-value").val();
_17.find("input.combobox-value").val(rec[_16.valueField]);
_17.find("input.combobox-text").val(rec[_16.textField]);
_18.find("div.combobox-item[value="+_14+"]").addClass("combobox-item-selected");
_16.onSelect.call(_13,rec);
if(_19!=_14){
_16.onChange.call(_13,_14,_19);
}
_1a(_13,true);
return;
}
}
};
function _1b(_1c,_1d){
var _1e=$.data(_1c,"combobox").combobox;
var _1f=$.data(_1c,"combobox").options;
var _20=$.data(_1c,"combobox").data;
var _21,_22;
var _23=_1e.find("input.combobox-value").val();
if(typeof _1d=="object"){
_21=_1d[_1f.valueField];
_22=_1d[_1f.textField];
}else{
_21=_1d;
for(var i=0;i<_20.length;i++){
if(_20[i][_1f.valueField]==_21){
_22=_20[i][_1f.textField];
break;
}
}
}
_1e.find("input.combobox-value").val(_21);
_1e.find("input.combobox-text").val(_22);
_1a(_1c,true);
if(_23!=_21){
_1f.onChange.call(_1c,_21,_23);
}
};
function _24(_25){
var _26=$.data(_25,"combobox").combobox;
return _26.find("input.combobox-value").val();
};
function _27(_28){
var _29=$.data(_28,"combobox").options;
var _2a=[];
$(">option",_28).each(function(){
var _2b={};
_2b[_29.valueField]=$(this).attr("value")||$(this).html();
_2b[_29.textField]=$(this).html();
_2b["selected"]=$(this).attr("selected");
_2a.push(_2b);
});
return _2a;
};
function _2c(_2d,_2e){
$.data(_2d,"combobox").data=_2e;
var _2f=$.data(_2d,"combobox").options;
var _30=$.data(_2d,"combobox").content;
var _31=null;
_30.empty();
for(var i=0;i<_2e.length;i++){
var _32=$("<div class=\"combobox-item\"></div>").appendTo(_30);
_32.attr("value",_2e[i][_2f.valueField]);
_32.html(_2e[i][_2f.textField]);
if(_2e[i]["selected"]){
_31=_2e[i];
}
}
if(_31){
_1b(_2d,_31);
}
$(".combobox-item",_30).hover(function(){
$(this).addClass("combobox-item-hover");
},function(){
$(this).removeClass("combobox-item-hover");
}).click(function(){
_30.hide();
_12(_2d,$(this).attr("value"));
});
};
function _33(_34,url){
var _35=$.data(_34,"combobox").options;
if(url){
_35.url=url;
}
if(!_35.url){
return;
}
$.ajax({url:_35.url,dataType:"json",success:function(_36){
_2c(_34,_36);
_35.onLoadSuccess.apply(this,arguments);
},error:function(){
_35.onLoadError.apply(this,arguments);
}});
};
function _37(_38,_39){
_39=_39||"";
var _3a=$.data(_38,"combobox").combobox;
var _3b=$.data(_38,"combobox").content;
var _3c=_3a.find("input.combobox-text").val();
_3b.find("div.combobox-item-selected").removeClass("combobox-item-selected");
_3b.find("div.combobox-item").each(function(){
var _3d=$(this);
if(_3d.text().indexOf(_39)==0){
_3d.show();
if(_3d.text()==_3c){
_3d.addClass("combobox-item-selected");
}
}else{
_3d.hide();
}
});
_3b.css({display:"block",left:_3a.offset().left,top:_3a.offset().top+_3a.outerHeight()});
if($.fn.window){
_3b.css("z-index",$.fn.window.defaults.zIndex++);
}
if(_3b.find("div.combobox-item-selected").length==0){
_3b.find("div.combobox-item:visible:first").addClass("combobox-item-selected");
}
};
function _1a(_3e,_3f){
if($.fn.validatebox){
var _40=$.data(_3e,"combobox").options;
var _41=$.data(_3e,"combobox").combobox.find("input.combobox-text");
_41.validatebox(_40);
if(_3f){
_41.validatebox("validate");
}
}
};
$.fn.combobox=function(_42,_43){
if(typeof _42=="string"){
switch(_42){
case "select":
return this.each(function(){
_12(this,_43);
});
case "setValue":
return this.each(function(){
_1b(this,_43);
});
case "getValue":
return _24(this[0]);
case "reload":
return this.each(function(){
_33(this,_43);
});
}
}
_42=_42||{};
return this.each(function(){
var _44=$.data(this,"combobox");
if(_44){
$.extend(_44.options,_42);
}else{
var r=_8(this);
var t=$(this);
_44=$.data(this,"combobox",{options:$.extend({},$.fn.combobox.defaults,{width:(parseInt(t.css("width"))||undefined),listWidth:t.attr("listWidth"),listHeight:t.attr("listHeight"),valueField:t.attr("valueField"),textField:t.attr("textField"),editable:(t.attr("editable")?t.attr("editable")=="true":undefined),url:t.attr("url"),required:(t.attr("required")?(t.attr("required")=="true"||t.attr("required")==true):undefined),missingMessage:(t.attr("missingMessage")||undefined)},_42),combobox:r.combobox,content:r.content});
_2c(this,_27(this));
}
$("input.combobox-text",_44.combobox).attr("readonly",!_44.options.editable);
_33(this);
_1(this);
_1a(this);
});
};
$.fn.combobox.defaults={width:"auto",listWidth:null,listHeight:null,valueField:"value",textField:"text",editable:true,url:null,required:false,missingMessage:"This field is required.",onLoadSuccess:function(){
},onLoadError:function(){
},onSelect:function(_45){
},onChange:function(_46,_47){
}};
})(jQuery);

