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
function _3(_4,_5){
var _6=$.data(_4,"datagrid").options;
var _7=$.data(_4,"datagrid").panel;
if(_5){
if(_5.width){
_6.width=_5.width;
}
if(_5.height){
_6.height=_5.height;
}
}
if(_6.fit==true){
var p=_7.panel("panel").parent();
_6.width=p.width();
_6.height=p.height();
}
_7.panel("resize",{width:_6.width,height:_6.height});
setTimeout(function(){
_8();
},0);
function _8(){
var _9=$.data(_4,"datagrid").panel;
var _a=_9.width();
var _b=_9.height();
var _c=_9.find("div.datagrid-view");
var _d=_c.find("div.datagrid-view1");
var _e=_c.find("div.datagrid-view2");
_c.width(_a);
_d.width(_d.find("table").width());
_e.width(_a-_d.outerWidth());
_d.find(">div.datagrid-header,>div.datagrid-body").width(_d.width());
_e.find(">div.datagrid-header,>div.datagrid-body").width(_e.width());
var hh;
var _f=_d.find(">div.datagrid-header");
var _10=_e.find(">div.datagrid-header");
var _11=_f.find("table");
var _12=_10.find("table");
_f.css("height",null);
_10.css("height",null);
_11.css("height",null);
_12.css("height",null);
hh=Math.max(_11.height(),_12.height());
_11.height(hh);
_12.height(hh);
if($.boxModel==true){
_f.height(hh-(_f.outerHeight()-_f.height()));
_10.height(hh-(_10.outerHeight()-_10.height()));
}else{
_f.height(hh);
_10.height(hh);
}
var _13=_c.find("div.datagrid-body");
if(_6.height=="auto"){
_13.height(_e.find("div.datagrid-body table").height()+18);
}else{
_13.height(_b-$(">div.datagrid-header",_e).outerHeight(true)-$(">div.datagrid-toolbar",_9).outerHeight(true)-$(">div.datagrid-pager",_9).outerHeight(true));
}
_c.height(_e.height());
_e.css("left",_d.outerWidth());
};
};
function _14(_15,_16){
var _17=$.data(_15,"datagrid").data.rows;
var _18=$.data(_15,"datagrid").options;
var _19=$.data(_15,"datagrid").panel;
var _1a=_19.find(">div.datagrid-view");
var _1b=_1a.find(">div.datagrid-view1");
var _1c=_1a.find(">div.datagrid-view2");
if(_18.rownumbers||(_18.frozenColumns&&_18.frozenColumns.length>0)){
if(_16>=0){
_1d(_16);
}else{
for(var i=0;i<_17.length;i++){
_1d(i);
}
}
}
if(_18.height=="auto"){
var _1e=_1c.find("div.datagrid-body table").height()+18;
_1b.find("div.datagrid-body").height(_1e);
_1c.find("div.datagrid-body").height(_1e);
_1a.height(_1c.height());
}
function _1d(_1f){
var tr1=_1b.find("tr[datagrid-row-index="+_1f+"]");
var tr2=_1c.find("tr[datagrid-row-index="+_1f+"]");
tr1.css("height",null);
tr2.css("height",null);
var _20=Math.max(tr1.height(),tr2.height());
tr1.css("height",_20);
tr2.css("height",_20);
};
};
function _21(_22,_23){
function _24(_25){
var _26=[];
$("tr",_25).each(function(){
var _27=[];
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
_27.push(col);
});
_26.push(_27);
});
return _26;
};
var _28=$("<div class=\"datagrid-wrap\">"+"<div class=\"datagrid-view\">"+"<div class=\"datagrid-view1\">"+"<div class=\"datagrid-header\">"+"<div class=\"datagrid-header-inner\"></div>"+"</div>"+"<div class=\"datagrid-body\">"+"<div class=\"datagrid-body-inner\"></div>"+"</div>"+"</div>"+"<div class=\"datagrid-view2\">"+"<div class=\"datagrid-header\">"+"<div class=\"datagrid-header-inner\"></div>"+"</div>"+"<div class=\"datagrid-body\"></div>"+"</div>"+"<div class=\"datagrid-resize-proxy\"></div>"+"</div>"+"</div>").insertAfter(_22);
_28.panel({doSize:false});
_28.panel("panel").addClass("datagrid").bind("_resize",function(){
var _29=$.data(_22,"datagrid").options;
if(_29.fit==true){
_3(_22);
setTimeout(function(){
_2a(_22);
},0);
}
return false;
});
$(_22).hide().appendTo($(">div.datagrid-view",_28));
var _2b=_24($("thead[frozen=true]",_22));
var _2c=_24($("thead[frozen!=true]",_22));
return {panel:_28,frozenColumns:_2b,columns:_2c};
};
function _2d(_2e){
var _2f={total:0,rows:[]};
var _30=_31(_2e,true).concat(_31(_2e,false));
$(_2e).find("tbody tr").each(function(){
_2f.total++;
var col={};
for(var i=0;i<_30.length;i++){
col[_30[i]]=$("td:eq("+i+")",this).html();
}
_2f.rows.push(col);
});
return _2f;
};
function _32(_33){
var _34=$.data(_33,"datagrid").options;
var _35=$.data(_33,"datagrid").panel;
_35.panel(_34);
if(_34.frozenColumns){
var t=_36(_34.frozenColumns);
if(_34.rownumbers){
var td=$("<td rowspan=\""+_34.frozenColumns.length+"\"><div class=\"datagrid-header-rownumber\"></div></td>");
if($("tr",t).length==0){
td.wrap("<tr></tr>").parent().appendTo($("tbody",t));
}else{
td.prependTo($("tr:first",t));
}
}
$("div.datagrid-view1 div.datagrid-header-inner",_35).html(t);
}
if(_34.columns){
var t=_36(_34.columns);
$("div.datagrid-view2 div.datagrid-header-inner",_35).html(t);
}
$("div.datagrid-toolbar",_35).remove();
if(_34.toolbar){
var tb=$("<div class=\"datagrid-toolbar\"></div>").prependTo(_35);
for(var i=0;i<_34.toolbar.length;i++){
var btn=_34.toolbar[i];
if(btn=="-"){
$("<div class=\"datagrid-btn-separator\"></div>").appendTo(tb);
}else{
var _37=$("<a href=\"javascript:void(0)\"></a>");
_37[0].onclick=eval(btn.handler||function(){
});
_37.css("float","left").appendTo(tb).linkbutton($.extend({},btn,{plain:true}));
}
}
}
$("div.datagrid-pager",_35).remove();
if(_34.pagination){
var _38=$("<div class=\"datagrid-pager\"></div>").appendTo(_35);
_38.pagination({pageNumber:_34.pageNumber,pageSize:_34.pageSize,pageList:_34.pageList,onSelectPage:function(_39,_3a){
_34.pageNumber=_39;
_34.pageSize=_3a;
_3b(_33);
}});
_34.pageSize=_38.pagination("options").pageSize;
}
};
function _36(_3c){
var t=$("<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody></tbody></table>");
for(var i=0;i<_3c.length;i++){
var tr=$("<tr></tr>").appendTo($("tbody",t));
var _3d=_3c[i];
for(var j=0;j<_3d.length;j++){
var col=_3d[j];
var _3e="";
if(col.rowspan){
_3e+="rowspan=\""+col.rowspan+"\" ";
}
if(col.colspan){
_3e+="colspan=\""+col.colspan+"\" ";
}
var td=$("<td "+_3e+"></td>").appendTo(tr);
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
function _3f(_40){
var _41=$.data(_40,"datagrid").panel;
var _42=$.data(_40,"datagrid").options;
var _43=$.data(_40,"datagrid").data;
var _44=_41.find("div.datagrid-body");
if(_42.striped){
_44.find("tr:odd").addClass("datagrid-row-alt");
}
_44.find("tr").unbind(".datagrid").bind("mouseenter.datagrid",function(){
var _45=$(this).attr("datagrid-row-index");
_44.find("tr[datagrid-row-index="+_45+"]").addClass("datagrid-row-over");
}).bind("mouseleave.datagrid",function(){
var _46=$(this).attr("datagrid-row-index");
_44.find("tr[datagrid-row-index="+_46+"]").removeClass("datagrid-row-over");
}).bind("click.datagrid",function(){
var _47=$(this).attr("datagrid-row-index");
if(_42.singleSelect==true){
_a3(_40);
_b6(_40,_47);
}else{
if($(this).hasClass("datagrid-row-selected")){
_c6(_40,_47);
}else{
_b6(_40,_47);
}
}
if(_42.onClickRow){
_42.onClickRow.call(_40,_47,_43.rows[_47]);
}
}).bind("dblclick.datagrid",function(){
var _48=$(this).attr("datagrid-row-index");
if(_42.onDblClickRow){
_42.onDblClickRow.call(_40,_48,_43.rows[_48]);
}
});
_44.find("div.datagrid-cell-check input[type=checkbox]").unbind(".datagrid").bind("click.datagrid",function(e){
var _49=$(this).parent().parent().parent().attr("datagrid-row-index");
if(_42.singleSelect){
_a3(_40);
_b6(_40,_49);
}else{
if($(this).attr("checked")){
_b6(_40,_49);
}else{
_c6(_40,_49);
}
}
e.stopPropagation();
});
var _4a=_41.find("div.datagrid-header");
_4a.find("td:has(div.datagrid-cell)").unbind(".datagrid").bind("mouseenter.datagrid",function(){
$(this).addClass("datagrid-header-over");
}).bind("mouseleave.datagrid",function(){
$(this).removeClass("datagrid-header-over");
});
_4a.find("div.datagrid-cell").unbind(".datagrid").bind("click.datagrid",function(){
var _4b=$(this).parent().attr("field");
var opt=_5f(_40,_4b);
if(!opt.sortable){
return;
}
_42.sortName=_4b;
_42.sortOrder="asc";
var c="datagrid-sort-asc";
if($(this).hasClass("datagrid-sort-asc")){
c="datagrid-sort-desc";
_42.sortOrder="desc";
}
_4a.find("div.datagrid-cell").removeClass("datagrid-sort-asc datagrid-sort-desc");
$(this).addClass(c);
if(_42.onSortColumn){
_42.onSortColumn.call(_40,_42.sortName,_42.sortOrder);
}
if(_42.remoteSort){
_3b(_40);
}else{
_7f(_40,_43);
}
});
_4a.find("input[type=checkbox]").unbind(".datagrid").bind("click.datagrid",function(){
if(_42.singleSelect){
return false;
}
if($(this).attr("checked")){
_a7(_40);
}else{
_a5(_40);
}
});
var _4c=_41.find(">div.datagrid-view");
var _4d=_4c.find(">div.datagrid-view1");
var _4e=_4c.find(">div.datagrid-view2");
var _4f=_4e.find("div.datagrid-header");
var _50=_4d.find("div.datagrid-body");
_4e.find("div.datagrid-body").unbind(".datagrid").bind("scroll.datagrid",function(){
_4f.scrollLeft($(this).scrollLeft());
_50.scrollTop($(this).scrollTop());
});
_4a.find("div.datagrid-cell").resizable({handles:"e",minWidth:50,onStartResize:function(e){
var _51=_4c.find(">div.datagrid-resize-proxy");
_51.css({left:e.pageX-$(_41).offset().left-1});
_51.css("display","block");
},onResize:function(e){
var _52=_4c.find(">div.datagrid-resize-proxy");
_52.css({display:"block",left:e.pageX-$(_41).offset().left-1});
return false;
},onStopResize:function(e){
_2a(_40,this);
var _53=_41.find("div.datagrid-view2");
_53.find("div.datagrid-header").scrollLeft(_53.find("div.datagrid-body").scrollLeft());
_4c.find(">div.datagrid-resize-proxy").css("display","none");
_42.onResizeColumn.call(_40,$(this).parent().attr("field"),$(this).outerWidth());
}});
$("div.datagrid-view1 div.datagrid-header div.datagrid-cell",_41).resizable({onStopResize:function(e){
_2a(_40,this);
var _54=_41.find("div.datagrid-view2");
_54.find("div.datagrid-header").scrollLeft(_54.find("div.datagrid-body").scrollLeft());
_4c.find(">div.datagrid-resize-proxy").css("display","none");
_42.onResizeColumn.call(_40,$(this).parent().attr("field"),$(this).outerWidth());
_3(_40);
}});
};
function _2a(_55,_56){
var _57=$.data(_55,"datagrid").panel;
var _58=$.data(_55,"datagrid").options;
var _59=_57.find("div.datagrid-body");
if(_56){
fix(_56);
}else{
$("div.datagrid-header div.datagrid-cell",_57).each(function(){
fix(this);
});
}
_60(_55);
setTimeout(function(){
_14(_55);
_69(_55);
},0);
function fix(_5a){
var _5b=$(_5a);
if(_5b.width()==0){
return;
}
var _5c=_5b.parent().attr("field");
_59.find("td[field="+_5c+"]").each(function(){
var td=$(this);
var _5d=td.attr("colspan")||1;
if(_5d==1){
var _5e=td.find("div.datagrid-cell");
if($.boxModel==true){
_5e.width(_5b.width());
}else{
_5e.width(_5b.outerWidth());
}
}
});
var col=_5f(_55,_5c);
col.width=$.boxModel==true?_5b.width():_5b.outerWidth();
};
};
function _60(_61){
var _62=$.data(_61,"datagrid").panel;
var _63=_62.find("div.datagrid-header");
_62.find("div.datagrid-body td.datagrid-td-merged").each(function(){
var td=$(this);
var _64=td.attr("colspan")||1;
var _65=td.attr("field");
var _66=_63.find("td[field="+_65+"]");
var _67=_66.width();
for(var i=1;i<_64;i++){
_66=_66.next();
_67+=_66.outerWidth();
}
var _68=td.find(">div.datagrid-cell");
if($.boxModel==true){
_68.width(_67-(_68.outerWidth()-_68.width()));
}else{
_68.width(_67);
}
});
};
function _69(_6a){
var _6b=$.data(_6a,"datagrid").panel;
_6b.find("div.datagrid-editable").each(function(){
var ed=$.data(this,"datagrid.editor");
if(ed.actions.resize){
ed.actions.resize(ed.target,$(this).width());
}
});
};
function _5f(_6c,_6d){
var _6e=$.data(_6c,"datagrid").options;
if(_6e.columns){
for(var i=0;i<_6e.columns.length;i++){
var _6f=_6e.columns[i];
for(var j=0;j<_6f.length;j++){
var col=_6f[j];
if(col.field==_6d){
return col;
}
}
}
}
if(_6e.frozenColumns){
for(var i=0;i<_6e.frozenColumns.length;i++){
var _6f=_6e.frozenColumns[i];
for(var j=0;j<_6f.length;j++){
var col=_6f[j];
if(col.field==_6d){
return col;
}
}
}
}
return null;
};
function _31(_70,_71){
var _72=$.data(_70,"datagrid").options;
var _73=(_71==true)?(_72.frozenColumns||[[]]):_72.columns;
if(_73.length==0){
return [];
}
function _74(_75,_76,_77){
var _78=[];
while(_78.length<_77){
var col=_73[_75][_76];
if(col.colspan&&parseInt(col.colspan)>1){
var ff=_74(_75+1,_79(_75,_76),parseInt(col.colspan));
_78=_78.concat(ff);
}else{
if(col.field){
_78.push(col.field);
}
}
_76++;
}
return _78;
};
function _79(_7a,_7b){
var _7c=0;
for(var i=0;i<_7b;i++){
var _7d=parseInt(_73[_7a][i].colspan||"1");
if(_7d>1){
_7c+=_7d;
}
}
return _7c;
};
var _7e=[];
for(var i=0;i<_73[0].length;i++){
var col=_73[0][i];
if(col.colspan&&parseInt(col.colspan)>1){
var ff=_74(1,_79(0,i),parseInt(col.colspan));
_7e=_7e.concat(ff);
}else{
if(col.field){
_7e.push(col.field);
}
}
}
return _7e;
};
function _7f(_80,_81){
var _82=$.data(_80,"datagrid").options;
var _83=$.data(_80,"datagrid").panel;
var _84=$.data(_80,"datagrid").selectedRows;
var _85=_81.rows;
$.data(_80,"datagrid").data=_81;
if(!_82.remoteSort){
var opt=_5f(_80,_82.sortName);
if(opt){
var _86=opt.sorter||function(a,b){
return (a>b?1:-1);
};
_81.rows.sort(function(r1,r2){
return _86(r1[_82.sortName],r2[_82.sortName])*(_82.sortOrder=="asc"?1:-1);
});
}
}
var _87=_83.find(">div.datagrid-view");
var _88=_87.find(">div.datagrid-view1");
var _89=_87.find(">div.datagrid-view2");
var _8a=_31(_80,false);
_89.find(">div.datagrid-body").html(_8b(_8a));
if(_82.rownumbers||(_82.frozenColumns&&_82.frozenColumns.length>0)){
var _8c=_31(_80,true);
_88.find(">div.datagrid-body>div.datagrid-body-inner").html(_8b(_8c,_82.rownumbers));
}
_82.onLoadSuccess.call(_80,_81);
_89.find(">div.datagrid-body").scrollLeft(0).scrollTop(0);
var _8d=$(">div.datagrid-pager",_83);
if(_8d.length){
if(_8d.pagination("options").total!=_81.total){
_8d.pagination({total:_81.total});
}
}
_14(_80);
_3f(_80);
function _8b(_8e,_8f){
function _90(row){
if(!_82.idField){
return false;
}
for(var i=0;i<_84.length;i++){
if(_84[i][_82.idField]==row[_82.idField]){
_84[i]=row;
return true;
}
}
return false;
};
var _91=["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_85.length;i++){
var row=_85[i];
var _92=_90(row);
if(i%2&&_82.striped){
_91.push("<tr datagrid-row-index=\""+i+"\" class=\"datagrid-row-alt");
}else{
_91.push("<tr datagrid-row-index=\""+i+"\" class=\"");
}
if(_92==true){
_91.push(" datagrid-row-selected");
}
_91.push("\">");
if(_8f){
var _93=i+1;
if(_82.pagination){
_93+=(_82.pageNumber-1)*_82.pageSize;
}
_91.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">"+_93+"</div></td>");
}
for(var j=0;j<_8e.length;j++){
var _94=_8e[j];
var col=_5f(_80,_94);
if(col){
var _95="width:"+(col.width)+"px;";
_95+="text-align:"+(col.align||"left")+";";
_95+=_82.nowrap==false?"white-space:normal;":"";
_91.push("<td field=\""+_94+"\">");
_91.push("<div style=\""+_95+"\" ");
if(col.checkbox){
_91.push("class=\"datagrid-cell-check ");
}else{
_91.push("class=\"datagrid-cell ");
}
_91.push("\">");
if(col.checkbox){
if(_92){
_91.push("<input type=\"checkbox\" checked=\"checked\"/>");
}else{
_91.push("<input type=\"checkbox\"/>");
}
}else{
if(col.formatter){
_91.push(col.formatter(row[_94],row,i));
}else{
_91.push(row[_94]);
}
}
_91.push("</div>");
_91.push("</td>");
}
}
_91.push("</tr>");
}
_91.push("</tbody></table>");
return _91.join("");
};
};
function _96(_97,row){
var _98=$.data(_97,"datagrid").options;
var _99=$.data(_97,"datagrid").data.rows;
if(typeof row=="object"){
return _99.indexOf(row);
}else{
for(var i=0;i<_99.length;i++){
if(_99[i][_98.idField]==row){
return i;
}
}
return -1;
}
};
function _9a(_9b){
var _9c=$.data(_9b,"datagrid").options;
var _9d=$.data(_9b,"datagrid").panel;
var _9e=$.data(_9b,"datagrid").data;
if(_9c.idField){
var _9f=$.data(_9b,"datagrid").deletedRows;
var _a0=$.data(_9b,"datagrid").selectedRows;
var _a1=[];
for(var i=0;i<_a0.length;i++){
(function(){
var row=_a0[i];
for(var j=0;j<_9f.length;j++){
if(row[_9c.idField]==_9f[j][_9c.idField]){
return;
}
}
_a1.push(row);
})();
}
return _a1;
}
var _a1=[];
$("div.datagrid-view2 div.datagrid-body tr.datagrid-row-selected",_9d).each(function(){
var _a2=parseInt($(this).attr("datagrid-row-index"));
if(_9e.rows[_a2]){
_a1.push(_9e.rows[_a2]);
}
});
return _a1;
};
function _a3(_a4){
_a5(_a4);
var _a6=$.data(_a4,"datagrid").selectedRows;
while(_a6.length>0){
_a6.pop();
}
};
function _a7(_a8){
var _a9=$.data(_a8,"datagrid").options;
var _aa=$.data(_a8,"datagrid").panel;
var _ab=$.data(_a8,"datagrid").data;
var _ac=$.data(_a8,"datagrid").selectedRows;
var _ad=_ab.rows;
var _ae=_aa.find("div.datagrid-body");
$("tr",_ae).addClass("datagrid-row-selected");
$("div.datagrid-cell-check input[type=checkbox]",_ae).attr("checked",true);
for(var _af=0;_af<_ad.length;_af++){
if(_a9.idField){
(function(){
var row=_ad[_af];
for(var i=0;i<_ac.length;i++){
if(_ac[i][_a9.idField]==row[_a9.idField]){
return;
}
}
_ac.push(row);
})();
}
}
_a9.onSelectAll.call(_a8,_ad);
};
function _a5(_b0){
var _b1=$.data(_b0,"datagrid").options;
var _b2=$.data(_b0,"datagrid").panel;
var _b3=$.data(_b0,"datagrid").data;
var _b4=$.data(_b0,"datagrid").selectedRows;
$("div.datagrid-body tr.datagrid-row-selected",_b2).removeClass("datagrid-row-selected");
$("div.datagrid-body div.datagrid-cell-check input[type=checkbox]",_b2).attr("checked",false);
if(_b1.idField){
for(var _b5=0;_b5<_b3.rows.length;_b5++){
var id=_b3.rows[_b5][_b1.idField];
for(var i=0;i<_b4.length;i++){
if(_b4[i][_b1.idField]==id){
_b4.splice(i,1);
break;
}
}
}
}
_b1.onUnselectAll.call(_b0,_b3.rows);
};
function _b6(_b7,_b8){
var _b9=$.data(_b7,"datagrid").panel;
var _ba=$.data(_b7,"datagrid").options;
var _bb=$.data(_b7,"datagrid").data;
var _bc=$.data(_b7,"datagrid").selectedRows;
if(_b8<0||_b8>=_bb.rows.length){
return;
}
var tr=$("div.datagrid-body tr[datagrid-row-index="+_b8+"]",_b9);
var ck=$("div.datagrid-cell-check input[type=checkbox]",tr);
tr.addClass("datagrid-row-selected");
ck.attr("checked",true);
var _bd=_b9.find("div.datagrid-view2");
var _be=_bd.find("div.datagrid-header").outerHeight();
var _bf=_bd.find("div.datagrid-body");
var top=tr.position().top-_be;
if(top<=0){
_bf.scrollTop(_bf.scrollTop()+top);
}else{
if(top+tr.outerHeight()>_bf.height()-18){
_bf.scrollTop(_bf.scrollTop()+top+tr.outerHeight()-_bf.height()+18);
}
}
if(_ba.idField){
var row=_bb.rows[_b8];
for(var i=0;i<_bc.length;i++){
if(_bc[i][_ba.idField]==row[_ba.idField]){
return;
}
}
_bc.push(row);
}
_ba.onSelect.call(_b7,_b8,_bb.rows[_b8]);
};
function _c0(_c1,_c2){
var _c3=$.data(_c1,"datagrid").options;
var _c4=$.data(_c1,"datagrid").data;
if(_c3.idField){
var _c5=-1;
for(var i=0;i<_c4.rows.length;i++){
if(_c4.rows[i][_c3.idField]==_c2){
_c5=i;
break;
}
}
if(_c5>=0){
_b6(_c1,_c5);
}
}
};
function _c6(_c7,_c8){
var _c9=$.data(_c7,"datagrid").options;
var _ca=$.data(_c7,"datagrid").panel;
var _cb=$.data(_c7,"datagrid").data;
var _cc=$.data(_c7,"datagrid").selectedRows;
if(_c8<0||_c8>=_cb.rows.length){
return;
}
var _cd=_ca.find("div.datagrid-body");
var tr=$("tr[datagrid-row-index="+_c8+"]",_cd);
var ck=$("tr[datagrid-row-index="+_c8+"] div.datagrid-cell-check input[type=checkbox]",_cd);
tr.removeClass("datagrid-row-selected");
ck.attr("checked",false);
var row=_cb.rows[_c8];
if(_c9.idField){
for(var i=0;i<_cc.length;i++){
var _ce=_cc[i];
if(_ce[_c9.idField]==row[_c9.idField]){
for(var j=i+1;j<_cc.length;j++){
_cc[j-1]=_cc[j];
}
_cc.pop();
break;
}
}
}
_c9.onUnselect.call(_c7,_c8,row);
};
function _cf(_d0,_d1){
var _d2=$.data(_d0,"datagrid").options;
var _d3=$.data(_d0,"datagrid").panel;
var _d4=$.data(_d0,"datagrid").data;
var _d5=$.data(_d0,"datagrid").editingRows;
var tr=$("div.datagrid-body tr[datagrid-row-index="+_d1+"]",_d3);
if(tr.hasClass("datagrid-row-editing")){
return;
}
if(_d2.onBeforeEdit.call(_d0,_d1,_d4.rows[_d1])==false){
return;
}
tr.addClass("datagrid-row-editing");
_d6(_d0,_d1);
_69(_d0);
_d5.push(_d4.rows[_d1]);
_d7(_d0,_d1,_d4.rows[_d1]);
_d8(_d0,_d1);
};
function _d9(_da,_db,_dc){
var _dd=$.data(_da,"datagrid").options;
var _de=$.data(_da,"datagrid").panel;
var _df=$.data(_da,"datagrid").data;
var _e0=$.data(_da,"datagrid").updatedRows;
var _e1=$.data(_da,"datagrid").insertedRows;
var _e2=$.data(_da,"datagrid").editingRows;
var row=_df.rows[_db];
var tr=$("div.datagrid-body tr[datagrid-row-index="+_db+"]",_de);
if(!tr.hasClass("datagrid-row-editing")){
return;
}
if(!_dc){
if(!_d8(_da,_db)){
return;
}
var _e3=false;
var _e4={};
var nd=_e5(_da,_db);
for(var _e6 in nd){
if(row[_e6]!=nd[_e6]){
row[_e6]=nd[_e6];
_e3=true;
_e4[_e6]=nd[_e6];
}
}
if(_e3){
if(_e1.indexOf(row)==-1){
if(_e0.indexOf(row)==-1){
_e0.push(row);
}
}
}
}
tr.removeClass("datagrid-row-editing");
_e2.remove(row);
_e7(_da,_db);
_e8(_da,_db);
if(!_dc){
_dd.onAfterEdit.call(_da,_db,row,_e4);
}else{
_dd.onCancelEdit.call(_da,_db,row);
}
};
function _d7(_e9,_ea,_eb){
var _ec=$.data(_e9,"datagrid").panel;
var tr=$("div.datagrid-body tr[datagrid-row-index="+_ea+"]",_ec);
if(!tr.hasClass("datagrid-row-editing")){
return;
}
tr.find("div.datagrid-editable").each(function(){
var _ed=$(this).parent().attr("field");
var ed=$.data(this,"datagrid.editor");
ed.actions.setValue(ed.target,_eb[_ed]);
});
};
function _e5(_ee,_ef){
var _f0=$.data(_ee,"datagrid").panel;
var tr=$("div.datagrid-body tr[datagrid-row-index="+_ef+"]",_f0);
if(!tr.hasClass("datagrid-row-editing")){
return {};
}
var _f1={};
tr.find("div.datagrid-editable").each(function(){
var _f2=$(this).parent().attr("field");
var ed=$.data(this,"datagrid.editor");
_f1[_f2]=ed.actions.getValue(ed.target);
});
return _f1;
};
function _f3(_f4,_f5){
var _f6=[];
var _f7=$.data(_f4,"datagrid").panel;
var tr=$("div.datagrid-body tr[datagrid-row-index="+_f5+"]",_f7);
tr.find(">td").each(function(){
var _f8=$(this).find("div.datagrid-editable");
if(_f8.length){
var ed=$.data(_f8[0],"datagrid.editor");
_f6.push(ed);
}
});
return _f6;
};
function _f9(_fa,_fb){
var _fc=_f3(_fa,_fb.index);
for(var i=0;i<_fc.length;i++){
if(_fc[i].field==_fb.field){
return _fc[i];
}
}
return null;
};
function _d6(_fd,_fe){
var _ff=$.data(_fd,"datagrid").options;
var _100=$.data(_fd,"datagrid").panel;
var tr=$("div.datagrid-body tr[datagrid-row-index="+_fe+"]",_100);
tr.find(">td").each(function(){
var cell=$(this).find("div.datagrid-cell");
var _101=$(this).attr("field");
var col=_5f(_fd,_101);
if(col&&col.editor){
var _102,_103;
if(typeof col.editor=="string"){
_102=col.editor;
}else{
_102=col.editor.type;
_103=col.editor.options;
}
var _104=_ff.editors[_102];
if(_104){
var _105=cell.outerWidth();
cell.addClass("datagrid-editable");
if($.boxModel==true){
cell.width(_105-(cell.outerWidth()-cell.width()));
}
cell.html("<table border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tr><td></td></tr></table>");
cell.find("table").attr("align",col.align);
$.data(cell[0],"datagrid.editor",{actions:_104,target:_104.init(cell.find("td"),_103),field:_101,type:_102});
}
}
});
_14(_fd,_fe);
};
function _e7(_106,_107){
var _108=$.data(_106,"datagrid").panel;
var tr=$("div.datagrid-body tr[datagrid-row-index="+_107+"]",_108);
tr.find(">td").each(function(){
var cell=$(this).find("div.datagrid-editable");
if(cell.length){
var ed=$.data(cell[0],"datagrid.editor");
if(ed.actions.destroy){
ed.actions.destroy(ed.target);
}
$.removeData(cell[0],"datagrid.editor");
var _109=cell.outerWidth();
cell.removeClass("datagrid-editable");
if($.boxModel==true){
cell.width(_109-(cell.outerWidth()-cell.width()));
}
}
});
};
function _d8(_10a,_10b){
var _10c=$.data(_10a,"datagrid").panel;
var tr=$("div.datagrid-body tr[datagrid-row-index="+_10b+"]",_10c);
if(!tr.hasClass("datagrid-row-editing")){
return true;
}
var vbox=tr.find(".validatebox-text");
vbox.validatebox("validate");
vbox.trigger("mouseleave");
var _10d=tr.find(".validatebox-invalid");
return _10d.length==0;
};
function _10e(_10f,_110){
var _111=$.data(_10f,"datagrid").insertedRows;
var _112=$.data(_10f,"datagrid").deletedRows;
var _113=$.data(_10f,"datagrid").updatedRows;
if(!_110){
var rows=[];
rows=rows.concat(_111);
rows=rows.concat(_112);
rows=rows.concat(_113);
return rows;
}else{
if(_110=="inserted"){
return _111;
}else{
if(_110=="deleted"){
return _112;
}else{
if(_110=="updated"){
return _113;
}
}
}
}
return [];
};
function _e8(_114,_115){
var _116=$.data(_114,"datagrid").panel;
var data=$.data(_114,"datagrid").data;
_116.find("div.datagrid-body tr[datagrid-row-index="+_115+"] td").each(function(){
var cell=$(this).find("div.datagrid-cell");
var _117=$(this).attr("field");
var col=_5f(_114,_117);
if(col){
if(col.formatter){
cell.html(col.formatter(data.rows[_115][_117],data.rows[_115],_115));
}else{
cell.html(data.rows[_115][_117]);
}
}
});
_14(_114,_115);
};
function _118(_119,_11a){
var data=$.data(_119,"datagrid").data;
var _11b=$.data(_119,"datagrid").insertedRows;
var _11c=$.data(_119,"datagrid").deletedRows;
var _11d=$.data(_119,"datagrid").editingRows;
var _11e=$.data(_119,"datagrid").selectedRows;
var row=data.rows[_11a];
data.total-=1;
if(_11b.indexOf(row)>=0){
_11b.remove(row);
_11e.remove(row);
}else{
_11c.push(row);
}
if(_11d.indexOf(row)>=0){
_11d.remove(row);
_e7(_119,_11a);
}
var _11f=[];
for(var i=0;i<_11d.length;i++){
var idx=data.rows.indexOf(_11d[i]);
_11f.push(_e5(_119,idx));
_e7(_119,idx);
}
data.rows.remove(row);
_7f(_119,data);
var _120=[];
for(var i=0;i<_11d.length;i++){
var idx=data.rows.indexOf(_11d[i]);
_120.push(idx);
}
_11d.splice(0,_11d.length);
for(var i=0;i<_120.length;i++){
_cf(_119,_120[i]);
_d7(_119,_120[i],_11f[i]);
}
};
function _121(_122,row){
if(!row){
return;
}
var _123=$.data(_122,"datagrid").panel;
var data=$.data(_122,"datagrid").data;
var _124=$.data(_122,"datagrid").insertedRows;
var _125=$.data(_122,"datagrid").editingRows;
data.total+=1;
data.rows.push(row);
_124.push(row);
var _126=[];
for(var i=0;i<_125.length;i++){
var idx=data.rows.indexOf(_125[i]);
_126.push(_e5(_122,idx));
_e7(_122,idx);
}
_7f(_122,data);
var _127=[];
for(var i=0;i<_125.length;i++){
var idx=data.rows.indexOf(_125[i]);
_127.push(idx);
}
_125.splice(0,_125.length);
for(var i=0;i<_127.length;i++){
_cf(_122,_127[i]);
_d7(_122,_127[i],_126[i]);
}
var _128=$("div.datagrid-view2 div.datagrid-body",_123);
var _129=_128.find(">table");
var top=_129.outerHeight()-_128.outerHeight();
_128.scrollTop(top+20);
};
function _12a(_12b){
var data=$.data(_12b,"datagrid").data;
var rows=data.rows;
var _12c=[];
for(var i=0;i<rows.length;i++){
_12c.push($.extend({},rows[i]));
}
$.data(_12b,"datagrid").originalRows=_12c;
$.data(_12b,"datagrid").updatedRows=[];
$.data(_12b,"datagrid").insertedRows=[];
$.data(_12b,"datagrid").deletedRows=[];
$.data(_12b,"datagrid").editingRows=[];
};
function _12d(_12e){
var data=$.data(_12e,"datagrid").data;
var ok=true;
for(var i=0,len=data.rows.length;i<len;i++){
if(_d8(_12e,i)){
_d9(_12e,i,false);
}else{
ok=false;
}
}
if(ok){
_12a(_12e);
}
};
function _12f(_130){
var opts=$.data(_130,"datagrid").options;
var _131=$.data(_130,"datagrid").originalRows;
var _132=$.data(_130,"datagrid").insertedRows;
var _133=$.data(_130,"datagrid").deletedRows;
var _134=$.data(_130,"datagrid").updatedRows;
var _135=$.data(_130,"datagrid").selectedRows;
var data=$.data(_130,"datagrid").data;
for(var i=0;i<data.rows.length;i++){
_d9(_130,i,true);
}
var rows=[];
var _136={};
if(opts.idField){
for(var i=0;i<_135.length;i++){
_136[_135[i][opts.idField]]=true;
}
}
_135.splice(0,_135.length);
for(var i=0;i<_131.length;i++){
var row=$.extend({},_131[i]);
rows.push(row);
if(_136[row[opts.idField]]){
_135.push(row);
}
}
data.total+=_133.length-_132.length;
data.rows=rows;
_7f(_130,data);
$.data(_130,"datagrid").updatedRows=[];
$.data(_130,"datagrid").insertedRows=[];
$.data(_130,"datagrid").deletedRows=[];
$.data(_130,"datagrid").editingRows=[];
};
function _3b(_137,_138){
var _139=$.data(_137,"datagrid").panel;
var opts=$.data(_137,"datagrid").options;
if(_138){
opts.queryParams=_138;
}
if(!opts.url){
return;
}
var _13a=$.extend({},opts.queryParams);
if(opts.pagination){
$.extend(_13a,{page:opts.pageNumber,rows:opts.pageSize});
}
if(opts.sortName){
$.extend(_13a,{sort:opts.sortName,order:opts.sortOrder});
}
if(opts.onBeforeLoad.call(_137,_13a)==false){
return;
}
_13b();
setTimeout(function(){
_13c();
},0);
function _13c(){
$.ajax({type:opts.method,url:opts.url,data:_13a,dataType:"json",success:function(data){
setTimeout(function(){
_13d();
},0);
_7f(_137,data);
setTimeout(function(){
_12a(_137);
},0);
},error:function(){
setTimeout(function(){
_13d();
},0);
if(opts.onLoadError){
opts.onLoadError.apply(_137,arguments);
}
}});
};
function _13b(){
$(">div.datagrid-pager",_139).pagination("loading");
if(opts.loadMsg){
var wrap=_139;
$("<div class=\"datagrid-mask\"></div>").css({display:"block",width:wrap.width(),height:wrap.height()}).appendTo(wrap);
$("<div class=\"datagrid-mask-msg\"></div>").html(opts.loadMsg).appendTo(wrap).css({display:"block",left:(wrap.width()-$("div.datagrid-mask-msg",wrap).outerWidth())/2,top:(wrap.height()-$("div.datagrid-mask-msg",wrap).outerHeight())/2});
}
};
function _13d(){
_139.find("div.datagrid-pager").pagination("loaded");
_139.find("div.datagrid-mask-msg").remove();
_139.find("div.datagrid-mask").remove();
};
};
function _13e(_13f,_140){
var rows=$.data(_13f,"datagrid").data.rows;
var _141=$.data(_13f,"datagrid").panel;
_140.rowspan=_140.rowspan||1;
_140.colspan=_140.colspan||1;
if(_140.index<0||_140.index>=rows.length){
return;
}
if(_140.rowspan==1&&_140.colspan==1){
return;
}
var _142=rows[_140.index][_140.field];
var tr=_141.find("div.datagrid-body tr[datagrid-row-index="+_140.index+"]");
var td=tr.find("td[field="+_140.field+"]");
td.attr("rowspan",_140.rowspan).attr("colspan",_140.colspan);
td.addClass("datagrid-td-merged");
for(var i=1;i<_140.colspan;i++){
td=td.next();
td.hide();
rows[_140.index][td.attr("field")]=_142;
}
for(var i=1;i<_140.rowspan;i++){
tr=tr.next();
var td=tr.find("td[field="+_140.field+"]").hide();
rows[_140.index+i][td.attr("field")]=_142;
for(var j=1;j<_140.colspan;j++){
td=td.next();
td.hide();
rows[_140.index+i][td.attr("field")]=_142;
}
}
setTimeout(function(){
_60(_13f);
},0);
};
$.fn.datagrid=function(_143,_144){
if(typeof _143=="string"){
return $.fn.datagrid.methods[_143](this,_144);
}
_143=_143||{};
return this.each(function(){
var _145=$.data(this,"datagrid");
var opts;
if(_145){
opts=$.extend(_145.options,_143);
_145.options=opts;
}else{
opts=$.extend({},$.fn.datagrid.defaults,$.fn.datagrid.parseOptions(this),_143);
$(this).css("width",null).css("height",null);
var _146=_21(this,opts.rownumbers);
if(!opts.columns){
opts.columns=_146.columns;
}
if(!opts.frozenColumns){
opts.frozenColumns=_146.frozenColumns;
}
$.data(this,"datagrid",{options:opts,panel:_146.panel,selectedRows:[],data:{total:0,rows:[]},originalRows:[],updatedRows:[],insertedRows:[],deletedRows:[],editingRows:[]});
_7f(this,_2d(this));
_12a(this);
}
_32(this);
if(!_145){
_2a(this);
}
_3(this);
if(opts.url){
_3b(this);
}
_3f(this);
});
};
var _147={text:{init:function(_148,_149){
var _14a=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_148);
return _14a;
},getValue:function(_14b){
return $(_14b).val();
},setValue:function(_14c,_14d){
$(_14c).val(_14d);
},resize:function(_14e,_14f){
var _150=$(_14e);
if($.boxModel==true){
_150.width(_14f-(_150.outerWidth()-_150.width()));
}else{
_150.width(_14f);
}
}},textarea:{init:function(_151,_152){
var _153=$("<textarea class=\"datagrid-editable-input\"></textarea>").appendTo(_151);
return _153;
},getValue:function(_154){
return $(_154).val();
},setValue:function(_155,_156){
$(_155).val(_156);
},resize:function(_157,_158){
var _159=$(_157);
if($.boxModel==true){
_159.width(_158-(_159.outerWidth()-_159.width()));
}else{
_159.width(_158);
}
}},checkbox:{init:function(_15a,_15b){
var _15c=$("<input type=\"checkbox\">").appendTo(_15a);
_15c.val(_15b.on);
_15c.attr("offval",_15b.off);
return _15c;
},getValue:function(_15d){
if($(_15d).attr("checked")){
return $(_15d).val();
}else{
return $(_15d).attr("offval");
}
},setValue:function(_15e,_15f){
if($(_15e).val()==_15f){
$(_15e).attr("checked",true);
}else{
$(_15e).attr("checked",false);
}
}},numberbox:{init:function(_160,_161){
var _162=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_160);
_162.numberbox(_161);
return _162;
},getValue:function(_163){
return $(_163).val();
},setValue:function(_164,_165){
$(_164).val(_165);
},resize:function(_166,_167){
var _168=$(_166);
if($.boxModel==true){
_168.width(_167-(_168.outerWidth()-_168.width()));
}else{
_168.width(_167);
}
}},validatebox:{init:function(_169,_16a){
var _16b=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_169);
_16b.validatebox(_16a);
return _16b;
},destroy:function(_16c){
$(_16c).validatebox("destroy");
},getValue:function(_16d){
return $(_16d).val();
},setValue:function(_16e,_16f){
$(_16e).val(_16f);
},resize:function(_170,_171){
var _172=$(_170);
if($.boxModel==true){
_172.width(_171-(_172.outerWidth()-_172.width()));
}else{
_172.width(_171);
}
}},datebox:{init:function(_173,_174){
var _175=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_173);
_175.datebox(_174);
return _175;
},destroy:function(_176){
$(_176).datebox("destroy");
},getValue:function(_177){
return $(_177).val();
},setValue:function(_178,_179){
$(_178).val(_179);
},resize:function(_17a,_17b){
var _17c=$(_17a);
if($.boxModel==true){
_17c.width(_17b-(_17c.outerWidth()-_17c.width()));
}else{
_17c.width(_17b);
}
}},combobox:{init:function(_17d,_17e){
var _17f=$("<input type=\"text\">").appendTo(_17d);
_17f.combobox(_17e||{});
return _17f;
},destroy:function(_180){
$(_180).combobox("destroy");
},getValue:function(_181){
return $(_181).combobox("getValue");
},setValue:function(_182,_183){
$(_182).combobox("setValue",_183);
},resize:function(_184,_185){
$(_184).combobox("resize",_185);
}},combotree:{init:function(_186,_187){
var _188=$("<input type=\"text\">").appendTo(_186);
_188.combotree(_187);
return _188;
},destroy:function(_189){
$(_189).combotree("destroy");
},getValue:function(_18a){
return $(_18a).combotree("getValue");
},setValue:function(_18b,_18c){
$(_18b).combotree("setValue",_18c);
},resize:function(_18d,_18e){
$(_18d).combotree("resize",_18e);
}}};
$.fn.datagrid.methods={options:function(jq){
return $.data(jq[0],"datagrid").options;
},getPanel:function(jq){
return $.data(jq[0],"datagrid").panel;
},getPager:function(jq){
return $.data(jq[0],"datagrid").panel.find("div.datagrid-pager");
},getColumnFields:function(jq,_18f){
return _31(jq[0],_18f);
},getColumnOption:function(jq,_190){
return _5f(jq[0],_190);
},resize:function(jq,_191){
return jq.each(function(){
_3(this,_191);
});
},reload:function(jq,_192){
return jq.each(function(){
_3b(this,_192);
});
},fixColumnSize:function(jq){
return jq.each(function(){
_2a(this);
});
},loadData:function(jq,data){
return jq.each(function(){
_7f(this,data);
_12a(this);
});
},getData:function(jq){
return $.data(jq[0],"datagrid").data;
},getRows:function(jq){
return $.data(jq[0],"datagrid").data.rows;
},getRowIndex:function(jq,id){
return _96(jq[0],id);
},getSelected:function(jq){
var rows=_9a(jq[0]);
return rows.length>0?rows[0]:null;
},getSelections:function(jq){
return _9a(jq[0]);
},clearSelections:function(jq){
return jq.each(function(){
_a3(this);
});
},selectAll:function(jq){
return jq.each(function(){
_a7(this);
});
},unselectAll:function(jq){
return jq.each(function(){
_a5(this);
});
},selectRow:function(jq,_193){
return jq.each(function(){
_b6(this,_193);
});
},selectRecord:function(jq,id){
return jq.each(function(){
_c0(this,id);
});
},unselectRow:function(jq,_194){
return jq.each(function(){
_c6(this,_194);
});
},beginEdit:function(jq,_195){
return jq.each(function(){
_cf(this,_195);
});
},endEdit:function(jq,_196){
return jq.each(function(){
_d9(this,_196,false);
});
},cancelEdit:function(jq,_197){
return jq.each(function(){
_d9(this,_197,true);
});
},getEditors:function(jq,_198){
return _f3(jq[0],_198);
},getEditor:function(jq,_199){
return _f9(jq[0],_199);
},refreshRow:function(jq,_19a){
return jq.each(function(){
_e8(this,_19a);
});
},validateRow:function(jq,_19b){
return jq.each(function(){
_d8(this,_19b);
});
},appendRow:function(jq,row){
return jq.each(function(){
_121(this,row);
});
},deleteRow:function(jq,_19c){
return jq.each(function(){
_118(this,_19c);
});
},getChanges:function(jq,_19d){
return _10e(jq[0],_19d);
},acceptChanges:function(jq){
return jq.each(function(){
_12d(this);
});
},rejectChanges:function(jq){
return jq.each(function(){
_12f(this);
});
},mergeCells:function(jq,_19e){
return jq.each(function(){
_13e(this,_19e);
});
}};
$.fn.datagrid.parseOptions=function(_19f){
var t=$(_19f);
return $.extend({},$.fn.panel.parseOptions(_19f),{striped:(t.attr("striped")?t.attr("striped")=="true":undefined),nowrap:(t.attr("nowrap")?t.attr("nowrap")=="true":undefined),rownumbers:(t.attr("rownumbers")?t.attr("rownumbers")=="true":undefined),singleSelect:(t.attr("singleSelect")?t.attr("singleSelect")=="true":undefined),pagination:(t.attr("pagination")?t.attr("pagination")=="true":undefined),remoteSort:(t.attr("remoteSort")?t.attr("remoteSort")=="true":undefined),idField:t.attr("idField"),url:t.attr("url")});
};
$.fn.datagrid.defaults=$.extend({},$.fn.panel.defaults,{frozenColumns:null,columns:null,toolbar:null,striped:false,method:"post",nowrap:true,idField:null,url:null,loadMsg:"Processing, please wait ...",rownumbers:false,singleSelect:false,pagination:false,pageNumber:1,pageSize:10,pageList:[10,20,30,40,50],queryParams:{},sortName:null,sortOrder:"asc",remoteSort:true,editors:_147,onBeforeLoad:function(_1a0){
},onLoadSuccess:function(){
},onLoadError:function(){
},onClickRow:function(_1a1,_1a2){
},onDblClickRow:function(_1a3,_1a4){
},onSortColumn:function(sort,_1a5){
},onResizeColumn:function(_1a6,_1a7){
},onSelect:function(_1a8,_1a9){
},onUnselect:function(_1aa,_1ab){
},onSelectAll:function(rows){
},onUnselectAll:function(rows){
},onBeforeEdit:function(_1ac,_1ad){
},onAfterEdit:function(_1ae,_1af,_1b0){
},onCancelEdit:function(_1b1,_1b2){
}});
})(jQuery);

