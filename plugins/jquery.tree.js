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
var _a={};
_a.text=_9.children("span").html();
if(!_a.text){
_a.text=_9.html();
}
_a.id=_9.attr("id");
_a.iconCls=_9.attr("iconCls")||_9.attr("icon");
_a.checked=_9.attr("checked")=="true";
_a.state=_9.attr("state")||"open";
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
var _f=$.data(_d,"tree").tree;
$("div.tree-node",_f).unbind(".tree").bind("dblclick.tree",function(){
_c0(_d,this);
_e.onDblClick.call(_d,_9d(_d));
}).bind("click.tree",function(){
_c0(_d,this);
_e.onClick.call(_d,_9d(_d));
}).bind("mouseenter.tree",function(){
$(this).addClass("tree-node-hover");
return false;
}).bind("mouseleave.tree",function(){
$(this).removeClass("tree-node-hover");
return false;
}).bind("contextmenu.tree",function(e){
_e.onContextMenu.call(_d,e,_37(_d,this));
});
$("span.tree-hit",_f).unbind(".tree").bind("click.tree",function(){
var _10=$(this).parent();
_7a(_d,_10[0]);
return false;
}).bind("mouseenter.tree",function(){
if($(this).hasClass("tree-expanded")){
$(this).addClass("tree-expanded-hover");
}else{
$(this).addClass("tree-collapsed-hover");
}
}).bind("mouseleave.tree",function(){
if($(this).hasClass("tree-expanded")){
$(this).removeClass("tree-expanded-hover");
}else{
$(this).removeClass("tree-collapsed-hover");
}
}).bind("mousedown.tree",function(){
return false;
});
$("span.tree-checkbox",_f).unbind(".tree").bind("click.tree",function(){
var _11=$(this).parent();
_2e(_d,_11[0],!$(this).hasClass("tree-checkbox1"));
return false;
}).bind("mousedown.tree",function(){
return false;
});
};
function _12(_13){
var _14=$(_13).find("div.tree-node");
_14.draggable("disable");
_14.css("cursor","pointer");
};
function _15(_16){
var _17=$.data(_16,"tree").options;
var _18=$.data(_16,"tree").tree;
_18.find("div.tree-node").draggable({disabled:false,revert:true,cursor:"pointer",proxy:function(_19){
var p=$("<div class=\"tree-node-proxy tree-dnd-no\"></div>").appendTo("body");
p.html($(_19).find(".tree-title").html());
p.hide();
return p;
},deltaX:15,deltaY:15,onBeforeDrag:function(e){
if(e.which!=1){
return false;
}
$(this).next("ul").find("div.tree-node").droppable({accept:"no-accept"});
var _1a=$(this).find("span.tree-indent");
if(_1a.length){
e.data.startLeft+=_1a.length*_1a.width();
}
},onStartDrag:function(){
$(this).draggable("proxy").css({left:-10000,top:-10000});
},onDrag:function(e){
var x1=e.pageX,y1=e.pageY,x2=e.data.startX,y2=e.data.startY;
var d=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
if(d>3){
$(this).draggable("proxy").show();
}
this.pageY=e.pageY;
},onStopDrag:function(){
$(this).next("ul").find("div.tree-node").droppable({accept:"div.tree-node"});
}}).droppable({accept:"div.tree-node",onDragOver:function(e,_1b){
var _1c=_1b.pageY;
var top=$(this).offset().top;
var _1d=top+$(this).outerHeight();
$(_1b).draggable("proxy").removeClass("tree-dnd-no").addClass("tree-dnd-yes");
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
if(_1c>top+(_1d-top)/2){
if(_1d-_1c<5){
$(this).addClass("tree-node-bottom");
}else{
$(this).addClass("tree-node-append");
}
}else{
if(_1c-top<5){
$(this).addClass("tree-node-top");
}else{
$(this).addClass("tree-node-append");
}
}
},onDragLeave:function(e,_1e){
$(_1e).draggable("proxy").removeClass("tree-dnd-yes").addClass("tree-dnd-no");
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
},onDrop:function(e,_1f){
var _20=this;
var _21,_22;
if($(this).hasClass("tree-node-append")){
_21=_23;
}else{
_21=_24;
_22=$(this).hasClass("tree-node-top")?"top":"bottom";
}
setTimeout(function(){
_21(_1f,_20,_22);
},0);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
}});
function _23(_25,_26){
if(_37(_16,_26).state=="closed"){
_6e(_16,_26,function(){
_27();
});
}else{
_27();
}
function _27(){
var _28=$(_16).tree("pop",_25);
$(_16).tree("append",{parent:_26,data:[_28]});
_17.onDrop.call(_16,_26,_28,"append");
};
};
function _24(_29,_2a,_2b){
var _2c={};
if(_2b=="top"){
_2c.before=_2a;
}else{
_2c.after=_2a;
}
var _2d=$(_16).tree("pop",_29);
_2c.data=_2d;
$(_16).tree("insert",_2c);
_17.onDrop.call(_16,_2a,_2d,_2b);
};
};
function _2e(_2f,_30,_31){
var _32=$.data(_2f,"tree").options;
if(!_32.checkbox){
return;
}
var _33=$(_30);
var ck=_33.find(".tree-checkbox");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_31){
ck.addClass("tree-checkbox1");
}else{
ck.addClass("tree-checkbox0");
}
if(_32.cascadeCheck){
_34(_33);
_35(_33);
}
var _36=_37(_2f,_30);
_32.onCheck.call(_2f,_36,_31);
function _35(_38){
var _39=_38.next().find(".tree-checkbox");
_39.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_38.find(".tree-checkbox").hasClass("tree-checkbox1")){
_39.addClass("tree-checkbox1");
}else{
_39.addClass("tree-checkbox0");
}
};
function _34(_3a){
var _3b=_85(_2f,_3a[0]);
if(_3b){
var ck=$(_3b.target).find(".tree-checkbox");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_3c(_3a)){
ck.addClass("tree-checkbox1");
}else{
if(_3d(_3a)){
ck.addClass("tree-checkbox0");
}else{
ck.addClass("tree-checkbox2");
}
}
_34($(_3b.target));
}
function _3c(n){
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
function _3d(n){
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
function _3e(_3f,_40){
var _41=$.data(_3f,"tree").options;
var _42=$(_40);
if(_43(_3f,_40)){
var ck=_42.find(".tree-checkbox");
if(ck.length){
if(ck.hasClass("tree-checkbox1")){
_2e(_3f,_40,true);
}else{
_2e(_3f,_40,false);
}
}else{
if(_41.onlyLeafCheck){
$("<span class=\"tree-checkbox tree-checkbox0\"></span>").insertBefore(_42.find(".tree-title"));
_c(_3f);
}
}
}else{
var ck=_42.find(".tree-checkbox");
if(_41.onlyLeafCheck){
ck.remove();
}else{
if(ck.hasClass("tree-checkbox1")){
_2e(_3f,_40,true);
}else{
if(ck.hasClass("tree-checkbox2")){
var _44=true;
var _45=true;
var _46=_47(_3f,_40);
for(var i=0;i<_46.length;i++){
if(_46[i].checked){
_45=false;
}else{
_44=false;
}
}
if(_44){
_2e(_3f,_40,true);
}
if(_45){
_2e(_3f,_40,false);
}
}
}
}
}
};
function _48(_49,ul,_4a,_4b){
var _4c=$.data(_49,"tree").options;
_4a=_4c.loadFilter.call(_49,_4a,$(ul).prev("div.tree-node")[0]);
if(!_4b){
$(ul).empty();
}
var _4d=[];
var _4e=$(ul).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length;
_4f(ul,_4a,_4e);
_c(_49);
if(_4c.dnd){
_15(_49);
}else{
_12(_49);
}
for(var i=0;i<_4d.length;i++){
_2e(_49,_4d[i],true);
}
setTimeout(function(){
_57(_49,_49);
},0);
var _50=null;
if(_49!=ul){
var _51=$(ul).prev();
_50=_37(_49,_51[0]);
}
_4c.onLoadSuccess.call(_49,_50,_4a);
function _4f(ul,_52,_53){
for(var i=0;i<_52.length;i++){
var li=$("<li></li>").appendTo(ul);
var _54=_52[i];
if(_54.state!="open"&&_54.state!="closed"){
_54.state="open";
}
var _55=$("<div class=\"tree-node\"></div>").appendTo(li);
_55.attr("node-id",_54.id);
$.data(_55[0],"tree-node",{id:_54.id,text:_54.text,iconCls:_54.iconCls,attributes:_54.attributes});
$("<span class=\"tree-title\"></span>").html(_54.text).appendTo(_55);
if(_4c.checkbox){
if(_4c.onlyLeafCheck){
if(_54.state=="open"&&(!_54.children||!_54.children.length)){
if(_54.checked){
$("<span class=\"tree-checkbox tree-checkbox1\"></span>").prependTo(_55);
}else{
$("<span class=\"tree-checkbox tree-checkbox0\"></span>").prependTo(_55);
}
}
}else{
if(_54.checked){
$("<span class=\"tree-checkbox tree-checkbox1\"></span>").prependTo(_55);
_4d.push(_55[0]);
}else{
$("<span class=\"tree-checkbox tree-checkbox0\"></span>").prependTo(_55);
}
}
}
if(_54.children&&_54.children.length){
var _56=$("<ul></ul>").appendTo(li);
if(_54.state=="open"){
$("<span class=\"tree-icon tree-folder tree-folder-open\"></span>").addClass(_54.iconCls).prependTo(_55);
$("<span class=\"tree-hit tree-expanded\"></span>").prependTo(_55);
}else{
$("<span class=\"tree-icon tree-folder\"></span>").addClass(_54.iconCls).prependTo(_55);
$("<span class=\"tree-hit tree-collapsed\"></span>").prependTo(_55);
_56.css("display","none");
}
_4f(_56,_54.children,_53+1);
}else{
if(_54.state=="closed"){
$("<span class=\"tree-icon tree-folder\"></span>").addClass(_54.iconCls).prependTo(_55);
$("<span class=\"tree-hit tree-collapsed\"></span>").prependTo(_55);
}else{
$("<span class=\"tree-icon tree-file\"></span>").addClass(_54.iconCls).prependTo(_55);
$("<span class=\"tree-indent\"></span>").prependTo(_55);
}
}
for(var j=0;j<_53;j++){
$("<span class=\"tree-indent\"></span>").prependTo(_55);
}
}
};
};
function _57(_58,ul,_59){
var _5a=$.data(_58,"tree").options;
if(!_5a.lines){
return;
}
if(!_59){
_59=true;
$(_58).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
$(_58).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");
var _5b=$(_58).tree("getRoots");
if(_5b.length>1){
$(_5b[0].target).addClass("tree-root-first");
}else{
$(_5b[0].target).addClass("tree-root-one");
}
}
$(ul).children("li").each(function(){
var _5c=$(this).children("div.tree-node");
var ul=_5c.next("ul");
if(ul.length){
if($(this).next().length){
_5d(_5c);
}
_57(_58,ul,_59);
}else{
_5e(_5c);
}
});
var _5f=$(ul).children("li:last").children("div.tree-node").addClass("tree-node-last");
_5f.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");
function _5e(_60,_61){
var _62=_60.find("span.tree-icon");
_62.prev("span.tree-indent").addClass("tree-join");
};
function _5d(_63){
var _64=_63.find("span.tree-indent, span.tree-hit").length;
_63.next().find("div.tree-node").each(function(){
$(this).children("span:eq("+(_64-1)+")").addClass("tree-line");
});
};
};
function _65(_66,ul,_67,_68){
var _69=$.data(_66,"tree").options;
_67=_67||{};
var _6a=null;
if(_66!=ul){
var _6b=$(ul).prev();
_6a=_37(_66,_6b[0]);
}
if(_69.onBeforeLoad.call(_66,_6a,_67)==false){
return;
}
if(!_69.url){
return;
}
var _6c=$(ul).prev().children("span.tree-folder");
_6c.addClass("tree-loading");
$.ajax({type:_69.method,url:_69.url,data:_67,dataType:"json",success:function(_6d){
_6c.removeClass("tree-loading");
_48(_66,ul,_6d);
if(_68){
_68();
}
},error:function(){
_6c.removeClass("tree-loading");
_69.onLoadError.apply(_66,arguments);
if(_68){
_68();
}
}});
};
function _6e(_6f,_70,_71){
var _72=$.data(_6f,"tree").options;
var hit=$(_70).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
var _73=_37(_6f,_70);
if(_72.onBeforeExpand.call(_6f,_73)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var ul=$(_70).next();
if(ul.length){
if(_72.animate){
ul.slideDown("normal",function(){
_72.onExpand.call(_6f,_73);
if(_71){
_71();
}
});
}else{
ul.css("display","block");
_72.onExpand.call(_6f,_73);
if(_71){
_71();
}
}
}else{
var _74=$("<ul style=\"display:none\"></ul>").insertAfter(_70);
_65(_6f,_74[0],{id:_73.id},function(){
if(_74.is(":empty")){
_74.remove();
}
if(_72.animate){
_74.slideDown("normal",function(){
_72.onExpand.call(_6f,_73);
if(_71){
_71();
}
});
}else{
_74.css("display","block");
_72.onExpand.call(_6f,_73);
if(_71){
_71();
}
}
});
}
};
function _75(_76,_77){
var _78=$.data(_76,"tree").options;
var hit=$(_77).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
var _79=_37(_76,_77);
if(_78.onBeforeCollapse.call(_76,_79)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
var ul=$(_77).next();
if(_78.animate){
ul.slideUp("normal",function(){
_78.onCollapse.call(_76,_79);
});
}else{
ul.css("display","none");
_78.onCollapse.call(_76,_79);
}
};
function _7a(_7b,_7c){
var hit=$(_7c).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
_75(_7b,_7c);
}else{
_6e(_7b,_7c);
}
};
function _7d(_7e,_7f){
var _80=_47(_7e,_7f);
if(_7f){
_80.unshift(_37(_7e,_7f));
}
for(var i=0;i<_80.length;i++){
_6e(_7e,_80[i].target);
}
};
function _81(_82,_83){
var _84=[];
var p=_85(_82,_83);
while(p){
_84.unshift(p);
p=_85(_82,p.target);
}
for(var i=0;i<_84.length;i++){
_6e(_82,_84[i].target);
}
};
function _86(_87,_88){
var _89=_47(_87,_88);
if(_88){
_89.unshift(_37(_87,_88));
}
for(var i=0;i<_89.length;i++){
_75(_87,_89[i].target);
}
};
function _8a(_8b){
var _8c=_8d(_8b);
if(_8c.length){
return _8c[0];
}else{
return null;
}
};
function _8d(_8e){
var _8f=[];
$(_8e).children("li").each(function(){
var _90=$(this).children("div.tree-node");
_8f.push(_37(_8e,_90[0]));
});
return _8f;
};
function _47(_91,_92){
var _93=[];
if(_92){
_94($(_92));
}else{
var _95=_8d(_91);
for(var i=0;i<_95.length;i++){
_93.push(_95[i]);
_94($(_95[i].target));
}
}
function _94(_96){
_96.next().find("div.tree-node").each(function(){
_93.push(_37(_91,this));
});
};
return _93;
};
function _85(_97,_98){
var ul=$(_98).parent().parent();
if(ul[0]==_97){
return null;
}else{
return _37(_97,ul.prev()[0]);
}
};
function _99(_9a){
var _9b=[];
$(_9a).find(".tree-checkbox1").each(function(){
var _9c=$(this).parent();
_9b.push(_37(_9a,_9c[0]));
});
return _9b;
};
function _9d(_9e){
var _9f=$(_9e).find("div.tree-node-selected");
if(_9f.length){
return _37(_9e,_9f[0]);
}else{
return null;
}
};
function _a0(_a1,_a2){
var _a3=$(_a2.parent);
var ul;
if(_a3.length==0){
ul=$(_a1);
}else{
ul=_a3.next();
if(ul.length==0){
ul=$("<ul></ul>").insertAfter(_a3);
}
}
if(_a2.data&&_a2.data.length){
var _a4=_a3.find("span.tree-icon");
if(_a4.hasClass("tree-file")){
_a4.removeClass("tree-file").addClass("tree-folder");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_a4);
if(hit.prev().length){
hit.prev().remove();
}
}
}
_48(_a1,ul[0],_a2.data,true);
_3e(_a1,ul.prev());
};
function _a5(_a6,_a7){
var ref=_a7.before||_a7.after;
var _a8=_85(_a6,ref);
var li;
if(_a8){
_a0(_a6,{parent:_a8.target,data:[_a7.data]});
li=$(_a8.target).next().children("li:last");
}else{
_a0(_a6,{parent:null,data:[_a7.data]});
li=$(_a6).children("li:last");
}
if(_a7.before){
li.insertBefore($(ref).parent());
}else{
li.insertAfter($(ref).parent());
}
};
function _a9(_aa,_ab){
var _ac=_85(_aa,_ab);
var _ad=$(_ab);
var li=_ad.parent();
var ul=li.parent();
li.remove();
if(ul.children("li").length==0){
var _ad=ul.prev();
_ad.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
_ad.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(_ad);
if(ul[0]!=_aa){
ul.remove();
}
}
if(_ac){
_3e(_aa,_ac.target);
}
_57(_aa,_aa);
};
function _ae(_af,_b0){
function _b1(aa,ul){
ul.children("li").each(function(){
var _b2=$(this).children("div.tree-node");
var _b3=_37(_af,_b2[0]);
var sub=$(this).children("ul");
if(sub.length){
_b3.children=[];
_ae(_b3.children,sub);
}
aa.push(_b3);
});
};
if(_b0){
var _b4=_37(_af,_b0);
_b4.children=[];
_b1(_b4.children,$(_b0).next());
return _b4;
}else{
return null;
}
};
function _b5(_b6,_b7){
var _b8=$(_b7.target);
var _b9=$.data(_b7.target,"tree-node");
if(_b9.iconCls){
_b8.find(".tree-icon").removeClass(_b9.iconCls);
}
$.extend(_b9,_b7);
$.data(_b7.target,"tree-node",_b9);
_b8.attr("node-id",_b9.id);
_b8.find(".tree-title").html(_b9.text);
if(_b9.iconCls){
_b8.find(".tree-icon").addClass(_b9.iconCls);
}
var ck=_b8.find(".tree-checkbox");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_b9.checked){
_2e(_b6,_b7.target,true);
}else{
_2e(_b6,_b7.target,false);
}
};
function _37(_ba,_bb){
var _bc=$.extend({},$.data(_bb,"tree-node"),{target:_bb,checked:$(_bb).find(".tree-checkbox").hasClass("tree-checkbox1")});
if(!_43(_ba,_bb)){
_bc.state=$(_bb).find(".tree-hit").hasClass("tree-expanded")?"open":"closed";
}
return _bc;
};
function _bd(_be,id){
var _bf=$(_be).find("div.tree-node[node-id="+id+"]");
if(_bf.length){
return _37(_be,_bf[0]);
}else{
return null;
}
};
function _c0(_c1,_c2){
var _c3=$.data(_c1,"tree").options;
var _c4=_37(_c1,_c2);
if(_c3.onBeforeSelect.call(_c1,_c4)==false){
return;
}
$("div.tree-node-selected",_c1).removeClass("tree-node-selected");
$(_c2).addClass("tree-node-selected");
_c3.onSelect.call(_c1,_c4);
};
function _43(_c5,_c6){
var _c7=$(_c6);
var hit=_c7.children("span.tree-hit");
return hit.length==0;
};
function _c8(_c9,_ca){
var _cb=$.data(_c9,"tree").options;
var _cc=_37(_c9,_ca);
if(_cb.onBeforeEdit.call(_c9,_cc)==false){
return;
}
$(_ca).css("position","relative");
var nt=$(_ca).find(".tree-title");
var _cd=nt.outerWidth();
nt.empty();
var _ce=$("<input class=\"tree-editor\">").appendTo(nt);
_ce.val(_cc.text).focus();
_ce.width(_cd+20);
_ce.height(document.compatMode=="CSS1Compat"?(18-(_ce.outerHeight()-_ce.height())):18);
_ce.bind("click",function(e){
return false;
}).bind("mousedown",function(e){
e.stopPropagation();
}).bind("mousemove",function(e){
e.stopPropagation();
}).bind("keydown",function(e){
if(e.keyCode==13){
_cf(_c9,_ca);
return false;
}else{
if(e.keyCode==27){
_d5(_c9,_ca);
return false;
}
}
}).bind("blur",function(e){
e.stopPropagation();
_cf(_c9,_ca);
});
};
function _cf(_d0,_d1){
var _d2=$.data(_d0,"tree").options;
$(_d1).css("position","");
var _d3=$(_d1).find("input.tree-editor");
var val=_d3.val();
_d3.remove();
var _d4=_37(_d0,_d1);
_d4.text=val;
_b5(_d0,_d4);
_d2.onAfterEdit.call(_d0,_d4);
};
function _d5(_d6,_d7){
var _d8=$.data(_d6,"tree").options;
$(_d7).css("position","");
$(_d7).find("input.tree-editor").remove();
var _d9=_37(_d6,_d7);
_b5(_d6,_d9);
_d8.onCancelEdit.call(_d6,_d9);
};
$.fn.tree=function(_da,_db){
if(typeof _da=="string"){
return $.fn.tree.methods[_da](this,_db);
}
var _da=_da||{};
return this.each(function(){
var _dc=$.data(this,"tree");
var _dd;
if(_dc){
_dd=$.extend(_dc.options,_da);
_dc.options=_dd;
}else{
_dd=$.extend({},$.fn.tree.defaults,$.fn.tree.parseOptions(this),_da);
$.data(this,"tree",{options:_dd,tree:_1(this)});
var _de=_4(this);
if(_de.length&&!_dd.data){
_dd.data=_de;
}
}
if(_dd.lines){
$(this).addClass("tree-lines");
}
if(_dd.data){
_48(this,this,_dd.data);
}else{
if(_dd.dnd){
_15(this);
}else{
_12(this);
}
}
if(_dd.url){
_65(this,this);
}
});
};
$.fn.tree.methods={options:function(jq){
return $.data(jq[0],"tree").options;
},loadData:function(jq,_df){
return jq.each(function(){
_48(this,this,_df);
});
},getNode:function(jq,_e0){
return _37(jq[0],_e0);
},getData:function(jq,_e1){
return _ae(jq[0],_e1);
},reload:function(jq,_e2){
return jq.each(function(){
if(_e2){
var _e3=$(_e2);
var hit=_e3.children("span.tree-hit");
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
_e3.next().remove();
_6e(this,_e2);
}else{
$(this).empty();
_65(this,this);
}
});
},getRoot:function(jq){
return _8a(jq[0]);
},getRoots:function(jq){
return _8d(jq[0]);
},getParent:function(jq,_e4){
return _85(jq[0],_e4);
},getChildren:function(jq,_e5){
return _47(jq[0],_e5);
},getChecked:function(jq){
return _99(jq[0]);
},getSelected:function(jq){
return _9d(jq[0]);
},isLeaf:function(jq,_e6){
return _43(jq[0],_e6);
},find:function(jq,id){
return _bd(jq[0],id);
},select:function(jq,_e7){
return jq.each(function(){
_c0(this,_e7);
});
},check:function(jq,_e8){
return jq.each(function(){
_2e(this,_e8,true);
});
},uncheck:function(jq,_e9){
return jq.each(function(){
_2e(this,_e9,false);
});
},collapse:function(jq,_ea){
return jq.each(function(){
_75(this,_ea);
});
},expand:function(jq,_eb){
return jq.each(function(){
_6e(this,_eb);
});
},collapseAll:function(jq,_ec){
return jq.each(function(){
_86(this,_ec);
});
},expandAll:function(jq,_ed){
return jq.each(function(){
_7d(this,_ed);
});
},expandTo:function(jq,_ee){
return jq.each(function(){
_81(this,_ee);
});
},toggle:function(jq,_ef){
return jq.each(function(){
_7a(this,_ef);
});
},append:function(jq,_f0){
return jq.each(function(){
_a0(this,_f0);
});
},insert:function(jq,_f1){
return jq.each(function(){
_a5(this,_f1);
});
},remove:function(jq,_f2){
return jq.each(function(){
_a9(this,_f2);
});
},pop:function(jq,_f3){
var _f4=jq.tree("getData",_f3);
jq.tree("remove",_f3);
return _f4;
},update:function(jq,_f5){
return jq.each(function(){
_b5(this,_f5);
});
},enableDnd:function(jq){
return jq.each(function(){
_15(this);
});
},disableDnd:function(jq){
return jq.each(function(){
_12(this);
});
},beginEdit:function(jq,_f6){
return jq.each(function(){
_c8(this,_f6);
});
},endEdit:function(jq,_f7){
return jq.each(function(){
_cf(this,_f7);
});
},cancelEdit:function(jq,_f8){
return jq.each(function(){
_d5(this,_f8);
});
}};
$.fn.tree.parseOptions=function(_f9){
var t=$(_f9);
return {url:t.attr("url"),method:(t.attr("method")?t.attr("method"):undefined),checkbox:(t.attr("checkbox")?t.attr("checkbox")=="true":undefined),cascadeCheck:(t.attr("cascadeCheck")?t.attr("cascadeCheck")=="true":undefined),onlyLeafCheck:(t.attr("onlyLeafCheck")?t.attr("onlyLeafCheck")=="true":undefined),animate:(t.attr("animate")?t.attr("animate")=="true":undefined),lines:(t.attr("lines")?t.attr("lines")=="true":undefined),dnd:(t.attr("dnd")?t.attr("dnd")=="true":undefined)};
};
$.fn.tree.defaults={url:null,method:"post",animate:false,checkbox:false,cascadeCheck:true,onlyLeafCheck:false,lines:false,dnd:false,data:null,loadFilter:function(_fa,_fb){
return _fa;
},onBeforeLoad:function(_fc,_fd){
},onLoadSuccess:function(_fe,_ff){
},onLoadError:function(){
},onClick:function(node){
},onDblClick:function(node){
},onBeforeExpand:function(node){
},onExpand:function(node){
},onBeforeCollapse:function(node){
},onCollapse:function(node){
},onCheck:function(node,_100){
},onBeforeSelect:function(node){
},onSelect:function(node){
},onContextMenu:function(e,node){
},onDrop:function(_101,_102,_103){
},onBeforeEdit:function(node){
},onAfterEdit:function(node){
},onCancelEdit:function(node){
}};
})(jQuery);

