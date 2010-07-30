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
var _15=$(_13).datagrid("getPanel").find("div.datagrid-body");
_15.find("span.tree-hit").unbind(".treegrid").bind("click.treegrid",function(){
var tr=$(this).parent().parent().parent();
var id=tr.attr("node-id");
_81(_13,id);
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
_15.find("tr").unbind(".treegrid").bind("mouseenter.treegrid",function(){
var id=$(this).attr("node-id");
_15.find("tr[node-id="+id+"]").addClass("datagrid-row-over");
}).bind("mouseleave.treegrid",function(){
var id=$(this).attr("node-id");
_15.find("tr[node-id="+id+"]").removeClass("datagrid-row-over");
}).bind("click.treegrid",function(){
var id=$(this).attr("node-id");
_71(_13,id);
_14.onClickRow.call(_13,_16(_13,id));
return false;
}).bind("dblclick",function(){
var id=$(this).attr("node-id");
_14.onDblClickRow.call(_13,_16(_13,id));
return false;
});
};
function _17(_18,_19){
var _1a=$.data(_18,"datagrid").options;
var _1b=$(_18).datagrid("getPanel").find(">div.datagrid-view");
var _1c=_1b.find(">div.datagrid-view1");
var _1d=_1b.find(">div.datagrid-view2");
var tr1=_1c.find(">div.datagrid-body tr[node-id="+_19+"]");
var tr2=_1d.find(">div.datagrid-body tr[node-id="+_19+"]");
var _1e=tr1.next("tr.treegrid-tr-tree");
var _1f=tr2.next("tr.treegrid-tr-tree");
var _20=_1e.find(">td>div");
var _21=_1f.find(">td>div");
var td1=tr1.find("td[field="+_1a.treeField+"]");
var td2=tr2.find("td[field="+_1a.treeField+"]");
var _22=td1.find("span.tree-indent,span.tree-hit").length+td2.find("span.tree-indent,span.tree-hit").length;
return [_20,_21,_22];
};
function _23(_24,_25){
var _26=$(_24).datagrid("getPanel").find(">div.datagrid-view");
var _27=_26.find(">div.datagrid-view1");
var _28=_26.find(">div.datagrid-view2");
var tr1=_27.find(">div.datagrid-body tr[node-id="+_25+"]");
var tr2=_28.find(">div.datagrid-body tr[node-id="+_25+"]");
var _29=$(_24).datagrid("getColumnFields",true).length;
var _2a=$(_24).datagrid("getColumnFields",false).length;
_2b(tr1,_29);
_2b(tr2,_2a);
function _2b(tr,_2c){
$("<tr class=\"treegrid-tr-tree\">"+"<td style=\"border:0px\" colspan=\""+_2c+"\">"+"<div></div>"+"</td>"+"<tr>").insertAfter(tr);
};
};
function _2d(_2e,_2f,_30,_31){
var _32=$.data(_2e,"treegrid").options;
var _33=$.data(_2e,"treegrid").nodes;
var _34=$.data(_2e,"datagrid").panel;
var _35=_34.find(">div.datagrid-view");
var _36=_35.find(">div.datagrid-view1");
var _37=_35.find(">div.datagrid-view2");
var _38=$(_2e).datagrid("getColumnFields",true);
var _39=$(_2e).datagrid("getColumnFields",false);
if(_2f){
var _3a=_17(_2e,_2f);
var cc1=_3a[0];
var cc2=_3a[1];
var _3b=_3a[2];
}else{
var cc1=_36.find(">div.datagrid-body>div.datagrid-body-inner");
var cc2=_37.find(">div.datagrid-body");
var _3b=0;
}
if(!_31){
cc1.empty();
cc2.empty();
_33.splice(0,_33.length);
}
$.data(_2e,"treegrid").nodes=_33.concat(_3c(_30,_2f));
var _3d=_3e(_30,_3b);
cc1.html(_3d[0].join(""));
cc2.html(_3d[1].join(""));
_6(_2e);
_12(_2e);
function _3c(_3f,_40){
var _41=[];
for(var i=0;i<_3f.length;i++){
var row=_3f[i];
var rec=$.extend({},row);
delete (rec.children);
rec._parentId=_40;
_41.push(rec);
if(row.children&&row.children.length){
_41=_41.concat(_3c(row.children,rec[_32.idField]));
}
}
return _41;
};
function _3e(_42,_43){
var _44=["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
var _45=["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
var _46=[_44,_45];
for(var i=0;i<_42.length;i++){
var row=_42[i];
if(row.state!="open"&&row.state!="closed"){
row.state="open";
}
_46[0]=_46[0].concat(_47(row,_38,_43));
_46[1]=_46[1].concat(_47(row,_39,_43));
if(row.children&&row.children.length){
var tt=_3e(row.children,_43+1);
var v=row.state=="closed"?"none":"block";
_46[0].push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan="+_38.length+"><div style=\"display:"+v+"\">");
_46[0]=_46[0].concat(tt[0]);
_46[0].push("</div></td></tr>");
_46[1].push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan="+_39.length+"><div style=\"display:"+v+"\">");
_46[1]=_46[1].concat(tt[1]);
_46[1].push("</div></td></tr>");
}
}
_46[0].push("</tbody></table>");
_46[1].push("</tbody></table>");
return _46;
};
function _47(row,_48,_49){
var _4a=["<tr node-id="+row[_32.idField]+">"];
for(var i=0;i<_48.length;i++){
var _4b=_48[i];
var col=$(_2e).datagrid("getColumnOption",_4b);
if(col){
var _4c="width:"+(col.width)+"px;";
_4c+="text-align:"+(col.align||"left")+";";
_4c+=_32.nowrap==false?"white-space:normal;":"";
_4a.push("<td field=\""+_4b+"\">");
_4a.push("<div style=\""+_4c+"\" ");
if(col.checkbox){
_4a.push("class=\"datagrid-cell-check ");
}else{
_4a.push("class=\"datagrid-cell ");
}
_4a.push("\">");
if(col.checkbox){
if(true){
_4a.push("<input type=\"checkbox\" checked=\"checked\"/>");
}else{
_4a.push("<input type=\"checkbox\"/>");
}
}
var val=null;
if(col.formatter){
val=col.formatter(row[_4b],row);
}else{
val=row[_4b]||"&nbsp;";
}
if(_4b==_32.treeField){
for(var j=0;j<_49;j++){
_4a.push("<span class=\"tree-indent\"></span>");
}
if(row.state=="closed"){
_4a.push("<span class=\"tree-hit tree-collapsed\"></span>");
_4a.push("<span class=\"tree-icon tree-folder "+row.iconCls+"\"></span>");
}else{
if(row.children&&row.children.length){
_4a.push("<span class=\"tree-hit tree-expanded\"></span>");
_4a.push("<span class=\"tree-icon tree-folder tree-folder-open "+row.iconCls+"\"></span>");
}else{
_4a.push("<span class=\"tree-indent\"></span>");
_4a.push("<span class=\"tree-icon tree-file "+row.iconCls+"\"></span>");
}
}
_4a.push("<span class=\"tree-title\">"+val+"</span>");
}else{
_4a.push(val);
}
_4a.push("</div>");
_4a.push("</td>");
}
}
_4a.push("</tr>");
return _4a;
};
};
function _4d(_4e,_4f,_50,_51,_52){
var _53=$.data(_4e,"treegrid").options;
var _54=$(_4e).datagrid("getPanel").find("div.datagrid-body");
_50=_50||{};
var row=_16(_4e,_4f);
if(_53.onBeforeLoad.call(_4e,row,_50)==false){
return;
}
if(!_53.url){
return;
}
var _55=_54.find("tr[node-id="+_4f+"] span.tree-folder");
_55.addClass("tree-loading");
$.ajax({type:_53.method,url:_53.url,data:_50,dataType:"json",success:function(_56){
_55.removeClass("tree-loading");
_2d(_4e,_4f,_56,_51);
if(_52){
_52();
}
},error:function(){
_55.removeClass("tree-loading");
_53.onLoadError.apply(_4e,arguments);
if(_52){
_52();
}
}});
};
function _57(_58){
var _59=_5a(_58);
if(_59.length){
return _59[0];
}else{
return null;
}
};
function _5a(_5b){
var _5c=[];
var _5d=$(_5b).datagrid("getPanel").find("div.datagrid-view2>div.datagrid-body");
_5d.find(">table>tbody>tr[node-id]").each(function(){
var id=$(this).attr("node-id");
_5c.push(_16(_5b,id));
});
return _5c;
};
function _5e(_5f,_60){
var row=_16(_5f,_60);
if(row._parentId){
return _16(_5f,row._parentId);
}else{
return null;
}
};
function _61(_62,_63){
var _64=$.data(_62,"treegrid").options;
var _65=$(_62).datagrid("getPanel").find("div.datagrid-view2 div.datagrid-body");
var _66=[];
if(_63){
_67(_63);
}else{
var _68=_5a(_62);
for(var i=0;i<_68.length;i++){
_66.push(_68[i]);
_67(_68[i][_64.idField]);
}
}
function _67(_69){
var tr=_65.find("tr[node-id="+_69+"]");
tr=tr.next("tr.treegrid-tr-tree");
tr.find("tr[node-id]").each(function(){
var id=$(this).attr("node-id");
_66.push(_16(_62,id));
});
};
return _66;
};
function _6a(_6b){
var _6c=$(_6b).datagrid("getPanel").find("div.datagrid-body");
var id=_6c.find("tr.tree-node-selected").attr("node-id");
return _16(_6b,id);
};
function _16(_6d,_6e){
var _6f=$.data(_6d,"treegrid").options;
var _70=$.data(_6d,"treegrid").nodes;
for(var i=0;i<_70.length;i++){
if(_70[i][_6f.idField]==_6e){
return _70[i];
}
}
return null;
};
function _71(_72,_73){
var _74=$(_72).datagrid("getPanel").find("div.datagrid-body");
_74.find("tr.tree-node-selected").removeClass("tree-node-selected");
_74.find("tr[node-id="+_73+"]").addClass("tree-node-selected");
};
function _75(_76,_77){
var _78=$.data(_76,"treegrid").options;
var _79=$(_76).datagrid("getPanel").find("div.datagrid-body");
var row=_16(_76,_77);
var tr=_79.find("tr[node-id="+_77+"]");
var hit=tr.find("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
if(_78.onBeforeCollapse.call(_76,row)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
tr=tr.next("tr.treegrid-tr-tree");
var cc=tr.find(">td>div");
if(_78.animate){
cc.slideUp("normal",function(){
_78.onCollapse.call(_76,row);
});
}else{
cc.hide();
_78.onCollapse.call(_76,row);
}
};
function _7a(_7b,_7c){
var _7d=$.data(_7b,"treegrid").options;
var _7e=$(_7b).datagrid("getPanel").find("div.datagrid-body");
var tr=_7e.find("tr[node-id="+_7c+"]");
var hit=tr.find("span.tree-hit");
var row=_16(_7b,_7c);
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
if(_7d.onBeforeExpand.call(_7b,row)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var _7f=tr.next("tr.treegrid-tr-tree");
if(_7f.length){
var cc=_7f.find(">td>div");
_80(cc);
}else{
_23(_7b,row[_7d.idField]);
var _7f=tr.next("tr.treegrid-tr-tree");
var cc=_7f.find(">td>div");
cc.hide();
_4d(_7b,row[_7d.idField],{id:row[_7d.idField]},true,function(){
_80(cc);
});
}
function _80(cc){
if(_7d.animate){
cc.slideDown("normal",function(){
_6(_7b,_7c);
_7d.onExpand.call(_7b,row);
});
}else{
cc.show();
_6(_7b,_7c);
_7d.onExpand.call(_7b,row);
}
};
};
function _81(_82,_83){
var _84=$(_82).datagrid("getPanel").find("div.datagrid-body");
var tr=_84.find("tr[node-id="+_83+"]");
var hit=tr.find("span.tree-hit");
if(hit.hasClass("tree-expanded")){
_75(_82,_83);
}else{
_7a(_82,_83);
}
};
function _85(_86){
var _87=$.data(_86,"treegrid").options;
var _88=_61(_86);
for(var i=0;i<_88.length;i++){
_75(_86,_88[i][_87.idField]);
}
};
function _89(_8a){
var _8b=$.data(_8a,"treegrid").options;
var _8c=_61(_8a);
for(var i=0;i<_8c.length;i++){
_7a(_8a,_8c[i][_8b.idField]);
}
};
function _8d(_8e,_8f){
var _90=$.data(_8e,"treegrid").options;
var ids=[];
var p=_5e(_8e,_8f);
while(p){
var id=p[_90.idField];
ids.unshift(id);
p=_5e(_8e,id);
}
for(var i=0;i<ids.length;i++){
_7a(_8e,ids[i]);
}
};
$.fn.treegrid=function(_91,_92){
if(typeof _91=="string"){
return $.fn.treegrid.methods[_91](this,_92);
}
_91=_91||{};
return this.each(function(){
var _93=$.data(this,"treegrid");
if(_93){
$.extend(_93.options,_91);
}else{
$.data(this,"treegrid",{options:$.extend({},$.fn.treegrid.defaults,$.fn.treegrid.parseOptions(this),_91),nodes:[]});
}
_1(this);
_4d(this);
});
};
$.fn.treegrid.methods={options:function(jq){
return $.data(jq[0],"treegrid").options;
},loadData:function(jq,_94){
return jq.each(function(){
_2d(this,null,_94);
});
},reload:function(jq){
return jq.each(function(){
_4d(this);
});
},getRoot:function(jq){
return _57(jq[0]);
},getRoots:function(jq){
return _5a(jq[0]);
},getParent:function(jq,id){
return _5e(jq[0],id);
},getChildren:function(jq,id){
return _61(jq[0],id);
},getSelected:function(jq){
return _6a(jq[0]);
},select:function(jq,id){
return jq.each(function(){
_71(this,id);
});
},collapse:function(jq,id){
return jq.each(function(){
_75(this,id);
});
},expand:function(jq,id){
return jq.each(function(){
_7a(this,id);
});
},toggle:function(jq,id){
return jq.each(function(){
_81(this,id);
});
},collapseAll:function(jq){
return jq.each(function(){
_85(this);
});
},expandAll:function(jq){
return jq.each(function(){
_89(this);
});
},expandTo:function(jq,id){
return jq.each(function(){
_8d(this,id);
});
}};
$.fn.treegrid.parseOptions=function(_95){
var t=$(_95);
return $.extend({},$.fn.datagrid.parseOptions(_95),{treeField:t.attr("treeField"),animate:(t.attr("animate")?t.attr("animate")=="true":undefined)});
};
$.fn.treegrid.defaults=$.extend({},$.fn.datagrid.defaults,{treeField:null,animate:false,onBeforeLoad:function(row,_96){
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

