/**
 * jQuery EasyUI 1.2.6
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
function _1(a,o){
for(var i=0,_2=a.length;i<_2;i++){
if(a[i]==o){
return i;
}
}
return -1;
};
function _3(a,o){
var _4=_1(a,o);
if(_4!=-1){
a.splice(_4,1);
}
};
function _5(_6){
var _7=$.data(_6,"treegrid").options;
$(_6).datagrid($.extend({},_7,{url:null,onLoadSuccess:function(){
},onResizeColumn:function(_8,_9){
_16(_6);
_7.onResizeColumn.call(_6,_8,_9);
},onSortColumn:function(_a,_b){
_7.sortName=_a;
_7.sortOrder=_b;
if(_7.remoteSort){
_15(_6);
}else{
var _c=$(_6).treegrid("getData");
_45(_6,0,_c);
}
_7.onSortColumn.call(_6,_a,_b);
},onBeforeEdit:function(_d,_e){
if(_7.onBeforeEdit.call(_6,_e)==false){
return false;
}
},onAfterEdit:function(_f,row,_10){
_2a(_6);
_7.onAfterEdit.call(_6,row,_10);
},onCancelEdit:function(_11,row){
_2a(_6);
_7.onCancelEdit.call(_6,row);
}}));
if(_7.pagination){
var _12=$(_6).datagrid("getPager");
_12.pagination({pageNumber:_7.pageNumber,pageSize:_7.pageSize,pageList:_7.pageList,onSelectPage:function(_13,_14){
_7.pageNumber=_13;
_7.pageSize=_14;
_15(_6);
}});
_7.pageSize=_12.pagination("options").pageSize;
}
};
function _16(_17,_18){
var _19=$.data(_17,"datagrid").options;
var _1a=$.data(_17,"datagrid").panel;
var _1b=_1a.children("div.datagrid-view");
var _1c=_1b.children("div.datagrid-view1");
var _1d=_1b.children("div.datagrid-view2");
if(_19.rownumbers||(_19.frozenColumns&&_19.frozenColumns.length>0)){
if(_18){
_1e(_18);
_1d.find("tr[node-id="+_18+"]").next("tr.treegrid-tr-tree").find("tr[node-id]").each(function(){
_1e($(this).attr("node-id"));
});
}else{
_1d.find("tr[node-id]").each(function(){
_1e($(this).attr("node-id"));
});
if(_19.showFooter){
var _1f=$.data(_17,"datagrid").footer||[];
for(var i=0;i<_1f.length;i++){
_1e(_1f[i][_19.idField]);
}
$(_17).datagrid("resize");
}
}
}
if(_19.height=="auto"){
var _20=_1c.children("div.datagrid-body");
var _21=_1d.children("div.datagrid-body");
var _22=0;
var _23=0;
_21.children().each(function(){
var c=$(this);
if(c.is(":visible")){
_22+=c.outerHeight();
if(_23<c.outerWidth()){
_23=c.outerWidth();
}
}
});
if(_23>_21.width()){
_22+=18;
}
_20.height(_22);
_21.height(_22);
_1b.height(_1d.height());
}
_1d.children("div.datagrid-body").triggerHandler("scroll");
function _1e(_24){
var tr1=_1c.find("tr[node-id="+_24+"]");
var tr2=_1d.find("tr[node-id="+_24+"]");
tr1.css("height","");
tr2.css("height","");
var _25=Math.max(tr1.height(),tr2.height());
tr1.css("height",_25);
tr2.css("height",_25);
};
};
function _26(_27){
var _28=$.data(_27,"treegrid").options;
if(!_28.rownumbers){
return;
}
$(_27).datagrid("getPanel").find("div.datagrid-view1 div.datagrid-body div.datagrid-cell-rownumber").each(function(i){
var _29=i+1;
$(this).html(_29);
});
};
function _2a(_2b){
var _2c=$.data(_2b,"treegrid").options;
var tr=_2c.finder.getTr(_2b,"","allbody");
tr.find("span.tree-hit").unbind(".treegrid").bind("click.treegrid",function(){
var tr=$(this).parents("tr:first");
var id=tr.attr("node-id");
_9e(_2b,id);
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
tr.unbind(".treegrid").bind("mouseenter.treegrid",function(){
var id=$(this).attr("node-id");
_2c.finder.getTr(_2b,id).addClass("datagrid-row-over");
}).bind("mouseleave.treegrid",function(){
var id=$(this).attr("node-id");
_2c.finder.getTr(_2b,id).removeClass("datagrid-row-over");
}).bind("click.treegrid",function(){
var id=$(this).attr("node-id");
if(_2c.singleSelect){
_31(_2b);
_32(_2b,id);
}else{
if($(this).hasClass("datagrid-row-selected")){
_33(_2b,id);
}else{
_32(_2b,id);
}
}
_2c.onClickRow.call(_2b,_50(_2b,id));
}).bind("dblclick.treegrid",function(){
var id=$(this).attr("node-id");
_2c.onDblClickRow.call(_2b,_50(_2b,id));
}).bind("contextmenu.treegrid",function(e){
var id=$(this).attr("node-id");
_2c.onContextMenu.call(_2b,e,_50(_2b,id));
});
tr.find("td[field]").unbind(".treegrid").bind("click.treegrid",function(){
var id=$(this).parent().attr("node-id");
var _2d=$(this).attr("field");
var _2e=_50(_2b,id)[_2d];
_2c.onClickCell.call(_2b,_2d,_2e);
}).bind("dblclick.treegrid",function(){
var id=$(this).parent().attr("node-id");
var _2f=$(this).attr("field");
var _30=_50(_2b,id)[_2f];
_2c.onDblClickCell.call(_2b,_2f,_30);
});
tr.find("div.datagrid-cell-check input[type=checkbox]").unbind(".treegrid").bind("click.treegrid",function(e){
var id=$(this).parent().parent().parent().attr("node-id");
if(_2c.singleSelect){
_31(_2b);
_32(_2b,id);
}else{
if($(this).attr("checked")){
_32(_2b,id);
}else{
_33(_2b,id);
}
}
e.stopPropagation();
});
};
function _34(_35){
var _36=$.data(_35,"treegrid").options;
var _37=$(_35).datagrid("getPanel");
var _38=_37.find("div.datagrid-header");
_38.find("input[type=checkbox]").unbind().bind("click.treegrid",function(){
if(_36.singleSelect){
return false;
}
if($(this).attr("checked")){
_39(_35);
}else{
_31(_35);
}
});
};
function _3a(_3b,_3c){
var _3d=$.data(_3b,"treegrid").options;
var _3e=$(_3b).datagrid("getPanel").children("div.datagrid-view");
var _3f=_3e.children("div.datagrid-view1");
var _40=_3e.children("div.datagrid-view2");
var tr1=_3f.children("div.datagrid-body").find("tr[node-id="+_3c+"]");
var tr2=_40.children("div.datagrid-body").find("tr[node-id="+_3c+"]");
var _41=$(_3b).datagrid("getColumnFields",true).length+(_3d.rownumbers?1:0);
var _42=$(_3b).datagrid("getColumnFields",false).length;
_43(tr1,_41);
_43(tr2,_42);
function _43(tr,_44){
$("<tr class=\"treegrid-tr-tree\">"+"<td style=\"border:0px\" colspan=\""+_44+"\">"+"<div></div>"+"</td>"+"</tr>").insertAfter(tr);
};
};
function _45(_46,_47,_48,_49){
var _4a=$.data(_46,"treegrid").options;
_48=_4a.loadFilter.call(_46,_48,_47);
var _4b=$.data(_46,"datagrid").panel;
var _4c=_4b.children("div.datagrid-view");
var _4d=_4c.children("div.datagrid-view1");
var _4e=_4c.children("div.datagrid-view2");
var _4f=_50(_46,_47);
if(_4f){
var _51=_4d.children("div.datagrid-body").find("tr[node-id="+_47+"]");
var _52=_4e.children("div.datagrid-body").find("tr[node-id="+_47+"]");
var cc1=_51.next("tr.treegrid-tr-tree").children("td").children("div");
var cc2=_52.next("tr.treegrid-tr-tree").children("td").children("div");
}else{
var cc1=_4d.children("div.datagrid-body").children("div.datagrid-body-inner");
var cc2=_4e.children("div.datagrid-body");
}
if(!_49){
$.data(_46,"treegrid").data=[];
cc1.empty();
cc2.empty();
}
if(_4a.view.onBeforeRender){
_4a.view.onBeforeRender.call(_4a.view,_46,_47,_48);
}
_4a.view.render.call(_4a.view,_46,cc1,true);
_4a.view.render.call(_4a.view,_46,cc2,false);
if(_4a.showFooter){
_4a.view.renderFooter.call(_4a.view,_46,_4d.find("div.datagrid-footer-inner"),true);
_4a.view.renderFooter.call(_4a.view,_46,_4e.find("div.datagrid-footer-inner"),false);
}
if(_4a.view.onAfterRender){
_4a.view.onAfterRender.call(_4a.view,_46);
}
_4a.onLoadSuccess.call(_46,_4f,_48);
if(!_47&&_4a.pagination){
var _53=$.data(_46,"treegrid").total;
var _54=$(_46).datagrid("getPager");
if(_54.pagination("options").total!=_53){
_54.pagination({total:_53});
}
}
_16(_46);
_26(_46);
_55();
_2a(_46);
function _55(){
var _56=_4c.find("div.datagrid-header");
var _57=_4c.find("div.datagrid-body");
var _58=_56.find("div.datagrid-header-check");
if(_58.length){
var ck=_57.find("div.datagrid-cell-check");
if($.boxModel){
ck.width(_58.width());
ck.height(_58.height());
}else{
ck.width(_58.outerWidth());
ck.height(_58.outerHeight());
}
}
};
};
function _15(_59,_5a,_5b,_5c,_5d){
var _5e=$.data(_59,"treegrid").options;
var _5f=$(_59).datagrid("getPanel").find("div.datagrid-body");
if(_5b){
_5e.queryParams=_5b;
}
var _60=$.extend({},_5e.queryParams);
if(_5e.pagination){
$.extend(_60,{page:_5e.pageNumber,rows:_5e.pageSize});
}
if(_5e.sortName){
$.extend(_60,{sort:_5e.sortName,order:_5e.sortOrder});
}
var row=_50(_59,_5a);
if(_5e.onBeforeLoad.call(_59,row,_60)==false){
return;
}
if(!_5e.url){
return;
}
var _61=_5f.find("tr[node-id="+_5a+"] span.tree-folder");
_61.addClass("tree-loading");
$(_59).treegrid("loading");
$.ajax({type:_5e.method,url:_5e.url,data:_60,dataType:"json",success:function(_62){
_61.removeClass("tree-loading");
$(_59).treegrid("loaded");
_45(_59,_5a,_62,_5c);
if(_5d){
_5d();
}
},error:function(){
_61.removeClass("tree-loading");
$(_59).treegrid("loaded");
_5e.onLoadError.apply(_59,arguments);
if(_5d){
_5d();
}
}});
};
function _63(_64){
var _65=_66(_64);
if(_65.length){
return _65[0];
}else{
return null;
}
};
function _66(_67){
return $.data(_67,"treegrid").data;
};
function _68(_69,_6a){
var row=_50(_69,_6a);
if(row._parentId){
return _50(_69,row._parentId);
}else{
return null;
}
};
function _6b(_6c,_6d){
var _6e=$.data(_6c,"treegrid").options;
var _6f=$(_6c).datagrid("getPanel").find("div.datagrid-view2 div.datagrid-body");
var _70=[];
if(_6d){
_71(_6d);
}else{
var _72=_66(_6c);
for(var i=0;i<_72.length;i++){
_70.push(_72[i]);
_71(_72[i][_6e.idField]);
}
}
function _71(_73){
var _74=_50(_6c,_73);
if(_74&&_74.children){
for(var i=0,len=_74.children.length;i<len;i++){
var _75=_74.children[i];
_70.push(_75);
_71(_75[_6e.idField]);
}
}
};
return _70;
};
function _76(_77){
var _78=_79(_77);
if(_78.length){
return _78[0];
}else{
return null;
}
};
function _79(_7a){
var _7b=[];
var _7c=$(_7a).datagrid("getPanel");
_7c.find("div.datagrid-view2 div.datagrid-body tr.datagrid-row-selected").each(function(){
var id=$(this).attr("node-id");
_7b.push(_50(_7a,id));
});
return _7b;
};
function _7d(_7e,_7f){
if(!_7f){
return 0;
}
var _80=$.data(_7e,"treegrid").options;
var _81=$(_7e).datagrid("getPanel").children("div.datagrid-view");
var _82=_81.find("div.datagrid-body tr[node-id="+_7f+"]").children("td[field="+_80.treeField+"]");
return _82.find("span.tree-indent,span.tree-hit").length;
};
function _50(_83,_84){
var _85=$.data(_83,"treegrid").options;
var _86=$.data(_83,"treegrid").data;
var cc=[_86];
while(cc.length){
var c=cc.shift();
for(var i=0;i<c.length;i++){
var _87=c[i];
if(_87[_85.idField]==_84){
return _87;
}else{
if(_87["children"]){
cc.push(_87["children"]);
}
}
}
}
return null;
};
function _32(_88,_89){
var _8a=$.data(_88,"treegrid").options;
var tr=_8a.finder.getTr(_88,_89);
tr.addClass("datagrid-row-selected");
tr.find("div.datagrid-cell-check input[type=checkbox]").attr("checked",true);
_8a.onSelect.call(_88,_50(_88,_89));
};
function _33(_8b,_8c){
var _8d=$.data(_8b,"treegrid").options;
var tr=_8d.finder.getTr(_8b,_8c);
tr.removeClass("datagrid-row-selected");
tr.find("div.datagrid-cell-check input[type=checkbox]").attr("checked",false);
_8d.onUnselect.call(_8b,_50(_8b,_8c));
};
function _39(_8e){
var _8f=$.data(_8e,"treegrid").options;
var _90=$.data(_8e,"treegrid").data;
var tr=_8f.finder.getTr(_8e,"","allbody");
tr.addClass("datagrid-row-selected");
tr.find("div.datagrid-cell-check input[type=checkbox]").attr("checked",true);
_8f.onSelectAll.call(_8e,_90);
};
function _31(_91){
var _92=$.data(_91,"treegrid").options;
var _93=$.data(_91,"treegrid").data;
var tr=_92.finder.getTr(_91,"","allbody");
tr.removeClass("datagrid-row-selected");
tr.find("div.datagrid-cell-check input[type=checkbox]").attr("checked",false);
_92.onUnselectAll.call(_91,_93);
};
function _94(_95,_96){
var _97=$.data(_95,"treegrid").options;
var row=_50(_95,_96);
var tr=_97.finder.getTr(_95,_96);
var hit=tr.find("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
if(_97.onBeforeCollapse.call(_95,row)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
row.state="closed";
tr=tr.next("tr.treegrid-tr-tree");
var cc=tr.children("td").children("div");
if(_97.animate){
cc.slideUp("normal",function(){
_16(_95,_96);
_97.onCollapse.call(_95,row);
});
}else{
cc.hide();
_16(_95,_96);
_97.onCollapse.call(_95,row);
}
};
function _98(_99,_9a){
var _9b=$.data(_99,"treegrid").options;
var tr=_9b.finder.getTr(_99,_9a);
var hit=tr.find("span.tree-hit");
var row=_50(_99,_9a);
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
if(_9b.onBeforeExpand.call(_99,row)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var _9c=tr.next("tr.treegrid-tr-tree");
if(_9c.length){
var cc=_9c.children("td").children("div");
_9d(cc);
}else{
_3a(_99,row[_9b.idField]);
var _9c=tr.next("tr.treegrid-tr-tree");
var cc=_9c.children("td").children("div");
cc.hide();
_15(_99,row[_9b.idField],{id:row[_9b.idField]},true,function(){
if(cc.is(":empty")){
_9c.remove();
}else{
_9d(cc);
}
});
}
function _9d(cc){
row.state="open";
if(_9b.animate){
cc.slideDown("normal",function(){
_16(_99,_9a);
_9b.onExpand.call(_99,row);
});
}else{
cc.show();
_16(_99,_9a);
_9b.onExpand.call(_99,row);
}
};
};
function _9e(_9f,_a0){
var _a1=$.data(_9f,"treegrid").options;
var tr=_a1.finder.getTr(_9f,_a0);
var hit=tr.find("span.tree-hit");
if(hit.hasClass("tree-expanded")){
_94(_9f,_a0);
}else{
_98(_9f,_a0);
}
};
function _a2(_a3,_a4){
var _a5=$.data(_a3,"treegrid").options;
var _a6=_6b(_a3,_a4);
if(_a4){
_a6.unshift(_50(_a3,_a4));
}
for(var i=0;i<_a6.length;i++){
_94(_a3,_a6[i][_a5.idField]);
}
};
function _a7(_a8,_a9){
var _aa=$.data(_a8,"treegrid").options;
var _ab=_6b(_a8,_a9);
if(_a9){
_ab.unshift(_50(_a8,_a9));
}
for(var i=0;i<_ab.length;i++){
_98(_a8,_ab[i][_aa.idField]);
}
};
function _ac(_ad,_ae){
var _af=$.data(_ad,"treegrid").options;
var ids=[];
var p=_68(_ad,_ae);
while(p){
var id=p[_af.idField];
ids.unshift(id);
p=_68(_ad,id);
}
for(var i=0;i<ids.length;i++){
_98(_ad,ids[i]);
}
};
function _b0(_b1,_b2){
var _b3=$.data(_b1,"treegrid").options;
if(_b2.parent){
var _b4=$(_b1).datagrid("getPanel").find("div.datagrid-body");
var tr=_b4.find("tr[node-id="+_b2.parent+"]");
if(tr.next("tr.treegrid-tr-tree").length==0){
_3a(_b1,_b2.parent);
}
var _b5=tr.children("td[field="+_b3.treeField+"]").children("div.datagrid-cell");
var _b6=_b5.children("span.tree-icon");
if(_b6.hasClass("tree-file")){
_b6.removeClass("tree-file").addClass("tree-folder");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_b6);
if(hit.prev().length){
hit.prev().remove();
}
}
}
_45(_b1,_b2.parent,_b2.data,true);
};
function _b7(_b8,_b9){
var _ba=$.data(_b8,"treegrid").options;
var tr=_ba.finder.getTr(_b8,_b9);
tr.next("tr.treegrid-tr-tree").remove();
tr.remove();
var _bb=del(_b9);
if(_bb){
if(_bb.children.length==0){
tr=_ba.finder.getTr(_b8,_bb[_ba.treeField]);
var _bc=tr.children("td[field="+_ba.treeField+"]").children("div.datagrid-cell");
_bc.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
_bc.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(_bc);
}
}
_26(_b8);
function del(id){
var cc;
var _bd=_68(_b8,_b9);
if(_bd){
cc=_bd.children;
}else{
cc=$(_b8).treegrid("getData");
}
for(var i=0;i<cc.length;i++){
if(cc[i][_ba.treeField]==id){
cc.splice(i,1);
break;
}
}
return _bd;
};
};
$.fn.treegrid=function(_be,_bf){
if(typeof _be=="string"){
var _c0=$.fn.treegrid.methods[_be];
if(_c0){
return _c0(this,_bf);
}else{
return this.datagrid(_be,_bf);
}
}
_be=_be||{};
return this.each(function(){
var _c1=$.data(this,"treegrid");
if(_c1){
$.extend(_c1.options,_be);
}else{
$.data(this,"treegrid",{options:$.extend({},$.fn.treegrid.defaults,$.fn.treegrid.parseOptions(this),_be),data:[]});
}
_5(this);
_15(this);
_34(this);
});
};
$.fn.treegrid.methods={options:function(jq){
return $.data(jq[0],"treegrid").options;
},resize:function(jq,_c2){
return jq.each(function(){
$(this).datagrid("resize",_c2);
});
},fixRowHeight:function(jq,_c3){
return jq.each(function(){
_16(this,_c3);
});
},loadData:function(jq,_c4){
return jq.each(function(){
_45(this,null,_c4);
});
},reload:function(jq,id){
return jq.each(function(){
if(id){
var _c5=$(this).treegrid("find",id);
if(_c5.children){
_c5.children.splice(0,_c5.children.length);
}
var _c6=$(this).datagrid("getPanel").find("div.datagrid-body");
var tr=_c6.find("tr[node-id="+id+"]");
tr.next("tr.treegrid-tr-tree").remove();
var hit=tr.find("span.tree-hit");
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
_98(this,id);
}else{
_15(this,null,{});
}
});
},reloadFooter:function(jq,_c7){
return jq.each(function(){
var _c8=$.data(this,"treegrid").options;
var _c9=$(this).datagrid("getPanel").children("div.datagrid-view");
var _ca=_c9.children("div.datagrid-view1");
var _cb=_c9.children("div.datagrid-view2");
if(_c7){
$.data(this,"treegrid").footer=_c7;
}
if(_c8.showFooter){
_c8.view.renderFooter.call(_c8.view,this,_ca.find("div.datagrid-footer-inner"),true);
_c8.view.renderFooter.call(_c8.view,this,_cb.find("div.datagrid-footer-inner"),false);
if(_c8.view.onAfterRender){
_c8.view.onAfterRender.call(_c8.view,this);
}
$(this).treegrid("fixRowHeight");
}
});
},loading:function(jq){
return jq.each(function(){
$(this).datagrid("loading");
});
},loaded:function(jq){
return jq.each(function(){
$(this).datagrid("loaded");
});
},getData:function(jq){
return $.data(jq[0],"treegrid").data;
},getFooterRows:function(jq){
return $.data(jq[0],"treegrid").footer;
},getRoot:function(jq){
return _63(jq[0]);
},getRoots:function(jq){
return _66(jq[0]);
},getParent:function(jq,id){
return _68(jq[0],id);
},getChildren:function(jq,id){
return _6b(jq[0],id);
},getSelected:function(jq){
return _76(jq[0]);
},getSelections:function(jq){
return _79(jq[0]);
},getLevel:function(jq,id){
return _7d(jq[0],id);
},find:function(jq,id){
return _50(jq[0],id);
},isLeaf:function(jq,id){
var _cc=$.data(jq[0],"treegrid").options;
var tr=_cc.finder.getTr(jq[0],id);
var hit=tr.find("span.tree-hit");
return hit.length==0;
},select:function(jq,id){
return jq.each(function(){
_32(this,id);
});
},unselect:function(jq,id){
return jq.each(function(){
_33(this,id);
});
},selectAll:function(jq){
return jq.each(function(){
_39(this);
});
},unselectAll:function(jq){
return jq.each(function(){
_31(this);
});
},collapse:function(jq,id){
return jq.each(function(){
_94(this,id);
});
},expand:function(jq,id){
return jq.each(function(){
_98(this,id);
});
},toggle:function(jq,id){
return jq.each(function(){
_9e(this,id);
});
},collapseAll:function(jq,id){
return jq.each(function(){
_a2(this,id);
});
},expandAll:function(jq,id){
return jq.each(function(){
_a7(this,id);
});
},expandTo:function(jq,id){
return jq.each(function(){
_ac(this,id);
});
},append:function(jq,_cd){
return jq.each(function(){
_b0(this,_cd);
});
},remove:function(jq,id){
return jq.each(function(){
_b7(this,id);
});
},refresh:function(jq,id){
return jq.each(function(){
var _ce=$.data(this,"treegrid").options;
_ce.view.refreshRow.call(_ce.view,this,id);
});
},beginEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("beginEdit",id);
$(this).treegrid("fixRowHeight",id);
});
},endEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("endEdit",id);
});
},cancelEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("cancelEdit",id);
});
}};
$.fn.treegrid.parseOptions=function(_cf){
var t=$(_cf);
return $.extend({},$.fn.datagrid.parseOptions(_cf),{treeField:t.attr("treeField"),animate:(t.attr("animate")?t.attr("animate")=="true":undefined)});
};
var _d0=$.extend({},$.fn.datagrid.defaults.view,{render:function(_d1,_d2,_d3){
var _d4=$.data(_d1,"treegrid").options;
var _d5=$(_d1).datagrid("getColumnFields",_d3);
var _d6=this;
var _d7=_d8(_d3,this.treeLevel,this.treeNodes);
$(_d2).append(_d7.join(""));
function _d8(_d9,_da,_db){
var _dc=["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_db.length;i++){
var row=_db[i];
if(row.state!="open"&&row.state!="closed"){
row.state="open";
}
var _dd=_d4.rowStyler?_d4.rowStyler.call(_d1,row):"";
var _de=_dd?"style=\""+_dd+"\"":"";
_dc.push("<tr node-id="+row[_d4.idField]+" "+_de+">");
_dc=_dc.concat(_d6.renderRow.call(_d6,_d1,_d5,_d9,_da,row));
_dc.push("</tr>");
if(row.children&&row.children.length){
var tt=_d8(_d9,_da+1,row.children);
var v=row.state=="closed"?"none":"block";
_dc.push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan="+(_d5.length+(_d4.rownumbers?1:0))+"><div style=\"display:"+v+"\">");
_dc=_dc.concat(tt);
_dc.push("</div></td></tr>");
}
}
_dc.push("</tbody></table>");
return _dc;
};
},renderFooter:function(_df,_e0,_e1){
var _e2=$.data(_df,"treegrid").options;
var _e3=$.data(_df,"treegrid").footer||[];
var _e4=$(_df).datagrid("getColumnFields",_e1);
var _e5=["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_e3.length;i++){
var row=_e3[i];
row[_e2.idField]=row[_e2.idField]||("foot-row-id"+i);
_e5.push("<tr node-id="+row[_e2.idField]+">");
_e5.push(this.renderRow.call(this,_df,_e4,_e1,0,row));
_e5.push("</tr>");
}
_e5.push("</tbody></table>");
$(_e0).html(_e5.join(""));
},renderRow:function(_e6,_e7,_e8,_e9,row){
var _ea=$.data(_e6,"treegrid").options;
var cc=[];
if(_e8&&_ea.rownumbers){
cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">0</div></td>");
}
for(var i=0;i<_e7.length;i++){
var _eb=_e7[i];
var col=$(_e6).datagrid("getColumnOption",_eb);
if(col){
var _ec=col.styler?(col.styler(row[_eb],row)||""):"";
var _ed=col.hidden?"style=\"display:none;"+_ec+"\"":(_ec?"style=\""+_ec+"\"":"");
cc.push("<td field=\""+_eb+"\" "+_ed+">");
var _ed="width:"+(col.boxWidth)+"px;";
_ed+="text-align:"+(col.align||"left")+";";
_ed+=_ea.nowrap==false?"white-space:normal;":"";
cc.push("<div style=\""+_ed+"\" ");
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
val=col.formatter(row[_eb],row);
}else{
val=row[_eb]||"&nbsp;";
}
if(_eb==_ea.treeField){
for(var j=0;j<_e9;j++){
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
},refreshRow:function(_ee,id){
var row=$(_ee).treegrid("find",id);
var _ef=$.data(_ee,"treegrid").options;
var _f0=$(_ee).datagrid("getPanel").find("div.datagrid-body");
var _f1=_ef.rowStyler?_ef.rowStyler.call(_ee,row):"";
var _f2=_f1?_f1:"";
var tr=_f0.find("tr[node-id="+id+"]");
tr.attr("style",_f2);
tr.children("td").each(function(){
var _f3=$(this).find("div.datagrid-cell");
var _f4=$(this).attr("field");
var col=$(_ee).datagrid("getColumnOption",_f4);
if(col){
var _f5=col.styler?(col.styler(row[_f4],row)||""):"";
var _f6=col.hidden?"display:none;"+_f5:(_f5?_f5:"");
$(this).attr("style",_f6);
var val=null;
if(col.formatter){
val=col.formatter(row[_f4],row);
}else{
val=row[_f4]||"&nbsp;";
}
if(_f4==_ef.treeField){
_f3.children("span.tree-title").html(val);
var cls="tree-icon";
var _f7=_f3.children("span.tree-icon");
if(_f7.hasClass("tree-folder")){
cls+=" tree-folder";
}
if(_f7.hasClass("tree-folder-open")){
cls+=" tree-folder-open";
}
if(_f7.hasClass("tree-file")){
cls+=" tree-file";
}
if(row.iconCls){
cls+=" "+row.iconCls;
}
_f7.attr("class",cls);
}else{
_f3.html(val);
}
}
});
$(_ee).treegrid("fixRowHeight",id);
},onBeforeRender:function(_f8,_f9,_fa){
if(!_fa){
return false;
}
var _fb=$.data(_f8,"treegrid").options;
if(_fa.length==undefined){
if(_fa.footer){
$.data(_f8,"treegrid").footer=_fa.footer;
}
if(_fa.total){
$.data(_f8,"treegrid").total=_fa.total;
}
_fa=this.transfer(_f8,_f9,_fa.rows);
}else{
function _fc(_fd,_fe){
for(var i=0;i<_fd.length;i++){
var row=_fd[i];
row._parentId=_fe;
if(row.children&&row.children.length){
_fc(row.children,row[_fb.idField]);
}
}
};
_fc(_fa,_f9);
}
var _ff=_50(_f8,_f9);
if(_ff){
if(_ff.children){
_ff.children=_ff.children.concat(_fa);
}else{
_ff.children=_fa;
}
}else{
$.data(_f8,"treegrid").data=$.data(_f8,"treegrid").data.concat(_fa);
}
if(!_fb.remoteSort){
this.sort(_f8,_fa);
}
this.treeNodes=_fa;
this.treeLevel=$(_f8).treegrid("getLevel",_f9);
},sort:function(_100,data){
var opts=$.data(_100,"treegrid").options;
var opt=$(_100).treegrid("getColumnOption",opts.sortName);
if(opt){
var _101=opt.sorter||function(a,b){
return (a>b?1:-1);
};
_102(data);
}
function _102(rows){
rows.sort(function(r1,r2){
return _101(r1[opts.sortName],r2[opts.sortName])*(opts.sortOrder=="asc"?1:-1);
});
for(var i=0;i<rows.length;i++){
var _103=rows[i].children;
if(_103&&_103.length){
_102(_103);
}
}
};
},transfer:function(_104,_105,data){
var opts=$.data(_104,"treegrid").options;
var rows=[];
for(var i=0;i<data.length;i++){
rows.push(data[i]);
}
var _106=[];
for(var i=0;i<rows.length;i++){
var row=rows[i];
if(!_105){
if(!row._parentId){
_106.push(row);
_3(rows,row);
i--;
}
}else{
if(row._parentId==_105){
_106.push(row);
_3(rows,row);
i--;
}
}
}
var toDo=[];
for(var i=0;i<_106.length;i++){
toDo.push(_106[i]);
}
while(toDo.length){
var node=toDo.shift();
for(var i=0;i<rows.length;i++){
var row=rows[i];
if(row._parentId==node[opts.idField]){
if(node.children){
node.children.push(row);
}else{
node.children=[row];
}
toDo.push(row);
_3(rows,row);
i--;
}
}
}
return _106;
}});
$.fn.treegrid.defaults=$.extend({},$.fn.datagrid.defaults,{treeField:null,animate:false,singleSelect:true,view:_d0,loadFilter:function(data,_107){
return data;
},finder:{getTr:function(_108,id,type,_109){
type=type||"body";
_109=_109||0;
var dc=$.data(_108,"datagrid").dc;
if(_109==0){
var opts=$.data(_108,"treegrid").options;
var tr1=opts.finder.getTr(_108,id,type,1);
var tr2=opts.finder.getTr(_108,id,type,2);
return tr1.add(tr2);
}else{
if(type=="body"){
return (_109==1?dc.body1:dc.body2).find("tr[node-id="+id+"]");
}else{
if(type=="footer"){
return (_109==1?dc.footer1:dc.footer2).find("tr[node-id="+id+"]");
}else{
if(type=="selected"){
return (_109==1?dc.body1:dc.body2).find("tr.datagrid-row-selected");
}else{
if(type=="last"){
return (_109==1?dc.body1:dc.body2).find("tr:last[node-id]");
}else{
if(type=="allbody"){
return (_109==1?dc.body1:dc.body2).find("tr[node-id]");
}else{
if(type=="allfooter"){
return (_109==1?dc.footer1:dc.footer2).find("tr[node-id]");
}
}
}
}
}
}
}
},getRow:function(_10a,id){
return $(_10a).treegrid("find",id);
}},onBeforeLoad:function(row,_10b){
},onLoadSuccess:function(row,data){
},onLoadError:function(){
},onBeforeCollapse:function(row){
},onCollapse:function(row){
},onBeforeExpand:function(row){
},onExpand:function(row){
},onClickRow:function(row){
},onDblClickRow:function(row){
},onContextMenu:function(e,row){
},onBeforeEdit:function(row){
},onAfterEdit:function(row,_10c){
},onCancelEdit:function(row){
}});
})(jQuery);

