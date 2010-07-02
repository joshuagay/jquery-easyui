/**
 * jQuery EasyUI 1.1.2
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
$.extend(Array.prototype,{indexOf:function(o){
for(var i=0,_1=this.length;i<_1;i++){
if(this[i]==o){
return i;
}
}
return -1;
},remove:function(o){
var _2=this.indexOf(o);
if(_2!=-1){
this.splice(_2,1);
}
return this;
}});
function _3(_4){
var _5=$.data(_4,"datagrid").grid;
var _6=$.data(_4,"datagrid").options;
if(_6.fit==true){
var p=_5.parent();
_6.width=p.width();
_6.height=p.height();
}
var _7=_5.find("div.datagrid-body");
var _8=_6.width;
if(_8=="auto"){
if($.boxModel==true){
_8=_5.width();
}else{
_8=_5.outerWidth();
}
}else{
if($.boxModel==true){
_8-=_5.outerWidth()-_5.width();
}
}
_5.width(_8);
var _9=_8;
if($.boxModel==false){
_9=_8-_5.outerWidth()+_5.width();
}
var _a=_5.find("div.datagrid-wrap");
var _b=_a.find("div.datagrid-view");
var _c=_b.find("div.datagrid-view1");
var _d=_b.find("div.datagrid-view2");
_a.width(_9);
_b.width(_9);
_c.width(_c.find("table").width());
_d.width(_9-_c.outerWidth());
_c.find(">div.datagrid-header,>div.datagrid-body").width(_c.width());
_d.find(">div.datagrid-header,>div.datagrid-body").width(_d.width());
var hh;
var _e=_c.find(">div.datagrid-header");
var _f=_d.find(">div.datagrid-header");
_e.css("height",null);
_f.css("height",null);
if($.boxModel==true){
hh=Math.max(_e.height(),_f.height());
}else{
hh=Math.max(_e.outerHeight(),_f.outerHeight());
}
_e.find("table").height(hh);
_f.find("table").height(hh);
_e.height(hh);
_f.height(hh);
if(_6.height=="auto"){
_7.height(_d.find("div.datagrid-body table").height()+18);
}else{
_7.height(_6.height-(_5.outerHeight()-_5.height())-$(">div.datagrid-header",_d).outerHeight(true)-$(">div.datagrid-title",_5).outerHeight(true)-$(">div.datagrid-toolbar",_a).outerHeight(true)-$(">div.datagrid-pager",_a).outerHeight(true));
}
_b.height(_d.height());
_d.css("left",_c.outerWidth());
};
function _10(_11,_12){
var _13=$.data(_11,"datagrid").data.rows;
var _14=$.data(_11,"datagrid").options;
var _15=$.data(_11,"datagrid").grid;
var _16=_15.find("div.datagrid-view");
var _17=_16.find(">div.datagrid-view1");
var _18=_16.find(">div.datagrid-view2");
if(_14.rownumbers||(_14.frozenColumns&&_14.frozenColumns.length>0)){
if(_12>=0){
_19(_12);
}else{
for(var i=0;i<_13.length;i++){
_19(i);
}
}
}
if(_14.height=="auto"){
var _1a=$(_11).height()+18;
_17.find("div.datagrid-body").height(_1a);
_18.find("div.datagrid-body").height(_1a);
_16.height(_18.height());
}
function _19(_1b){
var tr1=_17.find("tr[datagrid-row-index="+_1b+"]");
var tr2=_18.find("tr[datagrid-row-index="+_1b+"]");
tr1.css("height",null);
tr2.css("height",null);
var _1c=Math.max(tr1.height(),tr2.height());
tr1.css("height",_1c);
tr2.css("height",_1c);
};
};
function _1d(_1e,_1f){
var _20=$(_1e).wrap("<div class=\"datagrid\"></div>").parent();
_20.append("<div class=\"datagrid-wrap\">"+"<div class=\"datagrid-view\">"+"<div class=\"datagrid-view1\">"+"<div class=\"datagrid-header\">"+"<div class=\"datagrid-header-inner\"></div>"+"</div>"+"<div class=\"datagrid-body\">"+"<div class=\"datagrid-body-inner\">"+"<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"></table>"+"</div>"+"</div>"+"</div>"+"<div class=\"datagrid-view2\">"+"<div class=\"datagrid-header\">"+"<div class=\"datagrid-header-inner\"></div>"+"</div>"+"<div class=\"datagrid-body\"></div>"+"</div>"+"<div class=\"datagrid-resize-proxy\"></div>"+"</div>"+"</div>");
var _21=_22($("thead[frozen=true]",_1e));
$("thead[frozen=true]",_1e).remove();
var _23=_22($("thead",_1e));
$("thead",_1e).remove();
$(_1e).attr({cellspacing:0,cellpadding:0,border:0}).removeAttr("width").removeAttr("height").appendTo($("div.datagrid-view2 div.datagrid-body",_20));
function _22(_24){
var _25=[];
$("tr",_24).each(function(){
var _26=[];
$("th",this).each(function(){
var th=$(this);
var col={title:th.html(),align:th.attr("align")||"left",sortable:th.attr("sortable")=="true"||false,checkbox:th.attr("checkbox")=="true"||false};
if(th.attr("field")){
col.field=th.attr("field");
}
if(th.attr("formatter")){
col.formatter=eval(th.attr("formatter"));
}
if(th.attr("editor")){
col.editor=th.attr("editor");
}
if(th.attr("rowspan")){
col.rowspan=parseInt(th.attr("rowspan"));
}
if(th.attr("colspan")){
col.colspan=parseInt(th.attr("colspan"));
}
if(th.attr("width")){
col.width=parseInt(th.attr("width"));
}
_26.push(col);
});
_25.push(_26);
});
return _25;
};
var _27={total:0,rows:[]};
var _28=_60(_23);
$("div.datagrid-view2 div.datagrid-body tr",_20).each(function(){
_27.total++;
var col={};
for(var i=0;i<_28.length;i++){
col[_28[i]]=$("td:eq("+i+")",this).html();
}
_27.rows.push(col);
});
_20.bind("_resize",function(){
var _29=$.data(_1e,"datagrid").options;
if(_29.fit==true){
_3(_1e);
setTimeout(function(){
_2a(_1e);
},0);
}
return false;
});
return {grid:_20,frozenColumns:_21,columns:_23,data:_27};
};
function _2b(_2c){
var _2d=$.data(_2c,"datagrid").options;
var _2e=$.data(_2c,"datagrid").grid;
if(_2d.border==true){
_2e.removeClass("datagrid-noborder");
}else{
_2e.addClass("datagrid-noborder");
}
if(_2d.frozenColumns){
var t=_2f(_2d.frozenColumns);
if(_2d.rownumbers){
var td=$("<td rowspan=\""+_2d.frozenColumns.length+"\"><div class=\"datagrid-header-rownumber\"></div></td>");
if($("tr",t).length==0){
td.wrap("<tr></tr>").parent().appendTo($("tbody",t));
}else{
td.prependTo($("tr:first",t));
}
}
$("div.datagrid-view1 div.datagrid-header-inner",_2e).html(t);
}
if(_2d.columns){
var t=_2f(_2d.columns);
$("div.datagrid-view2 div.datagrid-header-inner",_2e).html(t);
}
$("div.datagrid-title",_2e).remove();
if(_2d.title){
var _30=$("<div class=\"datagrid-title\"><span class=\"datagrid-title-text\"></span></div>");
$(".datagrid-title-text",_30).html(_2d.title);
_30.prependTo(_2e);
if(_2d.iconCls){
$(".datagrid-title-text",_30).addClass("datagrid-title-with-icon");
$("<div class=\"datagrid-title-icon\"></div>").addClass(_2d.iconCls).appendTo(_30);
}
}
$("div.datagrid-toolbar",_2e).remove();
if(_2d.toolbar){
var tb=$("<div class=\"datagrid-toolbar\"></div>").prependTo($("div.datagrid-wrap",_2e));
for(var i=0;i<_2d.toolbar.length;i++){
var btn=_2d.toolbar[i];
if(btn=="-"){
$("<div class=\"datagrid-btn-separator\"></div>").appendTo(tb);
}else{
var _31=$("<a href=\"javascript:void(0)\"></a>");
_31[0].onclick=eval(btn.handler||function(){
});
_31.css("float","left").appendTo(tb).linkbutton($.extend({},btn,{plain:true}));
}
}
}
$("div.datagrid-pager",_2e).remove();
if(_2d.pagination){
var _32=$("<div class=\"datagrid-pager\"></div>").appendTo($("div.datagrid-wrap",_2e));
_32.pagination({pageNumber:_2d.pageNumber,pageSize:_2d.pageSize,pageList:_2d.pageList,onSelectPage:function(_33,_34){
_2d.pageNumber=_33;
_2d.pageSize=_34;
_35(_2c);
}});
_2d.pageSize=_32.pagination("options").pageSize;
}
};
function _2f(_36){
var t=$("<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody></tbody></table>");
for(var i=0;i<_36.length;i++){
var tr=$("<tr></tr>").appendTo($("tbody",t));
var _37=_36[i];
for(var j=0;j<_37.length;j++){
var col=_37[j];
var _38="";
if(col.rowspan){
_38+="rowspan=\""+col.rowspan+"\" ";
}
if(col.colspan){
_38+="colspan=\""+col.colspan+"\" ";
}
var td=$("<td "+_38+"></td>").appendTo(tr);
if(col.checkbox){
td.attr("field",col.field);
$("<div class=\"datagrid-header-check\"></div>").html("<input type=\"checkbox\"/>").appendTo(td);
}else{
if(col.field){
td.attr("field",col.field);
td.append("<div class=\"datagrid-cell\"><span></span><span class=\"datagrid-sort-icon\"></span></div>");
$("span",td).html(col.title);
$("span.datagrid-sort-icon",td).html("&nbsp;");
$("div.datagrid-cell",td).width(col.width);
$("div.datagrid-cell",td).css("text-align",(col.align||"left"));
}else{
$("<div class=\"datagrid-cell-group\"></div>").html(col.title).appendTo(td);
}
}
}
}
return t;
};
function _39(_3a){
var _3b=$.data(_3a,"datagrid").grid;
var _3c=$.data(_3a,"datagrid").options;
var _3d=$.data(_3a,"datagrid").data;
var _3e=_3b.find("div.datagrid-body");
if(_3c.striped){
_3e.find("tr:odd").addClass("datagrid-row-alt");
}
_3e.find("tr").unbind(".datagrid").bind("mouseenter.datagrid",function(){
var _3f=$(this).attr("datagrid-row-index");
_3e.find("tr[datagrid-row-index="+_3f+"]").addClass("datagrid-row-over");
}).bind("mouseleave.datagrid",function(){
var _40=$(this).attr("datagrid-row-index");
_3e.find("tr[datagrid-row-index="+_40+"]").removeClass("datagrid-row-over");
}).bind("click.datagrid",function(){
var _41=$(this).attr("datagrid-row-index");
if(_3c.singleSelect==true){
_92(_3a);
_9e(_3a,_41);
}else{
if($(this).hasClass("datagrid-row-selected")){
_ab(_3a,_41);
}else{
_9e(_3a,_41);
}
}
if(_3c.onClickRow){
_3c.onClickRow.call(_3a,_41,_3d.rows[_41]);
}
}).bind("dblclick.datagrid",function(){
var _42=$(this).attr("datagrid-row-index");
if(_3c.onDblClickRow){
_3c.onDblClickRow.call(_3a,_42,_3d.rows[_42]);
}
});
_3e.find("div.datagrid-cell-check input[type=checkbox]").unbind(".datagrid").bind("click.datagrid",function(e){
var _43=$(this).parent().parent().parent().attr("datagrid-row-index");
if(_3c.singleSelect){
_92(_3a);
_9e(_3a,_43);
}else{
if($(this).attr("checked")){
_9e(_3a,_43);
}else{
_ab(_3a,_43);
}
}
e.stopPropagation();
});
var _44=_3b.find("div.datagrid-header");
_44.find("td:has(div.datagrid-cell)").unbind(".datagrid").bind("mouseenter.datagrid",function(){
$(this).addClass("datagrid-header-over");
}).bind("mouseleave.datagrid",function(){
$(this).removeClass("datagrid-header-over");
});
_44.find("div.datagrid-cell").unbind(".datagrid").bind("click.datagrid",function(){
var _45=$(this).parent().attr("field");
var opt=_57(_3a,_45);
if(!opt.sortable){
return;
}
_3c.sortName=_45;
_3c.sortOrder="asc";
var c="datagrid-sort-asc";
if($(this).hasClass("datagrid-sort-asc")){
c="datagrid-sort-desc";
_3c.sortOrder="desc";
}
_44.find("div.datagrid-cell").removeClass("datagrid-sort-asc datagrid-sort-desc");
$(this).addClass(c);
if(_3c.onSortColumn){
_3c.onSortColumn.call(_3a,_3c.sortName,_3c.sortOrder);
}
_35(_3a);
});
_44.find("input[type=checkbox]").unbind(".datagrid").bind("click.datagrid",function(){
if(_3c.singleSelect){
return false;
}
if($(this).attr("checked")){
_96(_3a);
}else{
_92(_3a);
}
});
var _46=_3b.find(">div.datagrid-wrap>div.datagrid-view");
var _47=_46.find(">div.datagrid-view1");
var _48=_46.find(">div.datagrid-view2");
var _49=_48.find("div.datagrid-header");
var _4a=_47.find("div.datagrid-body");
_48.find("div.datagrid-body").unbind(".datagrid").bind("scroll.datagrid",function(){
_49.scrollLeft($(this).scrollLeft());
_4a.scrollTop($(this).scrollTop());
});
_44.find("div.datagrid-cell").resizable({handles:"e",minWidth:50,onStartResize:function(e){
var _4b=_46.find(">div.datagrid-resize-proxy");
_4b.css({left:e.pageX-$(_3b).offset().left-1});
_4b.css("display","block");
},onResize:function(e){
_46.find(">div.datagrid-resize-proxy").css({left:e.pageX-$(_3b).offset().left-1});
return false;
},onStopResize:function(e){
_2a(_3a,this);
var _4c=_3b.find("div.datagrid-view2");
_4c.find("div.datagrid-header").scrollLeft(_4c.find("div.datagrid-body").scrollLeft());
_46.find(">div.datagrid-resize-proxy").css("display","none");
}});
$("div.datagrid-view1 div.datagrid-header div.datagrid-cell",_3b).resizable({onStopResize:function(e){
_2a(_3a,this);
var _4d=_3b.find("div.datagrid-view2");
_4d.find("div.datagrid-header").scrollLeft(_4d.find("div.datagrid-body").scrollLeft());
_46.find(">div.datagrid-resize-proxy").css("display","none");
_3(_3a);
}});
};
function _2a(_4e,_4f){
var _50=$.data(_4e,"datagrid").grid;
var _51=$.data(_4e,"datagrid").options;
var _52=_50.find("div.datagrid-body");
if(_4f){
fix(_4f);
}else{
$("div.datagrid-header div.datagrid-cell",_50).each(function(){
fix(this);
});
}
setTimeout(function(){
_10(_4e);
_58(_4e);
},0);
function fix(_53){
var _54=$(_53);
if(_54.width()==0){
return;
}
var _55=_54.parent().attr("field");
_52.find("td[field="+_55+"] div.datagrid-cell").each(function(){
var _56=$(this);
if($.boxModel==true){
_56.width(_54.outerWidth()-_56.outerWidth()+_56.width());
}else{
_56.width(_54.outerWidth());
}
});
var col=_57(_4e,_55);
col.width=$.boxModel==true?_54.width():_54.outerWidth();
};
};
function _58(_59){
var _5a=$.data(_59,"datagrid").grid;
var _5b=_5a.find("div.datagrid-body");
_5a.find("div.datagrid-editable").each(function(){
var ed=$.data(this,"datagrid.editor");
if(ed.editor.resize){
ed.editor.resize(ed.elem,$(this).width());
}
});
};
function _57(_5c,_5d){
var _5e=$.data(_5c,"datagrid").options;
if(_5e.columns){
for(var i=0;i<_5e.columns.length;i++){
var _5f=_5e.columns[i];
for(var j=0;j<_5f.length;j++){
var col=_5f[j];
if(col.field==_5d){
return col;
}
}
}
}
if(_5e.frozenColumns){
for(var i=0;i<_5e.frozenColumns.length;i++){
var _5f=_5e.frozenColumns[i];
for(var j=0;j<_5f.length;j++){
var col=_5f[j];
if(col.field==_5d){
return col;
}
}
}
}
return null;
};
function _60(_61){
if(_61.length==0){
return [];
}
function _62(_63,_64,_65){
var _66=[];
while(_66.length<_65){
var col=_61[_63][_64];
if(col.colspan&&parseInt(col.colspan)>1){
var ff=_62(_63+1,_67(_63,_64),parseInt(col.colspan));
_66=_66.concat(ff);
}else{
if(col.field){
_66.push(col.field);
}
}
_64++;
}
return _66;
};
function _67(_68,_69){
var _6a=0;
for(var i=0;i<_69;i++){
var _6b=parseInt(_61[_68][i].colspan||"1");
if(_6b>1){
_6a+=_6b;
}
}
return _6a;
};
var _6c=[];
for(var i=0;i<_61[0].length;i++){
var col=_61[0][i];
if(col.colspan&&parseInt(col.colspan)>1){
var ff=_62(1,_67(0,i),parseInt(col.colspan));
_6c=_6c.concat(ff);
}else{
if(col.field){
_6c.push(col.field);
}
}
}
return _6c;
};
function _6d(_6e,_6f){
var _70=$.data(_6e,"datagrid").options;
var _71=$.data(_6e,"datagrid").grid;
var _72=$.data(_6e,"datagrid").selectedRows;
var _73=_6f.rows;
$.data(_6e,"datagrid").data=_6f;
var _74=function(){
if($.boxModel==false){
return 0;
}
var _75=$("div.datagrid-header div.datagrid-cell:first",_71);
var _76=_75.outerWidth()-_75.width();
var t=$("div.datagrid-body table",_71);
t.append($("<tr><td><div class=\"datagrid-cell\"></div></td></tr>"));
var _77=$("div.datagrid-cell",t);
var _78=_77.outerWidth()-_77.width();
return _76-_78;
};
var _79=_74();
function _7a(_7b,_7c){
function _7d(row){
if(!_70.idField){
return false;
}
for(var i=0;i<_72.length;i++){
if(_72[i][_70.idField]==row[_70.idField]){
return true;
}
}
return false;
};
var _7e=["<tbody>"];
for(var i=0;i<_73.length;i++){
var row=_73[i];
var _7f=_7d(row);
if(i%2&&_70.striped){
_7e.push("<tr datagrid-row-index=\""+i+"\" class=\"datagrid-row-alt");
}else{
_7e.push("<tr datagrid-row-index=\""+i+"\" class=\"");
}
if(_7f==true){
_7e.push(" datagrid-row-selected");
}
_7e.push("\">");
if(_7c){
var _80=i+1;
if(_70.pagination){
_80+=(_70.pageNumber-1)*_70.pageSize;
}
_7e.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">"+_80+"</div></td>");
}
for(var j=0;j<_7b.length;j++){
var _81=_7b[j];
var col=_57(_6e,_81);
if(col){
var _82="width:"+(col.width+_79)+"px;";
_82+="text-align:"+(col.align||"left")+";";
_82+=_70.nowrap==false?"white-space:normal;":"";
_7e.push("<td field=\""+_81+"\">");
_7e.push("<div style=\""+_82+"\" ");
if(col.checkbox){
_7e.push("class=\"datagrid-cell-check ");
}else{
_7e.push("class=\"datagrid-cell ");
}
_7e.push("\">");
if(col.checkbox){
if(_7f){
_7e.push("<input type=\"checkbox\" checked=\"checked\"/>");
}else{
_7e.push("<input type=\"checkbox\"/>");
}
}else{
if(col.formatter){
_7e.push(col.formatter(row[_81],row,i));
}else{
_7e.push(row[_81]);
}
}
_7e.push("</div>");
_7e.push("</td>");
}
}
_7e.push("</tr>");
}
_7e.push("</tbody>");
return _7e.join("");
};
var _83=_71.find(">div.datagrid-wrap>div.datagrid-view");
var _84=_83.find(">div.datagrid-view1");
var _85=_83.find(">div.datagrid-view2");
_85.find(">div.datagrid-body").scrollLeft(0).scrollTop(0);
var _86=_60(_70.columns);
_85.find(">div.datagrid-body table").html(_7a(_86));
if(_70.rownumbers||(_70.frozenColumns&&_70.frozenColumns.length>0)){
var _87=_60(_70.frozenColumns);
_84.find(">div.datagrid-body table").html(_7a(_87,_70.rownumbers));
}
_70.onLoadSuccess.call(_6e,_6f);
var _88=$("div.datagrid-pager",_71);
if(_88.length){
if(_88.pagination("options").total!=_6f.total){
_88.pagination({total:_6f.total});
}
}
_10(_6e);
_39(_6e);
};
function _89(_8a){
var _8b=$.data(_8a,"datagrid").options;
var _8c=$.data(_8a,"datagrid").grid;
var _8d=$.data(_8a,"datagrid").data;
if(_8b.idField){
var _8e=$.data(_8a,"datagrid").deletedRows;
var _8f=$.data(_8a,"datagrid").selectedRows;
var _90=[];
for(var i=0;i<_8f.length;i++){
(function(){
var row=_8f[i];
for(var j=0;j<_8e.length;j++){
if(row[_8b.idField]==_8e[j][_8b.idField]){
return;
}
}
_90.push(row);
})();
}
return _90;
}
var _90=[];
$("div.datagrid-view2 div.datagrid-body tr.datagrid-row-selected",_8c).each(function(){
var _91=parseInt($(this).attr("datagrid-row-index"));
if(_8d.rows[_91]){
_90.push(_8d.rows[_91]);
}
});
return _90;
};
function _92(_93){
var _94=$.data(_93,"datagrid").grid;
$("div.datagrid-body tr.datagrid-row-selected",_94).removeClass("datagrid-row-selected");
$("div.datagrid-body div.datagrid-cell-check input[type=checkbox]",_94).attr("checked",false);
var _95=$.data(_93,"datagrid").selectedRows;
while(_95.length>0){
_95.pop();
}
};
function _96(_97){
var _98=$.data(_97,"datagrid").options;
var _99=$.data(_97,"datagrid").grid;
var _9a=$.data(_97,"datagrid").data;
var _9b=$.data(_97,"datagrid").selectedRows;
var _9c=_9a.rows;
$("div.datagrid-body tr",_99).addClass("datagrid-row-selected");
$("div.datagrid-body div.datagrid-cell-check input[type=checkbox]",_99).attr("checked",true);
for(var _9d=0;_9d<_9c.length;_9d++){
if(_98.idField){
(function(){
var row=_9c[_9d];
for(var i=0;i<_9b.length;i++){
if(_9b[i][_98.idField]==row[_98.idField]){
return;
}
}
_9b.push(row);
})();
}
_98.onSelect.call(_97,_9d,_9c[_9d]);
}
};
function _9e(_9f,_a0){
var _a1=$.data(_9f,"datagrid").grid;
var _a2=$.data(_9f,"datagrid").options;
var _a3=$.data(_9f,"datagrid").data;
var _a4=$.data(_9f,"datagrid").selectedRows;
if(_a0<0||_a0>=_a3.rows.length){
return;
}
var tr=$("div.datagrid-body tr[datagrid-row-index="+_a0+"]",_a1);
var ck=$("div.datagrid-cell-check input[type=checkbox]",tr);
tr.addClass("datagrid-row-selected");
ck.attr("checked",true);
if(_a2.idField){
var row=_a3.rows[_a0];
for(var i=0;i<_a4.length;i++){
if(_a4[i][_a2.idField]==row[_a2.idField]){
return;
}
}
_a4.push(row);
}
_a2.onSelect.call(_9f,_a0,_a3.rows[_a0]);
};
function _a5(_a6,_a7){
var _a8=$.data(_a6,"datagrid").options;
var _a9=$.data(_a6,"datagrid").data;
if(_a8.idField){
var _aa=-1;
for(var i=0;i<_a9.rows.length;i++){
if(_a9.rows[i][_a8.idField]==_a7){
_aa=i;
break;
}
}
if(_aa>=0){
_9e(_a6,_aa);
}
}
};
function _ab(_ac,_ad){
var _ae=$.data(_ac,"datagrid").options;
var _af=$.data(_ac,"datagrid").grid;
var _b0=$.data(_ac,"datagrid").data;
var _b1=$.data(_ac,"datagrid").selectedRows;
if(_ad<0||_ad>=_b0.rows.length){
return;
}
var tr=$("div.datagrid-body tr[datagrid-row-index="+_ad+"]",_af);
var ck=$("div.datagrid-body tr[datagrid-row-index="+_ad+"] div.datagrid-cell-check input[type=checkbox]",_af);
tr.removeClass("datagrid-row-selected");
ck.attr("checked",false);
var row=_b0.rows[_ad];
if(_ae.idField){
for(var i=0;i<_b1.length;i++){
var _b2=_b1[i];
if(_b2[_ae.idField]==row[_ae.idField]){
for(var j=i+1;j<_b1.length;j++){
_b1[j-1]=_b1[j];
}
_b1.pop();
break;
}
}
}
_ae.onUnselect.call(_ac,_ad,row);
};
function _b3(_b4,_b5){
var _b6=$.data(_b4,"datagrid").options;
var _b7=$.data(_b4,"datagrid").grid;
var _b8=$.data(_b4,"datagrid").data;
var _b9=$.data(_b4,"datagrid").editingRows;
var tr=$("div.datagrid-body tr[datagrid-row-index="+_b5+"]",_b7);
if(tr.hasClass("datagrid-row-editing")){
return;
}
if(_b6.onBeforeEdit.call(_b4,_b5,_b8.rows[_b5])==false){
return;
}
tr.addClass("datagrid-row-editing");
_ba(_b4,_b5);
_58(_b4);
_b9.push(_b8.rows[_b5]);
_bb(_b4,_b5,_b8.rows[_b5]);
_bc(_b4,_b5);
};
function _bd(_be,_bf,_c0){
var _c1=$.data(_be,"datagrid").options;
var _c2=$.data(_be,"datagrid").grid;
var _c3=$.data(_be,"datagrid").data;
var _c4=$.data(_be,"datagrid").updatedRows;
var _c5=$.data(_be,"datagrid").insertedRows;
var _c6=$.data(_be,"datagrid").editingRows;
var row=_c3.rows[_bf];
var tr=$("div.datagrid-body tr[datagrid-row-index="+_bf+"]",_c2);
if(!tr.hasClass("datagrid-row-editing")){
return;
}
if(!_c0){
if(!_bc(_be,_bf)){
return;
}
var _c7=false;
var _c8={};
var nd=_c9(_be,_bf);
for(var _ca in nd){
if(row[_ca]!=nd[_ca]){
row[_ca]=nd[_ca];
_c7=true;
_c8[_ca]=nd[_ca];
}
}
if(_c7){
if(_c5.indexOf(row)==-1){
if(_c4.indexOf(row)==-1){
_c4.push(row);
}
}
}
}
tr.removeClass("datagrid-row-editing");
_c6.remove(row);
_cb(_be,_bf);
_cc(_be,_bf);
if(!_c0){
_c1.onAfterEdit.call(_be,_bf,row,_c8);
}else{
_c1.onCancelEdit.call(_be,_bf,row);
}
};
function _bb(_cd,_ce,_cf){
var _d0=$.data(_cd,"datagrid").grid;
var tr=$("div.datagrid-body tr[datagrid-row-index="+_ce+"]",_d0);
if(!tr.hasClass("datagrid-row-editing")){
return;
}
tr.find("div.datagrid-editable").each(function(){
var _d1=$(this).parent().attr("field");
var ed=$.data(this,"datagrid.editor");
ed.editor.setValue(ed.elem,_cf[_d1]);
});
};
function _c9(_d2,_d3){
var _d4=$.data(_d2,"datagrid").grid;
var tr=$("div.datagrid-body tr[datagrid-row-index="+_d3+"]",_d4);
if(!tr.hasClass("datagrid-row-editing")){
return {};
}
var _d5={};
tr.find("div.datagrid-editable").each(function(){
var _d6=$(this).parent().attr("field");
var ed=$.data(this,"datagrid.editor");
_d5[_d6]=ed.editor.getValue(ed.elem);
});
return _d5;
};
function _ba(_d7,_d8){
var _d9=$.data(_d7,"datagrid").options;
var _da=$.data(_d7,"datagrid").grid;
var tr=$("div.datagrid-body tr[datagrid-row-index="+_d8+"]",_da);
tr.find(">td").each(function(){
var _db=$(this).find("div.datagrid-cell");
var _dc=$(this).attr("field");
var col=_57(_d7,_dc);
if(col&&col.editor){
var _dd,_de;
if(typeof col.editor=="string"){
_dd=col.editor;
}else{
_dd=col.editor.type;
_de=col.editor.options;
}
var _df=_d9.editors[_dd];
if(_df){
var _e0=_db.outerWidth();
_db.addClass("datagrid-editable");
if($.boxModel==true){
_db.width(_e0-(_db.outerWidth()-_db.width()));
}
_db.html("<table border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tr><td></td></tr></table>");
_db.find("table").attr("align",col.align);
$.data(_db[0],"datagrid.editor",{editor:_df,elem:_df.init(_db.find("td"),_de)});
}
}
});
_10(_d7,_d8);
};
function _cb(_e1,_e2){
var _e3=$.data(_e1,"datagrid").grid;
var tr=$("div.datagrid-body tr[datagrid-row-index="+_e2+"]",_e3);
tr.find(">td").each(function(){
var _e4=$(this).find("div.datagrid-editable");
if(_e4.length){
var ed=$.data(_e4[0],"datagrid.editor");
if(ed.editor.destroy){
ed.editor.destroy(ed.elem);
}
$.removeData(_e4[0],"datagrid.editor");
var _e5=_e4.outerWidth();
_e4.removeClass("datagrid-editable");
if($.boxModel==true){
_e4.width(_e5-(_e4.outerWidth()-_e4.width()));
}
}
});
};
function _bc(_e6,_e7){
var _e8=$.data(_e6,"datagrid").grid;
var tr=$("div.datagrid-body tr[datagrid-row-index="+_e7+"]",_e8);
if(!tr.hasClass("datagrid-row-editing")){
return true;
}
var _e9=tr.find(".validatebox-text");
_e9.validatebox("validate");
_e9.trigger("mouseleave");
var _ea=tr.find(".validatebox-invalid");
return _ea.length==0;
};
function _eb(_ec,_ed){
var _ee=$.data(_ec,"datagrid").insertedRows;
var _ef=$.data(_ec,"datagrid").deletedRows;
var _f0=$.data(_ec,"datagrid").updatedRows;
if(!_ed){
var _f1=[];
_f1=_f1.concat(_ee);
_f1=_f1.concat(_ef);
_f1=_f1.concat(_f0);
return _f1;
}else{
if(_ed=="inserted"){
return _ee;
}else{
if(_ed=="deleted"){
return _ef;
}else{
if(_ed=="updated"){
return _f0;
}
}
}
}
return [];
};
function _cc(_f2,_f3){
var _f4=$.data(_f2,"datagrid").grid;
var _f5=$.data(_f2,"datagrid").data;
_f4.find("div.datagrid-body tr[datagrid-row-index="+_f3+"] td").each(function(){
var _f6=$(this).find("div.datagrid-cell");
var _f7=$(this).attr("field");
var col=_57(_f2,_f7);
if(col){
if(col.formatter){
_f6.html(col.formatter(_f5.rows[_f3][_f7],_f5.rows[_f3],_f3));
}else{
_f6.html(_f5.rows[_f3][_f7]);
}
}
});
_10(_f2,_f3);
};
function _f8(_f9,_fa){
var _fb=$.data(_f9,"datagrid").data;
var _fc=$.data(_f9,"datagrid").insertedRows;
var _fd=$.data(_f9,"datagrid").deletedRows;
var _fe=$.data(_f9,"datagrid").editingRows;
var row=_fb.rows[_fa];
_fb.total-=1;
if(_fc.indexOf(row)>=0){
_fc.remove(row);
}else{
_fd.push(row);
}
if(_fe.indexOf(row)>=0){
_fe.remove(row);
_cb(_f9,_fa);
}
var _ff=[];
for(var i=0;i<_fe.length;i++){
var idx=_fb.rows.indexOf(_fe[i]);
_ff.push(_c9(_f9,idx));
_cb(_f9,idx);
}
_fb.rows.remove(row);
_6d(_f9,_fb);
var _100=[];
for(var i=0;i<_fe.length;i++){
var idx=_fb.rows.indexOf(_fe[i]);
_100.push(idx);
}
_fe.splice(0,_fe.length);
for(var i=0;i<_100.length;i++){
_b3(_f9,_100[i]);
_bb(_f9,_100[i],_ff[i]);
}
};
function _101(_102,row){
if(!row){
return;
}
var grid=$.data(_102,"datagrid").grid;
var data=$.data(_102,"datagrid").data;
var _103=$.data(_102,"datagrid").insertedRows;
var _104=$.data(_102,"datagrid").editingRows;
data.total+=1;
data.rows.push(row);
_103.push(row);
var _105=[];
for(var i=0;i<_104.length;i++){
var idx=data.rows.indexOf(_104[i]);
_105.push(_c9(_102,idx));
_cb(_102,idx);
}
_6d(_102,data);
var _106=[];
for(var i=0;i<_104.length;i++){
var idx=data.rows.indexOf(_104[i]);
_106.push(idx);
}
_104.splice(0,_104.length);
for(var i=0;i<_106.length;i++){
_b3(_102,_106[i]);
_bb(_102,_106[i],_105[i]);
}
var _107=$("div.datagrid-view2 div.datagrid-body",grid);
var _108=_107.find(">table");
var top=_108.outerHeight()-_107.outerHeight();
_107.scrollTop(top+20);
};
function _109(_10a){
var data=$.data(_10a,"datagrid").data;
var rows=data.rows;
var _10b=[];
for(var i=0;i<rows.length;i++){
_10b.push($.extend({},rows[i]));
}
$.data(_10a,"datagrid").originalRows=_10b;
$.data(_10a,"datagrid").updatedRows=[];
$.data(_10a,"datagrid").insertedRows=[];
$.data(_10a,"datagrid").deletedRows=[];
$.data(_10a,"datagrid").editingRows=[];
};
function _10c(_10d){
var data=$.data(_10d,"datagrid").data;
var ok=true;
for(var i=0,len=data.rows.length;i<len;i++){
if(_bc(_10d,i)){
_bd(_10d,i,false);
}else{
ok=false;
}
}
if(ok){
_109(_10d);
}
};
function _10e(_10f){
var opts=$.data(_10f,"datagrid").options;
var _110=$.data(_10f,"datagrid").originalRows;
var _111=$.data(_10f,"datagrid").insertedRows;
var _112=$.data(_10f,"datagrid").deletedRows;
var _113=$.data(_10f,"datagrid").updatedRows;
var _114=$.data(_10f,"datagrid").selectedRows;
var data=$.data(_10f,"datagrid").data;
for(var i=0;i<data.rows.length;i++){
_bd(_10f,i,true);
}
var rows=[];
var _115={};
if(opts.idField){
for(var i=0;i<_114.length;i++){
_115[_114[i][opts.idField]]=true;
}
}
_114.splice(0,_114.length);
for(var i=0;i<_110.length;i++){
var row=$.extend({},_110[i]);
rows.push(row);
if(_115[row[opts.idField]]){
_114.push(row);
}
}
data.total+=_112.length-_111.length;
data.rows=rows;
_6d(_10f,data);
$.data(_10f,"datagrid").updatedRows=[];
$.data(_10f,"datagrid").insertedRows=[];
$.data(_10f,"datagrid").deletedRows=[];
$.data(_10f,"datagrid").editingRows=[];
};
function _35(_116,_117){
var grid=$.data(_116,"datagrid").grid;
var opts=$.data(_116,"datagrid").options;
if(_117){
opts.queryParams=_117;
}
if(!opts.url){
return;
}
var _118=$.extend({},opts.queryParams);
if(opts.pagination){
$.extend(_118,{page:opts.pageNumber,rows:opts.pageSize});
}
if(opts.sortName){
$.extend(_118,{sort:opts.sortName,order:opts.sortOrder});
}
if(opts.onBeforeLoad.call(_116,_118)==false){
return;
}
_119();
setTimeout(function(){
_11a();
},0);
function _11a(){
$.ajax({type:opts.method,url:opts.url,data:_118,dataType:"json",success:function(data){
setTimeout(function(){
_11b();
},0);
_6d(_116,data);
setTimeout(function(){
_109(_116);
},0);
},error:function(){
setTimeout(function(){
_11b();
},0);
if(opts.onLoadError){
opts.onLoadError.apply(_116,arguments);
}
}});
};
function _119(){
$("div.datagrid-pager",grid).pagination("loading");
var wrap=$("div.datagrid-wrap",grid);
$("<div class=\"datagrid-mask\"></div>").css({display:"block",width:wrap.width(),height:wrap.height()}).appendTo(wrap);
$("<div class=\"datagrid-mask-msg\"></div>").html(opts.loadMsg).appendTo(wrap).css({display:"block",left:(wrap.width()-$("div.datagrid-mask-msg",grid).outerWidth())/2,top:(wrap.height()-$("div.datagrid-mask-msg",grid).outerHeight())/2});
};
function _11b(){
grid.find("div.datagrid-pager").pagination("loaded");
grid.find("div.datagrid-mask-msg").remove();
grid.find("div.datagrid-mask").remove();
};
};
$.fn.datagrid=function(_11c,_11d){
if(typeof _11c=="string"){
switch(_11c){
case "options":
return $.data(this[0],"datagrid").options;
case "getPager":
return $.data(this[0],"datagrid").grid.find("div.datagrid-pager");
case "resize":
return this.each(function(){
_3(this);
});
case "reload":
return this.each(function(){
_35(this,_11d);
});
case "fixColumnSize":
return this.each(function(){
_2a(this);
});
case "loadData":
return this.each(function(){
_6d(this,_11d);
_109(this);
});
case "getData":
return $.data(this[0],"datagrid").data;
case "getRows":
return $.data(this[0],"datagrid").data.rows;
case "getSelected":
var rows=_89(this[0]);
return rows.length>0?rows[0]:null;
case "getSelections":
return _89(this[0]);
case "clearSelections":
return this.each(function(){
_92(this);
});
case "selectAll":
return this.each(function(){
_96(this);
});
case "selectRow":
return this.each(function(){
_9e(this,_11d);
});
case "selectRecord":
return this.each(function(){
_a5(this,_11d);
});
case "unselectRow":
return this.each(function(){
_ab(this,_11d);
});
case "beginEdit":
return this.each(function(){
_b3(this,_11d);
});
case "endEdit":
return this.each(function(){
_bd(this,_11d,false);
});
case "cancelEdit":
return this.each(function(){
_bd(this,_11d,true);
});
case "refreshRow":
return this.each(function(){
_cc(this,_11d);
});
case "validateRow":
return this.each(function(){
_bc(this,_11d);
});
case "appendRow":
return this.each(function(){
_101(this,_11d);
});
case "deleteRow":
return this.each(function(){
_f8(this,_11d);
});
case "getChanges":
return _eb(this[0],_11d);
case "acceptChanges":
return _10c(this[0]);
case "rejectChanges":
return _10e(this[0]);
}
}
_11c=_11c||{};
return this.each(function(){
var _11e=$.data(this,"datagrid");
var opts;
if(_11e){
opts=$.extend(_11e.options,_11c);
_11e.options=opts;
}else{
opts=$.extend({},$.fn.datagrid.defaults,{width:(parseInt($(this).css("width"))||undefined),height:(parseInt($(this).css("height"))||undefined),fit:($(this).attr("fit")?$(this).attr("fit")=="true":undefined)},_11c);
$(this).css("width",null).css("height",null);
var _11f=_1d(this,opts.rownumbers);
if(!opts.columns){
opts.columns=_11f.columns;
}
if(!opts.frozenColumns){
opts.frozenColumns=_11f.frozenColumns;
}
$.data(this,"datagrid",{options:opts,grid:_11f.grid,selectedRows:[],data:{total:0,rows:[]},originalRows:[],updatedRows:[],insertedRows:[],deletedRows:[],editingRows:[]});
_6d(this,_11f.data);
_109(this);
}
_2b(this);
if(!_11e){
_2a(this);
}
_3(this);
if(opts.url){
_35(this);
}
_39(this);
});
};
var _120={text:{init:function(_121,_122){
var _123=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_121);
return _123;
},getValue:function(elem){
return $(elem).val();
},setValue:function(elem,_124){
$(elem).val(_124);
},resize:function(elem,_125){
var _126=$(elem);
if($.boxModel==true){
_126.width(_125-(_126.outerWidth()-_126.width()));
}else{
_126.width(_125);
}
}},textarea:{init:function(_127,_128){
var _129=$("<textarea class=\"datagrid-editable-input\"></textarea>").appendTo(_127);
return _129;
},getValue:function(elem){
return $(elem).val();
},setValue:function(elem,_12a){
$(elem).val(_12a);
},resize:function(elem,_12b){
var _12c=$(elem);
if($.boxModel==true){
_12c.width(_12b-(_12c.outerWidth()-_12c.width()));
}else{
_12c.width(_12b);
}
}},checkbox:{init:function(_12d,_12e){
var _12f=$("<input type=\"checkbox\">").appendTo(_12d);
_12f.val(_12e.on);
_12f.attr("offval",_12e.off);
return _12f;
},getValue:function(elem){
if($(elem).attr("checked")){
return $(elem).val();
}else{
return $(elem).attr("offval");
}
},setValue:function(elem,_130){
if($(elem).val()==_130){
$(elem).attr("checked",true);
}else{
$(elem).attr("checked",false);
}
}},numberbox:{init:function(_131,_132){
var _133=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_131);
_133.numberbox(_132);
return _133;
},getValue:function(elem){
return $(elem).val();
},setValue:function(elem,_134){
$(elem).val(_134);
},resize:function(elem,_135){
var _136=$(elem);
if($.boxModel==true){
_136.width(_135-(_136.outerWidth()-_136.width()));
}else{
_136.width(_135);
}
}},validatebox:{init:function(_137,_138){
var _139=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_137);
_139.validatebox(_138);
return _139;
},destroy:function(elem){
$(elem).validatebox("destroy");
},getValue:function(elem){
return $(elem).val();
},setValue:function(elem,_13a){
$(elem).val(_13a);
},resize:function(elem,_13b){
var _13c=$(elem);
if($.boxModel==true){
_13c.width(_13b-(_13c.outerWidth()-_13c.width()));
}else{
_13c.width(_13b);
}
}},datebox:{init:function(_13d,_13e){
var _13f=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_13d);
_13f.datebox(_13e);
return _13f;
},destroy:function(elem){
$(elem).datebox("destroy");
},getValue:function(elem){
return $(elem).val();
},setValue:function(elem,_140){
$(elem).val(_140);
},resize:function(elem,_141){
var _142=$(elem);
if($.boxModel==true){
_142.width(_141-(_142.outerWidth()-_142.width()));
}else{
_142.width(_141);
}
}},combobox:{init:function(_143,_144){
var _145=$("<input type=\"text\">").appendTo(_143);
_145.combobox($.extend({},(_144||{}),{onLoadSuccess:function(){
_145[0].loaded=true;
if(_144&&_144.onLoadSuccess){
_144.onLoadSuccess.apply(this,arguments);
}
}}));
if(!_144.url){
_145[0].loaded=true;
}
return _145;
},destroy:function(elem){
$(elem).combobox("destroy");
},getValue:function(elem){
return $(elem).combobox("getValue");
},setValue:function(elem,_146){
(function(){
if($(elem)[0].loaded){
$(elem).combobox("setValue",_146);
}else{
setTimeout(arguments.callee,100);
}
})();
},resize:function(elem,_147){
$(elem).combobox("resize",_147);
}},combotree:{init:function(_148,_149){
var _14a=$("<input type=\"text\">").appendTo(_148);
_14a.combotree(_149);
var tree=_14a.combotree("tree");
tree.tree({onLoadSuccess:function(){
_14a[0].loaded=true;
}});
if(!tree.tree("options").url){
_14a[0].loaded=true;
}
return _14a;
},destroy:function(elem){
$(elem).combotree("destroy");
},getValue:function(elem){
return $(elem).combotree("getValue");
},setValue:function(elem,_14b){
(function(){
if($(elem)[0].loaded){
$(elem).combotree("setValue",_14b);
}else{
setTimeout(arguments.callee,100);
}
})();
},resize:function(elem,_14c){
$(elem).combotree("resize",_14c);
}}};
$.fn.datagrid.defaults={title:null,iconCls:null,border:true,width:"auto",height:"auto",frozenColumns:null,columns:null,toolbar:null,striped:false,method:"post",nowrap:true,idField:null,url:null,loadMsg:"Processing, please wait ...",rownumbers:false,singleSelect:false,fit:false,pagination:false,pageNumber:1,pageSize:10,pageList:[10,20,30,40,50],queryParams:{},sortName:null,sortOrder:"asc",editors:_120,onBeforeLoad:function(_14d){
},onLoadSuccess:function(){
},onLoadError:function(){
},onClickRow:function(_14e,_14f){
},onDblClickRow:function(_150,_151){
},onSortColumn:function(sort,_152){
},onSelect:function(_153,_154){
},onUnselect:function(_155,_156){
},onBeforeEdit:function(_157,_158){
},onAfterEdit:function(_159,_15a,_15b){
},onCancelEdit:function(_15c,_15d){
}};
})(jQuery);

