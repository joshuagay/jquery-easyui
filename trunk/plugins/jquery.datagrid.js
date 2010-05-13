/**
 * jQuery EasyUI 1.1
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
function _1(_2){
var _3=$.data(_2,"datagrid").grid;
var _4=$.data(_2,"datagrid").options;
if(_4.fit==true){
var p=_3.parent();
_4.width=p.width();
_4.height=p.height();
}
if(_4.rownumbers||(_4.frozenColumns&&_4.frozenColumns.length>0)){
$(".datagrid-body .datagrid-cell,.datagrid-body .datagrid-cell-rownumber",_3).addClass("datagrid-cell-height");
}
var _5=_4.width;
if(_5=="auto"){
if($.boxModel==true){
_5=_3.width();
}else{
_5=_3.outerWidth();
}
}else{
if($.boxModel==true){
_5-=_3.outerWidth()-_3.width();
}
}
_3.width(_5);
var _6=_5;
if($.boxModel==false){
_6=_5-_3.outerWidth()+_3.width();
}
$(".datagrid-wrap",_3).width(_6);
$(".datagrid-view",_3).width(_6);
$(".datagrid-view1",_3).width($(".datagrid-view1 table",_3).width());
$(".datagrid-view2",_3).width(_6-$(".datagrid-view1",_3).outerWidth());
$(".datagrid-view1 .datagrid-header",_3).width($(".datagrid-view1",_3).width());
$(".datagrid-view1 .datagrid-body",_3).width($(".datagrid-view1",_3).width());
$(".datagrid-view2 .datagrid-header",_3).width($(".datagrid-view2",_3).width());
$(".datagrid-view2 .datagrid-body",_3).width($(".datagrid-view2",_3).width());
var hh;
var _7=$(".datagrid-view1 .datagrid-header",_3);
var _8=$(".datagrid-view2 .datagrid-header",_3);
_7.css("height",null);
_8.css("height",null);
if($.boxModel==true){
hh=Math.max(_7.height(),_8.height());
}else{
hh=Math.max(_7.outerHeight(),_8.outerHeight());
}
$(".datagrid-view1 .datagrid-header table",_3).height(hh);
$(".datagrid-view2 .datagrid-header table",_3).height(hh);
_7.height(hh);
_8.height(hh);
if(_4.height=="auto"){
$(".datagrid-body",_3).height($(".datagrid-view2 .datagrid-body table",_3).height());
}else{
$(".datagrid-body",_3).height(_4.height-(_3.outerHeight()-_3.height())-$(".datagrid-header",_3).outerHeight(true)-$(".datagrid-title",_3).outerHeight(true)-$(".datagrid-toolbar",_3).outerHeight(true)-$(".datagrid-pager",_3).outerHeight(true));
}
$(".datagrid-view",_3).height($(".datagrid-view2",_3).height());
$(".datagrid-view1",_3).height($(".datagrid-view2",_3).height());
$(".datagrid-view2",_3).css("left",$(".datagrid-view1",_3).outerWidth());
};
function _9(_a,_b){
var _c=$(_a).wrap("<div class=\"datagrid\"></div>").parent();
_c.append("<div class=\"datagrid-wrap\">"+"<div class=\"datagrid-view\">"+"<div class=\"datagrid-view1\">"+"<div class=\"datagrid-header\">"+"<div class=\"datagrid-header-inner\"></div>"+"</div>"+"<div class=\"datagrid-body\">"+"<div class=\"datagrid-body-inner\">"+"<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"></table>"+"</div>"+"</div>"+"</div>"+"<div class=\"datagrid-view2\">"+"<div class=\"datagrid-header\">"+"<div class=\"datagrid-header-inner\"></div>"+"</div>"+"<div class=\"datagrid-body\"></div>"+"</div>"+"<div class=\"datagrid-resize-proxy\"></div>"+"</div>"+"</div>");
var _d=_e($("thead[frozen=true]",_a));
$("thead[frozen=true]",_a).remove();
var _f=_e($("thead",_a));
$("thead",_a).remove();
$(_a).attr({cellspacing:0,cellpadding:0,border:0}).removeAttr("width").removeAttr("height").appendTo($(".datagrid-view2 .datagrid-body",_c));
function _e(_10){
var _11=[];
$("tr",_10).each(function(){
var _12=[];
$("th",this).each(function(){
var th=$(this);
var col={title:th.html(),align:th.attr("align")||"left",sortable:th.attr("sortable")=="true"||false,checkbox:th.attr("checkbox")=="true"||false};
if(th.attr("field")){
col.field=th.attr("field");
}
if(th.attr("formatter")){
col.formatter=eval(th.attr("formatter"));
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
_12.push(col);
});
_11.push(_12);
});
return _11;
};
var _13={total:0,rows:[]};
var _14=_37(_f);
$(".datagrid-view2 .datagrid-body tr",_c).each(function(){
_13.total++;
var col={};
for(var i=0;i<_14.length;i++){
col[_14[i]]=$("td:eq("+i+")",this).html();
}
_13.rows.push(col);
});
_c.bind("_resize",function(){
var _15=$.data(_a,"datagrid").options;
if(_15.fit==true){
_1(_a);
_16(_a);
}
return false;
});
return {grid:_c,frozenColumns:_d,columns:_f,data:_13};
};
function _17(_18){
var t=$("<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody></tbody></table>");
for(var i=0;i<_18.length;i++){
var tr=$("<tr></tr>").appendTo($("tbody",t));
var _19=_18[i];
for(var j=0;j<_19.length;j++){
var col=_19[j];
var _1a="";
if(col.rowspan){
_1a+="rowspan=\""+col.rowspan+"\" ";
}
if(col.colspan){
_1a+="colspan=\""+col.colspan+"\" ";
}
var td=$("<td "+_1a+"></td>").appendTo(tr);
if(col.checkbox){
td.attr("field",col.field);
$("<div class=\"datagrid-header-check\"></div>").html("<input type=\"checkbox\"/>").appendTo(td);
}else{
if(col.field){
td.attr("field",col.field);
td.append("<div class=\"datagrid-cell\"><span></span><span class=\"datagrid-sort-icon\"></span></div>");
$("span",td).html(col.title);
$("span.datagrid-sort-icon",td).html("&nbsp;");
$(".datagrid-cell",td).width(col.width);
$(".datagrid-cell",td).css("text-align",(col.align||"left"));
}else{
$("<div class=\"datagrid-cell-group\"></div>").html(col.title).appendTo(td);
}
}
}
}
return t;
};
function _1b(_1c){
var _1d=$.data(_1c,"datagrid").grid;
var _1e=$.data(_1c,"datagrid").options;
var _1f=$.data(_1c,"datagrid").data;
if(_1e.striped){
$(".datagrid-view1 .datagrid-body tr:odd",_1d).addClass("datagrid-row-alt");
$(".datagrid-view2 .datagrid-body tr:odd",_1d).addClass("datagrid-row-alt");
}
if(_1e.nowrap==false){
$(".datagrid-body .datagrid-cell",_1d).css("white-space","normal");
}
$(".datagrid-header th:has(.datagrid-cell)",_1d).hover(function(){
$(this).addClass("datagrid-header-over");
},function(){
$(this).removeClass("datagrid-header-over");
});
$(".datagrid-body tr",_1d).unbind(".datagrid");
$(".datagrid-body tr",_1d).bind("mouseover.datagrid",function(){
var _20=$(this).attr("datagrid-row-index");
$(".datagrid-body tr[datagrid-row-index="+_20+"]",_1d).addClass("datagrid-row-over");
}).bind("mouseout.datagrid",function(){
var _21=$(this).attr("datagrid-row-index");
$(".datagrid-body tr[datagrid-row-index="+_21+"]",_1d).removeClass("datagrid-row-over");
}).bind("click.datagrid",function(){
var _22=$(this).attr("datagrid-row-index");
if($(this).hasClass("datagrid-row-selected")){
_76(_1c,_22);
}else{
_69(_1c,_22);
}
if(_1e.onClickRow){
_1e.onClickRow.call(this,_22,_1f.rows[_22]);
}
}).bind("dblclick.datagrid",function(){
var _23=$(this).attr("datagrid-row-index");
if(_1e.onDblClickRow){
_1e.onDblClickRow.call(this,_23,_1f.rows[_23]);
}
});
function _24(){
var _25=$(this).parent().attr("field");
var opt=_32(_1c,_25);
if(!opt.sortable){
return;
}
_1e.sortName=_25;
_1e.sortOrder="asc";
var c="datagrid-sort-asc";
if($(this).hasClass("datagrid-sort-asc")){
c="datagrid-sort-desc";
_1e.sortOrder="desc";
}
$(".datagrid-header .datagrid-cell",_1d).removeClass("datagrid-sort-asc");
$(".datagrid-header .datagrid-cell",_1d).removeClass("datagrid-sort-desc");
$(this).addClass(c);
if(_1e.onSortColumn){
_1e.onSortColumn.call(this,_1e.sortName,_1e.sortOrder);
}
_7e(_1c);
};
function _26(){
if($(this).attr("checked")){
$(".datagrid-view2 .datagrid-body tr",_1d).each(function(){
if(!$(this).hasClass("datagrid-row-selected")){
$(this).trigger("click");
}
});
}else{
$(".datagrid-view2 .datagrid-body tr",_1d).each(function(){
if($(this).hasClass("datagrid-row-selected")){
$(this).trigger("click");
}
});
}
};
$(".datagrid-header .datagrid-cell",_1d).unbind(".datagrid");
$(".datagrid-header .datagrid-cell",_1d).bind("click.datagrid",_24);
$(".datagrid-header .datagrid-header-check input[type=checkbox]",_1d).unbind(".datagrid");
$(".datagrid-header .datagrid-header-check input[type=checkbox]",_1d).bind("click.datagrid",_26);
$(".datagrid-header .datagrid-cell",_1d).resizable({handles:"e",minWidth:50,onStartResize:function(e){
$(".datagrid-resize-proxy",_1d).css({left:e.pageX-$(_1d).offset().left-1});
$(".datagrid-resize-proxy",_1d).css("display","block");
},onResize:function(e){
$(".datagrid-resize-proxy",_1d).css({left:e.pageX-$(_1d).offset().left-1});
return false;
},onStopResize:function(e){
_16(_1c,this);
$(".datagrid-view2 .datagrid-header",_1d).scrollLeft($(".datagrid-view2 .datagrid-body",_1d).scrollLeft());
$(".datagrid-resize-proxy",_1d).css("display","none");
}});
$(".datagrid-view1 .datagrid-header .datagrid-cell",_1d).resizable({onStopResize:function(e){
_16(_1c,this);
$(".datagrid-view2 .datagrid-header",_1d).scrollLeft($(".datagrid-view2 .datagrid-body",_1d).scrollLeft());
$(".datagrid-resize-proxy",_1d).css("display","none");
_1(_1c);
}});
var _27=$(".datagrid-view1 .datagrid-body",_1d);
var _28=$(".datagrid-view2 .datagrid-body",_1d);
var _29=$(".datagrid-view2 .datagrid-header",_1d);
_28.scroll(function(){
_29.scrollLeft(_28.scrollLeft());
_27.scrollTop(_28.scrollTop());
});
};
function _16(_2a,_2b){
var _2c=$.data(_2a,"datagrid").grid;
var _2d=$.data(_2a,"datagrid").options;
if(_2b){
fix(_2b);
}else{
$(".datagrid-header .datagrid-cell",_2c).each(function(){
fix(this);
});
}
function fix(_2e){
var _2f=$(_2e);
if(_2f.width()==0){
return;
}
var _30=_2f.parent().attr("field");
$(".datagrid-body td.datagrid-column-"+_30+" .datagrid-cell",_2c).each(function(){
var _31=$(this);
if($.boxModel==true){
_31.width(_2f.outerWidth()-_31.outerWidth()+_31.width());
}else{
_31.width(_2f.outerWidth());
}
});
var col=_32(_2a,_30);
col.width=$.boxModel==true?_2f.width():_2f.outerWidth();
};
};
function _32(_33,_34){
var _35=$.data(_33,"datagrid").options;
if(_35.columns){
for(var i=0;i<_35.columns.length;i++){
var _36=_35.columns[i];
for(var j=0;j<_36.length;j++){
var col=_36[j];
if(col.field==_34){
return col;
}
}
}
}
if(_35.frozenColumns){
for(var i=0;i<_35.frozenColumns.length;i++){
var _36=_35.frozenColumns[i];
for(var j=0;j<_36.length;j++){
var col=_36[j];
if(col.field==_34){
return col;
}
}
}
}
return null;
};
function _37(_38){
if(_38.length==0){
return [];
}
function _39(_3a,_3b,_3c){
var _3d=[];
while(_3d.length<_3c){
var col=_38[_3a][_3b];
if(col.colspan&&parseInt(col.colspan)>1){
var ff=_39(_3a+1,_3e(_3a,_3b),parseInt(col.colspan));
_3d=_3d.concat(ff);
}else{
if(col.field){
_3d.push(col.field);
}
}
_3b++;
}
return _3d;
};
function _3e(_3f,_40){
var _41=0;
for(var i=0;i<_40;i++){
var _42=parseInt(_38[_3f][i].colspan||"1");
if(_42>1){
_41+=_42;
}
}
return _41;
};
var _43=[];
for(var i=0;i<_38[0].length;i++){
var col=_38[0][i];
if(col.colspan&&parseInt(col.colspan)>1){
var ff=_39(1,_3e(0,i),parseInt(col.colspan));
_43=_43.concat(ff);
}else{
if(col.field){
_43.push(col.field);
}
}
}
return _43;
};
function _44(_45,_46){
var _47=$.data(_45,"datagrid").options;
var _48=$.data(_45,"datagrid").grid;
var _49=$.data(_45,"datagrid").selectedRows;
var _4a=_46.rows;
var _4b=function(){
if($.boxModel==false){
return 0;
}
var _4c=$(".datagrid-header .datagrid-cell:first");
var _4d=_4c.outerWidth()-_4c.width();
var t=$(".datagrid-body table",_48);
t.append($("<tr><td><div class=\"datagrid-cell\"></div></td></tr>"));
var _4e=$(".datagrid-cell",t);
var _4f=_4e.outerWidth()-_4e.width();
return _4d-_4f;
};
var _50=_4b();
var _51=_47.rownumbers||(_47.frozenColumns&&_47.frozenColumns.length>0);
function _52(_53,_54){
function _55(row){
if(!_47.idField){
return false;
}
for(var i=0;i<_49.length;i++){
if(_49[i][_47.idField]==row[_47.idField]){
return true;
}
}
return false;
};
var _56=["<tbody>"];
for(var i=0;i<_4a.length;i++){
var row=_4a[i];
var _57=_55(row);
if(i%2&&_47.striped){
_56.push("<tr datagrid-row-index=\""+i+"\" class=\"datagrid-row-alt");
}else{
_56.push("<tr datagrid-row-index=\""+i+"\" class=\"");
}
if(_57==true){
_56.push(" datagrid-row-selected");
}
_56.push("\">");
if(_54){
var _58=i+1;
if(_47.pagination){
_58+=(_47.pageNumber-1)*_47.pageSize;
}
if(_51){
_56.push("<td><div class=\"datagrid-cell-rownumber datagrid-cell-height\">"+_58+"</div></td>");
}else{
_56.push("<td><div class=\"datagrid-cell-rownumber\">"+_58+"</div></td>");
}
}
for(var j=0;j<_53.length;j++){
var _59=_53[j];
var col=_32(_45,_59);
if(col){
var _5a="width:"+(col.width+_50)+"px;";
_5a+="text-align:"+(col.align||"left");
_56.push("<td class=\"datagrid-column-"+_59+"\">");
_56.push("<div style=\""+_5a+"\" ");
if(col.checkbox){
_56.push("class=\"datagrid-cell-check ");
}else{
_56.push("class=\"datagrid-cell ");
}
if(_51){
_56.push("datagrid-cell-height ");
}
_56.push("\">");
if(col.checkbox){
if(_57){
_56.push("<input type=\"checkbox\" checked=\"checked\"/>");
}else{
_56.push("<input type=\"checkbox\"/>");
}
}else{
if(col.formatter){
_56.push(col.formatter(row[_59],row));
}else{
_56.push(row[_59]);
}
}
_56.push("</div>");
_56.push("</td>");
}
}
_56.push("</tr>");
}
_56.push("</tbody>");
return _56.join("");
};
$(".datagrid-body, .datagrid-header",_48).scrollLeft(0).scrollTop(0);
var _5b=_37(_47.columns);
$(".datagrid-view2 .datagrid-body table",_48).html(_52(_5b));
if(_47.rownumbers||(_47.frozenColumns&&_47.frozenColumns.length>0)){
var _5c=_37(_47.frozenColumns);
$(".datagrid-view1 .datagrid-body table",_48).html(_52(_5c,_47.rownumbers));
}
$.data(_45,"datagrid").data=_46;
var _5d=$(".datagrid-pager",_48);
if(_5d.length){
if(_5d.pagination("options").total!=_46.total){
_5d.pagination({total:_46.total});
}
}
_1(_45);
_1b(_45);
};
function _5e(_5f){
var _60=$.data(_5f,"datagrid").options;
var _61=$.data(_5f,"datagrid").grid;
var _62=$.data(_5f,"datagrid").data;
if(_60.idField){
return $.data(_5f,"datagrid").selectedRows;
}
var _63=[];
$(".datagrid-view2 .datagrid-body tr.datagrid-row-selected",_61).each(function(){
var _64=parseInt($(this).attr("datagrid-row-index"));
if(_62.rows[_64]){
_63.push(_62.rows[_64]);
}
});
return _63;
};
function _65(_66){
var _67=$.data(_66,"datagrid").grid;
$(".datagrid-body tr.datagrid-row-selected",_67).removeClass("datagrid-row-selected");
$(".datagrid-body .datagrid-cell-check input[type=checkbox]",_67).attr("checked",false);
var _68=$.data(_66,"datagrid").selectedRows;
while(_68.length>0){
_68.pop();
}
};
function _69(_6a,_6b){
var _6c=$.data(_6a,"datagrid").grid;
var _6d=$.data(_6a,"datagrid").options;
var _6e=$.data(_6a,"datagrid").data;
var _6f=$.data(_6a,"datagrid").selectedRows;
if(_6b<0||_6b>=_6e.rows.length){
return;
}
var tr=$(".datagrid-body tr[datagrid-row-index="+_6b+"]",_6c);
var ck=$(".datagrid-body tr[datagrid-row-index="+_6b+"] .datagrid-cell-check input[type=checkbox]",_6c);
if(_6d.singleSelect==true){
_65(_6a);
}
tr.addClass("datagrid-row-selected");
ck.attr("checked",true);
if(_6d.idField){
var row=_6e.rows[_6b];
for(var i=0;i<_6f.length;i++){
if(_6f[i][_6d.idField]==row[_6d.idField]){
return;
}
}
_6f.push(row);
}
_6d.onSelect.call(_6a,_6b,_6e.rows[_6b]);
};
function _70(_71,_72){
var _73=$.data(_71,"datagrid").options;
var _74=$.data(_71,"datagrid").data;
if(_73.idField){
var _75=-1;
for(var i=0;i<_74.rows.length;i++){
if(_74.rows[i][_73.idField]==_72){
_75=i;
break;
}
}
if(_75>=0){
_69(_71,_75);
}
}
};
function _76(_77,_78){
var _79=$.data(_77,"datagrid").options;
var _7a=$.data(_77,"datagrid").grid;
var _7b=$.data(_77,"datagrid").data;
var _7c=$.data(_77,"datagrid").selectedRows;
if(_78<0||_78>=_7b.rows.length){
return;
}
var tr=$(".datagrid-body tr[datagrid-row-index="+_78+"]",_7a);
var ck=$(".datagrid-body tr[datagrid-row-index="+_78+"] .datagrid-cell-check input[type=checkbox]",_7a);
tr.removeClass("datagrid-row-selected");
ck.attr("checked",false);
var row=_7b.rows[_78];
if(_79.idField){
for(var i=0;i<_7c.length;i++){
var _7d=_7c[i];
if(_7d[_79.idField]==row[_79.idField]){
for(var j=i+1;j<_7c.length;j++){
_7c[j-1]=_7c[j];
}
_7c.pop();
break;
}
}
}
_79.onUnselect.call(_77,_78,row);
};
function _7e(_7f,_80){
var _81=$.data(_7f,"datagrid").grid;
var _82=$.data(_7f,"datagrid").options;
if(_80){
_82.queryParams=_80;
}
if(!_82.url){
return;
}
var _83=$.extend({},_82.queryParams);
if(_82.pagination){
$.extend(_83,{page:_82.pageNumber,rows:_82.pageSize});
}
if(_82.sortName){
$.extend(_83,{sort:_82.sortName,order:_82.sortOrder});
}
_84();
setTimeout(function(){
_85();
},0);
function _85(){
$.ajax({type:_82.method,url:_82.url,data:_83,dataType:"json",success:function(_86){
_87();
if(_82.onBeforeLoad.apply(_7f,arguments)!=false){
_44(_7f,_86);
if(_82.onLoadSuccess){
_82.onLoadSuccess.apply(_7f,arguments);
}
}
},error:function(){
_87();
if(_82.onLoadError){
_82.onLoadError.apply(_7f,arguments);
}
}});
};
function _84(){
$(".datagrid-pager",_81).pagination("loading");
var _88=$(".datagrid-wrap",_81);
$("<div class=\"datagrid-mask\"></div>").css({display:"block",width:_88.width(),height:_88.height()}).appendTo(_88);
$("<div class=\"datagrid-mask-msg\"></div>").html(_82.loadMsg).appendTo(_88).css({display:"block",left:(_88.width()-$(".datagrid-mask-msg",_81).outerWidth())/2,top:(_88.height()-$(".datagrid-mask-msg",_81).outerHeight())/2});
};
function _87(){
_81.find(".datagrid-pager").pagination("loaded");
_81.find(".datagrid-mask").remove();
_81.find(".datagrid-mask-msg").remove();
};
};
$.fn.datagrid=function(_89,_8a){
if(typeof _89=="string"){
switch(_89){
case "options":
return $.data(this[0],"datagrid").options;
case "getPager":
return $.data(this[0],"datagrid").grid.find(".datagrid-pager");
case "resize":
return this.each(function(){
_1(this);
});
case "reload":
return this.each(function(){
_7e(this,_8a);
});
case "fixColumnSize":
return this.each(function(){
_16(this);
});
case "loadData":
return this.each(function(){
_44(this,_8a);
});
case "getSelected":
var _8b=_5e(this[0]);
return _8b.length>0?_8b[0]:null;
case "getSelections":
return _5e(this[0]);
case "clearSelections":
return this.each(function(){
_65(this);
});
case "selectRow":
return this.each(function(){
_69(this,_8a);
});
case "selectRecord":
return this.each(function(){
_70(this,_8a);
});
case "unselectRow":
return this.each(function(){
_76(this,_8a);
});
}
}
_89=_89||{};
return this.each(function(){
var _8c=$.data(this,"datagrid");
var _8d;
if(_8c){
_8d=$.extend(_8c.options,_89);
_8c.options=_8d;
}else{
_8d=$.extend({},$.fn.datagrid.defaults,{width:(parseInt($(this).css("width"))||undefined),height:(parseInt($(this).css("height"))||undefined),fit:($(this).attr("fit")?$(this).attr("fit")=="true":undefined)},_89);
$(this).css("width",null).css("height",null);
var _8e=_9(this,_8d.rownumbers);
if(!_8d.columns){
_8d.columns=_8e.columns;
}
if(!_8d.frozenColumns){
_8d.frozenColumns=_8e.frozenColumns;
}
$.data(this,"datagrid",{options:_8d,grid:_8e.grid,selectedRows:[]});
_44(this,_8e.data);
}
var _8f=this;
var _90=$.data(this,"datagrid").grid;
if(_8d.border==true){
_90.removeClass("datagrid-noborder");
}else{
_90.addClass("datagrid-noborder");
}
if(_8d.frozenColumns){
var t=_17(_8d.frozenColumns);
if(_8d.rownumbers){
var td=$("<td rowspan=\""+_8d.frozenColumns.length+"\"><div class=\"datagrid-header-rownumber\"></div></td>");
if($("tr",t).length==0){
td.wrap("<tr></tr>").parent().appendTo($("tbody",t));
}else{
td.prependTo($("tr:first",t));
}
}
$(".datagrid-view1 .datagrid-header-inner",_90).html(t);
}
if(_8d.columns){
var t=_17(_8d.columns);
$(".datagrid-view2 .datagrid-header-inner",_90).html(t);
}
$(".datagrid-title",_90).remove();
if(_8d.title){
var _91=$("<div class=\"datagrid-title\"><span class=\"datagrid-title-text\"></span></div>");
$(".datagrid-title-text",_91).html(_8d.title);
_91.prependTo(_90);
if(_8d.iconCls){
$(".datagrid-title-text",_91).addClass("datagrid-title-with-icon");
$("<div class=\"datagrid-title-icon\"></div>").addClass(_8d.iconCls).appendTo(_91);
}
}
$(".datagrid-toolbar",_90).remove();
if(_8d.toolbar){
var tb=$("<div class=\"datagrid-toolbar\"></div>").prependTo($(".datagrid-wrap",_90));
for(var i=0;i<_8d.toolbar.length;i++){
var btn=_8d.toolbar[i];
if(btn=="-"){
$("<div class=\"datagrid-btn-separator\"></div>").appendTo(tb);
}else{
var _92=$("<a href=\"javascript:void(0)\"></a>");
_92[0].onclick=eval(btn.handler||function(){
});
_92.css("float","left").text(btn.text).attr("icon",btn.iconCls||"").appendTo(tb).linkbutton({plain:true,disabled:(btn.disabled||false)});
}
}
}
$(".datagrid-pager",_90).remove();
if(_8d.pagination){
var _93=$("<div class=\"datagrid-pager\"></div>").appendTo($(".datagrid-wrap",_90));
_93.pagination({pageNumber:_8d.pageNumber,pageSize:_8d.pageSize,pageList:_8d.pageList,onSelectPage:function(_94,_95){
_8d.pageNumber=_94;
_8d.pageSize=_95;
_7e(_8f);
}});
_8d.pageSize=_93.pagination("options").pageSize;
}
if(!_8c){
_16(_8f);
}
_1(_8f);
if(_8d.url){
_7e(_8f);
}
_1b(_8f);
});
};
$.fn.datagrid.defaults={title:null,iconCls:null,border:true,width:"auto",height:"auto",frozenColumns:null,columns:null,toolbar:null,striped:false,method:"post",nowrap:true,idField:null,url:null,loadMsg:"Processing, please wait ...",rownumbers:false,singleSelect:false,fit:false,pagination:false,pageNumber:1,pageSize:10,pageList:[10,20,30,40,50],queryParams:{},sortName:null,sortOrder:"asc",onLoadSuccess:function(){
},onLoadError:function(){
},onBeforeLoad:function(_96){
},onClickRow:function(_97,_98){
},onDblClickRow:function(_99,_9a){
},onSortColumn:function(_9b,_9c){
},onSelect:function(_9d,_9e){
},onUnselect:function(_9f,_a0){
}};
})(jQuery);

