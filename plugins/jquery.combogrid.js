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
var _3=$.data(_2,"combogrid").options;
var _4=$.data(_2,"combogrid").grid;
$(_2).combo(_3);
var _5=$(_2).combo("panel");
if(!_4){
_4=$("<table></table>").appendTo(_5);
$.data(_2,"combogrid").grid=_4;
}
_4.datagrid($.extend({},_3,{border:false,fit:true,singleSelect:(!_3.multiple),onClickRow:_6,onSelect:function(_7,_8){
_f(_2);
_3.onSelect.call(this,_7,_8);
},onUnselect:function(_9,_a){
_f(_2);
_3.onUnselect.call(this,_9,_a);
},onSelectAll:function(_b){
_f(_2);
_3.onSelectAll.call(this,_b);
},onUnselectAll:function(_c){
_f(_2);
_3.onUnselectAll.call(this,_c);
}}));
function _6(_d,_e){
_f(_2);
if(!_3.multiple){
$(_2).combo("hidePanel");
}
_3.onClickRow.call(this,_d,_e);
};
};
function _f(_10){
var _11=$.data(_10,"combogrid").options;
var _12=$.data(_10,"combogrid").grid;
var _13=_12.datagrid("getSelections");
var vv=[],ss=[];
for(var i=0;i<_13.length;i++){
vv.push(_13[i][_11.idField]);
ss.push(_13[i][_11.textField]);
}
$(_10).combo("setValues",vv).combo("setText",ss.join(_11.separator));
};
function _14(_15,_16){
var _17=$.data(_15,"combogrid").options;
var _18=$.data(_15,"combogrid").grid;
var _19=_18.datagrid("getRows").length;
var _1a;
var _1b=_18.datagrid("getSelections");
if(_1b.length){
_1a=_18.datagrid("getRowIndex",_1b[_1b.length-1][_17.idField]);
_1a+=_16;
if(_1a<0){
_1a=0;
}
if(_1a>=_19){
_1a=_19-1;
}
}else{
if(_16>0){
_1a=0;
}else{
_1a=_19-1;
}
}
_18.datagrid("clearSelections");
_18.datagrid("selectRow",_1a);
};
function _1c(_1d,_1e){
var _1f=$.data(_1d,"combogrid").options;
var _20=$.data(_1d,"combogrid").grid;
var _21=_20.datagrid("getRows");
_20.datagrid("clearSelections");
for(var i=0;i<_1e.length;i++){
var _22=_20.datagrid("getRowIndex",_1e[i]);
_20.datagrid("selectRow",_22);
}
_f(_1d);
};
function _23(_24,q){
var _25=$.data(_24,"combogrid").options;
_25.filter.call(_24,q);
};
$.fn.combogrid=function(_26,_27){
if(typeof _26=="string"){
var _28=$.fn.combogrid.methods[_26];
if(_28){
return _28(this,_27);
}else{
return $.fn.combo.methods[_26](this,_27);
}
}
_26=_26||{};
return this.each(function(){
var _29=$.data(this,"combogrid");
if(_29){
$.extend(_29.options,_26);
}else{
_29=$.data(this,"combogrid",{options:$.extend({},$.fn.combogrid.defaults,$.fn.combogrid.parseOptions(this),_26)});
}
_1(this);
});
};
$.fn.combogrid.methods={options:function(jq){
return $.data(jq[0],"combogrid").options;
},grid:function(jq){
return $.data(jq[0],"combogrid").grid;
},setValues:function(jq,_2a){
return jq.each(function(){
_1c(this,_2a);
});
}};
$.fn.combogrid.parseOptions=function(_2b){
var t=$(_2b);
return $.extend({},$.fn.combo.parseOptions(_2b),$.fn.datagrid.parseOptions(_2b),{idField:(t.attr("idField")||undefined),textField:(t.attr("textField")||undefined)});
};
$.fn.combogrid.defaults=$.extend({},$.fn.combo.defaults,$.fn.datagrid.defaults,{loadMsg:null,idField:null,textField:null,keyHandler:{up:function(){
_14(this,-1);
},down:function(){
_14(this,1);
},enter:function(){
$(this).combo("hidePanel");
},query:function(q){
_23(this,q);
}},filter:function(q){
}});
})(jQuery);

