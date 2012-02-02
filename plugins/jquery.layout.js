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
var _1=false;
function _2(_3){
var _4=$.data(_3,"layout").options;
var _5=$.data(_3,"layout").panels;
var cc=$(_3);
if(_4.fit==true){
var p=cc.parent();
cc.width(p.width()).height(p.height());
}
var _6={top:0,left:0,width:cc.width(),height:cc.height()};
function _7(pp){
if(pp.length==0){
return;
}
pp.panel("resize",{width:cc.width(),height:pp.panel("options").height,left:0,top:0});
_6.top+=pp.panel("options").height;
_6.height-=pp.panel("options").height;
};
if(_b(_5.expandNorth)){
_7(_5.expandNorth);
}else{
_7(_5.north);
}
function _8(pp){
if(pp.length==0){
return;
}
pp.panel("resize",{width:cc.width(),height:pp.panel("options").height,left:0,top:cc.height()-pp.panel("options").height});
_6.height-=pp.panel("options").height;
};
if(_b(_5.expandSouth)){
_8(_5.expandSouth);
}else{
_8(_5.south);
}
function _9(pp){
if(pp.length==0){
return;
}
pp.panel("resize",{width:pp.panel("options").width,height:_6.height,left:cc.width()-pp.panel("options").width,top:_6.top});
_6.width-=pp.panel("options").width;
};
if(_b(_5.expandEast)){
_9(_5.expandEast);
}else{
_9(_5.east);
}
function _a(pp){
if(pp.length==0){
return;
}
pp.panel("resize",{width:pp.panel("options").width,height:_6.height,left:0,top:_6.top});
_6.left+=pp.panel("options").width;
_6.width-=pp.panel("options").width;
};
if(_b(_5.expandWest)){
_a(_5.expandWest);
}else{
_a(_5.west);
}
_5.center.panel("resize",_6);
};
function _c(_d){
var cc=$(_d);
if(cc[0].tagName=="BODY"){
$("html").css({height:"100%",overflow:"hidden"});
$("body").css({height:"100%",overflow:"hidden",border:"none"});
}
cc.addClass("layout");
cc.css({margin:0,padding:0});
function _e(_f){
var pp=$(">div[region="+_f+"]",_d).addClass("layout-body");
var _10=null;
if(_f=="north"){
_10="layout-button-up";
}else{
if(_f=="south"){
_10="layout-button-down";
}else{
if(_f=="east"){
_10="layout-button-right";
}else{
if(_f=="west"){
_10="layout-button-left";
}
}
}
}
var cls="layout-panel layout-panel-"+_f;
if(pp.attr("split")=="true"){
cls+=" layout-split-"+_f;
}
pp.panel({cls:cls,doSize:false,border:(pp.attr("border")=="false"?false:true),width:(pp.length?parseInt(pp[0].style.width)||pp.outerWidth():"auto"),height:(pp.length?parseInt(pp[0].style.height)||pp.outerHeight():"auto"),tools:[{iconCls:_10,handler:function(){
_1c(_d,_f);
}}]});
if(pp.attr("split")=="true"){
var _11=pp.panel("panel");
var _12="";
if(_f=="north"){
_12="s";
}
if(_f=="south"){
_12="n";
}
if(_f=="east"){
_12="w";
}
if(_f=="west"){
_12="e";
}
_11.resizable({handles:_12,onStartResize:function(e){
_1=true;
if(_f=="north"||_f=="south"){
var _13=$(">div.layout-split-proxy-v",_d);
}else{
var _13=$(">div.layout-split-proxy-h",_d);
}
var top=0,_14=0,_15=0,_16=0;
var pos={display:"block"};
if(_f=="north"){
pos.top=parseInt(_11.css("top"))+_11.outerHeight()-_13.height();
pos.left=parseInt(_11.css("left"));
pos.width=_11.outerWidth();
pos.height=_13.height();
}else{
if(_f=="south"){
pos.top=parseInt(_11.css("top"));
pos.left=parseInt(_11.css("left"));
pos.width=_11.outerWidth();
pos.height=_13.height();
}else{
if(_f=="east"){
pos.top=parseInt(_11.css("top"))||0;
pos.left=parseInt(_11.css("left"))||0;
pos.width=_13.width();
pos.height=_11.outerHeight();
}else{
if(_f=="west"){
pos.top=parseInt(_11.css("top"))||0;
pos.left=_11.outerWidth()-_13.width();
pos.width=_13.width();
pos.height=_11.outerHeight();
}
}
}
}
_13.css(pos);
$("<div class=\"layout-mask\"></div>").css({left:0,top:0,width:cc.width(),height:cc.height()}).appendTo(cc);
},onResize:function(e){
if(_f=="north"||_f=="south"){
var _17=$(">div.layout-split-proxy-v",_d);
_17.css("top",e.pageY-$(_d).offset().top-_17.height()/2);
}else{
var _17=$(">div.layout-split-proxy-h",_d);
_17.css("left",e.pageX-$(_d).offset().left-_17.width()/2);
}
return false;
},onStopResize:function(){
$(">div.layout-split-proxy-v",_d).css("display","none");
$(">div.layout-split-proxy-h",_d).css("display","none");
var _18=pp.panel("options");
_18.width=_11.outerWidth();
_18.height=_11.outerHeight();
_18.left=_11.css("left");
_18.top=_11.css("top");
pp.panel("resize");
_2(_d);
_1=false;
cc.find(">div.layout-mask").remove();
}});
}
return pp;
};
$("<div class=\"layout-split-proxy-h\"></div>").appendTo(cc);
$("<div class=\"layout-split-proxy-v\"></div>").appendTo(cc);
var _19={center:_e("center")};
_19.north=_e("north");
_19.south=_e("south");
_19.east=_e("east");
_19.west=_e("west");
$(_d).bind("_resize",function(e,_1a){
var _1b=$.data(_d,"layout").options;
if(_1b.fit==true||_1a){
_2(_d);
}
return false;
});
return _19;
};
function _1c(_1d,_1e,_1f){
if(_1f==undefined){
_1f="normal";
}
var _20=$.data(_1d,"layout").panels;
var cc=$(_1d);
function _21(dir){
var _22;
if(dir=="east"){
_22="layout-button-left";
}else{
if(dir=="west"){
_22="layout-button-right";
}else{
if(dir=="north"){
_22="layout-button-down";
}else{
if(dir=="south"){
_22="layout-button-up";
}
}
}
}
var p=$("<div></div>").appendTo(cc).panel({cls:"layout-expand",title:"&nbsp;",closed:true,doSize:false,tools:[{iconCls:_22,handler:function(){
_27(_1d,_1e);
}}]});
p.panel("panel").hover(function(){
$(this).addClass("layout-expand-over");
},function(){
$(this).removeClass("layout-expand-over");
});
return p;
};
function _23(_24,_25){
var p=_20[_24];
if(p.panel("options").onBeforeCollapse.call(p)==false){
return;
}
_20.center.panel("resize",_25.resizeC);
var _26="expand"+_24.substring(0,1).toUpperCase()+_24.substring(1);
if(!_20[_26]){
_20[_26]=_21(_24);
_20[_26].panel("panel").click(function(){
p.panel("expand",false).panel("open").panel("resize",_25.collapse);
p.panel("panel").animate(_25.expand);
return false;
});
}
p.panel("panel").animate(_25.collapse,_1f,function(){
p.panel("collapse",false).panel("close");
_20[_26].panel("open").panel("resize",_25.expandP);
});
};
if(_1e=="east"){
_23("east",{resizeC:{width:_20.center.panel("options").width+_20["east"].panel("options").width-28},expand:{left:cc.width()-_20["east"].panel("options").width},expandP:{top:_20["east"].panel("options").top,left:cc.width()-28,width:28,height:_20["center"].panel("options").height},collapse:{left:cc.width()}});
}else{
if(_1e=="west"){
_23("west",{resizeC:{width:_20.center.panel("options").width+_20["west"].panel("options").width-28,left:28},expand:{left:0},expandP:{left:0,top:_20["west"].panel("options").top,width:28,height:_20["center"].panel("options").height},collapse:{left:-_20["west"].panel("options").width}});
}else{
if(_1e=="north"){
var hh=cc.height()-28;
if(_b(_20.expandSouth)){
hh-=_20.expandSouth.panel("options").height;
}else{
if(_b(_20.south)){
hh-=_20.south.panel("options").height;
}
}
_20.east.panel("resize",{top:28,height:hh});
_20.west.panel("resize",{top:28,height:hh});
if(_b(_20.expandEast)){
_20.expandEast.panel("resize",{top:28,height:hh});
}
if(_b(_20.expandWest)){
_20.expandWest.panel("resize",{top:28,height:hh});
}
_23("north",{resizeC:{top:28,height:hh},expand:{top:0},expandP:{top:0,left:0,width:cc.width(),height:28},collapse:{top:-_20["north"].panel("options").height}});
}else{
if(_1e=="south"){
var hh=cc.height()-28;
if(_b(_20.expandNorth)){
hh-=_20.expandNorth.panel("options").height;
}else{
if(_b(_20.north)){
hh-=_20.north.panel("options").height;
}
}
_20.east.panel("resize",{height:hh});
_20.west.panel("resize",{height:hh});
if(_b(_20.expandEast)){
_20.expandEast.panel("resize",{height:hh});
}
if(_b(_20.expandWest)){
_20.expandWest.panel("resize",{height:hh});
}
_23("south",{resizeC:{height:hh},expand:{top:cc.height()-_20["south"].panel("options").height},expandP:{top:cc.height()-28,left:0,width:cc.width(),height:28},collapse:{top:cc.height()}});
}
}
}
}
};
function _27(_28,_29){
var _2a=$.data(_28,"layout").panels;
var cc=$(_28);
function _2b(_2c,_2d){
var p=_2a[_2c];
if(p.panel("options").onBeforeExpand.call(p)==false){
return;
}
var _2e="expand"+_2c.substring(0,1).toUpperCase()+_2c.substring(1);
_2a[_2e].panel("close");
p.panel("panel").stop(true,true);
p.panel("expand",false).panel("open").panel("resize",_2d.collapse);
p.panel("panel").animate(_2d.expand,function(){
_2(_28);
});
};
if(_29=="east"&&_2a.expandEast){
_2b("east",{collapse:{left:cc.width()},expand:{left:cc.width()-_2a["east"].panel("options").width}});
}else{
if(_29=="west"&&_2a.expandWest){
_2b("west",{collapse:{left:-_2a["west"].panel("options").width},expand:{left:0}});
}else{
if(_29=="north"&&_2a.expandNorth){
_2b("north",{collapse:{top:-_2a["north"].panel("options").height},expand:{top:0}});
}else{
if(_29=="south"&&_2a.expandSouth){
_2b("south",{collapse:{top:cc.height()},expand:{top:cc.height()-_2a["south"].panel("options").height}});
}
}
}
}
};
function _2f(_30){
var _31=$.data(_30,"layout").panels;
var cc=$(_30);
if(_31.east.length){
_31.east.panel("panel").bind("mouseover","east",_32);
}
if(_31.west.length){
_31.west.panel("panel").bind("mouseover","west",_32);
}
if(_31.north.length){
_31.north.panel("panel").bind("mouseover","north",_32);
}
if(_31.south.length){
_31.south.panel("panel").bind("mouseover","south",_32);
}
_31.center.panel("panel").bind("mouseover","center",_32);
function _32(e){
if(_1==true){
return;
}
if(e.data!="east"&&_b(_31.east)&&_b(_31.expandEast)){
_1c(_30,"east");
}
if(e.data!="west"&&_b(_31.west)&&_b(_31.expandWest)){
_1c(_30,"west");
}
if(e.data!="north"&&_b(_31.north)&&_b(_31.expandNorth)){
_1c(_30,"north");
}
if(e.data!="south"&&_b(_31.south)&&_b(_31.expandSouth)){
_1c(_30,"south");
}
return false;
};
};
function _b(pp){
if(!pp){
return false;
}
if(pp.length){
return pp.panel("panel").is(":visible");
}else{
return false;
}
};
function _33(_34){
var _35=$.data(_34,"layout").panels;
if(_35.east.length&&_35.east.panel("options").collapsed){
_1c(_34,"east",0);
}
if(_35.west.length&&_35.west.panel("options").collapsed){
_1c(_34,"west",0);
}
if(_35.north.length&&_35.north.panel("options").collapsed){
_1c(_34,"north",0);
}
if(_35.south.length&&_35.south.panel("options").collapsed){
_1c(_34,"south",0);
}
};
$.fn.layout=function(_36,_37){
if(typeof _36=="string"){
return $.fn.layout.methods[_36](this,_37);
}
return this.each(function(){
var _38=$.data(this,"layout");
if(!_38){
var _39=$.extend({},{fit:$(this).attr("fit")=="true"});
$.data(this,"layout",{options:_39,panels:_c(this)});
_2f(this);
}
_2(this);
_33(this);
});
};
$.fn.layout.methods={resize:function(jq){
return jq.each(function(){
_2(this);
});
},panel:function(jq,_3a){
return $.data(jq[0],"layout").panels[_3a];
},collapse:function(jq,_3b){
return jq.each(function(){
_1c(this,_3b);
});
},expand:function(jq,_3c){
return jq.each(function(){
_27(this,_3c);
});
}};
})(jQuery);

