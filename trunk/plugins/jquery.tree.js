(function($){
function _1(_2){
var _3=$(_2);
_3.addClass("tree");
_4(_3,0);
function _4(ul,_5){
$(">li",ul).each(function(){
var _6=$("<div class=\"tree-node\"></div>").prependTo($(this));
var _7=$(">span",this).addClass("tree-title").appendTo(_6).text();
$.data(_6[0],"tree-node",{text:_7});
var _8=$(">ul",this);
if(_8.length){
$("<span class=\"tree-folder tree-folder-open\"></span>").prependTo(_6);
$("<span class=\"tree-hit tree-expanded\"></span>").prependTo(_6);
_4(_8,_5+1);
}else{
$("<span class=\"tree-file\"></span>").prependTo(_6);
$("<span class=\"tree-indent\"></span>").prependTo(_6);
}
for(var i=0;i<_5;i++){
$("<span class=\"tree-indent\"></span>").prependTo(_6);
}
});
};
return _3;
};
function _9(_a,_b){
var _c=$.data(_a,"tree").options;
var _d=$(">span.tree-hit",_b);
if(_d.length==0){
return;
}
if(_d.hasClass("tree-collapsed")){
_d.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
_d.next().addClass("tree-folder-open");
var ul=$(_b).next();
if(ul.length){
if(_c.animate){
ul.slideDown();
}else{
ul.css("display","block");
}
}else{
var id=$.data($(_b)[0],"tree-node").id;
var _e=$("<ul></ul>").insertAfter(_b);
_f(_a,_e,{id:id});
}
}
};
function _10(_11,_12){
var _13=$.data(_11,"tree").options;
var hit=$(">span.tree-hit",_12);
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
if(_13.animate){
$(_12).next().slideUp();
}else{
$(_12).next().css("display","none");
}
}
};
function _14(_15,_16){
var hit=$(">span.tree-hit",_16);
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
_10(_15,_16);
}else{
_9(_15,_16);
}
};
function _17(_18){
var _19=$.data(_18,"tree").options;
var _1a=$.data(_18,"tree").tree;
$(".tree-node",_1a).unbind(".tree").bind("dblclick.tree",function(){
$(".tree-node-selected",_1a).removeClass("tree-node-selected");
$(this).addClass("tree-node-selected");
if(_19.onDblClick){
var _1b=this;
var _1c=$.data(this,"tree-node");
_19.onDblClick.call(this,{id:_1c.id,text:_1c.text,attributes:_1c.attributes,target:_1b});
}
}).bind("click.tree",function(){
$(".tree-node-selected",_1a).removeClass("tree-node-selected");
$(this).addClass("tree-node-selected");
if(_19.onClick){
var _1d=this;
var _1e=$.data(this,"tree-node");
_19.onClick.call(this,{id:_1e.id,text:_1e.text,attributes:_1e.attributes,target:_1d});
}
}).bind("mouseenter.tree",function(){
$(this).addClass("tree-node-hover");
return false;
}).bind("mouseleave.tree",function(){
$(this).removeClass("tree-node-hover");
return false;
});
$(".tree-hit",_1a).unbind(".tree").bind("click.tree",function(){
var _1f=$(this).parent();
_14(_18,_1f);
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
});
};
function _20(ul,_21){
function _22(ul,_23,_24){
for(var i=0;i<_23.length;i++){
var li=$("<li></li>").appendTo(ul);
var _25=_23[i];
if(_25.state!="open"&&_25.state!="closed"){
_25.state="open";
}
var _26=$("<div class=\"tree-node\"></div>").appendTo(li);
_26.attr("node-id",_25.id);
$.data(_26[0],"tree-node",{id:_25.id,text:_25.text,attributes:_25.attributes});
$("<span class=\"tree-title\"></span>").html(_25.text).appendTo(_26);
if(_25.children){
var _27=$("<ul></ul>").appendTo(li);
if(_25.state=="open"){
$("<span class=\"tree-folder tree-folder-open\"></span>").addClass(_25.iconCls).prependTo(_26);
$("<span class=\"tree-hit tree-expanded\"></span>").prependTo(_26);
}else{
$("<span class=\"tree-folder\"></span>").addClass(_25.iconCls).prependTo(_26);
$("<span class=\"tree-hit tree-collapsed\"></span>").prependTo(_26);
_27.css("display","none");
}
_22(_27,_25.children,_24+1);
}else{
if(_25.state=="closed"){
$("<span class=\"tree-folder\"></span>").addClass(_25.iconCls).prependTo(_26);
$("<span class=\"tree-hit tree-collapsed\"></span>").prependTo(_26);
}else{
$("<span class=\"tree-file\"></span>").addClass(_25.iconCls).prependTo(_26);
$("<span class=\"tree-indent\"></span>").prependTo(_26);
}
}
for(var j=0;j<_24;j++){
$("<span class=\"tree-indent\"></span>").prependTo(_26);
}
}
};
var _28=$(ul).prev().find(">span.tree-indent,>span.tree-hit").length;
_22(ul,_21,_28);
};
function _f(_29,ul,_2a){
var _2b=$.data(_29,"tree").options;
if(!_2b.url){
return;
}
_2a=_2a||{};
var _2c=$(ul).prev().find(">span.tree-folder");
_2c.addClass("tree-loading");
$.ajax({type:"post",url:_2b.url,data:_2a,dataType:"json",success:function(_2d){
_2c.removeClass("tree-loading");
_20(ul,_2d);
_17(_29);
if(_2b.onLoadSuccess){
_2b.onLoadSuccess.apply(this,arguments);
}
},error:function(){
_2c.removeClass("tree-loading");
if(_2b.onLoadError){
_2b.onLoadError.apply(this,arguments);
}
}});
};
function _2e(_2f){
var _30=$(_2f).find("div.tree-node-selected");
if(_30.length){
return $.extend({},$.data(_30[0],"tree-node"),{target:_30[0]});
}else{
return null;
}
};
function _31(_32,_33){
var _34=$(_33.parent);
var ul=_34.next();
if(ul.length==0){
ul=$("<ul></ul>").insertAfter(_34);
}
if(_33.data&&_33.data.length){
var _35=_34.find("span.tree-file");
if(_35.length){
_35.removeClass("tree-file").addClass("tree-folder");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_35);
if(hit.prev().length){
hit.prev().remove();
}
}
}
_20(ul,_33.data);
_17(_32);
};
function _36(_37,_38){
var _39=$(_38);
var li=_39.parent();
var ul=li.parent();
li.remove();
if(ul.find("li").length==0){
var _39=ul.prev();
_39.find(".tree-folder").removeClass("tree-folder").addClass("tree-file");
_39.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(_39);
if(ul[0]!=_37){
ul.remove();
}
}
};
function _3a(_3b,_3c){
$("div.tree-node-selected",_3b).removeClass("tree-node-selected");
$(_3c).addClass("tree-node-selected");
};
function _3d(_3e,_3f){
var _40=$(_3f);
var hit=$(">span.tree-hit",_40);
return hit.length==0;
};
$.fn.tree=function(_41,_42){
if(typeof _41=="string"){
switch(_41){
case "reload":
return this.each(function(){
$(this).empty();
_f(this,this);
});
case "getSelected":
return _2e(this[0]);
case "isLeaf":
return _3d(this[0],_42);
case "select":
return this.each(function(){
_3a(this,_42);
});
case "collapse":
return this.each(function(){
_10(this,$(_42));
});
case "expand":
return this.each(function(){
_9(this,$(_42));
});
case "append":
return this.each(function(){
_31(this,_42);
});
case "toggle":
return this.each(function(){
_14(this,$(_42));
});
case "remove":
return this.each(function(){
_36(this,_42);
});
}
}
var _41=_41||{};
return this.each(function(){
var _43=$.data(this,"tree");
var _44;
if(_43){
_44=$.extend(_43.options,_41);
_43.options=_44;
}else{
_44=$.extend({},$.fn.tree.defaults,{url:$(this).attr("url"),animate:($(this).attr("animate")?$(this).attr("animate")=="true":undefined)},_41);
$.data(this,"tree",{options:_44,tree:_1(this)});
_f(this,this);
}
_17(this);
});
};
$.fn.tree.defaults={url:null,animate:false,onLoadSuccess:function(){
},onLoadError:function(){
},onClick:function(_45){
},onDblClick:function(_46){
}};
})(jQuery);

