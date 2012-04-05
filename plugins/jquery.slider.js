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
var _3=$("<div class=\"slider\">"+"<div class=\"slider-inner\">"+"<a href=\"javascript:void(0)\" class=\"slider-handle\"></a>"+"<span class=\"slider-tip\"></span>"+"</div>"+"<div class=\"slider-rule\"></div>"+"<div class=\"slider-rulelabel\"></div>"+"<div style=\"clear:both\"></div>"+"<input type=\"hidden\" class=\"slider-value\">"+"</div>").insertAfter(_2);
var _4=$(_2).hide().attr("name");
if(_4){
_3.find("input.slider-value").attr("name",_4);
$(_2).removeAttr("name").attr("sliderName",_4);
}
return _3;
};
function _5(_6){
var _7=$.data(_6,"slider").options;
var _8=$.data(_6,"slider").slider;
if(_7.mode=="h"){
_8.css("height","");
_8.children("div").css("height","");
if(!isNaN(_7.width)){
_8.width(_7.width);
}
}else{
_8.css("width","");
_8.children("div").css("width","");
if(!isNaN(_7.height)){
_8.height(_7.height);
_8.find("div.slider-rule").height(_7.height);
_8.find("div.slider-rulelabel").height(_7.height);
var _9=_8.find("div.slider-inner");
if($.boxModel){
_9.height(_7.height-(_9.outerHeight()-_9.height()));
}else{
_9.height(_7.height);
}
}
}
};
function _a(_b){
var _c=$.data(_b,"slider").options;
var _d=$.data(_b,"slider").slider;
if(_c.mode=="h"){
_e(_c.rule);
}else{
_e(_c.rule.slice(0).reverse());
}
function _e(aa){
var _f=_d.find("div.slider-rule");
var _10=_d.find("div.slider-rulelabel");
_f.empty();
_10.empty();
for(var i=0;i<aa.length;i++){
var _11=i*100/(aa.length-1)+"%";
var _12=$("<span></span>").appendTo(_f);
_12.css((_c.mode=="h"?"left":"top"),_11);
if(aa[i]!="|"){
_12=$("<span></span>").appendTo(_10);
_12.html(aa[i]);
if(_c.mode=="h"){
_12.css({left:_11,marginLeft:-Math.round(_12.outerWidth()/2)});
}else{
_12.css({top:_11,marginTop:-Math.round(_12.outerHeight()/2)});
}
}
}
};
};
function _13(_14){
var _15=$.data(_14,"slider").options;
var _16=$.data(_14,"slider").slider;
_16.removeClass("slider-h slider-v slider-disabled");
_16.addClass(_15.mode=="h"?"slider-h":"slider-v");
_16.addClass(_15.disabled?"slider-disabled":"");
_16.find("a.slider-handle").draggable({axis:_15.mode,cursor:"pointer",disabled:_15.disabled,onDrag:function(e){
var _17=e.data.left;
var _18=_16.width();
if(_15.mode!="h"){
_17=e.data.top;
_18=_16.height();
}
if(_17<0||_17>_18){
return false;
}else{
var _19=_2c(_14,_17);
_1a(_19);
return false;
}
},onStartDrag:function(){
_15.onSlideStart.call(_14,_15.value);
},onStopDrag:function(e){
var _1b=_2c(_14,(_15.mode=="h"?e.data.left:e.data.top));
_1a(_1b);
_15.onSlideEnd.call(_14,_15.value);
}});
function _1a(_1c){
var s=Math.abs(_1c%_15.step);
if(s<_15.step/2){
_1c-=s;
}else{
_1c=_1c-s+_15.step;
}
_1d(_14,_1c);
};
};
function _1d(_1e,_1f){
var _20=$.data(_1e,"slider").options;
var _21=$.data(_1e,"slider").slider;
var _22=_20.value;
if(_1f<_20.min){
_1f=_20.min;
}
if(_1f>_20.max){
_1f=_20.max;
}
_20.value=_1f;
$(_1e).val(_1f);
_21.find("input.slider-value").val(_1f);
var pos=_23(_1e,_1f);
var tip=_21.find(".slider-tip");
if(_20.showTip){
tip.show();
tip.html(_20.tipFormatter.call(_1e,_20.value));
}else{
tip.hide();
}
if(_20.mode=="h"){
var _24="left:"+pos+"px;";
_21.find(".slider-handle").attr("style",_24);
tip.attr("style",_24+"margin-left:"+(-Math.round(tip.outerWidth()/2))+"px");
}else{
var _24="top:"+pos+"px;";
_21.find(".slider-handle").attr("style",_24);
tip.attr("style",_24+"margin-left:"+(-Math.round(tip.outerWidth()))+"px");
}
if(_22!=_1f){
_20.onChange.call(_1e,_1f,_22);
}
};
function _25(_26){
var _27=$.data(_26,"slider").options;
var fn=_27.onChange;
_27.onChange=function(){
};
_1d(_26,_27.value);
_27.onChange=fn;
};
function _23(_28,_29){
var _2a=$.data(_28,"slider").options;
var _2b=$.data(_28,"slider").slider;
if(_2a.mode=="h"){
var pos=(_29-_2a.min)/(_2a.max-_2a.min)*_2b.width();
}else{
var pos=_2b.height()-(_29-_2a.min)/(_2a.max-_2a.min)*_2b.height();
}
return pos.toFixed(0);
};
function _2c(_2d,pos){
var _2e=$.data(_2d,"slider").options;
var _2f=$.data(_2d,"slider").slider;
if(_2e.mode=="h"){
var _30=_2e.min+(_2e.max-_2e.min)*(pos/_2f.width());
}else{
var _30=_2e.min+(_2e.max-_2e.min)*((_2f.height()-pos)/_2f.height());
}
return _30.toFixed(0);
};
$.fn.slider=function(_31,_32){
if(typeof _31=="string"){
return $.fn.slider.methods[_31](this,_32);
}
_31=_31||{};
return this.each(function(){
var _33=$.data(this,"slider");
if(_33){
$.extend(_33.options,_31);
}else{
_33=$.data(this,"slider",{options:$.extend({},$.fn.slider.defaults,$.fn.slider.parseOptions(this),_31),slider:_1(this)});
$(this).removeAttr("disabled");
}
_13(this);
_a(this);
_5(this);
_25(this);
});
};
$.fn.slider.methods={options:function(jq){
return $.data(jq[0],"slider").options;
},destroy:function(jq){
return jq.each(function(){
$.data(this,"slider").slider.remove();
$(this).remove();
});
},getValue:function(jq){
return jq.slider("options").value;
},setValue:function(jq,_34){
return jq.each(function(){
_1d(this,_34);
});
},enable:function(jq){
return jq.each(function(){
$.data(this,"slider").options.disabled=false;
_13(this);
});
},disable:function(jq){
return jq.each(function(){
$.data(this,"slider").options.disabled=true;
_13(this);
});
}};
$.fn.slider.parseOptions=function(_35){
var t=$(_35);
return {width:(parseInt(_35.style.width)||undefined),height:(parseInt(_35.style.height)||undefined),value:(t.val()||undefined),mode:(t.attr("mode")?t.attr("mode"):undefined),showTip:(t.attr("showTip")?t.attr("showTip")=="true":undefined),disabled:(t.attr("disabled")?true:undefined),min:(t.attr("min")=="0"?0:parseInt(t.attr("min"))||undefined),max:(t.attr("max")=="0"?0:parseInt(t.attr("max"))||undefined),step:(t.attr("step")=="0"?0:parseInt(t.attr("step"))||undefined),rule:(t.attr("rule")?eval(t.attr("rule")):undefined)};
};
$.fn.slider.defaults={width:"auto",height:"auto",mode:"h",showTip:false,disabled:false,value:0,min:0,max:100,step:1,rule:[],tipFormatter:function(_36){
return _36;
},onChange:function(_37,_38){
},onSlideStart:function(_39){
},onSlideEnd:function(_3a){
}};
})(jQuery);

