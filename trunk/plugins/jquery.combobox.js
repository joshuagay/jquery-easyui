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
var _4=$(_2).combo("panel");
var _5=_4.find("div.combobox-item[value="+_3+"]");
if(_5.length){
if(_5.position().top<=0){
var h=_4.scrollTop()+_5.position().top;
_4.scrollTop(h);
}else{
if(_5.position().top+_5.outerHeight()>_4.height()){
var h=_4.scrollTop()+_5.position().top+_5.outerHeight()-_4.height();
_4.scrollTop(h);
}
}
}
};
function _6(_7){
var _8=$(_7).combo("panel");
var _9=$(_7).combo("getValues");
var _a=_8.find("div.combobox-item[value="+_9.pop()+"]");
if(_a.length){
var _b=_a.prev(":visible");
if(_b.length){
_a=_b;
}
}else{
_a=_8.find("div.combobox-item:visible:last");
}
var _c=_a.attr("value");
_d(_7,[_c]);
_1(_7,_c);
};
function _e(_f){
var _10=$(_f).combo("panel");
var _11=$(_f).combo("getValues");
var _12=_10.find("div.combobox-item[value="+_11.pop()+"]");
if(_12.length){
var _13=_12.next(":visible");
if(_13.length){
_12=_13;
}
}else{
_12=_10.find("div.combobox-item:visible:first");
}
var _14=_12.attr("value");
_d(_f,[_14]);
_1(_f,_14);
};
function _15(_16,_17){
var _18=$.data(_16,"combobox").options;
var _19=$.data(_16,"combobox").data;
if(_18.multiple){
var _1a=$(_16).combo("getValues");
for(var i=0;i<_1a.length;i++){
if(_1a[i]==_17){
return;
}
}
_1a.push(_17);
_d(_16,_1a);
}else{
_d(_16,[_17]);
}
for(var i=0;i<_19.length;i++){
if(_19[i][_18.valueField]==_17){
_18.onSelect.call(_16,_19[i]);
return;
}
}
};
function _1b(_1c,_1d){
var _1e=$.data(_1c,"combobox").options;
var _1f=$.data(_1c,"combobox").data;
var _20=$(_1c).combo("getValues");
for(var i=0;i<_20.length;i++){
if(_20[i]==_1d){
_20.splice(i,1);
_d(_1c,_20);
break;
}
}
for(var i=0;i<_1f.length;i++){
if(_1f[i][_1e.valueField]==_1d){
_1e.onUnselect.call(_1c,_1f[i]);
return;
}
}
};
function _d(_21,_22,_23){
var _24=$.data(_21,"combobox").options;
var _25=$.data(_21,"combobox").data;
var _26=$(_21).combo("panel");
_26.find("div.combobox-item-selected").removeClass("combobox-item-selected");
var vv=[],ss=[];
for(var i=0;i<_22.length;i++){
var v=_22[i];
var s=v;
for(var j=0;j<_25.length;j++){
if(_25[j][_24.valueField]==v){
s=_25[j][_24.textField];
break;
}
}
vv.push(v);
ss.push(s);
_26.find("div.combobox-item[value="+v+"]").addClass("combobox-item-selected");
}
$(_21).combo("setValues",vv);
if(!_23){
$(_21).combo("setText",ss.join(_24.separator));
}
};
function _27(_28,_29){
var _2a=$.data(_28,"combobox").options;
var v=_29;
if(typeof _29=="object"){
v=_29[_2a.valueField];
}
_d(_28,[v]);
};
function _2b(_2c){
var _2d=$.data(_2c,"combobox").options;
var _2e=[];
$(">option",_2c).each(function(){
var _2f={};
_2f[_2d.valueField]=$(this).attr("value")||$(this).html();
_2f[_2d.textField]=$(this).html();
_2f["selected"]=$(this).attr("selected");
_2e.push(_2f);
});
return _2e;
};
function _30(_31,_32){
var _33=$.data(_31,"combobox").options;
var _34=$(_31).combo("panel");
$.data(_31,"combobox").data=_32;
var _35=$(_31).combobox("getValues");
_34.empty();
for(var i=0;i<_32.length;i++){
var v=_32[i][_33.valueField];
var s=_32[i][_33.textField];
var _36=$("<div class=\"combobox-item\"></div>").appendTo(_34);
_36.attr("value",v).html(s);
if(_32[i]["selected"]){
(function(){
for(var i=0;i<_35.length;i++){
if(v==_35[i]){
return;
}
}
_35.push(v);
})();
}
}
if(_33.multiple){
_d(_31,_35);
}else{
if(_35.length){
_d(_31,[_35[_35.length-1]]);
}else{
_d(_31,[]);
}
}
_33.onLoadSuccess.call(_31,_32);
$(".combobox-item",_34).hover(function(){
$(this).addClass("combobox-item-hover");
},function(){
$(this).removeClass("combobox-item-hover");
}).click(function(){
var _37=$(this);
if(_33.multiple){
if(_37.hasClass("combobox-item-selected")){
_1b(_31,_37.attr("value"));
}else{
_15(_31,_37.attr("value"));
}
}else{
_15(_31,_37.attr("value"));
$(_31).combo("hidePanel");
}
});
};
function _38(_39,url){
var _3a=$.data(_39,"combobox").options;
if(url){
_3a.url=url;
}
if(!_3a.url){
return;
}
$.ajax({url:_3a.url,dataType:"json",success:function(_3b){
_30(_39,_3b);
},error:function(){
_3a.onLoadError.apply(this,arguments);
}});
};
function _3c(_3d,q){
var _3e=$.data(_3d,"combobox").options;
$(_3d).combo("showPanel");
if(_3e.multiple&&!q){
_d(_3d,[],true);
}else{
_d(_3d,[q],true);
}
var _3f=_3e.filter.call(_3d,q);
var _40=$(_3d).combo("panel");
_40.find("div.combobox-item").hide();
for(var i=0;i<_3f.length;i++){
var v=_3f[i][_3e.valueField];
var s=_3f[i][_3e.textField];
var _41=_40.find("div.combobox-item[value="+v+"]");
_41.show();
if(s==q){
_d(_3d,[v],true);
_41.addClass("combobox-item-selected");
}
}
};
function _42(_43,q){
var _44=$.data(_43,"combobox").options;
var _45=$.data(_43,"combobox").data;
var _46=[];
for(var i=0;i<_45.length;i++){
if(_45[i][_44.textField].indexOf(q)==0){
_46.push(_45[i]);
}
}
return _46;
};
function _47(_48){
var _49=$.data(_48,"combobox").options;
$(_48).combo($.extend({},_49,{onShowPanel:function(){
$(_48).combo("panel").find("div.combobox-item").show();
_1(_48,$(_48).combobox("getValue"));
_49.onShowPanel.call(_48);
}}));
};
$.fn.combobox=function(_4a,_4b){
if(typeof _4a=="string"){
var _4c=$.fn.combobox.methods[_4a];
if(_4c){
return _4c(this,_4b);
}else{
return this.combo(_4a,_4b);
}
}
_4a=_4a||{};
return this.each(function(){
var _4d=$.data(this,"combobox");
if(_4d){
$.extend(_4d.options,_4a);
_47(this);
}else{
_4d=$.data(this,"combobox",{options:$.extend({},$.fn.combobox.defaults,$.fn.combobox.parseOptions(this),_4a)});
_47(this);
_30(this,_2b(this));
}
if(_4d.options.data){
_30(this,_4d.options.data);
}
_38(this);
});
};
$.fn.combobox.methods={options:function(jq){
return $.data(jq[0],"combobox").options;
},getData:function(jq){
return $.data(jq[0],"combobox").data;
},setValues:function(jq,_4e){
return jq.each(function(){
_d(this,_4e);
});
},setValue:function(jq,_4f){
return jq.each(function(){
_27(this,_4f);
});
},clear:function(jq){
return jq.each(function(){
$(this).combo("clear");
var _50=$(this).combo("panel");
_50.find("div.combobox-item-selected").removeClass("combobox-item-selected");
});
},loadData:function(jq,_51){
return jq.each(function(){
_30(this,_51);
});
},reload:function(jq,url){
return jq.each(function(){
_38(this,url);
});
},select:function(jq,_52){
return jq.each(function(){
_15(this,_52);
});
},unselect:function(jq,_53){
return jq.each(function(){
_1b(this,_53);
});
}};
$.fn.combobox.parseOptions=function(_54){
var t=$(_54);
return $.extend({},$.fn.combo.parseOptions(_54),{valueField:t.attr("valueField"),textField:t.attr("textField"),url:t.attr("url")});
};
$.fn.combobox.defaults=$.extend({},$.fn.combo.defaults,{valueField:"value",textField:"text",url:null,data:null,keyHandler:{up:function(){
_6(this);
},down:function(){
_e(this);
},enter:function(){
$(this).combo("hidePanel");
},query:function(q){
_3c(this,q);
}},filter:function(q){
return _42(this,q);
},onLoadSuccess:function(){
},onLoadError:function(){
},onSelect:function(_55){
},onUnselect:function(_56){
}});
})(jQuery);

