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
function _30(_31,_32,_33){
var _34=$.data(_31,"combobox").options;
var _35=$(_31).combo("panel");
$.data(_31,"combobox").data=_32;
var _36=$(_31).combobox("getValues");
_35.empty();
for(var i=0;i<_32.length;i++){
var v=_32[i][_34.valueField];
var s=_32[i][_34.textField];
var _37=$("<div class=\"combobox-item\"></div>").appendTo(_35);
_37.attr("value",v);
if(_34.formatter){
_37.html(_34.formatter.call(_31,_32[i]));
}else{
_37.html(s);
}
if(_32[i]["selected"]){
(function(){
for(var i=0;i<_36.length;i++){
if(v==_36[i]){
return;
}
}
_36.push(v);
})();
}
}
if(_34.multiple){
_d(_31,_36,_33);
}else{
if(_36.length){
_d(_31,[_36[_36.length-1]],_33);
}else{
_d(_31,[],_33);
}
}
_34.onLoadSuccess.call(_31,_32);
$(".combobox-item",_35).hover(function(){
$(this).addClass("combobox-item-hover");
},function(){
$(this).removeClass("combobox-item-hover");
}).click(function(){
var _38=$(this);
if(_34.multiple){
if(_38.hasClass("combobox-item-selected")){
_1b(_31,_38.attr("value"));
}else{
_15(_31,_38.attr("value"));
}
}else{
_15(_31,_38.attr("value"));
$(_31).combo("hidePanel");
}
});
};
function _39(_3a,url,_3b,_3c){
var _3d=$.data(_3a,"combobox").options;
if(url){
_3d.url=url;
}
if(!_3d.url){
return;
}
_3b=_3b||{};
$.ajax({url:_3d.url,dataType:"json",data:_3b,success:function(_3e){
_30(_3a,_3e,_3c);
},error:function(){
_3d.onLoadError.apply(this,arguments);
}});
};
function _3f(_40,q){
var _41=$.data(_40,"combobox").options;
if(_41.multiple&&!q){
_d(_40,[],true);
}else{
_d(_40,[q],true);
}
if(_41.mode=="remote"){
_39(_40,null,{q:q},true);
}else{
var _42=$(_40).combo("panel");
_42.find("div.combobox-item").hide();
var _43=$.data(_40,"combobox").data;
for(var i=0;i<_43.length;i++){
if(_41.filter.call(_40,q,_43[i])){
var v=_43[i][_41.valueField];
var s=_43[i][_41.textField];
var _44=_42.find("div.combobox-item[value="+v+"]");
_44.show();
if(s==q){
_d(_40,[v],true);
_44.addClass("combobox-item-selected");
}
}
}
}
};
function _45(_46){
var _47=$.data(_46,"combobox").options;
$(_46).combo($.extend({},_47,{onShowPanel:function(){
$(_46).combo("panel").find("div.combobox-item").show();
_1(_46,$(_46).combobox("getValue"));
_47.onShowPanel.call(_46);
}}));
};
$.fn.combobox=function(_48,_49){
if(typeof _48=="string"){
var _4a=$.fn.combobox.methods[_48];
if(_4a){
return _4a(this,_49);
}else{
return this.combo(_48,_49);
}
}
_48=_48||{};
return this.each(function(){
var _4b=$.data(this,"combobox");
if(_4b){
$.extend(_4b.options,_48);
_45(this);
}else{
_4b=$.data(this,"combobox",{options:$.extend({},$.fn.combobox.defaults,$.fn.combobox.parseOptions(this),_48)});
_45(this);
_30(this,_2b(this));
}
if(_4b.options.data){
_30(this,_4b.options.data);
}
_39(this);
});
};
$.fn.combobox.methods={options:function(jq){
return $.data(jq[0],"combobox").options;
},getData:function(jq){
return $.data(jq[0],"combobox").data;
},setValues:function(jq,_4c){
return jq.each(function(){
_d(this,_4c);
});
},setValue:function(jq,_4d){
return jq.each(function(){
_27(this,_4d);
});
},clear:function(jq){
return jq.each(function(){
$(this).combo("clear");
var _4e=$(this).combo("panel");
_4e.find("div.combobox-item-selected").removeClass("combobox-item-selected");
});
},loadData:function(jq,_4f){
return jq.each(function(){
_30(this,_4f);
});
},reload:function(jq,url){
return jq.each(function(){
_39(this,url);
});
},select:function(jq,_50){
return jq.each(function(){
_15(this,_50);
});
},unselect:function(jq,_51){
return jq.each(function(){
_1b(this,_51);
});
}};
$.fn.combobox.parseOptions=function(_52){
var t=$(_52);
return $.extend({},$.fn.combo.parseOptions(_52),{valueField:t.attr("valueField"),textField:t.attr("textField"),mode:t.attr("mode"),url:t.attr("url")});
};
$.fn.combobox.defaults=$.extend({},$.fn.combo.defaults,{valueField:"value",textField:"text",mode:"local",url:null,data:null,keyHandler:{up:function(){
_6(this);
},down:function(){
_e(this);
},enter:function(){
var _53=$(this).combobox("getValues");
$(this).combobox("setValues",_53);
$(this).combobox("hidePanel");
},query:function(q){
_3f(this,q);
}},filter:function(q,row){
var _54=$(this).combobox("options");
return row[_54.textField].indexOf(q)==0;
},formatter:function(row){
var _55=$(this).combobox("options");
return row[_55.textField];
},onLoadSuccess:function(){
},onLoadError:function(){
},onSelect:function(_56){
},onUnselect:function(_57){
}});
})(jQuery);

