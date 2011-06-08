/**
 * jQuery EasyUI 1.2.4
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2011 stworthy [ stworthy@gmail.com ] 
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
_5.appendTo("body");
if(isNaN(_4.width)){
_4.width=_5.find("input.combo-text").outerWidth();
}
var _7=0;
if(_4.hasDownArrow){
_7=_5.find(".combo-arrow").outerWidth();
}
var _3=_4.width-_7;
if($.boxModel==true){
_3-=_5.outerWidth()-_5.width();
}
_5.find("input.combo-text").width(_3);
_6.panel("resize",{width:(_4.panelWidth?_4.panelWidth:_5.outerWidth()),height:_4.panelHeight});
_5.insertAfter(_2);
};
function _8(_9){
var _a=$.data(_9,"combo").options;
var _b=$.data(_9,"combo").combo;
if(_a.hasDownArrow){
_b.find(".combo-arrow").show();
}else{
_b.find(".combo-arrow").hide();
}
};
function _c(_d){
$(_d).addClass("combo-f").hide();
var _e=$("<span class=\"combo\"></span>").insertAfter(_d);
var _f=$("<input type=\"text\" class=\"combo-text\">").appendTo(_e);
$("<span><span class=\"combo-arrow\"></span></span>").appendTo(_e);
$("<input type=\"hidden\" class=\"combo-value\">").appendTo(_e);
var _10=$("<div class=\"combo-panel\"></div>").appendTo("body");
_10.panel({doSize:false,closed:true,style:{position:"absolute",zIndex:10},onOpen:function(){
$(this).panel("resize");
}});
var _11=$(_d).attr("name");
if(_11){
_e.find("input.combo-value").attr("name",_11);
$(_d).removeAttr("name").attr("comboName",_11);
}
_f.attr("autocomplete","off");
return {combo:_e,panel:_10};
};
function _12(_13){
var _14=$.data(_13,"combo").combo.find("input.combo-text");
_14.validatebox("destroy");
$.data(_13,"combo").panel.panel("destroy");
$.data(_13,"combo").combo.remove();
$(_13).remove();
};
function _15(_16){
var _17=$.data(_16,"combo").options;
var _18=$.data(_16,"combo").combo;
var _19=$.data(_16,"combo").panel;
var _1a=_18.find(".combo-text");
var _1b=_18.find(".combo-arrow");
$(document).unbind(".combo").bind("mousedown.combo",function(e){
$("div.combo-panel").panel("close");
});
_18.unbind(".combo");
_19.unbind(".combo");
_1a.unbind(".combo");
_1b.unbind(".combo");
if(!_17.disabled){
_19.bind("mousedown.combo",function(e){
return false;
});
_1a.bind("mousedown.combo",function(e){
e.stopPropagation();
}).bind("keydown.combo",function(e){
switch(e.keyCode){
case 38:
_17.keyHandler.up.call(_16);
break;
case 40:
_17.keyHandler.down.call(_16);
break;
case 13:
e.preventDefault();
_17.keyHandler.enter.call(_16);
return false;
case 9:
case 27:
_24(_16);
break;
default:
if(_17.editable){
setTimeout(function(){
var q=_1a.val();
if($.data(_16,"combo").previousValue!=q){
$.data(_16,"combo").previousValue=q;
_1c(_16);
_17.keyHandler.query.call(_16,_1a.val());
_28(_16,true);
}
},10);
}
}
});
_1b.bind("click.combo",function(){
if(_19.is(":visible")){
_24(_16);
}else{
$("div.combo-panel").panel("close");
_1c(_16);
}
_1a.focus();
}).bind("mouseenter.combo",function(){
$(this).addClass("combo-arrow-hover");
}).bind("mouseleave.combo",function(){
$(this).removeClass("combo-arrow-hover");
}).bind("mousedown.combo",function(){
return false;
});
}
};
function _1c(_1d){
var _1e=$.data(_1d,"combo").options;
var _1f=$.data(_1d,"combo").combo;
var _20=$.data(_1d,"combo").panel;
if($.fn.window){
_20.panel("panel").css("z-index",$.fn.window.defaults.zIndex++);
}
_20.panel("move",{left:_1f.offset().left,top:_21()});
_20.panel("open");
_1e.onShowPanel.call(_1d);
(function(){
if(_20.is(":visible")){
_20.panel("move",{left:_22(),top:_21()});
setTimeout(arguments.callee,200);
}
})();
function _22(){
var _23=_1f.offset().left;
if(_23+_20.outerWidth()>$(window).width()+$(document).scrollLeft()){
_23=$(window).width()+$(document).scrollLeft()-_20.outerWidth();
}
if(_23<0){
_23=0;
}
return _23;
};
function _21(){
var top=_1f.offset().top+_1f.outerHeight();
if(top+_20.outerHeight()>$(window).height()+$(document).scrollTop()){
top=_1f.offset().top-_20.outerHeight();
}
if(top<$(document).scrollTop()){
top=_1f.offset().top+_1f.outerHeight();
}
return top;
};
};
function _24(_25){
var _26=$.data(_25,"combo").options;
var _27=$.data(_25,"combo").panel;
_27.panel("close");
_26.onHidePanel.call(_25);
};
function _28(_29,_2a){
var _2b=$.data(_29,"combo").options;
var _2c=$.data(_29,"combo").combo.find("input.combo-text");
_2c.validatebox(_2b);
if(_2a){
_2c.validatebox("validate");
_2c.trigger("mouseleave");
}
};
function _2d(_2e,_2f){
var _30=$.data(_2e,"combo").options;
var _31=$.data(_2e,"combo").combo;
if(_2f){
_30.disabled=true;
$(_2e).attr("disabled",true);
_31.find(".combo-value").attr("disabled",true);
_31.find(".combo-text").attr("disabled",true);
}else{
_30.disabled=false;
$(_2e).removeAttr("disabled");
_31.find(".combo-value").removeAttr("disabled");
_31.find(".combo-text").removeAttr("disabled");
}
};
function _32(_33){
var _34=$.data(_33,"combo").options;
var _35=$.data(_33,"combo").combo;
if(_34.multiple){
_35.find("input.combo-value").remove();
}else{
_35.find("input.combo-value").val("");
}
_35.find("input.combo-text").val("");
};
function _36(_37){
var _38=$.data(_37,"combo").combo;
return _38.find("input.combo-text").val();
};
function _39(_3a,_3b){
var _3c=$.data(_3a,"combo").combo;
_3c.find("input.combo-text").val(_3b);
_28(_3a,true);
$.data(_3a,"combo").previousValue=_3b;
};
function _3d(_3e){
var _3f=[];
var _40=$.data(_3e,"combo").combo;
_40.find("input.combo-value").each(function(){
_3f.push($(this).val());
});
return _3f;
};
function _41(_42,_43){
var _44=$.data(_42,"combo").options;
var _45=_3d(_42);
var _46=$.data(_42,"combo").combo;
_46.find("input.combo-value").remove();
var _47=$(_42).attr("comboName");
for(var i=0;i<_43.length;i++){
var _48=$("<input type=\"hidden\" class=\"combo-value\">").appendTo(_46);
if(_47){
_48.attr("name",_47);
}
_48.val(_43[i]);
}
var tmp=[];
for(var i=0;i<_45.length;i++){
tmp[i]=_45[i];
}
var aa=[];
for(var i=0;i<_43.length;i++){
for(var j=0;j<tmp.length;j++){
if(_43[i]==tmp[j]){
aa.push(_43[i]);
tmp.splice(j,1);
break;
}
}
}
if(aa.length!=_43.length||_43.length!=_45.length){
if(_44.multiple){
_44.onChange.call(_42,_43,_45);
}else{
_44.onChange.call(_42,_43[0],_45[0]);
}
}
};
function _49(_4a){
var _4b=_3d(_4a);
return _4b[0];
};
function _4c(_4d,_4e){
_41(_4d,[_4e]);
};
function _4f(_50){
var _51=$.data(_50,"combo").options;
var fn=_51.onChange;
_51.onChange=function(){
};
if(_51.multiple){
if(_51.value){
if(typeof _51.value=="object"){
_41(_50,_51.value);
}else{
_4c(_50,_51.value);
}
}else{
_41(_50,[]);
}
}else{
_4c(_50,_51.value);
}
_51.onChange=fn;
};
$.fn.combo=function(_52,_53){
if(typeof _52=="string"){
return $.fn.combo.methods[_52](this,_53);
}
_52=_52||{};
return this.each(function(){
var _54=$.data(this,"combo");
if(_54){
$.extend(_54.options,_52);
}else{
var r=_c(this);
_54=$.data(this,"combo",{options:$.extend({},$.fn.combo.defaults,$.fn.combo.parseOptions(this),_52),combo:r.combo,panel:r.panel,previousValue:null});
$(this).removeAttr("disabled");
}
$("input.combo-text",_54.combo).attr("readonly",!_54.options.editable);
_8(this);
_2d(this,_54.options.disabled);
_1(this);
_15(this);
_28(this);
_4f(this);
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
_12(this);
});
},resize:function(jq,_55){
return jq.each(function(){
_1(this,_55);
});
},showPanel:function(jq){
return jq.each(function(){
_1c(this);
});
},hidePanel:function(jq){
return jq.each(function(){
_24(this);
});
},disable:function(jq){
return jq.each(function(){
_2d(this,true);
_15(this);
});
},enable:function(jq){
return jq.each(function(){
_2d(this,false);
_15(this);
});
},validate:function(jq){
return jq.each(function(){
_28(this,true);
});
},isValid:function(jq){
var _56=$.data(jq[0],"combo").combo.find("input.combo-text");
return _56.validatebox("isValid");
},clear:function(jq){
return jq.each(function(){
_32(this);
});
},getText:function(jq){
return _36(jq[0]);
},setText:function(jq,_57){
return jq.each(function(){
_39(this,_57);
});
},getValues:function(jq){
return _3d(jq[0]);
},setValues:function(jq,_58){
return jq.each(function(){
_41(this,_58);
});
},getValue:function(jq){
return _49(jq[0]);
},setValue:function(jq,_59){
return jq.each(function(){
_4c(this,_59);
});
}};
$.fn.combo.parseOptions=function(_5a){
var t=$(_5a);
return $.extend({},$.fn.validatebox.parseOptions(_5a),{width:(parseInt(_5a.style.width)||undefined),panelWidth:(parseInt(t.attr("panelWidth"))||undefined),panelHeight:(t.attr("panelHeight")=="auto"?"auto":parseInt(t.attr("panelHeight"))||undefined),separator:(t.attr("separator")||undefined),multiple:(t.attr("multiple")?(t.attr("multiple")=="true"||t.attr("multiple")==true):undefined),editable:(t.attr("editable")?t.attr("editable")=="true":undefined),disabled:(t.attr("disabled")?true:undefined),hasDownArrow:(t.attr("hasDownArrow")?t.attr("hasDownArrow")=="true":undefined),value:(t.val()||undefined)});
};
$.fn.combo.defaults=$.extend({},$.fn.validatebox.defaults,{width:"auto",panelWidth:null,panelHeight:200,multiple:false,separator:",",editable:true,disabled:false,hasDownArrow:true,value:"",keyHandler:{up:function(){
},down:function(){
},enter:function(){
},query:function(q){
}},onShowPanel:function(){
},onHidePanel:function(){
},onChange:function(_5b,_5c){
}});
})(jQuery);

