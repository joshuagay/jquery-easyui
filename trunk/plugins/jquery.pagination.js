/**
 * jQuery EasyUI 1.3
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
function _1(_2){
var _3=$.data(_2,"pagination");
var _4=_3.options;
var bb=_3.bb={};
var _5={first:{iconCls:"pagination-first",handler:function(){
if(_4.pageNumber>1){
_e(_2,1);
}
}},prev:{iconCls:"pagination-prev",handler:function(){
if(_4.pageNumber>1){
_e(_2,_4.pageNumber-1);
}
}},next:{iconCls:"pagination-next",handler:function(){
var _6=Math.ceil(_4.total/_4.pageSize);
if(_4.pageNumber<_6){
_e(_2,_4.pageNumber+1);
}
}},last:{iconCls:"pagination-last",handler:function(){
var _7=Math.ceil(_4.total/_4.pageSize);
if(_4.pageNumber<_7){
_e(_2,_7);
}
}},refresh:{iconCls:"pagination-load",handler:function(){
if(_4.onBeforeRefresh.call(_2,_4.pageNumber,_4.pageSize)!=false){
_e(_2,_4.pageNumber);
_4.onRefresh.call(_2,_4.pageNumber,_4.pageSize);
}
}}};
var _8=$(_2).addClass("pagination").html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr></tr></table>");
var tr=_8.find("tr");
function _9(_a){
var a=$("<a href=\"javascript:void(0)\"></a>").appendTo(tr);
a.wrap("<td></td>");
a.linkbutton({iconCls:_5[_a].iconCls,plain:true}).unbind(".pagination").bind("click.pagination",_5[_a].handler);
return a;
};
if(_4.showPageList){
var ps=$("<select class=\"pagination-page-list\"></select>");
ps.bind("change",function(){
_4.pageSize=$(this).val();
_4.onChangePageSize.call(_2,_4.pageSize);
_e(_2,_4.pageNumber);
});
for(var i=0;i<_4.pageList.length;i++){
var _b=$("<option></option>").text(_4.pageList[i]).appendTo(ps);
if(_4.pageList[i]==_4.pageSize){
_b.attr("selected","selected");
}
}
$("<td></td>").append(ps).appendTo(tr);
_4.pageSize=parseInt(ps.val());
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
}
bb.first=_9("first");
bb.prev=_9("prev");
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
$("<span style=\"padding-left:6px;\"></span>").html(_4.beforePageText).appendTo(tr).wrap("<td></td>");
bb.num=$("<input class=\"pagination-num\" type=\"text\" value=\"1\" size=\"2\">").appendTo(tr).wrap("<td></td>");
bb.num.unbind(".pagination").bind("keydown.pagination",function(e){
if(e.keyCode==13){
var _c=parseInt($(this).val())||1;
_e(_2,_c);
return false;
}
});
bb.after=$("<span style=\"padding-right:6px;\"></span>").appendTo(tr).wrap("<td></td>");
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
bb.next=_9("next");
bb.last=_9("last");
if(_4.showRefresh){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
bb.refresh=_9("refresh");
}
if(_4.buttons){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
for(var i=0;i<_4.buttons.length;i++){
var _d=_4.buttons[i];
if(_d=="-"){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
$("<a href=\"javascript:void(0)\"></a>").appendTo(td).linkbutton($.extend(_d,{plain:true})).bind("click",eval(_d.handler||function(){
}));
}
}
}
$("<div class=\"pagination-info\"></div>").appendTo(_8);
$("<div style=\"clear:both;\"></div>").appendTo(_8);
};
function _e(_f,_10){
var _11=$.data(_f,"pagination").options;
var _12=Math.ceil(_11.total/_11.pageSize)||1;
var _13=_10;
if(_10<1){
_13=1;
}
if(_10>_12){
_13=_12;
}
_11.pageNumber=_13;
_11.onSelectPage.call(_f,_13,_11.pageSize);
_14(_f);
};
function _14(_15){
var _16=$.data(_15,"pagination").options;
var bb=$.data(_15,"pagination").bb;
var _17=Math.ceil(_16.total/_16.pageSize)||1;
bb.num.val(_16.pageNumber);
bb.after.html(_16.afterPageText.replace(/{pages}/,_17));
var _18=_16.displayMsg;
_18=_18.replace(/{from}/,_16.total==0?0:_16.pageSize*(_16.pageNumber-1)+1);
_18=_18.replace(/{to}/,Math.min(_16.pageSize*(_16.pageNumber),_16.total));
_18=_18.replace(/{total}/,_16.total);
$(_15).find(".pagination-info").html(_18);
bb.first.add(bb.prev).linkbutton({disabled:(_16.pageNumber==1)});
bb.next.add(bb.last).linkbutton({disabled:(_16.pageNumber==_17)});
_19(_15,_16.loading);
};
function _19(_1a,_1b){
var _1c=$.data(_1a,"pagination").options;
var bb=$.data(_1a,"pagination").bb;
_1c.loading=_1b;
if(_1c.showRefresh){
if(_1c.loading){
bb.refresh.linkbutton({iconCls:"pagination-loading"});
}else{
bb.refresh.linkbutton({iconCls:"pagination-load"});
}
}
};
$.fn.pagination=function(_1d,_1e){
if(typeof _1d=="string"){
return $.fn.pagination.methods[_1d](this,_1e);
}
_1d=_1d||{};
return this.each(function(){
var _1f;
var _20=$.data(this,"pagination");
if(_20){
_1f=$.extend(_20.options,_1d);
}else{
_1f=$.extend({},$.fn.pagination.defaults,$.fn.pagination.parseOptions(this),_1d);
$.data(this,"pagination",{options:_1f});
}
_1(this);
_14(this);
});
};
$.fn.pagination.methods={options:function(jq){
return $.data(jq[0],"pagination").options;
},loading:function(jq){
return jq.each(function(){
_19(this,true);
});
},loaded:function(jq){
return jq.each(function(){
_19(this,false);
});
}};
$.fn.pagination.parseOptions=function(_21){
var t=$(_21);
return $.extend({},$.parser.parseOptions(_21,[{total:"number",pageSize:"number",pageNumber:"number"},{loading:"boolean",showPageList:"boolean",showRefresh:"boolean"}]),{pageList:(t.attr("pageList")?eval(t.attr("pageList")):undefined)});
};
$.fn.pagination.defaults={total:1,pageSize:10,pageNumber:1,pageList:[10,20,30,50],loading:false,buttons:null,showPageList:true,showRefresh:true,onSelectPage:function(_22,_23){
},onBeforeRefresh:function(_24,_25){
},onRefresh:function(_26,_27){
},onChangePageSize:function(_28){
},beforePageText:"Page",afterPageText:"of {pages}",displayMsg:"Displaying {from} to {to} of {total} items"};
})(jQuery);

