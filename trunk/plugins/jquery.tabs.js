/**
 * jQuery EasyUI 1.3
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
function _1(_2){
var _3=$(_2).children("div.tabs-header");
var _4=0;
$("ul.tabs li",_3).each(function(){
_4+=$(this).outerWidth(true);
});
var _5=_3.children("div.tabs-wrap").width();
var _6=parseInt(_3.find("ul.tabs").css("padding-left"));
return _4-_5+_6;
};
function _7(_8){
var _9=$.data(_8,"tabs").options;
var _a=$(_8).children("div.tabs-header");
var _b=_a.children("div.tabs-tool");
var _c=_a.children("div.tabs-scroller-left");
var _d=_a.children("div.tabs-scroller-right");
var _e=_a.children("div.tabs-wrap");
_b._outerHeight(_a.outerHeight()-(_9.plain?2:0));
var _f=0;
$("ul.tabs li",_a).each(function(){
_f+=$(this).outerWidth(true);
});
var _10=_a.width()-_b.outerWidth();
if(_f>_10){
_c.show();
_d.show();
_b.css("right",_d.outerWidth());
_e.css({marginLeft:_c.outerWidth(),marginRight:_d.outerWidth()+_b.outerWidth(),left:0,width:_10-_c.outerWidth()-_d.outerWidth()});
}else{
_c.hide();
_d.hide();
_b.css("right",0);
_e.css({marginLeft:0,marginRight:_b.outerWidth(),left:0,width:_10});
_e.scrollLeft(0);
}
};
function _11(_12){
var _13=$.data(_12,"tabs").options;
var _14=$(_12).children("div.tabs-header");
if(_13.tools){
if(typeof _13.tools=="string"){
$(_13.tools).addClass("tabs-tool").appendTo(_14);
$(_13.tools).show();
}else{
_14.children("div.tabs-tool").remove();
var _15=$("<div class=\"tabs-tool\"></div>").appendTo(_14);
for(var i=0;i<_13.tools.length;i++){
var _16=$("<a href=\"javascript:void(0);\"></a>").appendTo(_15);
_16[0].onclick=eval(_13.tools[i].handler||function(){
});
_16.linkbutton($.extend({},_13.tools[i],{plain:true}));
}
}
}else{
_14.children("div.tabs-tool").remove();
}
};
function _17(_18){
var _19=$.data(_18,"tabs").options;
var cc=$(_18);
if(_19.fit==true){
var p=cc.parent();
p.addClass("panel-noscroll");
if(p[0].tagName=="BODY"){
$("html").addClass("panel-fit");
}
_19.width=p.width();
_19.height=p.height();
}
cc.width(_19.width).height(_19.height);
var _1a=$(_18).children("div.tabs-header");
_1a._outerWidth(_19.width);
_7(_18);
var _1b=$(_18).children("div.tabs-panels");
var _1c=_19.height;
if(!isNaN(_1c)){
_1b._outerHeight(_1c-_1a.outerHeight());
}else{
_1b.height("auto");
}
var _1d=_19.width;
if(!isNaN(_1d)){
_1b._outerWidth(_1d);
}else{
_1b.width("auto");
}
};
function _1e(_1f){
var _20=$.data(_1f,"tabs").options;
var tab=_21(_1f);
if(tab){
var _22=$(_1f).children("div.tabs-panels");
var _23=_20.width=="auto"?"auto":_22.width();
var _24=_20.height=="auto"?"auto":_22.height();
tab.panel("resize",{width:_23,height:_24});
}
};
function _25(_26){
var cc=$(_26);
cc.addClass("tabs-container");
cc.wrapInner("<div class=\"tabs-panels\"/>");
$("<div class=\"tabs-header\">"+"<div class=\"tabs-scroller-left\"></div>"+"<div class=\"tabs-scroller-right\"></div>"+"<div class=\"tabs-wrap\">"+"<ul class=\"tabs\"></ul>"+"</div>"+"</div>").prependTo(_26);
var _27=[];
var tp=cc.children("div.tabs-panels");
tp.children("div").each(function(){
var _28=$.extend({},$.parser.parseOptions(this),{selected:($(this).attr("selected")?true:undefined)});
var pp=$(this);
_27.push(pp);
_36(_26,pp,_28);
});
cc.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function(){
$(this).addClass("tabs-scroller-over");
},function(){
$(this).removeClass("tabs-scroller-over");
});
cc.bind("_resize",function(e,_29){
var _2a=$.data(_26,"tabs").options;
if(_2a.fit==true||_29){
_17(_26);
_1e(_26);
}
return false;
});
return _27;
};
function _2b(_2c){
var _2d=$.data(_2c,"tabs").options;
var _2e=$(_2c).children("div.tabs-header");
var _2f=$(_2c).children("div.tabs-panels");
if(_2d.plain==true){
_2e.addClass("tabs-header-plain");
}else{
_2e.removeClass("tabs-header-plain");
}
if(_2d.border==true){
_2e.removeClass("tabs-header-noborder");
_2f.removeClass("tabs-panels-noborder");
}else{
_2e.addClass("tabs-header-noborder");
_2f.addClass("tabs-panels-noborder");
}
$(".tabs-scroller-left",_2e).unbind(".tabs").bind("click.tabs",function(){
var _30=$(".tabs-wrap",_2e);
var pos=_30.scrollLeft()-_2d.scrollIncrement;
_30.animate({scrollLeft:pos},_2d.scrollDuration);
});
$(".tabs-scroller-right",_2e).unbind(".tabs").bind("click.tabs",function(){
var _31=$(".tabs-wrap",_2e);
var pos=Math.min(_31.scrollLeft()+_2d.scrollIncrement,_1(_2c));
_31.animate({scrollLeft:pos},_2d.scrollDuration);
});
var _32=$.data(_2c,"tabs").tabs;
for(var i=0,len=_32.length;i<len;i++){
var _33=_32[i];
var tab=_33.panel("options").tab;
tab.unbind(".tabs").bind("click.tabs",{p:_33},function(e){
_45(_2c,_35(_2c,e.data.p));
}).bind("contextmenu.tabs",{p:_33},function(e){
_2d.onContextMenu.call(_2c,e,e.data.p.panel("options").title,_35(_2c,e.data.p));
});
tab.find("a.tabs-close").unbind(".tabs").bind("click.tabs",{p:_33},function(e){
_34(_2c,_35(_2c,e.data.p));
return false;
});
}
};
function _36(_37,pp,_38){
_38=_38||{};
pp.panel($.extend({},_38,{border:false,noheader:true,closed:true,doSize:false,iconCls:(_38.icon?_38.icon:undefined),onLoad:function(){
if(_38.onLoad){
_38.onLoad.call(this,arguments);
}
$.data(_37,"tabs").options.onLoad.call(_37,pp);
}}));
var _39=pp.panel("options");
var _3a=$(_37).children("div.tabs-header");
var _3b=$("ul.tabs",_3a);
var tab=$("<li></li>").appendTo(_3b);
var _3c=$("<a href=\"javascript:void(0)\" class=\"tabs-inner\"></a>").appendTo(tab);
var _3d=$("<span class=\"tabs-title\"></span>").html(_39.title).appendTo(_3c);
var _3e=$("<span class=\"tabs-icon\"></span>").appendTo(_3c);
if(_39.closable){
_3d.addClass("tabs-closable");
$("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
}
if(_39.iconCls){
_3d.addClass("tabs-with-icon");
_3e.addClass(_39.iconCls);
}
if(_39.tools){
var _3f=$("<span class=\"tabs-p-tool\"></span>").insertAfter(_3c);
if(typeof _39.tools=="string"){
$(_39.tools).children().appendTo(_3f);
}else{
for(var i=0;i<_39.tools.length;i++){
var t=$("<a href=\"javascript:void(0)\"></a>").appendTo(_3f);
t.addClass(_39.tools[i].iconCls);
if(_39.tools[i].handler){
t.bind("click",eval(_39.tools[i].handler));
}
}
}
var pr=_3f.children().length*12;
if(_39.closable){
pr+=8;
}else{
pr-=3;
_3f.css("right","5px");
}
_3d.css("padding-right",pr+"px");
}
_39.tab=tab;
};
function _40(_41,_42){
var _43=$.data(_41,"tabs").options;
var _44=$.data(_41,"tabs").tabs;
if(_42.selected==undefined){
_42.selected=true;
}
var pp=$("<div></div>").appendTo($(_41).children("div.tabs-panels"));
_44.push(pp);
_36(_41,pp,_42);
_43.onAdd.call(_41,_42.title,_44.length-1);
_7(_41);
_2b(_41);
if(_42.selected){
_45(_41,_44.length-1);
}
};
function _46(_47,_48){
var _49=$.data(_47,"tabs").selectHis;
var pp=_48.tab;
var _4a=pp.panel("options").title;
pp.panel($.extend({},_48.options,{iconCls:(_48.options.icon?_48.options.icon:undefined)}));
var _4b=pp.panel("options");
var tab=_4b.tab;
tab.find("span.tabs-icon").attr("class","tabs-icon");
tab.find("a.tabs-close").remove();
tab.find("span.tabs-title").html(_4b.title);
if(_4b.closable){
tab.find("span.tabs-title").addClass("tabs-closable");
$("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
}else{
tab.find("span.tabs-title").removeClass("tabs-closable");
}
if(_4b.iconCls){
tab.find("span.tabs-title").addClass("tabs-with-icon");
tab.find("span.tabs-icon").addClass(_4b.iconCls);
}else{
tab.find("span.tabs-title").removeClass("tabs-with-icon");
}
if(_4a!=_4b.title){
for(var i=0;i<_49.length;i++){
if(_49[i]==_4a){
_49[i]=_4b.title;
}
}
}
_2b(_47);
$.data(_47,"tabs").options.onUpdate.call(_47,_4b.title,_35(_47,pp));
};
function _34(_4c,_4d){
var _4e=$.data(_4c,"tabs").options;
var _4f=$.data(_4c,"tabs").tabs;
var _50=$.data(_4c,"tabs").selectHis;
if(!_51(_4c,_4d)){
return;
}
var tab=_52(_4c,_4d);
var _53=tab.panel("options").title;
var _54=_35(_4c,tab);
if(_4e.onBeforeClose.call(_4c,_53,_54)==false){
return;
}
var tab=_52(_4c,_4d,true);
tab.panel("options").tab.remove();
tab.panel("destroy");
_4e.onClose.call(_4c,_53,_54);
_7(_4c);
for(var i=0;i<_50.length;i++){
if(_50[i]==_53){
_50.splice(i,1);
i--;
}
}
var _55=_50.pop();
if(_55){
_45(_4c,_55);
}else{
if(_4f.length){
_45(_4c,0);
}
}
};
function _52(_56,_57,_58){
var _59=$.data(_56,"tabs").tabs;
if(typeof _57=="number"){
if(_57<0||_57>=_59.length){
return null;
}else{
var tab=_59[_57];
if(_58){
_59.splice(_57,1);
}
return tab;
}
}
for(var i=0;i<_59.length;i++){
var tab=_59[i];
if(tab.panel("options").title==_57){
if(_58){
_59.splice(i,1);
}
return tab;
}
}
return null;
};
function _35(_5a,tab){
var _5b=$.data(_5a,"tabs").tabs;
for(var i=0;i<_5b.length;i++){
if(_5b[i][0]==$(tab)[0]){
return i;
}
}
return -1;
};
function _21(_5c){
var _5d=$.data(_5c,"tabs").tabs;
for(var i=0;i<_5d.length;i++){
var tab=_5d[i];
if(tab.panel("options").closed==false){
return tab;
}
}
return null;
};
function _5e(_5f){
var _60=$.data(_5f,"tabs").tabs;
for(var i=0;i<_60.length;i++){
if(_60[i].panel("options").selected){
_45(_5f,i);
return;
}
}
if(_60.length){
_45(_5f,0);
}
};
function _45(_61,_62){
var _63=$.data(_61,"tabs").options;
var _64=$.data(_61,"tabs").tabs;
var _65=$.data(_61,"tabs").selectHis;
if(_64.length==0){
return;
}
var _66=_52(_61,_62);
if(!_66){
return;
}
var _67=_21(_61);
if(_67){
_67.panel("close");
_67.panel("options").tab.removeClass("tabs-selected");
}
_66.panel("open");
var _68=_66.panel("options").title;
_65.push(_68);
var tab=_66.panel("options").tab;
tab.addClass("tabs-selected");
var _69=$(_61).find(">div.tabs-header div.tabs-wrap");
var _6a=tab.position().left+_69.scrollLeft();
var _6b=_6a-_69.scrollLeft();
var _6c=_6b+tab.outerWidth();
if(_6b<0||_6c>_69.innerWidth()){
var pos=Math.min(_6a-(_69.width()-tab.width())/2,_1(_61));
_69.animate({scrollLeft:pos},_63.scrollDuration);
}else{
var pos=Math.min(_69.scrollLeft(),_1(_61));
_69.animate({scrollLeft:pos},_63.scrollDuration);
}
_1e(_61);
_63.onSelect.call(_61,_68,_35(_61,_66));
};
function _51(_6d,_6e){
return _52(_6d,_6e)!=null;
};
$.fn.tabs=function(_6f,_70){
if(typeof _6f=="string"){
return $.fn.tabs.methods[_6f](this,_70);
}
_6f=_6f||{};
return this.each(function(){
var _71=$.data(this,"tabs");
var _72;
if(_71){
_72=$.extend(_71.options,_6f);
_71.options=_72;
}else{
$.data(this,"tabs",{options:$.extend({},$.fn.tabs.defaults,$.fn.tabs.parseOptions(this),_6f),tabs:_25(this),selectHis:[]});
}
_11(this);
_2b(this);
_17(this);
_5e(this);
});
};
$.fn.tabs.methods={options:function(jq){
return $.data(jq[0],"tabs").options;
},tabs:function(jq){
return $.data(jq[0],"tabs").tabs;
},resize:function(jq){
return jq.each(function(){
_17(this);
_1e(this);
});
},add:function(jq,_73){
return jq.each(function(){
_40(this,_73);
});
},close:function(jq,_74){
return jq.each(function(){
_34(this,_74);
});
},getTab:function(jq,_75){
return _52(jq[0],_75);
},getTabIndex:function(jq,tab){
return _35(jq[0],tab);
},getSelected:function(jq){
return _21(jq[0]);
},select:function(jq,_76){
return jq.each(function(){
_45(this,_76);
});
},exists:function(jq,_77){
return _51(jq[0],_77);
},update:function(jq,_78){
return jq.each(function(){
_46(this,_78);
});
}};
$.fn.tabs.parseOptions=function(_79){
return $.extend({},$.parser.parseOptions(_79,["width","height","tools",{fit:"boolean",border:"boolean",plain:"boolean"}]));
};
$.fn.tabs.defaults={width:"auto",height:"auto",plain:false,fit:false,border:true,tools:null,scrollIncrement:100,scrollDuration:400,onLoad:function(_7a){
},onSelect:function(_7b,_7c){
},onBeforeClose:function(_7d,_7e){
},onClose:function(_7f,_80){
},onAdd:function(_81,_82){
},onUpdate:function(_83,_84){
},onContextMenu:function(e,_85,_86){
}};
})(jQuery);

