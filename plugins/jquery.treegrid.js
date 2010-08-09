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
var _3=$.data(_2,"treegrid").options;
$(_2).datagrid($.extend({},_3,{url:null,onResizeColumn:function(_4,_5){
_6(_2);
_3.onResizeColumn.call(_2,_4,_5);
}}));
};
function _6(_7,_8){
var _9=$.data(_7,"datagrid").options;
var _a=$.data(_7,"datagrid").panel;
var _b=_a.find(">div.datagrid-view");
var _c=_b.find(">div.datagrid-view1");
var _d=_b.find(">div.datagrid-view2");
if(_9.rownumbers||(_9.frozenColumns&&_9.frozenColumns.length>0)){
if(_8){
_d.find("tr[node-id="+_8+"]").next("tr.treegrid-tr-tree").find("tr[node-id]").each(function(){
_e($(this).attr("node-id"));
});
}else{
_d.find("tr[node-id]").each(function(){
_e($(this).attr("node-id"));
});
}
}
if(_9.height=="auto"){
var _f=_d.find("div.datagrid-body table").height()+18;
_c.find("div.datagrid-body").height(_f);
_d.find("div.datagrid-body").height(_f);
_b.height(_d.height());
}
function _e(_10){
var tr1=_c.find("tr[node-id="+_10+"]");
var tr2=_d.find("tr[node-id="+_10+"]");
tr1.css("height",null);
tr2.css("height",null);
var _11=Math.max(tr1.height(),tr2.height());
tr1.css("height",_11);
tr2.css("height",_11);
};
};
function _12(_13){
var _14=$.data(_13,"treegrid").options;
if(!_14.rownumbers){
return;
}
$(_13).datagrid("getPanel").find("div.datagrid-view1 div.datagrid-body div.datagrid-cell-rownumber").each(function(i){
$(this).html(i+1);
});
};
function _15(_16){
var _17=$.data(_16,"treegrid").options;
var _18=$(_16).datagrid("getPanel").find("div.datagrid-body");
_18.find("span.tree-hit").unbind(".treegrid").bind("click.treegrid",function(){
var tr=$(this).parent().parent().parent();
var id=tr.attr("node-id");
_86(_16,id);
return false;
}).bind("mouseenter.treegrid",function(){
if($(this).hasClass("tree-expanded")){
$(this).addClass("tree-expanded-hover");
}else{
$(this).addClass("tree-collapsed-hover");
}
}).bind("mouseleave.treegrid",function(){
if($(this).hasClass("tree-expanded")){
$(this).removeClass("tree-expanded-hover");
}else{
$(this).removeClass("tree-collapsed-hover");
}
});
_18.find("tr").unbind(".treegrid").bind("mouseenter.treegrid",function(){
var id=$(this).attr("node-id");
_18.find("tr[node-id="+id+"]").addClass("datagrid-row-over");
}).bind("mouseleave.treegrid",function(){
var id=$(this).attr("node-id");
_18.find("tr[node-id="+id+"]").removeClass("datagrid-row-over");
}).bind("click.treegrid",function(){
var id=$(this).attr("node-id");
_76(_16,id);
_17.onClickRow.call(_16,_19(_16,id));
return false;
}).bind("dblclick",function(){
var id=$(this).attr("node-id");
_17.onDblClickRow.call(_16,_19(_16,id));
return false;
});
};
function _1a(_1b,_1c){
var _1d=$.data(_1b,"datagrid").options;
var _1e=$(_1b).datagrid("getPanel").find(">div.datagrid-view");
var _1f=_1e.find(">div.datagrid-view1");
var _20=_1e.find(">div.datagrid-view2");
var tr1=_1f.find(">div.datagrid-body tr[node-id="+_1c+"]");
var tr2=_20.find(">div.datagrid-body tr[node-id="+_1c+"]");
var _21=tr1.next("tr.treegrid-tr-tree");
var _22=tr2.next("tr.treegrid-tr-tree");
var _23=_21.find(">td>div");
var _24=_22.find(">td>div");
var td1=tr1.find("td[field="+_1d.treeField+"]");
var td2=tr2.find("td[field="+_1d.treeField+"]");
var _25=td1.find("span.tree-indent,span.tree-hit").length+td2.find("span.tree-indent,span.tree-hit").length;
return [_23,_24,_25];
};
function _26(_27,_28){
var _29=$.data(_27,"treegrid").options;
var _2a=$(_27).datagrid("getPanel").find(">div.datagrid-view");
var _2b=_2a.find(">div.datagrid-view1");
var _2c=_2a.find(">div.datagrid-view2");
var tr1=_2b.find(">div.datagrid-body tr[node-id="+_28+"]");
var tr2=_2c.find(">div.datagrid-body tr[node-id="+_28+"]");
var _2d=$(_27).datagrid("getColumnFields",true).length+(_29.rownumbers?1:0);
var _2e=$(_27).datagrid("getColumnFields",false).length;
_2f(tr1,_2d);
_2f(tr2,_2e);
function _2f(tr,_30){
$("<tr class=\"treegrid-tr-tree\">"+"<td style=\"border:0px\" colspan=\""+_30+"\">"+"<div></div>"+"</td>"+"<tr>").insertAfter(tr);
};
};
function _31(_32,_33,_34,_35){
var _36=$.data(_32,"treegrid").options;
var _37=$.data(_32,"treegrid").nodes;
var _38=$.data(_32,"datagrid").panel;
var _39=_38.find(">div.datagrid-view");
var _3a=_39.find(">div.datagrid-view1");
var _3b=_39.find(">div.datagrid-view2");
var _3c=$(_32).datagrid("getColumnFields",true);
var _3d=$(_32).datagrid("getColumnFields",false);
if(_33){
var _3e=_1a(_32,_33);
var cc1=_3e[0];
var cc2=_3e[1];
var _3f=_3e[2];
}else{
var cc1=_3a.find(">div.datagrid-body>div.datagrid-body-inner");
var cc2=_3b.find(">div.datagrid-body");
var _3f=0;
}
if(!_35){
cc1.empty();
cc2.empty();
_37.splice(0,_37.length);
}
$.data(_32,"treegrid").nodes=_37.concat(_40(_34,_33));
var _41=_42(_34,_3f);
cc1.html(_41[0].join(""));
cc2.html(_41[1].join(""));
_6(_32);
_12(_32);
_15(_32);
function _40(_43,_44){
var _45=[];
for(var i=0;i<_43.length;i++){
var row=_43[i];
var rec=$.extend({},row);
delete (rec.children);
rec._parentId=_44;
_45.push(rec);
if(row.children&&row.children.length){
_45=_45.concat(_40(row.children,rec[_36.idField]));
}
}
return _45;
};
function _42(_46,_47){
var _48=["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
var _49=["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
var _4a=[_48,_49];
for(var i=0;i<_46.length;i++){
var row=_46[i];
if(row.state!="open"&&row.state!="closed"){
row.state="open";
}
_4a[0]=_4a[0].concat(_4b(row,_3c,_47,_36.rownumbers));
_4a[1]=_4a[1].concat(_4b(row,_3d,_47));
if(row.children&&row.children.length){
var tt=_42(row.children,_47+1);
var v=row.state=="closed"?"none":"block";
_4a[0].push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan="+(_3c.length+(_36.rownumbers?1:0))+"><div style=\"display:"+v+"\">");
_4a[0]=_4a[0].concat(tt[0]);
_4a[0].push("</div></td></tr>");
_4a[1].push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan="+_3d.length+"><div style=\"display:"+v+"\">");
_4a[1]=_4a[1].concat(tt[1]);
_4a[1].push("</div></td></tr>");
}
}
_4a[0].push("</tbody></table>");
_4a[1].push("</tbody></table>");
return _4a;
};
function _4b(row,_4c,_4d,_4e){
var _4f=["<tr node-id="+row[_36.idField]+">"];
if(_4e){
_4f.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">0</div></td>");
}
for(var i=0;i<_4c.length;i++){
var _50=_4c[i];
var col=$(_32).datagrid("getColumnOption",_50);
if(col){
var _51="width:"+(col.width)+"px;";
_51+="text-align:"+(col.align||"left")+";";
_51+=_36.nowrap==false?"white-space:normal;":"";
_4f.push("<td field=\""+_50+"\">");
_4f.push("<div style=\""+_51+"\" ");
if(col.checkbox){
_4f.push("class=\"datagrid-cell-check ");
}else{
_4f.push("class=\"datagrid-cell ");
}
_4f.push("\">");
if(col.checkbox){
if(true){
_4f.push("<input type=\"checkbox\" checked=\"checked\"/>");
}else{
_4f.push("<input type=\"checkbox\"/>");
}
}
var val=null;
if(col.formatter){
val=col.formatter(row[_50],row);
}else{
val=row[_50]||"&nbsp;";
}
if(_50==_36.treeField){
for(var j=0;j<_4d;j++){
_4f.push("<span class=\"tree-indent\"></span>");
}
if(row.state=="closed"){
_4f.push("<span class=\"tree-hit tree-collapsed\"></span>");
_4f.push("<span class=\"tree-icon tree-folder "+row.iconCls+"\"></span>");
}else{
if(row.children&&row.children.length){
_4f.push("<span class=\"tree-hit tree-expanded\"></span>");
_4f.push("<span class=\"tree-icon tree-folder tree-folder-open "+row.iconCls+"\"></span>");
}else{
_4f.push("<span class=\"tree-indent\"></span>");
_4f.push("<span class=\"tree-icon tree-file "+row.iconCls+"\"></span>");
}
}
_4f.push("<span class=\"tree-title\">"+val+"</span>");
}else{
_4f.push(val);
}
_4f.push("</div>");
_4f.push("</td>");
}
}
_4f.push("</tr>");
return _4f;
};
};
function _52(_53,_54,_55,_56,_57){
var _58=$.data(_53,"treegrid").options;
var _59=$(_53).datagrid("getPanel").find("div.datagrid-body");
_55=_55||{};
var row=_19(_53,_54);
if(_58.onBeforeLoad.call(_53,row,_55)==false){
return;
}
if(!_58.url){
return;
}
var _5a=_59.find("tr[node-id="+_54+"] span.tree-folder");
_5a.addClass("tree-loading");
$.ajax({type:_58.method,url:_58.url,data:_55,dataType:"json",success:function(_5b){
_5a.removeClass("tree-loading");
_31(_53,_54,_5b,_56);
if(_57){
_57();
}
},error:function(){
_5a.removeClass("tree-loading");
_58.onLoadError.apply(_53,arguments);
if(_57){
_57();
}
}});
};
function _5c(_5d){
var _5e=_5f(_5d);
if(_5e.length){
return _5e[0];
}else{
return null;
}
};
function _5f(_60){
var _61=[];
var _62=$(_60).datagrid("getPanel").find("div.datagrid-view2>div.datagrid-body");
_62.find(">table>tbody>tr[node-id]").each(function(){
var id=$(this).attr("node-id");
_61.push(_19(_60,id));
});
return _61;
};
function _63(_64,_65){
var row=_19(_64,_65);
if(row._parentId){
return _19(_64,row._parentId);
}else{
return null;
}
};
function _66(_67,_68){
var _69=$.data(_67,"treegrid").options;
var _6a=$(_67).datagrid("getPanel").find("div.datagrid-view2 div.datagrid-body");
var _6b=[];
if(_68){
_6c(_68);
}else{
var _6d=_5f(_67);
for(var i=0;i<_6d.length;i++){
_6b.push(_6d[i]);
_6c(_6d[i][_69.idField]);
}
}
function _6c(_6e){
var tr=_6a.find("tr[node-id="+_6e+"]");
tr=tr.next("tr.treegrid-tr-tree");
tr.find("tr[node-id]").each(function(){
var id=$(this).attr("node-id");
_6b.push(_19(_67,id));
});
};
return _6b;
};
function _6f(_70){
var _71=$(_70).datagrid("getPanel").find("div.datagrid-body");
var id=_71.find("tr.tree-node-selected").attr("node-id");
return _19(_70,id);
};
function _19(_72,_73){
var _74=$.data(_72,"treegrid").options;
var _75=$.data(_72,"treegrid").nodes;
for(var i=0;i<_75.length;i++){
if(_75[i][_74.idField]==_73){
return _75[i];
}
}
return null;
};
function _76(_77,_78){
var _79=$(_77).datagrid("getPanel").find("div.datagrid-body");
_79.find("tr.tree-node-selected").removeClass("tree-node-selected");
_79.find("tr[node-id="+_78+"]").addClass("tree-node-selected");
};
function _7a(_7b,_7c){
var _7d=$.data(_7b,"treegrid").options;
var _7e=$(_7b).datagrid("getPanel").find("div.datagrid-body");
var row=_19(_7b,_7c);
var tr=_7e.find("tr[node-id="+_7c+"]");
var hit=tr.find("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
if(_7d.onBeforeCollapse.call(_7b,row)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
tr=tr.next("tr.treegrid-tr-tree");
var cc=tr.find(">td>div");
if(_7d.animate){
cc.slideUp("normal",function(){
_7d.onCollapse.call(_7b,row);
});
}else{
cc.hide();
_7d.onCollapse.call(_7b,row);
}
};
function _7f(_80,_81){
var _82=$.data(_80,"treegrid").options;
var _83=$(_80).datagrid("getPanel").find("div.datagrid-body");
var tr=_83.find("tr[node-id="+_81+"]");
var hit=tr.find("span.tree-hit");
var row=_19(_80,_81);
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
if(_82.onBeforeExpand.call(_80,row)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var _84=tr.next("tr.treegrid-tr-tree");
if(_84.length){
var cc=_84.find(">td>div");
_85(cc);
}else{
_26(_80,row[_82.idField]);
var _84=tr.next("tr.treegrid-tr-tree");
var cc=_84.find(">td>div");
cc.hide();
_52(_80,row[_82.idField],{id:row[_82.idField]},true,function(){
_85(cc);
});
}
function _85(cc){
if(_82.animate){
cc.slideDown("normal",function(){
_6(_80,_81);
_82.onExpand.call(_80,row);
});
}else{
cc.show();
_6(_80,_81);
_82.onExpand.call(_80,row);
}
};
};
function _86(_87,_88){
var _89=$(_87).datagrid("getPanel").find("div.datagrid-body");
var tr=_89.find("tr[node-id="+_88+"]");
var hit=tr.find("span.tree-hit");
if(hit.hasClass("tree-expanded")){
_7a(_87,_88);
}else{
_7f(_87,_88);
}
};
function _8a(_8b){
var _8c=$.data(_8b,"treegrid").options;
var _8d=_66(_8b);
for(var i=0;i<_8d.length;i++){
_7a(_8b,_8d[i][_8c.idField]);
}
};
function _8e(_8f){
var _90=$.data(_8f,"treegrid").options;
var _91=_66(_8f);
for(var i=0;i<_91.length;i++){
_7f(_8f,_91[i][_90.idField]);
}
};
function _92(_93,_94){
var _95=$.data(_93,"treegrid").options;
var ids=[];
var p=_63(_93,_94);
while(p){
var id=p[_95.idField];
ids.unshift(id);
p=_63(_93,id);
}
for(var i=0;i<ids.length;i++){
_7f(_93,ids[i]);
}
};
$.fn.treegrid=function(_96,_97){
if(typeof _96=="string"){
return $.fn.treegrid.methods[_96](this,_97);
}
_96=_96||{};
return this.each(function(){
var _98=$.data(this,"treegrid");
if(_98){
$.extend(_98.options,_96);
}else{
$.data(this,"treegrid",{options:$.extend({},$.fn.treegrid.defaults,$.fn.treegrid.parseOptions(this),_96),nodes:[]});
}
_1(this);
_52(this);
});
};
$.fn.treegrid.methods={options:function(jq){
return $.data(jq[0],"treegrid").options;
},loadData:function(jq,_99){
return jq.each(function(){
_31(this,null,_99);
});
},reload:function(jq){
return jq.each(function(){
_52(this);
});
},getRoot:function(jq){
return _5c(jq[0]);
},getRoots:function(jq){
return _5f(jq[0]);
},getParent:function(jq,id){
return _63(jq[0],id);
},getChildren:function(jq,id){
return _66(jq[0],id);
},getSelected:function(jq){
return _6f(jq[0]);
},select:function(jq,id){
return jq.each(function(){
_76(this,id);
});
},collapse:function(jq,id){
return jq.each(function(){
_7a(this,id);
});
},expand:function(jq,id){
return jq.each(function(){
_7f(this,id);
});
},toggle:function(jq,id){
return jq.each(function(){
_86(this,id);
});
},collapseAll:function(jq){
return jq.each(function(){
_8a(this);
});
},expandAll:function(jq){
return jq.each(function(){
_8e(this);
});
},expandTo:function(jq,id){
return jq.each(function(){
_92(this,id);
});
}};
$.fn.treegrid.parseOptions=function(_9a){
var t=$(_9a);
return $.extend({},$.fn.datagrid.parseOptions(_9a),{treeField:t.attr("treeField"),animate:(t.attr("animate")?t.attr("animate")=="true":undefined)});
};
$.fn.treegrid.defaults=$.extend({},$.fn.datagrid.defaults,{treeField:null,animate:false,onBeforeLoad:function(row,_9b){
},onLoadSuccess:function(row){
},onLoadError:function(){
},onBeforeCollapse:function(row){
},onCollapse:function(row){
},onBeforeExpand:function(row){
},onExpand:function(row){
},onClickRow:function(row){
},onDblClickRow:function(row){
}});
})(jQuery);

