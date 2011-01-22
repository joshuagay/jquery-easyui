/**
 * jQuery EasyUI 1.2.3
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
$(_2).datagrid($.extend({},_3,{url:null,onLoadSuccess:function(){
},onResizeColumn:function(_4,_5){
_6(_2);
_3.onResizeColumn.call(_2,_4,_5);
}}));
};
function _6(_7,_8){
var _9=$.data(_7,"datagrid").options;
var _a=$.data(_7,"datagrid").panel;
var _b=_a.children("div.datagrid-view");
var _c=_b.children("div.datagrid-view1");
var _d=_b.children("div.datagrid-view2");
if(_9.rownumbers||(_9.frozenColumns&&_9.frozenColumns.length>0)){
if(_8){
_e(_8);
_d.find("tr[node-id="+_8+"]").next("tr.treegrid-tr-tree").find("tr[node-id]").each(function(){
_e($(this).attr("node-id"));
});
}else{
_d.find("tr[node-id]").each(function(){
_e($(this).attr("node-id"));
});
if(_9.showFooter){
var _f=$.data(_7,"datagrid").footer||[];
for(var i=0;i<_f.length;i++){
_e(_f[i][_9.idField]);
}
$(_7).datagrid("resize");
}
}
}
if(_9.height=="auto"){
var _10=_c.children("div.datagrid-body");
var _11=_d.children("div.datagrid-body");
var _12=0;
var _13=0;
_11.children().each(function(){
var c=$(this);
if(c.is(":visible")){
_12+=c.outerHeight();
if(_13<c.outerWidth()){
_13=c.outerWidth();
}
}
});
if(_13>_11.width()){
_12+=18;
}
_10.height(_12);
_11.height(_12);
_b.height(_d.height());
}
_d.children("div.datagrid-body").triggerHandler("scroll");
function _e(_14){
var tr1=_c.find("tr[node-id="+_14+"]");
var tr2=_d.find("tr[node-id="+_14+"]");
tr1.css("height","");
tr2.css("height","");
var _15=Math.max(tr1.height(),tr2.height());
tr1.css("height",_15);
tr2.css("height",_15);
};
};
function _16(_17){
var _18=$.data(_17,"treegrid").options;
if(!_18.rownumbers){
return;
}
$(_17).datagrid("getPanel").find("div.datagrid-view1 div.datagrid-body div.datagrid-cell-rownumber").each(function(i){
$(this).html(i+1);
});
};
function _19(_1a){
var _1b=$.data(_1a,"treegrid").options;
var _1c=$(_1a).datagrid("getPanel");
var _1d=_1c.find("div.datagrid-body");
_1d.find("span.tree-hit").unbind(".treegrid").bind("click.treegrid",function(){
var tr=$(this).parent().parent().parent();
var id=tr.attr("node-id");
_84(_1a,id);
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
_1d.find("tr[node-id]").unbind(".treegrid").bind("mouseenter.treegrid",function(){
var id=$(this).attr("node-id");
_1d.find("tr[node-id="+id+"]").addClass("datagrid-row-over");
}).bind("mouseleave.treegrid",function(){
var id=$(this).attr("node-id");
_1d.find("tr[node-id="+id+"]").removeClass("datagrid-row-over");
}).bind("click.treegrid",function(){
var id=$(this).attr("node-id");
if(_1b.singleSelect){
_20(_1a);
_6e(_1a,id);
}else{
if($(this).hasClass("datagrid-row-selected")){
_72(_1a,id);
}else{
_6e(_1a,id);
}
}
_1b.onClickRow.call(_1a,_37(_1a,id));
}).bind("dblclick.treegrid",function(){
var id=$(this).attr("node-id");
_1b.onDblClickRow.call(_1a,_37(_1a,id));
}).bind("contextmenu.treegrid",function(e){
var id=$(this).attr("node-id");
_1b.onContextMenu.call(_1a,e,_37(_1a,id));
});
_1d.find("div.datagrid-cell-check input[type=checkbox]").unbind(".treegrid").bind("click.treegrid",function(e){
var id=$(this).parent().parent().parent().attr("node-id");
if(_1b.singleSelect){
_20(_1a);
_6e(_1a,id);
}else{
if($(this).attr("checked")){
_6e(_1a,id);
}else{
_72(_1a,id);
}
}
e.stopPropagation();
});
var _1e=_1c.find("div.datagrid-header");
_1e.find("input[type=checkbox]").unbind().bind("click.treegrid",function(){
if(_1b.singleSelect){
return false;
}
if($(this).attr("checked")){
_1f(_1a);
}else{
_20(_1a);
}
});
};
function _21(_22,_23){
var _24=$.data(_22,"treegrid").options;
var _25=$(_22).datagrid("getPanel").children("div.datagrid-view");
var _26=_25.children("div.datagrid-view1");
var _27=_25.children("div.datagrid-view2");
var tr1=_26.children("div.datagrid-body").find("tr[node-id="+_23+"]");
var tr2=_27.children("div.datagrid-body").find("tr[node-id="+_23+"]");
var _28=$(_22).datagrid("getColumnFields",true).length+(_24.rownumbers?1:0);
var _29=$(_22).datagrid("getColumnFields",false).length;
_2a(tr1,_28);
_2a(tr2,_29);
function _2a(tr,_2b){
$("<tr class=\"treegrid-tr-tree\">"+"<td style=\"border:0px\" colspan=\""+_2b+"\">"+"<div></div>"+"</td>"+"</tr>").insertAfter(tr);
};
};
function _2c(_2d,_2e,_2f,_30){
var _31=$.data(_2d,"treegrid").options;
var _32=$.data(_2d,"datagrid").panel;
var _33=_32.children("div.datagrid-view");
var _34=_33.children("div.datagrid-view1");
var _35=_33.children("div.datagrid-view2");
var _36=_37(_2d,_2e);
if(_36){
var _38=_34.children("div.datagrid-body").find("tr[node-id="+_2e+"]");
var _39=_35.children("div.datagrid-body").find("tr[node-id="+_2e+"]");
var cc1=_38.next("tr.treegrid-tr-tree").children("td").children("div");
var cc2=_39.next("tr.treegrid-tr-tree").children("td").children("div");
}else{
var cc1=_34.children("div.datagrid-body").children("div.datagrid-body-inner");
var cc2=_35.children("div.datagrid-body");
}
if(!_30){
$.data(_2d,"treegrid").data=[];
cc1.empty();
cc2.empty();
}
if(_31.view.onBeforeRender){
_31.view.onBeforeRender.call(_31.view,_2d,_2e,_2f);
}
_31.view.render.call(_31.view,_2d,cc1,true);
_31.view.render.call(_31.view,_2d,cc2,false);
if(_31.showFooter){
_31.view.renderFooter.call(_31.view,_2d,_34.find("div.datagrid-footer-inner"),true);
_31.view.renderFooter.call(_31.view,_2d,_35.find("div.datagrid-footer-inner"),false);
}
if(_31.view.onAfterRender){
_31.view.onAfterRender.call(_31.view,_2d);
}
_31.onLoadSuccess.call(_2d,_36,_2f);
_6(_2d);
_16(_2d);
_3a();
_19(_2d);
function _3a(){
var _3b=_33.find("div.datagrid-header");
var _3c=_33.find("div.datagrid-body");
var _3d=_3b.find("div.datagrid-header-check");
if(_3d.length){
var ck=_3c.find("div.datagrid-cell-check");
if($.boxModel){
ck.width(_3d.width());
ck.height(_3d.height());
}else{
ck.width(_3d.outerWidth());
ck.height(_3d.outerHeight());
}
}
};
};
function _3e(_3f,_40,_41,_42,_43){
var _44=$.data(_3f,"treegrid").options;
var _45=$(_3f).datagrid("getPanel").find("div.datagrid-body");
if(_41){
_44.queryParams=_41;
}
var _46=$.extend({},_44.queryParams);
var row=_37(_3f,_40);
if(_44.onBeforeLoad.call(_3f,row,_46)==false){
return;
}
if(!_44.url){
return;
}
var _47=_45.find("tr[node-id="+_40+"] span.tree-folder");
_47.addClass("tree-loading");
$.ajax({type:_44.method,url:_44.url,data:_46,dataType:"json",success:function(_48){
_47.removeClass("tree-loading");
_2c(_3f,_40,_48,_42);
if(_43){
_43();
}
},error:function(){
_47.removeClass("tree-loading");
_44.onLoadError.apply(_3f,arguments);
if(_43){
_43();
}
}});
};
function _49(_4a){
var _4b=_4c(_4a);
if(_4b.length){
return _4b[0];
}else{
return null;
}
};
function _4c(_4d){
return $.data(_4d,"treegrid").data;
};
function _4e(_4f,_50){
var row=_37(_4f,_50);
if(row._parentId){
return _37(_4f,row._parentId);
}else{
return null;
}
};
function _51(_52,_53){
var _54=$.data(_52,"treegrid").options;
var _55=$(_52).datagrid("getPanel").find("div.datagrid-view2 div.datagrid-body");
var _56=[];
if(_53){
_57(_53);
}else{
var _58=_4c(_52);
for(var i=0;i<_58.length;i++){
_56.push(_58[i]);
_57(_58[i][_54.idField]);
}
}
function _57(_59){
var _5a=_37(_52,_59);
if(_5a&&_5a.children){
for(var i=0,len=_5a.children.length;i<len;i++){
var _5b=_5a.children[i];
_56.push(_5b);
_57(_5b[_54.idField]);
}
}
};
return _56;
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
var _62=$(_60).datagrid("getPanel");
_62.find("div.datagrid-view2 div.datagrid-body tr.datagrid-row-selected").each(function(){
var id=$(this).attr("node-id");
_61.push(_37(_60,id));
});
return _61;
};
function _63(_64,_65){
if(!_65){
return 0;
}
var _66=$.data(_64,"treegrid").options;
var _67=$(_64).datagrid("getPanel").children("div.datagrid-view");
var _68=_67.find("div.datagrid-body tr[node-id="+_65+"]").children("td[field="+_66.treeField+"]");
return _68.find("span.tree-indent,span.tree-hit").length;
};
function _37(_69,_6a){
var _6b=$.data(_69,"treegrid").options;
var _6c=$.data(_69,"treegrid").data;
var cc=[_6c];
while(cc.length){
var c=cc.shift();
for(var i=0;i<c.length;i++){
var _6d=c[i];
if(_6d[_6b.idField]==_6a){
return _6d;
}else{
if(_6d["children"]){
cc.push(_6d["children"]);
}
}
}
}
return null;
};
function _6e(_6f,_70){
var _71=$(_6f).datagrid("getPanel").find("div.datagrid-body");
var tr=_71.find("tr[node-id="+_70+"]");
tr.addClass("datagrid-row-selected");
tr.find("div.datagrid-cell-check input[type=checkbox]").attr("checked",true);
};
function _72(_73,_74){
var _75=$(_73).datagrid("getPanel").find("div.datagrid-body");
var tr=_75.find("tr[node-id="+_74+"]");
tr.removeClass("datagrid-row-selected");
tr.find("div.datagrid-cell-check input[type=checkbox]").attr("checked",false);
};
function _1f(_76){
var tr=$(_76).datagrid("getPanel").find("div.datagrid-body tr[node-id]");
tr.addClass("datagrid-row-selected");
tr.find("div.datagrid-cell-check input[type=checkbox]").attr("checked",true);
};
function _20(_77){
var tr=$(_77).datagrid("getPanel").find("div.datagrid-body tr[node-id]");
tr.removeClass("datagrid-row-selected");
tr.find("div.datagrid-cell-check input[type=checkbox]").attr("checked",false);
};
function _78(_79,_7a){
var _7b=$.data(_79,"treegrid").options;
var _7c=$(_79).datagrid("getPanel").find("div.datagrid-body");
var row=_37(_79,_7a);
var tr=_7c.find("tr[node-id="+_7a+"]");
var hit=tr.find("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
if(_7b.onBeforeCollapse.call(_79,row)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
row.state="closed";
tr=tr.next("tr.treegrid-tr-tree");
var cc=tr.children("td").children("div");
if(_7b.animate){
cc.slideUp("normal",function(){
_6(_79,_7a);
_7b.onCollapse.call(_79,row);
});
}else{
cc.hide();
_6(_79,_7a);
_7b.onCollapse.call(_79,row);
}
};
function _7d(_7e,_7f){
var _80=$.data(_7e,"treegrid").options;
var _81=$(_7e).datagrid("getPanel").find("div.datagrid-body");
var tr=_81.find("tr[node-id="+_7f+"]");
var hit=tr.find("span.tree-hit");
var row=_37(_7e,_7f);
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
if(_80.onBeforeExpand.call(_7e,row)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var _82=tr.next("tr.treegrid-tr-tree");
if(_82.length){
var cc=_82.children("td").children("div");
_83(cc);
}else{
_21(_7e,row[_80.idField]);
var _82=tr.next("tr.treegrid-tr-tree");
var cc=_82.children("td").children("div");
cc.hide();
_3e(_7e,row[_80.idField],{id:row[_80.idField]},true,function(){
_83(cc);
});
}
function _83(cc){
row.state="open";
if(_80.animate){
cc.slideDown("normal",function(){
_6(_7e,_7f);
_80.onExpand.call(_7e,row);
});
}else{
cc.show();
_6(_7e,_7f);
_80.onExpand.call(_7e,row);
}
};
};
function _84(_85,_86){
var _87=$(_85).datagrid("getPanel").find("div.datagrid-body");
var tr=_87.find("tr[node-id="+_86+"]");
var hit=tr.find("span.tree-hit");
if(hit.hasClass("tree-expanded")){
_78(_85,_86);
}else{
_7d(_85,_86);
}
};
function _88(_89,_8a){
var _8b=$.data(_89,"treegrid").options;
var _8c=_51(_89,_8a);
if(_8a){
_8c.unshift(_37(_89,_8a));
}
for(var i=0;i<_8c.length;i++){
_78(_89,_8c[i][_8b.idField]);
}
};
function _8d(_8e,_8f){
var _90=$.data(_8e,"treegrid").options;
var _91=_51(_8e,_8f);
if(_8f){
_91.unshift(_37(_8e,_8f));
}
for(var i=0;i<_91.length;i++){
_7d(_8e,_91[i][_90.idField]);
}
};
function _92(_93,_94){
var _95=$.data(_93,"treegrid").options;
var ids=[];
var p=_4e(_93,_94);
while(p){
var id=p[_95.idField];
ids.unshift(id);
p=_4e(_93,id);
}
for(var i=0;i<ids.length;i++){
_7d(_93,ids[i]);
}
};
function _96(_97,_98){
var _99=$.data(_97,"treegrid").options;
if(_98.parent){
var _9a=$(_97).datagrid("getPanel").find("div.datagrid-body");
var tr=_9a.find("tr[node-id="+_98.parent+"]");
if(tr.next("tr.treegrid-tr-tree").length==0){
_21(_97,_98.parent);
}
var _9b=tr.children("td[field="+_99.treeField+"]").children("div.datagrid-cell");
var _9c=_9b.children("span.tree-icon");
if(_9c.hasClass("tree-file")){
_9c.removeClass("tree-file").addClass("tree-folder");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_9c);
if(hit.prev().length){
hit.prev().remove();
}
}
}
_2c(_97,_98.parent,_98.data,true);
};
function _9d(_9e,_9f){
var _a0=$.data(_9e,"treegrid").options;
var _a1=$(_9e).datagrid("getPanel").find("div.datagrid-body");
var tr=_a1.find("tr[node-id="+_9f+"]");
tr.next("tr.treegrid-tr-tree").remove();
tr.remove();
var _a2=del(_9f);
if(_a2){
if(_a2.children.length==0){
tr=_a1.find("tr[node-id="+_a2[_a0.treeField]+"]");
var _a3=tr.children("td[field="+_a0.treeField+"]").children("div.datagrid-cell");
_a3.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
_a3.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(_a3);
}
}
_16(_9e);
function del(id){
var cc;
var _a4=_4e(_9e,_9f);
if(_a4){
cc=_a4.children;
}else{
cc=$(_9e).treegrid("getData");
}
for(var i=0;i<cc.length;i++){
if(cc[i][_a0.treeField]==id){
cc.splice(i,1);
break;
}
}
return _a4;
};
};
$.fn.treegrid=function(_a5,_a6){
if(typeof _a5=="string"){
return $.fn.treegrid.methods[_a5](this,_a6);
}
_a5=_a5||{};
return this.each(function(){
var _a7=$.data(this,"treegrid");
if(_a7){
$.extend(_a7.options,_a5);
}else{
$.data(this,"treegrid",{options:$.extend({},$.fn.treegrid.defaults,$.fn.treegrid.parseOptions(this),_a5),data:[]});
}
_1(this);
_3e(this);
});
};
$.fn.treegrid.methods={options:function(jq){
return $.data(jq[0],"treegrid").options;
},resize:function(jq,_a8){
return jq.each(function(){
$(this).datagrid("resize",_a8);
});
},fixRowHeight:function(jq,_a9){
return jq.each(function(){
_6(this,_a9);
});
},loadData:function(jq,_aa){
return jq.each(function(){
_2c(this,null,_aa);
});
},reload:function(jq,id){
return jq.each(function(){
if(id){
var _ab=$(this).treegrid("find",id);
if(_ab.children){
_ab.children.splice(0,_ab.children.length);
}
var _ac=$(this).datagrid("getPanel").find("div.datagrid-body");
var tr=_ac.find("tr[node-id="+id+"]");
tr.next("tr.treegrid-tr-tree").remove();
var hit=tr.find("span.tree-hit");
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
_7d(this,id);
}else{
_3e(this);
}
});
},reloadFooter:function(jq,_ad){
return jq.each(function(){
var _ae=$.data(this,"treegrid").options;
var _af=$(this).datagrid("getPanel").children("div.datagrid-view");
var _b0=_af.children("div.datagrid-view1");
var _b1=_af.children("div.datagrid-view2");
if(_ad){
$.data(this,"treegrid").footer=_ad;
}
if(_ae.showFooter){
_ae.view.renderFooter.call(_ae.view,this,_b0.find("div.datagrid-footer-inner"),true);
_ae.view.renderFooter.call(_ae.view,this,_b1.find("div.datagrid-footer-inner"),false);
if(_ae.view.onAfterRender){
_ae.view.onAfterRender.call(_ae.view,this);
}
$(this).treegrid("fixRowHeight");
}
});
},getData:function(jq){
return $.data(jq[0],"treegrid").data;
},getFooterRows:function(jq){
return $.data(jq[0],"treegrid").footer;
},getRoot:function(jq){
return _49(jq[0]);
},getRoots:function(jq){
return _4c(jq[0]);
},getParent:function(jq,id){
return _4e(jq[0],id);
},getChildren:function(jq,id){
return _51(jq[0],id);
},getSelected:function(jq){
return _5c(jq[0]);
},getSelections:function(jq){
return _5f(jq[0]);
},getLevel:function(jq,id){
return _63(jq[0],id);
},find:function(jq,id){
return _37(jq[0],id);
},select:function(jq,id){
return jq.each(function(){
_6e(this,id);
});
},unselect:function(jq,id){
return jq.each(function(){
_72(this,id);
});
},selectAll:function(jq){
return jq.each(function(){
_1f(this);
});
},unselectAll:function(jq){
return jq.each(function(){
_20(this);
});
},collapse:function(jq,id){
return jq.each(function(){
_78(this,id);
});
},expand:function(jq,id){
return jq.each(function(){
_7d(this,id);
});
},toggle:function(jq,id){
return jq.each(function(){
_84(this,id);
});
},collapseAll:function(jq,id){
return jq.each(function(){
_88(this,id);
});
},expandAll:function(jq,id){
return jq.each(function(){
_8d(this,id);
});
},expandTo:function(jq,id){
return jq.each(function(){
_92(this,id);
});
},append:function(jq,_b2){
return jq.each(function(){
_96(this,_b2);
});
},remove:function(jq,id){
return jq.each(function(){
_9d(this,id);
});
},refresh:function(jq,id){
return jq.each(function(){
var _b3=$.data(this,"treegrid").options;
_b3.view.refreshRow.call(_b3.view,this,id);
});
}};
$.fn.treegrid.parseOptions=function(_b4){
var t=$(_b4);
return $.extend({},$.fn.datagrid.parseOptions(_b4),{treeField:t.attr("treeField"),animate:(t.attr("animate")?t.attr("animate")=="true":undefined)});
};
var _b5=$.extend({},$.fn.datagrid.defaults.view,{render:function(_b6,_b7,_b8){
var _b9=$.data(_b6,"treegrid").options;
var _ba=$(_b6).datagrid("getColumnFields",_b8);
var _bb=this;
var _bc=_bd(_b8,this.treeLevel,this.treeNodes);
$(_b7).append(_bc.join(""));
function _bd(_be,_bf,_c0){
var _c1=["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_c0.length;i++){
var row=_c0[i];
if(row.state!="open"&&row.state!="closed"){
row.state="open";
}
var _c2=_b9.rowStyler?_b9.rowStyler.call(_b6,row):"";
var _c3=_c2?"style=\""+_c2+"\"":"";
_c1.push("<tr node-id="+row[_b9.idField]+" "+_c3+">");
_c1=_c1.concat(_bb.renderRow.call(_bb,_b6,_ba,_be,_bf,row));
_c1.push("</tr>");
if(row.children&&row.children.length){
var tt=_bd(_be,_bf+1,row.children);
var v=row.state=="closed"?"none":"block";
_c1.push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan="+(_ba.length+(_b9.rownumbers?1:0))+"><div style=\"display:"+v+"\">");
_c1=_c1.concat(tt);
_c1.push("</div></td></tr>");
}
}
_c1.push("</tbody></table>");
return _c1;
};
},renderFooter:function(_c4,_c5,_c6){
var _c7=$.data(_c4,"treegrid").options;
var _c8=$.data(_c4,"treegrid").footer||[];
var _c9=$(_c4).datagrid("getColumnFields",_c6);
var _ca=["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_c8.length;i++){
var row=_c8[i];
row[_c7.idField]=row[_c7.idField]||("foot-row-id"+i);
_ca.push("<tr node-id="+row[_c7.idField]+">");
_ca.push(this.renderRow.call(this,_c4,_c9,_c6,0,row));
_ca.push("</tr>");
}
_ca.push("</tbody></table>");
$(_c5).html(_ca.join(""));
},renderRow:function(_cb,_cc,_cd,_ce,row){
var _cf=$.data(_cb,"treegrid").options;
var cc=[];
if(_cd&&_cf.rownumbers){
cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">0</div></td>");
}
for(var i=0;i<_cc.length;i++){
var _d0=_cc[i];
var col=$(_cb).datagrid("getColumnOption",_d0);
if(col){
var _d1=col.styler?(col.styler(row[_d0],row)||""):"";
var _d2=col.hidden?"style=\"display:none;"+_d1+"\"":(_d1?"style=\""+_d1+"\"":"");
cc.push("<td field=\""+_d0+"\" "+_d2+">");
var _d2="width:"+(col.boxWidth)+"px;";
_d2+="text-align:"+(col.align||"left")+";";
_d2+=_cf.nowrap==false?"white-space:normal;":"";
cc.push("<div style=\""+_d2+"\" ");
if(col.checkbox){
cc.push("class=\"datagrid-cell-check ");
}else{
cc.push("class=\"datagrid-cell ");
}
cc.push("\">");
if(col.checkbox){
if(row.checked){
cc.push("<input type=\"checkbox\" checked=\"checked\"/>");
}else{
cc.push("<input type=\"checkbox\"/>");
}
}else{
var val=null;
if(col.formatter){
val=col.formatter(row[_d0],row);
}else{
val=row[_d0]||"&nbsp;";
}
if(_d0==_cf.treeField){
for(var j=0;j<_ce;j++){
cc.push("<span class=\"tree-indent\"></span>");
}
if(row.state=="closed"){
cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
cc.push("<span class=\"tree-icon tree-folder "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
if(row.children&&row.children.length){
cc.push("<span class=\"tree-hit tree-expanded\"></span>");
cc.push("<span class=\"tree-icon tree-folder tree-folder-open "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
cc.push("<span class=\"tree-indent\"></span>");
cc.push("<span class=\"tree-icon tree-file "+(row.iconCls?row.iconCls:"")+"\"></span>");
}
}
cc.push("<span class=\"tree-title\">"+val+"</span>");
}else{
cc.push(val);
}
}
cc.push("</div>");
cc.push("</td>");
}
}
return cc.join("");
},refreshRow:function(_d3,id){
var row=$(_d3).treegrid("find",id);
var _d4=$.data(_d3,"treegrid").options;
var _d5=$(_d3).datagrid("getPanel").find("div.datagrid-body");
var _d6=_d4.rowStyler?_d4.rowStyler.call(_d3,row):"";
var _d7=_d6?"style=\""+_d6+"\"":"";
var tr=_d5.find("tr[node-id="+id+"]");
tr.attr("style",_d7);
tr.children("td").each(function(){
var _d8=$(this).find("div.datagrid-cell");
var _d9=$(this).attr("field");
var col=$(_d3).datagrid("getColumnOption",_d9);
if(col){
var _da=col.styler?(col.styler(row[_d9],row)||""):"";
var _db=col.hidden?"style=\"display:none;"+_da+"\"":(_da?"style=\""+_da+"\"":"");
$(this).attr("style",_db);
var val=null;
if(col.formatter){
val=col.formatter(row[_d9],row);
}else{
val=row[_d9]||"&nbsp;";
}
if(_d9==_d4.treeField){
_d8.children("span.tree-title").html(val);
var cls="tree-icon";
var _dc=_d8.children("span.tree-icon");
if(_dc.hasClass("tree-folder")){
cls+=" tree-folder";
}
if(_dc.hasClass("tree-folder-open")){
cls+=" tree-folder-open";
}
if(_dc.hasClass("tree-file")){
cls+=" tree-file";
}
if(row.iconCls){
cls+=" "+row.iconCls;
}
_dc.attr("class",cls);
}else{
_d8.html(val);
}
}
});
$(_d3).treegrid("fixRowHeight",id);
},onBeforeRender:function(_dd,_de,_df){
var _e0=$.data(_dd,"treegrid").options;
if(_df.length==undefined){
if(_df.footer){
$.data(_dd,"treegrid").footer=_df.footer;
}
_df=this.transfer(_dd,_de,_df.rows);
}else{
function _e1(_e2,_e3){
for(var i=0;i<_e2.length;i++){
var row=_e2[i];
row._parentId=_e3;
if(row.children&&row.children.length){
_e1(row.children,row[_e0.idField]);
}
}
};
_e1(_df,_de);
}
var _e4=_37(_dd,_de);
if(_e4){
if(_e4.children){
_e4.children=_e4.children.concat(_df);
}else{
_e4.children=_df;
}
}else{
$.data(_dd,"treegrid").data=$.data(_dd,"treegrid").data.concat(_df);
}
this.treeNodes=_df;
this.treeLevel=$(_dd).treegrid("getLevel",_de);
},transfer:function(_e5,_e6,_e7){
var _e8=$.data(_e5,"treegrid").options;
var _e9=[];
for(var i=0;i<_e7.length;i++){
_e9.push(_e7[i]);
}
var _ea=[];
for(var i=0;i<_e9.length;i++){
var row=_e9[i];
if(!_e6){
if(!row._parentId){
_ea.push(row);
_e9.remove(row);
i--;
}
}else{
if(row._parentId==_e6){
_ea.push(row);
_e9.remove(row);
i--;
}
}
}
var _eb=[];
for(var i=0;i<_ea.length;i++){
_eb.push(_ea[i]);
}
while(_eb.length){
var _ec=_eb.shift();
for(var i=0;i<_e9.length;i++){
var row=_e9[i];
if(row._parentId==_ec[_e8.idField]){
if(_ec.children){
_ec.children.push(row);
}else{
_ec.children=[row];
}
_eb.push(row);
_e9.remove(row);
i--;
}
}
}
return _ea;
}});
$.fn.treegrid.defaults=$.extend({},$.fn.datagrid.defaults,{treeField:null,animate:false,singleSelect:true,view:_b5,onBeforeLoad:function(row,_ed){
},onLoadSuccess:function(row,_ee){
},onLoadError:function(){
},onBeforeCollapse:function(row){
},onCollapse:function(row){
},onBeforeExpand:function(row){
},onExpand:function(row){
},onClickRow:function(row){
},onDblClickRow:function(row){
},onContextMenu:function(e,row){
}});
})(jQuery);

