/**
 * jQuery EasyUI 1.3.1
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
var _1;
function _2(_3){
var _4=$.data(_3,"propertygrid");
var _5=$.data(_3,"propertygrid").options;
$(_3).datagrid($.extend({},_5,{cls:"propertygrid",view:(_5.showGroup?_6:undefined),onClickRow:function(_7,_8){
if(_1!=this){
_9();
_1=this;
}
if(_5.editIndex!=_7&&_8.editor){
var _a=$(this).datagrid("getColumnOption","value");
_a.editor=_8.editor;
_9();
$(this).datagrid("beginEdit",_7);
$(this).datagrid("getEditors",_7)[0].target.focus();
_5.editIndex=_7;
}
_5.onClickRow.call(_3,_7,_8);
},onLoadSuccess:function(_b){
$(_3).datagrid("getPanel").find("div.datagrid-group").css("border","");
_5.onLoadSuccess.call(_3,_b);
}}));
$(document).unbind(".propertygrid").bind("mousedown.propertygrid",function(e){
var p=$(e.target).closest("div.propertygrid,div.combo-panel");
if(p.length){
return;
}
_9();
});
function _9(){
var t=$(_1);
if(!t.length){
return;
}
var _c=$.data(_1,"propertygrid").options;
var _d=_c.editIndex;
if(_d==undefined){
return;
}
t.datagrid("getEditors",_d)[0].target.blur();
if(t.datagrid("validateRow",_d)){
t.datagrid("endEdit",_d);
}else{
t.datagrid("cancelEdit",_d);
}
_c.editIndex=undefined;
};
};
$.fn.propertygrid=function(_e,_f){
if(typeof _e=="string"){
var _10=$.fn.propertygrid.methods[_e];
if(_10){
return _10(this,_f);
}else{
return this.datagrid(_e,_f);
}
}
_e=_e||{};
return this.each(function(){
var _11=$.data(this,"propertygrid");
if(_11){
$.extend(_11.options,_e);
}else{
$.data(this,"propertygrid",{options:$.extend({},$.fn.propertygrid.defaults,$.fn.propertygrid.parseOptions(this),_e)});
}
_2(this);
});
};
$.fn.propertygrid.methods={};
$.fn.propertygrid.parseOptions=function(_12){
var t=$(_12);
return $.extend({},$.fn.datagrid.parseOptions(_12),$.parser.parseOptions(_12,[{showGroup:"boolean"}]));
};
var _6=$.extend({},$.fn.datagrid.defaults.view,{render:function(_13,_14,_15){
var _16=$.data(_13,"datagrid");
var _17=_16.options;
var _18=_16.data.rows;
var _19=$(_13).datagrid("getColumnFields",_15);
var _1a=[];
var _1b=0;
var _1c=this.groups;
for(var i=0;i<_1c.length;i++){
var _1d=_1c[i];
_1a.push("<div class=\"datagrid-group\" group-index="+i+" style=\"height:25px;overflow:hidden;border-bottom:1px solid #ccc;\">");
_1a.push("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"height:100%\"><tbody>");
_1a.push("<tr>");
_1a.push("<td style=\"border:0;\">");
if(!_15){
_1a.push("<span style=\"color:#666;font-weight:bold;\">");
_1a.push(_17.groupFormatter.call(_13,_1d.fvalue,_1d.rows));
_1a.push("</span>");
}
_1a.push("</td>");
_1a.push("</tr>");
_1a.push("</tbody></table>");
_1a.push("</div>");
_1a.push("<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>");
for(var j=0;j<_1d.rows.length;j++){
var cls=(_1b%2&&_17.striped)?"class=\"datagrid-row datagrid-row-alt\"":"class=\"datagrid-row\"";
var _1e=_17.rowStyler?_17.rowStyler.call(_13,_1b,_1d.rows[j]):"";
var _1f=_1e?"style=\""+_1e+"\"":"";
var _20=_16.rowIdPrefix+"-"+(_15?1:2)+"-"+_1b;
_1a.push("<tr id=\""+_20+"\" datagrid-row-index=\""+_1b+"\" "+cls+" "+_1f+">");
_1a.push(this.renderRow.call(this,_13,_19,_15,_1b,_1d.rows[j]));
_1a.push("</tr>");
_1b++;
}
_1a.push("</tbody></table>");
}
$(_14).html(_1a.join(""));
},onAfterRender:function(_21){
var _22=$.data(_21,"datagrid").options;
var dc=$.data(_21,"datagrid").dc;
var _23=dc.view;
var _24=dc.view1;
var _25=dc.view2;
$.fn.datagrid.defaults.view.onAfterRender.call(this,_21);
if(_22.rownumbers||_22.frozenColumns.length){
var _26=_24.find("div.datagrid-group");
}else{
var _26=_25.find("div.datagrid-group");
}
$("<td style=\"border:0\"><div class=\"datagrid-row-expander datagrid-row-collapse\" style=\"width:25px;height:16px;cursor:pointer\"></div></td>").insertBefore(_26.find("td"));
_23.find("div.datagrid-group").each(function(){
var _27=$(this).attr("group-index");
$(this).find("div.datagrid-row-expander").bind("click",{groupIndex:_27},function(e){
if($(this).hasClass("datagrid-row-collapse")){
$(_21).datagrid("collapseGroup",e.data.groupIndex);
}else{
$(_21).datagrid("expandGroup",e.data.groupIndex);
}
});
});
},onBeforeRender:function(_28,_29){
var _2a=$.data(_28,"datagrid").options;
var _2b=[];
for(var i=0;i<_29.length;i++){
var row=_29[i];
var _2c=_2d(row[_2a.groupField]);
if(!_2c){
_2c={fvalue:row[_2a.groupField],rows:[row],startRow:i};
_2b.push(_2c);
}else{
_2c.rows.push(row);
}
}
function _2d(_2e){
for(var i=0;i<_2b.length;i++){
var _2f=_2b[i];
if(_2f.fvalue==_2e){
return _2f;
}
}
return null;
};
this.groups=_2b;
var _30=[];
for(var i=0;i<_2b.length;i++){
var _2c=_2b[i];
for(var j=0;j<_2c.rows.length;j++){
_30.push(_2c.rows[j]);
}
}
$.data(_28,"datagrid").data.rows=_30;
}});
$.extend($.fn.datagrid.methods,{expandGroup:function(jq,_31){
return jq.each(function(){
var _32=$.data(this,"datagrid").dc.view;
if(_31!=undefined){
var _33=_32.find("div.datagrid-group[group-index=\""+_31+"\"]");
}else{
var _33=_32.find("div.datagrid-group");
}
var _34=_33.find("div.datagrid-row-expander");
if(_34.hasClass("datagrid-row-expand")){
_34.removeClass("datagrid-row-expand").addClass("datagrid-row-collapse");
_33.next("table").show();
}
$(this).datagrid("fixRowHeight");
});
},collapseGroup:function(jq,_35){
return jq.each(function(){
var _36=$.data(this,"datagrid").dc.view;
if(_35!=undefined){
var _37=_36.find("div.datagrid-group[group-index=\""+_35+"\"]");
}else{
var _37=_36.find("div.datagrid-group");
}
var _38=_37.find("div.datagrid-row-expander");
if(_38.hasClass("datagrid-row-collapse")){
_38.removeClass("datagrid-row-collapse").addClass("datagrid-row-expand");
_37.next("table").hide();
}
$(this).datagrid("fixRowHeight");
});
}});
$.fn.propertygrid.defaults=$.extend({},$.fn.datagrid.defaults,{singleSelect:true,remoteSort:false,fitColumns:true,loadMsg:"",frozenColumns:[[{field:"f",width:16,resizable:false}]],columns:[[{field:"name",title:"Name",width:100,sortable:true},{field:"value",title:"Value",width:100,resizable:false}]],showGroup:false,groupField:"group",groupFormatter:function(_39,_3a){
return _39;
}});
})(jQuery);

