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
$("<div class=\"layout-split-proxy-h\"></div>").appendTo(cc);
$("<div class=\"layout-split-proxy-v\"></div>").appendTo(cc);
cc.children("div[region]").each(function(){
var _e=$(this).attr("region");
_11(_d,{region:_e});
});
cc.bind("_resize",function(e,_f){
var _10=$.data(_d,"layout").options;
if(_10.fit==true||_f){
_2(_d);
}
return false;
});
};
function _11(_12,_13){
_13.region=_13.region||"center";
var _14=$.data(_12,"layout").panels;
var cc=$(_12);
var dir=_13.region;
if(_14[dir].length){
return;
}
var pp=cc.children("div[region="+dir+"]");
if(!pp.length){
pp=$("<div></div>").appendTo(cc);
}
pp.panel($.extend({},{width:(pp.length?parseInt(pp[0].style.width)||pp.outerWidth():"auto"),height:(pp.length?parseInt(pp[0].style.height)||pp.outerHeight():"auto"),split:(pp.attr("split")?pp.attr("split")=="true":undefined),doSize:false,cls:("layout-panel layout-panel-"+dir),bodyCls:"layout-body",onOpen:function(){
var _15={north:"up",south:"down",east:"right",west:"left"};
if(!_15[dir]){
return;
}
var _16="layout-button-"+_15[dir];
var _17=$(this).panel("header").children("div.panel-tool");
if(!_17.children("a."+_16).length){
var t=$("<a href=\"javascript:void(0)\"></a>").addClass(_16).appendTo(_17);
t.bind("click",{dir:dir},function(e){
_25(_12,e.data.dir);
return false;
});
}
}},_13));
_14[dir]=pp;
if(pp.panel("options").split){
var _18=pp.panel("panel");
_18.addClass("layout-split-"+dir);
var _19="";
if(dir=="north"){
_19="s";
}
if(dir=="south"){
_19="n";
}
if(dir=="east"){
_19="w";
}
if(dir=="west"){
_19="e";
}
_18.resizable({handles:_19,onStartResize:function(e){
_1=true;
if(dir=="north"||dir=="south"){
var _1a=$(">div.layout-split-proxy-v",_12);
}else{
var _1a=$(">div.layout-split-proxy-h",_12);
}
var top=0,_1b=0,_1c=0,_1d=0;
var pos={display:"block"};
if(dir=="north"){
pos.top=parseInt(_18.css("top"))+_18.outerHeight()-_1a.height();
pos.left=parseInt(_18.css("left"));
pos.width=_18.outerWidth();
pos.height=_1a.height();
}else{
if(dir=="south"){
pos.top=parseInt(_18.css("top"));
pos.left=parseInt(_18.css("left"));
pos.width=_18.outerWidth();
pos.height=_1a.height();
}else{
if(dir=="east"){
pos.top=parseInt(_18.css("top"))||0;
pos.left=parseInt(_18.css("left"))||0;
pos.width=_1a.width();
pos.height=_18.outerHeight();
}else{
if(dir=="west"){
pos.top=parseInt(_18.css("top"))||0;
pos.left=_18.outerWidth()-_1a.width();
pos.width=_1a.width();
pos.height=_18.outerHeight();
}
}
}
}
_1a.css(pos);
$("<div class=\"layout-mask\"></div>").css({left:0,top:0,width:cc.width(),height:cc.height()}).appendTo(cc);
},onResize:function(e){
if(dir=="north"||dir=="south"){
var _1e=$(">div.layout-split-proxy-v",_12);
_1e.css("top",e.pageY-$(_12).offset().top-_1e.height()/2);
}else{
var _1e=$(">div.layout-split-proxy-h",_12);
_1e.css("left",e.pageX-$(_12).offset().left-_1e.width()/2);
}
return false;
},onStopResize:function(){
$(">div.layout-split-proxy-v",_12).css("display","none");
$(">div.layout-split-proxy-h",_12).css("display","none");
var _1f=pp.panel("options");
_1f.width=_18.outerWidth();
_1f.height=_18.outerHeight();
_1f.left=_18.css("left");
_1f.top=_18.css("top");
pp.panel("resize");
_2(_12);
_1=false;
cc.find(">div.layout-mask").remove();
}});
}
};
function _20(_21,_22){
var _23=$.data(_21,"layout").panels;
if(_23[_22].length){
_23[_22].panel("destroy");
_23[_22]=$();
var _24="expand"+_22.substring(0,1).toUpperCase()+_22.substring(1);
if(_23[_24]){
_23[_24].panel("destroy");
_23[_24]=undefined;
}
}
};
function _25(_26,_27,_28){
if(_28==undefined){
_28="normal";
}
var _29=$.data(_26,"layout").panels;
var cc=$(_26);
function _2a(dir){
var _2b;
if(dir=="east"){
_2b="layout-button-left";
}else{
if(dir=="west"){
_2b="layout-button-right";
}else{
if(dir=="north"){
_2b="layout-button-down";
}else{
if(dir=="south"){
_2b="layout-button-up";
}
}
}
}
var p=$("<div></div>").appendTo(cc).panel({cls:"layout-expand",title:"&nbsp;",closed:true,doSize:false,tools:[{iconCls:_2b,handler:function(){
_30(_26,_27);
return false;
}}]});
p.panel("panel").hover(function(){
$(this).addClass("layout-expand-over");
},function(){
$(this).removeClass("layout-expand-over");
});
return p;
};
function _2c(_2d,_2e){
var p=_29[_2d];
if(p.panel("options").onBeforeCollapse.call(p)==false){
return;
}
_29.center.panel("resize",_2e.resizeC);
var _2f="expand"+_2d.substring(0,1).toUpperCase()+_2d.substring(1);
if(!_29[_2f]){
_29[_2f]=_2a(_2d);
_29[_2f].panel("panel").click(function(){
p.panel("expand",false).panel("open").panel("resize",_2e.collapse);
p.panel("panel").animate(_2e.expand);
return false;
});
}
p.panel("panel").animate(_2e.collapse,_28,function(){
p.panel("collapse",false).panel("close");
_29[_2f].panel("open").panel("resize",_2e.expandP);
});
};
if(_27=="east"){
_2c("east",{resizeC:{width:_29.center.panel("options").width+_29["east"].panel("options").width-28},expand:{left:cc.width()-_29["east"].panel("options").width},expandP:{top:_29["east"].panel("options").top,left:cc.width()-28,width:28,height:_29["center"].panel("options").height},collapse:{left:cc.width()}});
}else{
if(_27=="west"){
_2c("west",{resizeC:{width:_29.center.panel("options").width+_29["west"].panel("options").width-28,left:28},expand:{left:0},expandP:{left:0,top:_29["west"].panel("options").top,width:28,height:_29["center"].panel("options").height},collapse:{left:-_29["west"].panel("options").width}});
}else{
if(_27=="north"){
var hh=cc.height()-28;
if(_b(_29.expandSouth)){
hh-=_29.expandSouth.panel("options").height;
}else{
if(_b(_29.south)){
hh-=_29.south.panel("options").height;
}
}
_29.east.panel("resize",{top:28,height:hh});
_29.west.panel("resize",{top:28,height:hh});
if(_b(_29.expandEast)){
_29.expandEast.panel("resize",{top:28,height:hh});
}
if(_b(_29.expandWest)){
_29.expandWest.panel("resize",{top:28,height:hh});
}
_2c("north",{resizeC:{top:28,height:hh},expand:{top:0},expandP:{top:0,left:0,width:cc.width(),height:28},collapse:{top:-_29["north"].panel("options").height}});
}else{
if(_27=="south"){
var hh=cc.height()-28;
if(_b(_29.expandNorth)){
hh-=_29.expandNorth.panel("options").height;
}else{
if(_b(_29.north)){
hh-=_29.north.panel("options").height;
}
}
_29.east.panel("resize",{height:hh});
_29.west.panel("resize",{height:hh});
if(_b(_29.expandEast)){
_29.expandEast.panel("resize",{height:hh});
}
if(_b(_29.expandWest)){
_29.expandWest.panel("resize",{height:hh});
}
_2c("south",{resizeC:{height:hh},expand:{top:cc.height()-_29["south"].panel("options").height},expandP:{top:cc.height()-28,left:0,width:cc.width(),height:28},collapse:{top:cc.height()}});
}
}
}
}
};
function _30(_31,_32){
var _33=$.data(_31,"layout").panels;
var cc=$(_31);
function _34(_35,_36){
var p=_33[_35];
if(p.panel("options").onBeforeExpand.call(p)==false){
return;
}
var _37="expand"+_35.substring(0,1).toUpperCase()+_35.substring(1);
_33[_37].panel("close");
p.panel("panel").stop(true,true);
p.panel("expand",false).panel("open").panel("resize",_36.collapse);
p.panel("panel").animate(_36.expand,function(){
_2(_31);
});
};
if(_32=="east"&&_33.expandEast){
_34("east",{collapse:{left:cc.width()},expand:{left:cc.width()-_33["east"].panel("options").width}});
}else{
if(_32=="west"&&_33.expandWest){
_34("west",{collapse:{left:-_33["west"].panel("options").width},expand:{left:0}});
}else{
if(_32=="north"&&_33.expandNorth){
_34("north",{collapse:{top:-_33["north"].panel("options").height},expand:{top:0}});
}else{
if(_32=="south"&&_33.expandSouth){
_34("south",{collapse:{top:cc.height()},expand:{top:cc.height()-_33["south"].panel("options").height}});
}
}
}
}
};
function _38(_39){
var _3a=$.data(_39,"layout").panels;
var cc=$(_39);
if(_3a.east.length){
_3a.east.panel("panel").bind("mouseover","east",_3b);
}
if(_3a.west.length){
_3a.west.panel("panel").bind("mouseover","west",_3b);
}
if(_3a.north.length){
_3a.north.panel("panel").bind("mouseover","north",_3b);
}
if(_3a.south.length){
_3a.south.panel("panel").bind("mouseover","south",_3b);
}
_3a.center.panel("panel").bind("mouseover","center",_3b);
function _3b(e){
if(_1==true){
return;
}
if(e.data!="east"&&_b(_3a.east)&&_b(_3a.expandEast)){
_25(_39,"east");
}
if(e.data!="west"&&_b(_3a.west)&&_b(_3a.expandWest)){
_25(_39,"west");
}
if(e.data!="north"&&_b(_3a.north)&&_b(_3a.expandNorth)){
_25(_39,"north");
}
if(e.data!="south"&&_b(_3a.south)&&_b(_3a.expandSouth)){
_25(_39,"south");
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
function _3c(_3d){
var _3e=$.data(_3d,"layout").panels;
if(_3e.east.length&&_3e.east.panel("options").collapsed){
_25(_3d,"east",0);
}
if(_3e.west.length&&_3e.west.panel("options").collapsed){
_25(_3d,"west",0);
}
if(_3e.north.length&&_3e.north.panel("options").collapsed){
_25(_3d,"north",0);
}
if(_3e.south.length&&_3e.south.panel("options").collapsed){
_25(_3d,"south",0);
}
};
$.fn.layout=function(_3f,_40){
if(typeof _3f=="string"){
return $.fn.layout.methods[_3f](this,_40);
}
return this.each(function(){
var _41=$.data(this,"layout");
if(!_41){
var _42=$.extend({},{fit:$(this).attr("fit")=="true"});
$.data(this,"layout",{options:_42,panels:{center:$(),north:$(),south:$(),east:$(),west:$()}});
_c(this);
_38(this);
}
_2(this);
_3c(this);
});
};
$.fn.layout.methods={resize:function(jq){
return jq.each(function(){
_2(this);
});
},panel:function(jq,_43){
return $.data(jq[0],"layout").panels[_43];
},collapse:function(jq,_44){
return jq.each(function(){
_25(this,_44);
});
},expand:function(jq,_45){
return jq.each(function(){
_30(this,_45);
});
},add:function(jq,_46){
return jq.each(function(){
_11(this,_46);
});
},remove:function(jq,_47){
return jq.each(function(){
_20(this,_47);
});
}};
})(jQuery);

