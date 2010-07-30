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
function _1(_2){
var _3=$.data(_2,"combotree").options;
var _4=$.data(_2,"combotree").tree;
$(_2).combo(_3);
var _5=$(_2).combo("panel");
if(!_4){
_4=$("<ul></ul>").appendTo(_5);
$.data(_2,"combotree").tree=_4;
}
_4.tree($.extend({},_3,{checkbox:_3.multiple,onLoadSuccess:function(_6,_7){
var _8=$(_2).combotree("getValues");
if(_3.multiple){
var _9=_4.tree("getChecked");
for(var i=0;i<_9.length;i++){
var id=_9[i].id;
(function(){
for(var i=0;i<_8.length;i++){
if(id==_8[i]){
return;
}
}
_8.push(id);
})();
}
}
$(_2).combotree("setValues",_8);
_3.onLoadSuccess.call(this,_6,_7);
},onClick:function(_a){
_d(_2);
$(_2).combo("hidePanel");
_3.onClick.call(this,_a);
},onCheck:function(_b,_c){
_d(_2);
_3.onCheck.call(this,_b,_c);
}}));
};
function _d(_e){
var _f=$.data(_e,"combotree").options;
var _10=$.data(_e,"combotree").tree;
var vv=[],ss=[];
if(_f.multiple){
var _11=_10.tree("getChecked");
for(var i=0;i<_11.length;i++){
vv.push(_11[i].id);
ss.push(_11[i].text);
}
}else{
var _12=_10.tree("getSelected");
if(_12){
vv.push(_12.id);
ss.push(_12.text);
}
}
$(_e).combo("setValues",vv).combo("setText",ss.join(_f.separator));
};
function _13(_14,_15){
var _16=$.data(_14,"combotree").options;
var _17=$.data(_14,"combotree").tree;
_17.find("span.tree-checkbox").addClass("tree-checkbox0").removeClass("tree-checkbox1 tree-checkbox2");
var vv=[],ss=[];
for(var i=0;i<_15.length;i++){
var v=_15[i];
var s=v;
var _18=_17.tree("find",v);
if(_18){
s=_18.text;
_17.tree("check",_18.target);
_17.tree("select",_18.target);
}
vv.push(v);
ss.push(s);
}
$(_14).combo("setValues",vv).combo("setText",ss.join(_16.separator));
};
function _19(_1a,_1b){
var _1c=$.data(_1a,"combotree").options;
var v=_1b;
if(typeof _1b=="object"){
v=_1b.id;
}
_13(_1a,[v]);
};
$.fn.combotree=function(_1d,_1e){
if(typeof _1d=="string"){
var _1f=$.fn.combotree.methods[_1d];
if(_1f){
return _1f(this,_1e);
}else{
return this.combo(_1d,_1e);
}
}
_1d=_1d||{};
return this.each(function(){
var _20=$.data(this,"combotree");
if(_20){
$.extend(_20.options,_1d);
}else{
$.data(this,"combotree",{options:$.extend({},$.fn.combotree.defaults,$.fn.combotree.parseOptions(this),_1d)});
}
_1(this);
});
};
$.fn.combotree.methods={options:function(jq){
return $.data(jq[0],"combotree").options;
},tree:function(jq){
return $.data(jq[0],"combotree").tree;
},loadData:function(jq,_21){
return jq.each(function(){
var _22=$.data(this,"combotree").options;
_22.data=_21;
var _23=$.data(this,"combotree").tree;
_23.tree("loadData",_21);
});
},reload:function(jq,url){
return jq.each(function(){
var _24=$.data(this,"combotree").options;
var _25=$.data(this,"combotree").tree;
if(url){
_24.url=url;
}
_25.tree({url:_24.url});
});
},setValues:function(jq,_26){
return jq.each(function(){
_13(this,_26);
});
},setValue:function(jq,_27){
return jq.each(function(){
_19(this,_27);
});
},clear:function(jq){
return jq.each(function(){
var _28=$.data(this,"combotree").tree;
_28.find("div.tree-node-selected").removeClass("tree-node-selected");
$(this).combo("clear");
});
}};
$.fn.combotree.parseOptions=function(_29){
return $.extend({},$.fn.combo.parseOptions(_29),$.fn.tree.parseOptions(_29));
};
$.fn.combotree.defaults=$.extend({},$.fn.combo.defaults,$.fn.tree.defaults,{editable:false});
})(jQuery);

