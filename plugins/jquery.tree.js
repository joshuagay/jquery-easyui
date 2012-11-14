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
function _1(_2){
var _3=$(_2);
_3.addClass("tree");
return _3;
};
function _4(_5){
var _6=[];
_7(_6,$(_5));
function _7(aa,_8){
_8.children("li").each(function(){
var _9=$(this);
var _a=$.extend({},$.parser.parseOptions(this,["id","iconCls","state"]),{checked:(_9.attr("checked")?true:undefined)});
_a.text=_9.children("span").html();
if(!_a.text){
_a.text=_9.html();
}
var _b=_9.children("ul");
if(_b.length){
_a.children=[];
_7(_a.children,_b);
}
aa.push(_a);
});
};
return _6;
};
function _c(_d){
var _e=$.data(_d,"tree").options;
$(_d).unbind().bind("mouseover",function(e){
var tt=$(e.target);
var _f=tt.closest("div.tree-node");
if(!_f.length){
return;
}
_f.addClass("tree-node-hover");
if(tt.hasClass("tree-hit")){
if(tt.hasClass("tree-expanded")){
tt.addClass("tree-expanded-hover");
}else{
tt.addClass("tree-collapsed-hover");
}
}
e.stopPropagation();
}).bind("mouseout",function(e){
var tt=$(e.target);
var _10=tt.closest("div.tree-node");
if(!_10.length){
return;
}
_10.removeClass("tree-node-hover");
if(tt.hasClass("tree-hit")){
if(tt.hasClass("tree-expanded")){
tt.removeClass("tree-expanded-hover");
}else{
tt.removeClass("tree-collapsed-hover");
}
}
e.stopPropagation();
}).bind("click",function(e){
var tt=$(e.target);
var _11=tt.closest("div.tree-node");
if(!_11.length){
return;
}
if(tt.hasClass("tree-hit")){
_81(_d,_11[0]);
return false;
}else{
if(tt.hasClass("tree-checkbox")){
_35(_d,_11[0],!tt.hasClass("tree-checkbox1"));
return false;
}else{
_ca(_d,_11[0]);
_e.onClick.call(_d,_14(_d,_11[0]));
}
}
e.stopPropagation();
}).bind("dblclick",function(e){
var _12=$(e.target).closest("div.tree-node");
if(!_12.length){
return;
}
_ca(_d,_12[0]);
_e.onDblClick.call(_d,_14(_d,_12[0]));
e.stopPropagation();
}).bind("contextmenu",function(e){
var _13=$(e.target).closest("div.tree-node");
if(!_13.length){
return;
}
_e.onContextMenu.call(_d,e,_14(_d,_13[0]));
e.stopPropagation();
});
};
function _15(_16){
var _17=$(_16).find("div.tree-node");
_17.draggable("disable");
_17.css("cursor","pointer");
};
function _18(_19){
var _1a=$.data(_19,"tree");
var _1b=_1a.options;
var _1c=_1a.tree;
_1a.disabledNodes=[];
_1c.find("div.tree-node").draggable({disabled:false,revert:true,cursor:"pointer",proxy:function(_1d){
var p=$("<div class=\"tree-node-proxy tree-dnd-no\"></div>").appendTo("body");
p.html($(_1d).find(".tree-title").html());
p.hide();
return p;
},deltaX:15,deltaY:15,onBeforeDrag:function(e){
if(_1b.onBeforeDrag.call(_19,_14(_19,this))==false){
return false;
}
if($(e.target).hasClass("tree-hit")||$(e.target).hasClass("tree-checkbox")){
return false;
}
if(e.which!=1){
return false;
}
$(this).next("ul").find("div.tree-node").droppable({accept:"no-accept"});
var _1e=$(this).find("span.tree-indent");
if(_1e.length){
e.data.startLeft+=_1e.length*_1e.width();
}
},onStartDrag:function(){
$(this).draggable("proxy").css({left:-10000,top:-10000});
_1b.onStartDrag.call(_19,_14(_19,this));
var _1f=_14(_19,this);
if(_1f.id==undefined){
_1f.id="easyui_tree_node_id_temp";
_be(_19,_1f);
}
_1a.draggingNodeId=_1f.id;
},onDrag:function(e){
var x1=e.pageX,y1=e.pageY,x2=e.data.startX,y2=e.data.startY;
var d=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
if(d>3){
$(this).draggable("proxy").show();
}
this.pageY=e.pageY;
},onStopDrag:function(){
$(this).next("ul").find("div.tree-node").droppable({accept:"div.tree-node"});
for(var i=0;i<_1a.disabledNodes.length;i++){
$(_1a.disabledNodes[i]).droppable("enable");
}
_1a.disabledNodes=[];
var _20=_c7(_19,_1a.draggingNodeId);
if(_20.id=="easyui_tree_node_id_temp"){
_20.id="";
_be(_19,_20);
}
_1b.onStopDrag.call(_19,_20);
}}).droppable({accept:"div.tree-node",onDragEnter:function(e,_21){
if(_1b.onDragEnter.call(_19,this,_14(_19,_21))==false){
$(_21).draggable("proxy").removeClass("tree-dnd-yes").addClass("tree-dnd-no");
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
$(this).droppable("disable");
_1a.disabledNodes.push(this);
}
},onDragOver:function(e,_22){
if($(this).droppable("options").disabled){
return;
}
var _23=_22.pageY;
var top=$(this).offset().top;
var _24=top+$(this).outerHeight();
$(_22).draggable("proxy").removeClass("tree-dnd-no").addClass("tree-dnd-yes");
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
if(_23>top+(_24-top)/2){
if(_24-_23<5){
$(this).addClass("tree-node-bottom");
}else{
$(this).addClass("tree-node-append");
}
}else{
if(_23-top<5){
$(this).addClass("tree-node-top");
}else{
$(this).addClass("tree-node-append");
}
}
if(_1b.onDragOver.call(_19,this,_14(_19,_22))==false){
$(_22).draggable("proxy").removeClass("tree-dnd-yes").addClass("tree-dnd-no");
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
$(this).droppable("disable");
_1a.disabledNodes.push(this);
}
},onDragLeave:function(e,_25){
$(_25).draggable("proxy").removeClass("tree-dnd-yes").addClass("tree-dnd-no");
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
_1b.onDragLeave.call(_19,this,_14(_19,_25));
},onDrop:function(e,_26){
var _27=this;
var _28,_29;
if($(this).hasClass("tree-node-append")){
_28=_2a;
}else{
_28=_2b;
_29=$(this).hasClass("tree-node-top")?"top":"bottom";
}
_28(_26,_27,_29);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
}});
function _2a(_2c,_2d){
if(_14(_19,_2d).state=="closed"){
_75(_19,_2d,function(){
_2e();
});
}else{
_2e();
}
function _2e(){
var _2f=$(_19).tree("pop",_2c);
$(_19).tree("append",{parent:_2d,data:[_2f]});
_1b.onDrop.call(_19,_2d,_2f,"append");
};
};
function _2b(_30,_31,_32){
var _33={};
if(_32=="top"){
_33.before=_31;
}else{
_33.after=_31;
}
var _34=$(_19).tree("pop",_30);
_33.data=_34;
$(_19).tree("insert",_33);
_1b.onDrop.call(_19,_31,_34,_32);
};
};
function _35(_36,_37,_38){
var _39=$.data(_36,"tree").options;
if(!_39.checkbox){
return;
}
var _3a=_14(_36,_37);
if(_39.onBeforeCheck.call(_36,_3a,_38)==false){
return;
}
var _3b=$(_37);
var ck=_3b.find(".tree-checkbox");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_38){
ck.addClass("tree-checkbox1");
}else{
ck.addClass("tree-checkbox0");
}
if(_39.cascadeCheck){
_3c(_3b);
_3d(_3b);
}
_39.onCheck.call(_36,_3a,_38);
function _3d(_3e){
var _3f=_3e.next().find(".tree-checkbox");
_3f.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_3e.find(".tree-checkbox").hasClass("tree-checkbox1")){
_3f.addClass("tree-checkbox1");
}else{
_3f.addClass("tree-checkbox0");
}
};
function _3c(_40){
var _41=_8c(_36,_40[0]);
if(_41){
var ck=$(_41.target).find(".tree-checkbox");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_42(_40)){
ck.addClass("tree-checkbox1");
}else{
if(_43(_40)){
ck.addClass("tree-checkbox0");
}else{
ck.addClass("tree-checkbox2");
}
}
_3c($(_41.target));
}
function _42(n){
var ck=n.find(".tree-checkbox");
if(ck.hasClass("tree-checkbox0")||ck.hasClass("tree-checkbox2")){
return false;
}
var b=true;
n.parent().siblings().each(function(){
if(!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox1")){
b=false;
}
});
return b;
};
function _43(n){
var ck=n.find(".tree-checkbox");
if(ck.hasClass("tree-checkbox1")||ck.hasClass("tree-checkbox2")){
return false;
}
var b=true;
n.parent().siblings().each(function(){
if(!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox0")){
b=false;
}
});
return b;
};
};
};
function _44(_45,_46){
var _47=$.data(_45,"tree").options;
var _48=$(_46);
if(_49(_45,_46)){
var ck=_48.find(".tree-checkbox");
if(ck.length){
if(ck.hasClass("tree-checkbox1")){
_35(_45,_46,true);
}else{
_35(_45,_46,false);
}
}else{
if(_47.onlyLeafCheck){
$("<span class=\"tree-checkbox tree-checkbox0\"></span>").insertBefore(_48.find(".tree-title"));
}
}
}else{
var ck=_48.find(".tree-checkbox");
if(_47.onlyLeafCheck){
ck.remove();
}else{
if(ck.hasClass("tree-checkbox1")){
_35(_45,_46,true);
}else{
if(ck.hasClass("tree-checkbox2")){
var _4a=true;
var _4b=true;
var _4c=_4d(_45,_46);
for(var i=0;i<_4c.length;i++){
if(_4c[i].checked){
_4b=false;
}else{
_4a=false;
}
}
if(_4a){
_35(_45,_46,true);
}
if(_4b){
_35(_45,_46,false);
}
}
}
}
}
};
function _4e(_4f,ul,_50,_51){
var _52=$.data(_4f,"tree").options;
_50=_52.loadFilter.call(_4f,_50,$(ul).prev("div.tree-node")[0]);
if(!_51){
$(ul).empty();
}
var _53=[];
var _54=$(ul).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length;
_55(ul,_50,_54);
if(_52.dnd){
_18(_4f);
}else{
_15(_4f);
}
for(var i=0;i<_53.length;i++){
_35(_4f,_53[i],true);
}
setTimeout(function(){
_5d(_4f,_4f);
},0);
var _56=null;
if(_4f!=ul){
var _57=$(ul).prev();
_56=_14(_4f,_57[0]);
}
_52.onLoadSuccess.call(_4f,_56,_50);
function _55(ul,_58,_59){
for(var i=0;i<_58.length;i++){
var li=$("<li></li>").appendTo(ul);
var _5a=_58[i];
if(_5a.state!="open"&&_5a.state!="closed"){
_5a.state="open";
}
var _5b=$("<div class=\"tree-node\"></div>").appendTo(li);
_5b.attr("node-id",_5a.id);
$.data(_5b[0],"tree-node",{id:_5a.id,text:_5a.text,iconCls:_5a.iconCls,attributes:_5a.attributes});
$("<span class=\"tree-title\"></span>").html(_5a.text).appendTo(_5b);
if(_52.checkbox){
if(_52.onlyLeafCheck){
if(_5a.state=="open"&&(!_5a.children||!_5a.children.length)){
if(_5a.checked){
$("<span class=\"tree-checkbox tree-checkbox1\"></span>").prependTo(_5b);
}else{
$("<span class=\"tree-checkbox tree-checkbox0\"></span>").prependTo(_5b);
}
}
}else{
if(_5a.checked){
$("<span class=\"tree-checkbox tree-checkbox1\"></span>").prependTo(_5b);
_53.push(_5b[0]);
}else{
$("<span class=\"tree-checkbox tree-checkbox0\"></span>").prependTo(_5b);
}
}
}
if(_5a.children&&_5a.children.length){
var _5c=$("<ul></ul>").appendTo(li);
if(_5a.state=="open"){
$("<span class=\"tree-icon tree-folder tree-folder-open\"></span>").addClass(_5a.iconCls).prependTo(_5b);
$("<span class=\"tree-hit tree-expanded\"></span>").prependTo(_5b);
}else{
$("<span class=\"tree-icon tree-folder\"></span>").addClass(_5a.iconCls).prependTo(_5b);
$("<span class=\"tree-hit tree-collapsed\"></span>").prependTo(_5b);
_5c.css("display","none");
}
_55(_5c,_5a.children,_59+1);
}else{
if(_5a.state=="closed"){
$("<span class=\"tree-icon tree-folder\"></span>").addClass(_5a.iconCls).prependTo(_5b);
$("<span class=\"tree-hit tree-collapsed\"></span>").prependTo(_5b);
}else{
$("<span class=\"tree-icon tree-file\"></span>").addClass(_5a.iconCls).prependTo(_5b);
$("<span class=\"tree-indent\"></span>").prependTo(_5b);
}
}
for(var j=0;j<_59;j++){
$("<span class=\"tree-indent\"></span>").prependTo(_5b);
}
}
};
};
function _5d(_5e,ul,_5f){
var _60=$.data(_5e,"tree").options;
if(!_60.lines){
return;
}
if(!_5f){
_5f=true;
$(_5e).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
$(_5e).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");
var _61=$(_5e).tree("getRoots");
if(_61.length>1){
$(_61[0].target).addClass("tree-root-first");
}else{
$(_61[0].target).addClass("tree-root-one");
}
}
$(ul).children("li").each(function(){
var _62=$(this).children("div.tree-node");
var ul=_62.next("ul");
if(ul.length){
if($(this).next().length){
_63(_62);
}
_5d(_5e,ul,_5f);
}else{
_64(_62);
}
});
var _65=$(ul).children("li:last").children("div.tree-node").addClass("tree-node-last");
_65.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");
function _64(_66,_67){
var _68=_66.find("span.tree-icon");
_68.prev("span.tree-indent").addClass("tree-join");
};
function _63(_69){
var _6a=_69.find("span.tree-indent, span.tree-hit").length;
_69.next().find("div.tree-node").each(function(){
$(this).children("span:eq("+(_6a-1)+")").addClass("tree-line");
});
};
};
function _6b(_6c,ul,_6d,_6e){
var _6f=$.data(_6c,"tree").options;
_6d=_6d||{};
var _70=null;
if(_6c!=ul){
var _71=$(ul).prev();
_70=_14(_6c,_71[0]);
}
if(_6f.onBeforeLoad.call(_6c,_70,_6d)==false){
return;
}
var _72=$(ul).prev().children("span.tree-folder");
_72.addClass("tree-loading");
var _73=_6f.loader.call(_6c,_6d,function(_74){
_72.removeClass("tree-loading");
_4e(_6c,ul,_74);
if(_6e){
_6e();
}
},function(){
_72.removeClass("tree-loading");
_6f.onLoadError.apply(_6c,arguments);
if(_6e){
_6e();
}
});
if(_73==false){
_72.removeClass("tree-loading");
}
};
function _75(_76,_77,_78){
var _79=$.data(_76,"tree").options;
var hit=$(_77).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
var _7a=_14(_76,_77);
if(_79.onBeforeExpand.call(_76,_7a)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var ul=$(_77).next();
if(ul.length){
if(_79.animate){
ul.slideDown("normal",function(){
_79.onExpand.call(_76,_7a);
if(_78){
_78();
}
});
}else{
ul.css("display","block");
_79.onExpand.call(_76,_7a);
if(_78){
_78();
}
}
}else{
var _7b=$("<ul style=\"display:none\"></ul>").insertAfter(_77);
_6b(_76,_7b[0],{id:_7a.id},function(){
if(_7b.is(":empty")){
_7b.remove();
}
if(_79.animate){
_7b.slideDown("normal",function(){
_79.onExpand.call(_76,_7a);
if(_78){
_78();
}
});
}else{
_7b.css("display","block");
_79.onExpand.call(_76,_7a);
if(_78){
_78();
}
}
});
}
};
function _7c(_7d,_7e){
var _7f=$.data(_7d,"tree").options;
var hit=$(_7e).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
var _80=_14(_7d,_7e);
if(_7f.onBeforeCollapse.call(_7d,_80)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
var ul=$(_7e).next();
if(_7f.animate){
ul.slideUp("normal",function(){
_7f.onCollapse.call(_7d,_80);
});
}else{
ul.css("display","none");
_7f.onCollapse.call(_7d,_80);
}
};
function _81(_82,_83){
var hit=$(_83).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
_7c(_82,_83);
}else{
_75(_82,_83);
}
};
function _84(_85,_86){
var _87=_4d(_85,_86);
if(_86){
_87.unshift(_14(_85,_86));
}
for(var i=0;i<_87.length;i++){
_75(_85,_87[i].target);
}
};
function _88(_89,_8a){
var _8b=[];
var p=_8c(_89,_8a);
while(p){
_8b.unshift(p);
p=_8c(_89,p.target);
}
for(var i=0;i<_8b.length;i++){
_75(_89,_8b[i].target);
}
};
function _8d(_8e,_8f){
var _90=_4d(_8e,_8f);
if(_8f){
_90.unshift(_14(_8e,_8f));
}
for(var i=0;i<_90.length;i++){
_7c(_8e,_90[i].target);
}
};
function _91(_92){
var _93=_94(_92);
if(_93.length){
return _93[0];
}else{
return null;
}
};
function _94(_95){
var _96=[];
$(_95).children("li").each(function(){
var _97=$(this).children("div.tree-node");
_96.push(_14(_95,_97[0]));
});
return _96;
};
function _4d(_98,_99){
var _9a=[];
if(_99){
_9b($(_99));
}else{
var _9c=_94(_98);
for(var i=0;i<_9c.length;i++){
_9a.push(_9c[i]);
_9b($(_9c[i].target));
}
}
function _9b(_9d){
_9d.next().find("div.tree-node").each(function(){
_9a.push(_14(_98,this));
});
};
return _9a;
};
function _8c(_9e,_9f){
var ul=$(_9f).parent().parent();
if(ul[0]==_9e){
return null;
}else{
return _14(_9e,ul.prev()[0]);
}
};
function _a0(_a1,_a2){
_a2=_a2||"checked";
var _a3="";
if(_a2=="checked"){
_a3="span.tree-checkbox1";
}else{
if(_a2=="unchecked"){
_a3="span.tree-checkbox0";
}else{
if(_a2=="indeterminate"){
_a3="span.tree-checkbox2";
}
}
}
var _a4=[];
$(_a1).find(_a3).each(function(){
var _a5=$(this).parent();
_a4.push(_14(_a1,_a5[0]));
});
return _a4;
};
function _a6(_a7){
var _a8=$(_a7).find("div.tree-node-selected");
if(_a8.length){
return _14(_a7,_a8[0]);
}else{
return null;
}
};
function _a9(_aa,_ab){
var _ac=$(_ab.parent);
var ul;
if(_ac.length==0){
ul=$(_aa);
}else{
ul=_ac.next();
if(ul.length==0){
ul=$("<ul></ul>").insertAfter(_ac);
}
}
if(_ab.data&&_ab.data.length){
var _ad=_ac.find("span.tree-icon");
if(_ad.hasClass("tree-file")){
_ad.removeClass("tree-file").addClass("tree-folder tree-folder-open");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_ad);
if(hit.prev().length){
hit.prev().remove();
}
}
}
_4e(_aa,ul[0],_ab.data,true);
_44(_aa,ul.prev());
};
function _ae(_af,_b0){
var ref=_b0.before||_b0.after;
var _b1=_8c(_af,ref);
var li;
if(_b1){
_a9(_af,{parent:_b1.target,data:[_b0.data]});
li=$(_b1.target).next().children("li:last");
}else{
_a9(_af,{parent:null,data:[_b0.data]});
li=$(_af).children("li:last");
}
if(_b0.before){
li.insertBefore($(ref).parent());
}else{
li.insertAfter($(ref).parent());
}
};
function _b2(_b3,_b4){
var _b5=_8c(_b3,_b4);
var _b6=$(_b4);
var li=_b6.parent();
var ul=li.parent();
li.remove();
if(ul.children("li").length==0){
var _b6=ul.prev();
_b6.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
_b6.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(_b6);
if(ul[0]!=_b3){
ul.remove();
}
}
if(_b5){
_44(_b3,_b5.target);
}
_5d(_b3,_b3);
};
function _b7(_b8,_b9){
function _ba(aa,ul){
ul.children("li").each(function(){
var _bb=$(this).children("div.tree-node");
var _bc=_14(_b8,_bb[0]);
var sub=$(this).children("ul");
if(sub.length){
_bc.children=[];
_ba(_bc.children,sub);
}
aa.push(_bc);
});
};
if(_b9){
var _bd=_14(_b8,_b9);
_bd.children=[];
_ba(_bd.children,$(_b9).next());
return _bd;
}else{
return null;
}
};
function _be(_bf,_c0){
var _c1=$(_c0.target);
var _c2=_14(_bf,_c0.target);
if(_c2.iconCls){
_c1.find(".tree-icon").removeClass(_c2.iconCls);
}
var _c3=$.extend({},_c2,_c0);
$.data(_c0.target,"tree-node",_c3);
_c1.attr("node-id",_c3.id);
_c1.find(".tree-title").html(_c3.text);
if(_c3.iconCls){
_c1.find(".tree-icon").addClass(_c3.iconCls);
}
if(_c2.checked!=_c3.checked){
_35(_bf,_c0.target,_c3.checked);
}
};
function _14(_c4,_c5){
var _c6=$.extend({},$.data(_c5,"tree-node"),{target:_c5,checked:$(_c5).find(".tree-checkbox").hasClass("tree-checkbox1")});
if(!_49(_c4,_c5)){
_c6.state=$(_c5).find(".tree-hit").hasClass("tree-expanded")?"open":"closed";
}
return _c6;
};
function _c7(_c8,id){
var _c9=$(_c8).find("div.tree-node[node-id="+id+"]");
if(_c9.length){
return _14(_c8,_c9[0]);
}else{
return null;
}
};
function _ca(_cb,_cc){
var _cd=$.data(_cb,"tree").options;
var _ce=_14(_cb,_cc);
if(_cd.onBeforeSelect.call(_cb,_ce)==false){
return;
}
$("div.tree-node-selected",_cb).removeClass("tree-node-selected");
$(_cc).addClass("tree-node-selected");
_cd.onSelect.call(_cb,_ce);
};
function _49(_cf,_d0){
var _d1=$(_d0);
var hit=_d1.children("span.tree-hit");
return hit.length==0;
};
function _d2(_d3,_d4){
var _d5=$.data(_d3,"tree").options;
var _d6=_14(_d3,_d4);
if(_d5.onBeforeEdit.call(_d3,_d6)==false){
return;
}
$(_d4).css("position","relative");
var nt=$(_d4).find(".tree-title");
var _d7=nt.outerWidth();
nt.empty();
var _d8=$("<input class=\"tree-editor\">").appendTo(nt);
_d8.val(_d6.text).focus();
_d8.width(_d7+20);
_d8.height(document.compatMode=="CSS1Compat"?(18-(_d8.outerHeight()-_d8.height())):18);
_d8.bind("click",function(e){
return false;
}).bind("mousedown",function(e){
e.stopPropagation();
}).bind("mousemove",function(e){
e.stopPropagation();
}).bind("keydown",function(e){
if(e.keyCode==13){
_d9(_d3,_d4);
return false;
}else{
if(e.keyCode==27){
_df(_d3,_d4);
return false;
}
}
}).bind("blur",function(e){
e.stopPropagation();
_d9(_d3,_d4);
});
};
function _d9(_da,_db){
var _dc=$.data(_da,"tree").options;
$(_db).css("position","");
var _dd=$(_db).find("input.tree-editor");
var val=_dd.val();
_dd.remove();
var _de=_14(_da,_db);
_de.text=val;
_be(_da,_de);
_dc.onAfterEdit.call(_da,_de);
};
function _df(_e0,_e1){
var _e2=$.data(_e0,"tree").options;
$(_e1).css("position","");
$(_e1).find("input.tree-editor").remove();
var _e3=_14(_e0,_e1);
_be(_e0,_e3);
_e2.onCancelEdit.call(_e0,_e3);
};
$.fn.tree=function(_e4,_e5){
if(typeof _e4=="string"){
return $.fn.tree.methods[_e4](this,_e5);
}
var _e4=_e4||{};
return this.each(function(){
var _e6=$.data(this,"tree");
var _e7;
if(_e6){
_e7=$.extend(_e6.options,_e4);
_e6.options=_e7;
}else{
_e7=$.extend({},$.fn.tree.defaults,$.fn.tree.parseOptions(this),_e4);
$.data(this,"tree",{options:_e7,tree:_1(this)});
var _e8=_4(this);
if(_e8.length&&!_e7.data){
_e7.data=_e8;
}
}
_c(this);
if(_e7.lines){
$(this).addClass("tree-lines");
}
if(_e7.data){
_4e(this,this,_e7.data);
}else{
if(_e7.dnd){
_18(this);
}else{
_15(this);
}
}
_6b(this,this);
});
};
$.fn.tree.methods={options:function(jq){
return $.data(jq[0],"tree").options;
},loadData:function(jq,_e9){
return jq.each(function(){
_4e(this,this,_e9);
});
},getNode:function(jq,_ea){
return _14(jq[0],_ea);
},getData:function(jq,_eb){
return _b7(jq[0],_eb);
},reload:function(jq,_ec){
return jq.each(function(){
if(_ec){
var _ed=$(_ec);
var hit=_ed.children("span.tree-hit");
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
_ed.next().remove();
_75(this,_ec);
}else{
$(this).empty();
_6b(this,this);
}
});
},getRoot:function(jq){
return _91(jq[0]);
},getRoots:function(jq){
return _94(jq[0]);
},getParent:function(jq,_ee){
return _8c(jq[0],_ee);
},getChildren:function(jq,_ef){
return _4d(jq[0],_ef);
},getChecked:function(jq,_f0){
return _a0(jq[0],_f0);
},getSelected:function(jq){
return _a6(jq[0]);
},isLeaf:function(jq,_f1){
return _49(jq[0],_f1);
},find:function(jq,id){
return _c7(jq[0],id);
},select:function(jq,_f2){
return jq.each(function(){
_ca(this,_f2);
});
},check:function(jq,_f3){
return jq.each(function(){
_35(this,_f3,true);
});
},uncheck:function(jq,_f4){
return jq.each(function(){
_35(this,_f4,false);
});
},collapse:function(jq,_f5){
return jq.each(function(){
_7c(this,_f5);
});
},expand:function(jq,_f6){
return jq.each(function(){
_75(this,_f6);
});
},collapseAll:function(jq,_f7){
return jq.each(function(){
_8d(this,_f7);
});
},expandAll:function(jq,_f8){
return jq.each(function(){
_84(this,_f8);
});
},expandTo:function(jq,_f9){
return jq.each(function(){
_88(this,_f9);
});
},toggle:function(jq,_fa){
return jq.each(function(){
_81(this,_fa);
});
},append:function(jq,_fb){
return jq.each(function(){
_a9(this,_fb);
});
},insert:function(jq,_fc){
return jq.each(function(){
_ae(this,_fc);
});
},remove:function(jq,_fd){
return jq.each(function(){
_b2(this,_fd);
});
},pop:function(jq,_fe){
var _ff=jq.tree("getData",_fe);
jq.tree("remove",_fe);
return _ff;
},update:function(jq,_100){
return jq.each(function(){
_be(this,_100);
});
},enableDnd:function(jq){
return jq.each(function(){
_18(this);
});
},disableDnd:function(jq){
return jq.each(function(){
_15(this);
});
},beginEdit:function(jq,_101){
return jq.each(function(){
_d2(this,_101);
});
},endEdit:function(jq,_102){
return jq.each(function(){
_d9(this,_102);
});
},cancelEdit:function(jq,_103){
return jq.each(function(){
_df(this,_103);
});
}};
$.fn.tree.parseOptions=function(_104){
var t=$(_104);
return $.extend({},$.parser.parseOptions(_104,["url","method",{checkbox:"boolean",cascadeCheck:"boolean",onlyLeafCheck:"boolean"},{animate:"boolean",lines:"boolean",dnd:"boolean"}]));
};
$.fn.tree.defaults={url:null,method:"post",animate:false,checkbox:false,cascadeCheck:true,onlyLeafCheck:false,lines:false,dnd:false,data:null,loader:function(_105,_106,_107){
var opts=$(this).tree("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_105,dataType:"json",success:function(data){
_106(data);
},error:function(){
_107.apply(this,arguments);
}});
},loadFilter:function(data,_108){
return data;
},onBeforeLoad:function(node,_109){
},onLoadSuccess:function(node,data){
},onLoadError:function(){
},onClick:function(node){
},onDblClick:function(node){
},onBeforeExpand:function(node){
},onExpand:function(node){
},onBeforeCollapse:function(node){
},onCollapse:function(node){
},onBeforeCheck:function(node,_10a){
},onCheck:function(node,_10b){
},onBeforeSelect:function(node){
},onSelect:function(node){
},onContextMenu:function(e,node){
},onBeforeDrag:function(node){
},onStartDrag:function(node){
},onStopDrag:function(node){
},onDragEnter:function(_10c,_10d){
},onDragOver:function(_10e,_10f){
},onDragLeave:function(_110,_111){
},onDrop:function(_112,_113,_114){
},onBeforeEdit:function(node){
},onAfterEdit:function(node){
},onCancelEdit:function(node){
}};
})(jQuery);

