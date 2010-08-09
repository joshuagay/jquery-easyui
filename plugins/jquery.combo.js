/**
 * jQuery EasyUI 1.2
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
function _1(_2,_3){
var _4=$.data(_2,"combo").options;
var _5=$.data(_2,"combo").combo;
var _6=$.data(_2,"combo").panel;
if(_3){
_4.width=_3;
}
if(isNaN(_4.width)){
_4.width=_5.find("input.combo-text").outerWidth();
}
var _7=_5.find(".combo-arrow").outerWidth();
var _3=_4.width-_7;
if($.boxModel==true){
_3-=_5.outerWidth()-_5.width();
}
_5.find("input.combo-text").width(_3);
_6.panel("resize",{width:(_4.panelWidth?_4.panelWidth:_5.outerWidth()),height:_4.panelHeight});
};
function _8(_9){
$(_9).hide();
var _a=$("<span class=\"combo\"></span>").insertAfter(_9);
var _b=$("<input type=\"text\" class=\"combo-text\">").appendTo(_a);
$("<span><span class=\"combo-arrow\"></span></span>").appendTo(_a);
$("<input type=\"hidden\" class=\"combo-value\">").appendTo(_a);
var _c=$("<div class=\"combo-panel\"></div>").appendTo("body");
_c.panel({doSize:false,closed:true,style:{position:"absolute"},onOpen:function(){
$(this).panel("resize");
}});
var _d=$(_9).attr("name");
if(_d){
_a.find("input.combo-value").attr("name",_d);
$(_9).removeAttr("name").attr("comboName",_d);
}
_b.attr("autocomplete","off");
return {combo:_a,panel:_c};
};
function _e(_f){
var _10=$.data(_f,"combo").combo.find("input.combo-text");
_10.validatebox("destroy");
$.data(_f,"combo").panel.panel("destroy");
$.data(_f,"combo").combo.remove();
$(_f).remove();
};
function _11(_12){
var _13=$.data(_12,"combo").options;
var _14=$.data(_12,"combo").combo;
var _15=$.data(_12,"combo").panel;
var _16=_14.find(".combo-text");
var _17=_14.find(".combo-arrow");
$(document).unbind(".combo");
_14.unbind(".combo");
_15.unbind(".combo");
_16.unbind(".combo");
_17.unbind(".combo");
if(!_13.disabled){
$(document).bind("mousedown.combo",function(e){
$("div.combo-panel").panel("close");
});
_15.bind("mousedown.combo",function(e){
return false;
});
_16.bind("focus.combo",function(){
_18(_12);
}).bind("mousedown.combo",function(e){
e.stopPropagation();
}).bind("keyup.combo",function(e){
switch(e.keyCode){
case 37:
case 38:
_13.keyHandler.up.call(_12);
break;
case 39:
case 40:
_13.keyHandler.down.call(_12);
break;
case 13:
_13.keyHandler.enter.call(_12);
break;
case 27:
_1d(_12);
break;
default:
if(_13.editable){
_13.keyHandler.query.call(_12,$(this).val());
_21(_12,true);
}
}
return false;
});
_17.bind("click.combo",function(){
_16.focus();
}).bind("mouseenter.combo",function(){
$(this).addClass("combo-arrow-hover");
}).bind("mouseleave.combo",function(){
$(this).removeClass("combo-arrow-hover");
});
}
};
function _18(_19){
var _1a=$.data(_19,"combo").options;
var _1b=$.data(_19,"combo").combo;
var _1c=$.data(_19,"combo").panel;
if($.fn.window){
_1c.panel("panel").css("z-index",$.fn.window.defaults.zIndex++);
}
_1c.panel("open");
_1a.onShowPanel.call(_19);
(function(){
if(_1c.is(":visible")){
var top=_1b.offset().top+_1b.outerHeight();
if(top+_1c.outerHeight()>$(window).height()+$(document).scrollTop()){
top=_1b.offset().top-_1c.outerHeight();
}
if(top<$(document).scrollTop()){
top=_1b.offset().top+_1b.outerHeight();
}
_1c.panel("move",{left:_1b.offset().left,top:top});
setTimeout(arguments.callee,200);
}
})();
};
function _1d(_1e){
var _1f=$.data(_1e,"combo").options;
var _20=$.data(_1e,"combo").panel;
_20.panel("close");
_1f.onHidePanel.call(_1e);
};
function _21(_22,_23){
var _24=$.data(_22,"combo").options;
var _25=$.data(_22,"combo").combo.find("input.combo-text");
_25.validatebox(_24);
if(_23){
_25.validatebox("validate");
_25.trigger("mouseleave");
}
};
function _26(_27,_28){
var _29=$.data(_27,"combo").options;
var _2a=$.data(_27,"combo").combo;
if(_28){
_29.disabled=true;
$(_27).attr("disabled",true);
_2a.find(".combo-value").attr("disabled",true);
_2a.find(".combo-text").attr("disabled",true);
}else{
_29.disabled=false;
$(_27).removeAttr("disabled");
_2a.find(".combo-value").removeAttr("disabled");
_2a.find(".combo-text").removeAttr("disabled");
}
};
function _2b(_2c){
var _2d=$.data(_2c,"combo").options;
var _2e=$.data(_2c,"combo").combo;
if(_2d.multiple){
_2e.find("input.combo-value").remove();
}else{
_2e.find("input.combo-value").val("");
}
_2e.find("input.combo-text").val("");
};
function _2f(_30){
var _31=$.data(_30,"combo").combo;
return _31.find("input.combo-text").val();
};
function _32(_33,_34){
var _35=$.data(_33,"combo").combo;
_35.find("input.combo-text").val(_34);
_21(_33,true);
};
function _36(_37){
var _38=[];
var _39=$.data(_37,"combo").combo;
_39.find("input.combo-value").each(function(){
_38.push($(this).val());
});
return _38;
};
function _3a(_3b,_3c){
var _3d=$.data(_3b,"combo").options;
var _3e=_36(_3b);
var _3f=$.data(_3b,"combo").combo;
_3f.find("input.combo-value").remove();
var _40=$(_3b).attr("comboName");
for(var i=0;i<_3c.length;i++){
var _41=$("<input type=\"hidden\" class=\"combo-value\">").appendTo(_3f);
if(_40){
_41.attr("name",_40);
}
_41.val(_3c[i]);
}
var tmp=[];
for(var i=0;i<_3e.length;i++){
tmp[i]=_3e[i];
}
var aa=[];
for(var i=0;i<_3c.length;i++){
for(var j=0;j<tmp.length;j++){
if(_3c[i]==tmp[j]){
aa.push(_3c[i]);
tmp.splice(j,1);
break;
}
}
}
if(aa.length!=_3c.length||_3c.length!=_3e.length){
if(_3d.multiple){
_3d.onChange.call(_3b,_3c,_3e);
}else{
_3d.onChange.call(_3b,_3c[0],_3e[0]);
}
}
};
function _42(_43){
var _44=_36(_43);
return _44[0];
};
function _45(_46,_47){
_3a(_46,[_47]);
};
function _48(_49){
var _4a=$.data(_49,"combo").options;
if(_4a.multiple){
if(_4a.value){
if(typeof _4a.value=="object"){
_3a(_49,_4a.value);
}else{
_45(_49,_4a.value);
}
}else{
_3a(_49,[]);
}
}else{
_45(_49,_4a.value);
}
};
$.fn.combo=function(_4b,_4c){
if(typeof _4b=="string"){
return $.fn.combo.methods[_4b](this,_4c);
}
_4b=_4b||{};
return this.each(function(){
var _4d=$.data(this,"combo");
if(_4d){
$.extend(_4d.options,_4b);
}else{
var r=_8(this);
_4d=$.data(this,"combo",{options:$.extend({},$.fn.combo.defaults,$.fn.combo.parseOptions(this),_4b),combo:r.combo,panel:r.panel});
$(this).removeAttr("disabled");
}
$("input.combo-text",_4d.combo).attr("readonly",!_4d.options.editable);
_26(this,_4d.options.disabled);
_1(this);
_11(this);
_21(this);
_48(this);
});
};
$.fn.combo.methods={options:function(jq){
return $.data(jq[0],"combo").options;
},panel:function(jq){
return $.data(jq[0],"combo").panel;
},textbox:function(jq){
return $.data(jq[0],"combo").combo.find("input.combo-text");
},destroy:function(jq){
return jq.each(function(){
_e(this);
});
},resize:function(jq,_4e){
return jq.each(function(){
_1(this,_4e);
});
},showPanel:function(jq){
return jq.each(function(){
_18(this);
});
},hidePanel:function(jq){
return jq.each(function(){
_1d(this);
});
},disable:function(jq){
return jq.each(function(){
_26(this,true);
_11(this);
});
},enable:function(jq){
return jq.each(function(){
_26(this,false);
_11(this);
});
},validate:function(jq){
return jq.each(function(){
_21(this,true);
});
},isValid:function(jq){
var _4f=$.data(jq[0],"combo").combo.find("input.combo-text");
return _4f.validatebox("isValid");
},clear:function(jq){
return jq.each(function(){
_2b(this);
});
},getText:function(jq){
return _2f(jq[0]);
},setText:function(jq,_50){
return jq.each(function(){
_32(this,_50);
});
},getValues:function(jq){
return _36(jq[0]);
},setValues:function(jq,_51){
return jq.each(function(){
_3a(this,_51);
});
},getValue:function(jq){
return _42(jq[0]);
},setValue:function(jq,_52){
return jq.each(function(){
_45(this,_52);
});
}};
$.fn.combo.parseOptions=function(_53){
var t=$(_53);
return $.extend({},$.fn.validatebox.parseOptions(_53),{width:(parseInt(_53.style.width)||undefined),panelWidth:(parseInt(t.attr("panelWidth"))||undefined),panelHeight:(t.attr("panelHeight")=="auto"?"auto":parseInt(t.attr("panelHeight"))||undefined),separator:(t.attr("separator")||undefined),multiple:(t.attr("multiple")?(t.attr("multiple")=="true"||t.attr("multiple")==true):undefined),editable:(t.attr("editable")?t.attr("editable")=="true":undefined),disabled:(t.attr("disabled")?true:undefined),value:(t.val()||undefined)});
};
$.fn.combo.defaults=$.extend({},$.fn.validatebox.defaults,{width:"auto",panelWidth:null,panelHeight:200,multiple:false,separator:",",editable:true,disabled:false,value:"",keyHandler:{up:function(){
},down:function(){
},enter:function(){
},query:function(q){
}},onShowPanel:function(){
},onHidePanel:function(){
},onChange:function(_54,_55){
}});
})(jQuery);

