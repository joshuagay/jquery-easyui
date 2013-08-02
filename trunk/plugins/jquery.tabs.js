/**
 * jQuery EasyUI 1.3.4
 * 
 * Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL or commercial licenses
 * To use it on other terms please contact us: info@jeasyui.com
 * http://www.gnu.org/licenses/gpl.txt
 * http://www.jeasyui.com/license_commercial.php
 *
 */
(function($){
function _1(_2){
var _3=$.data(_2,"tabs").options;
if(_3.tabPosition=="left"||_3.tabPosition=="right"){
return;
}
var _4=$(_2).children("div.tabs-header");
var _5=_4.children("div.tabs-tool");
var _6=_4.children("div.tabs-scroller-left");
var _7=_4.children("div.tabs-scroller-right");
var _8=_4.children("div.tabs-wrap");
var _9=_4.outerHeight();
if(_3.plain){
_9-=_9-_4.height();
}
_5._outerHeight(_9);
var _a=0;
$("ul.tabs li",_4).each(function(){
_a+=$(this).outerWidth(true);
});
var _b=_4.width()-_5._outerWidth();
if(_a>_b){
_6.add(_7).show()._outerHeight(_9);
if(_3.toolPosition=="left"){
_5.css({left:_6.outerWidth(),right:""});
_8.css({marginLeft:_6.outerWidth()+_5._outerWidth(),marginRight:_7._outerWidth(),width:_b-_6.outerWidth()-_7.outerWidth()});
}else{
_5.css({left:"",right:_7.outerWidth()});
_8.css({marginLeft:_6.outerWidth(),marginRight:_7.outerWidth()+_5._outerWidth(),width:_b-_6.outerWidth()-_7.outerWidth()});
}
}else{
_6.add(_7).hide();
if(_3.toolPosition=="left"){
_5.css({left:0,right:""});
_8.css({marginLeft:_5._outerWidth(),marginRight:0,width:_b});
}else{
_5.css({left:"",right:0});
_8.css({marginLeft:0,marginRight:_5._outerWidth(),width:_b});
}
}
};
function _c(_d){
var _e=$.data(_d,"tabs").options;
var _f=$(_d).children("div.tabs-header");
if(_e.tools){
if(typeof _e.tools=="string"){
$(_e.tools).addClass("tabs-tool").appendTo(_f);
$(_e.tools).show();
}else{
_f.children("div.tabs-tool").remove();
var _10=$("<div class=\"tabs-tool\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"height:100%\"><tr></tr></table></div>").appendTo(_f);
var tr=_10.find("tr");
for(var i=0;i<_e.tools.length;i++){
var td=$("<td></td>").appendTo(tr);
var _11=$("<a href=\"javascript:void(0);\"></a>").appendTo(td);
_11[0].onclick=eval(_e.tools[i].handler||function(){
});
_11.linkbutton($.extend({},_e.tools[i],{plain:true}));
}
}
}else{
_f.children("div.tabs-tool").remove();
}
};
function _12(_13){
var _14=$.data(_13,"tabs");
var _15=_14.options;
var cc=$(_13);
_15.fit?$.extend(_15,cc._fit()):cc._fit(false);
cc.width(_15.width).height(_15.height);
var _16=$(_13).children("div.tabs-header");
var _17=$(_13).children("div.tabs-panels");
var _18=_16.find("div.tabs-wrap");
var ul=_18.find(".tabs");
for(var i=0;i<_14.tabs.length;i++){
var _19=_14.tabs[i].panel("options");
var p_t=_19.tab.find("a.tabs-inner");
var _1a=parseInt(_19.tabWidth||_15.tabWidth)||undefined;
if(_1a){
p_t._outerWidth(_1a);
}else{
p_t.css("width","");
}
p_t._outerHeight(_15.tabHeight);
p_t.css("lineHeight",p_t.height()+"px");
}
if(_15.tabPosition=="left"||_15.tabPosition=="right"){
_16._outerWidth(_15.headerWidth);
_17._outerWidth(cc.width()-_15.headerWidth);
_16.add(_17)._outerHeight(_15.height);
_18._outerWidth(_16.width());
ul._outerWidth(_18.width()).css("height","");
}else{
_16._outerWidth(_15.width).css("height","");
ul._outerHeight(_15.tabHeight).css("width","");
_1(_13);
var _1b=_15.height;
if(!isNaN(_1b)){
_17._outerHeight(_1b-_16.outerHeight());
}else{
_17.height("auto");
}
var _1a=_15.width;
if(!isNaN(_1a)){
_17._outerWidth(_1a);
}else{
_17.width("auto");
}
}
};
function _1c(_1d){
var _1e=$.data(_1d,"tabs").options;
var tab=_1f(_1d);
if(tab){
var _20=$(_1d).children("div.tabs-panels");
var _21=_1e.width=="auto"?"auto":_20.width();
var _22=_1e.height=="auto"?"auto":_20.height();
tab.panel("resize",{width:_21,height:_22});
}
};
function _23(_24){
var _25=$.data(_24,"tabs").tabs;
var cc=$(_24);
cc.addClass("tabs-container");
cc.wrapInner("<div class=\"tabs-panels\"/>");
$("<div class=\"tabs-header\">"+"<div class=\"tabs-scroller-left\"></div>"+"<div class=\"tabs-scroller-right\"></div>"+"<div class=\"tabs-wrap\">"+"<ul class=\"tabs\"></ul>"+"</div>"+"</div>").prependTo(_24);
cc.children("div.tabs-panels").children("div").each(function(i){
var _26=$.extend({},$.parser.parseOptions(this),{selected:($(this).attr("selected")?true:undefined)});
var pp=$(this);
_25.push(pp);
_2e(_24,pp,_26);
});
cc.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function(){
$(this).addClass("tabs-scroller-over");
},function(){
$(this).removeClass("tabs-scroller-over");
});
cc.bind("_resize",function(e,_27){
var _28=$.data(_24,"tabs").options;
if(_28.fit==true||_27){
_12(_24);
_1c(_24);
}
return false;
});
};
function _29(_2a){
var _2b=$.data(_2a,"tabs").options;
var _2c=$(_2a).children("div.tabs-header");
var _2d=$(_2a).children("div.tabs-panels");
_2c.removeClass("tabs-header-top tabs-header-bottom tabs-header-left tabs-header-right");
_2d.removeClass("tabs-panels-top tabs-panels-bottom tabs-panels-left tabs-panels-right");
if(_2b.tabPosition=="top"){
_2c.insertBefore(_2d);
}else{
if(_2b.tabPosition=="bottom"){
_2c.insertAfter(_2d);
_2c.addClass("tabs-header-bottom");
_2d.addClass("tabs-panels-top");
}else{
if(_2b.tabPosition=="left"){
_2c.addClass("tabs-header-left");
_2d.addClass("tabs-panels-right");
}else{
if(_2b.tabPosition=="right"){
_2c.addClass("tabs-header-right");
_2d.addClass("tabs-panels-left");
}
}
}
}
if(_2b.plain==true){
_2c.addClass("tabs-header-plain");
}else{
_2c.removeClass("tabs-header-plain");
}
if(_2b.border==true){
_2c.removeClass("tabs-header-noborder");
_2d.removeClass("tabs-panels-noborder");
}else{
_2c.addClass("tabs-header-noborder");
_2d.addClass("tabs-panels-noborder");
}
$(".tabs-scroller-left",_2c).unbind(".tabs").bind("click.tabs",function(){
$(_2a).tabs("scrollBy",-_2b.scrollIncrement);
});
$(".tabs-scroller-right",_2c).unbind(".tabs").bind("click.tabs",function(){
$(_2a).tabs("scrollBy",_2b.scrollIncrement);
});
};
function _2e(_2f,pp,_30){
var _31=$.data(_2f,"tabs");
_30=_30||{};
pp.panel($.extend({},_30,{border:false,noheader:true,closed:true,doSize:false,iconCls:(_30.icon?_30.icon:undefined),onLoad:function(){
if(_30.onLoad){
_30.onLoad.call(this,arguments);
}
_31.options.onLoad.call(_2f,$(this));
}}));
var _32=pp.panel("options");
var _33=$(_2f).children("div.tabs-header").find("ul.tabs");
_32.tab=$("<li></li>").appendTo(_33);
_32.tab.append("<a href=\"javascript:void(0)\" class=\"tabs-inner\">"+"<span class=\"tabs-title\"></span>"+"<span class=\"tabs-icon\"></span>"+"</a>");
_32.tab.unbind(".tabs").bind("click.tabs",{p:pp},function(e){
if($(this).hasClass("tabs-disabled")){
return;
}
_3a(_2f,_34(_2f,e.data.p));
}).bind("contextmenu.tabs",{p:pp},function(e){
if($(this).hasClass("tabs-disabled")){
return;
}
_31.options.onContextMenu.call(_2f,e,$(this).find("span.tabs-title").html(),_34(_2f,e.data.p));
});
$(_2f).tabs("update",{tab:pp,options:_32});
};
function _35(_36,_37){
var _38=$.data(_36,"tabs").options;
var _39=$.data(_36,"tabs").tabs;
if(_37.selected==undefined){
_37.selected=true;
}
var pp=$("<div></div>").appendTo($(_36).children("div.tabs-panels"));
_39.push(pp);
_2e(_36,pp,_37);
_38.onAdd.call(_36,_37.title,_39.length-1);
_12(_36);
if(_37.selected){
_3a(_36,_39.length-1);
}
};
function _3b(_3c,_3d){
var _3e=$.data(_3c,"tabs").selectHis;
var pp=_3d.tab;
var _3f=pp.panel("options").title;
pp.panel($.extend({},_3d.options,{iconCls:(_3d.options.icon?_3d.options.icon:undefined)}));
var _40=pp.panel("options");
var tab=_40.tab;
var _41=tab.find("span.tabs-title");
var _42=tab.find("span.tabs-icon");
_41.html(_40.title);
_42.attr("class","tabs-icon");
tab.find("a.tabs-close").remove();
if(_40.closable){
_41.addClass("tabs-closable");
var _43=$("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
_43.bind("click.tabs",{p:pp},function(e){
if($(this).parent().hasClass("tabs-disabled")){
return;
}
_45(_3c,_34(_3c,e.data.p));
return false;
});
}else{
_41.removeClass("tabs-closable");
}
if(_40.iconCls){
_41.addClass("tabs-with-icon");
_42.addClass(_40.iconCls);
}else{
_41.removeClass("tabs-with-icon");
}
if(_3f!=_40.title){
for(var i=0;i<_3e.length;i++){
if(_3e[i]==_3f){
_3e[i]=_40.title;
}
}
}
tab.find("span.tabs-p-tool").remove();
if(_40.tools){
var _44=$("<span class=\"tabs-p-tool\"></span>").insertAfter(tab.find("a.tabs-inner"));
if(typeof _40.tools=="string"){
$(_40.tools).children().appendTo(_44);
}else{
for(var i=0;i<_40.tools.length;i++){
var t=$("<a href=\"javascript:void(0)\"></a>").appendTo(_44);
t.addClass(_40.tools[i].iconCls);
if(_40.tools[i].handler){
t.bind("click",{handler:_40.tools[i].handler},function(e){
if($(this).parents("li").hasClass("tabs-disabled")){
return;
}
e.data.handler.call(this);
});
}
}
}
var pr=_44.children().length*12;
if(_40.closable){
pr+=8;
}else{
pr-=3;
_44.css("right","5px");
}
_41.css("padding-right",pr+"px");
}
_12(_3c);
$.data(_3c,"tabs").options.onUpdate.call(_3c,_40.title,_34(_3c,pp));
};
function _45(_46,_47){
var _48=$.data(_46,"tabs").options;
var _49=$.data(_46,"tabs").tabs;
var _4a=$.data(_46,"tabs").selectHis;
if(!_4b(_46,_47)){
return;
}
var tab=_4c(_46,_47);
var _4d=tab.panel("options").title;
var _4e=_34(_46,tab);
if(_48.onBeforeClose.call(_46,_4d,_4e)==false){
return;
}
var tab=_4c(_46,_47,true);
tab.panel("options").tab.remove();
tab.panel("destroy");
_48.onClose.call(_46,_4d,_4e);
_12(_46);
for(var i=0;i<_4a.length;i++){
if(_4a[i]==_4d){
_4a.splice(i,1);
i--;
}
}
var _4f=_4a.pop();
if(_4f){
_3a(_46,_4f);
}else{
if(_49.length){
_3a(_46,0);
}
}
};
function _4c(_50,_51,_52){
var _53=$.data(_50,"tabs").tabs;
if(typeof _51=="number"){
if(_51<0||_51>=_53.length){
return null;
}else{
var tab=_53[_51];
if(_52){
_53.splice(_51,1);
}
return tab;
}
}
for(var i=0;i<_53.length;i++){
var tab=_53[i];
if(tab.panel("options").title==_51){
if(_52){
_53.splice(i,1);
}
return tab;
}
}
return null;
};
function _34(_54,tab){
var _55=$.data(_54,"tabs").tabs;
for(var i=0;i<_55.length;i++){
if(_55[i][0]==$(tab)[0]){
return i;
}
}
return -1;
};
function _1f(_56){
var _57=$.data(_56,"tabs").tabs;
for(var i=0;i<_57.length;i++){
var tab=_57[i];
if(tab.panel("options").closed==false){
return tab;
}
}
return null;
};
function _58(_59){
var _5a=$.data(_59,"tabs").tabs;
for(var i=0;i<_5a.length;i++){
if(_5a[i].panel("options").selected){
_3a(_59,i);
return;
}
}
if(_5a.length){
_3a(_59,0);
}
};
function _3a(_5b,_5c){
var _5d=$.data(_5b,"tabs").options;
var _5e=$.data(_5b,"tabs").tabs;
var _5f=$.data(_5b,"tabs").selectHis;
if(_5e.length==0){
return;
}
var _60=_4c(_5b,_5c);
if(!_60){
return;
}
var _61=_1f(_5b);
if(_61){
_61.panel("close");
_61.panel("options").tab.removeClass("tabs-selected");
}
_60.panel("open");
var _62=_60.panel("options").title;
_5f.push(_62);
var tab=_60.panel("options").tab;
tab.addClass("tabs-selected");
var _63=$(_5b).find(">div.tabs-header>div.tabs-wrap");
var _64=tab.position().left;
var _65=_64+tab.outerWidth();
if(_64<0||_65>_63.width()){
var _66=_64-(_63.width()-tab.width())/2;
$(_5b).tabs("scrollBy",_66);
}else{
$(_5b).tabs("scrollBy",0);
}
_1c(_5b);
_5d.onSelect.call(_5b,_62,_34(_5b,_60));
};
function _4b(_67,_68){
return _4c(_67,_68)!=null;
};
$.fn.tabs=function(_69,_6a){
if(typeof _69=="string"){
return $.fn.tabs.methods[_69](this,_6a);
}
_69=_69||{};
return this.each(function(){
var _6b=$.data(this,"tabs");
var _6c;
if(_6b){
_6c=$.extend(_6b.options,_69);
_6b.options=_6c;
}else{
$.data(this,"tabs",{options:$.extend({},$.fn.tabs.defaults,$.fn.tabs.parseOptions(this),_69),tabs:[],selectHis:[]});
_23(this);
}
_c(this);
_29(this);
_12(this);
_58(this);
});
};
$.fn.tabs.methods={options:function(jq){
return $.data(jq[0],"tabs").options;
},tabs:function(jq){
return $.data(jq[0],"tabs").tabs;
},resize:function(jq){
return jq.each(function(){
_12(this);
_1c(this);
});
},add:function(jq,_6d){
return jq.each(function(){
_35(this,_6d);
});
},close:function(jq,_6e){
return jq.each(function(){
_45(this,_6e);
});
},getTab:function(jq,_6f){
return _4c(jq[0],_6f);
},getTabIndex:function(jq,tab){
return _34(jq[0],tab);
},getSelected:function(jq){
return _1f(jq[0]);
},select:function(jq,_70){
return jq.each(function(){
_3a(this,_70);
});
},exists:function(jq,_71){
return _4b(jq[0],_71);
},update:function(jq,_72){
return jq.each(function(){
_3b(this,_72);
});
},enableTab:function(jq,_73){
return jq.each(function(){
$(this).tabs("getTab",_73).panel("options").tab.removeClass("tabs-disabled");
});
},disableTab:function(jq,_74){
return jq.each(function(){
$(this).tabs("getTab",_74).panel("options").tab.addClass("tabs-disabled");
});
},scrollBy:function(jq,_75){
return jq.each(function(){
var _76=$(this).tabs("options");
var _77=$(this).find(">div.tabs-header>div.tabs-wrap");
var pos=Math.min(_77._scrollLeft()+_75,_78());
_77.animate({scrollLeft:pos},_76.scrollDuration);
function _78(){
var w=0;
var ul=_77.children("ul");
ul.children("li").each(function(){
w+=$(this).outerWidth(true);
});
return w-_77.width()+(ul.outerWidth()-ul.width());
};
});
}};
$.fn.tabs.parseOptions=function(_79){
return $.extend({},$.parser.parseOptions(_79,["width","height","tools","toolPosition","tabPosition",{fit:"boolean",border:"boolean",plain:"boolean",headerWidth:"number",tabWidth:"number",tabHeight:"number"}]));
};
$.fn.tabs.defaults={width:"auto",height:"auto",headerWidth:150,tabWidth:"auto",tabHeight:27,plain:false,fit:false,border:true,tools:null,toolPosition:"right",tabPosition:"top",scrollIncrement:100,scrollDuration:400,onLoad:function(_7a){
},onSelect:function(_7b,_7c){
},onBeforeClose:function(_7d,_7e){
},onClose:function(_7f,_80){
},onAdd:function(_81,_82){
},onUpdate:function(_83,_84){
},onContextMenu:function(e,_85,_86){
}};
})(jQuery);

