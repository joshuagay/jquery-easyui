/**
 * jQuery EasyUI 1.2.5
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2011 stworthy [ stworthy@gmail.com ] 
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
var _f=($.boxModel==true?(_a.outerHeight()-(_b.outerHeight()-_b.height())):_a.outerHeight());
if(_9.plain){
_f-=2;
}
_b.height(_f);
var _10=0;
$("ul.tabs li",_a).each(function(){
_10+=$(this).outerWidth(true);
});
var _11=_a.width()-_b.outerWidth();
if(_10>_11){
_c.show();
_d.show();
_b.css("right",_d.outerWidth());
_e.css({marginLeft:_c.outerWidth(),marginRight:_d.outerWidth()+_b.outerWidth(),left:0,width:_11-_c.outerWidth()-_d.outerWidth()});
}else{
_c.hide();
_d.hide();
_b.css("right",0);
_e.css({marginLeft:0,marginRight:_b.outerWidth(),left:0,width:_11});
_e.scrollLeft(0);
}
};
function _12(_13){
var _14=$.data(_13,"tabs").options;
var _15=$(_13).children("div.tabs-header");
var _16=_15.children("div.tabs-tool");
_16.remove();
if(_14.tools){
_16=$("<div class=\"tabs-tool\"></div>").appendTo(_15);
for(var i=0;i<_14.tools.length;i++){
var _17=$("<a href=\"javascript:void(0);\"></a>").appendTo(_16);
_17[0].onclick=eval(_14.tools[i].handler||function(){
});
_17.linkbutton($.extend({},_14.tools[i],{plain:true}));
}
}
};
function _18(_19){
var _1a=$.data(_19,"tabs").options;
var cc=$(_19);
if(_1a.fit==true){
var p=cc.parent();
_1a.width=p.width();
_1a.height=p.height();
}
cc.width(_1a.width).height(_1a.height);
var _1b=$(_19).children("div.tabs-header");
if($.boxModel==true){
_1b.width(_1a.width-(_1b.outerWidth()-_1b.width()));
}else{
_1b.width(_1a.width);
}
_7(_19);
var _1c=$(_19).children("div.tabs-panels");
var _1d=_1a.height;
if(!isNaN(_1d)){
if($.boxModel==true){
var _1e=_1c.outerHeight()-_1c.height();
_1c.css("height",(_1d-_1b.outerHeight()-_1e)||"auto");
}else{
_1c.css("height",_1d-_1b.outerHeight());
}
}else{
_1c.height("auto");
}
var _1f=_1a.width;
if(!isNaN(_1f)){
if($.boxModel==true){
_1c.width(_1f-(_1c.outerWidth()-_1c.width()));
}else{
_1c.width(_1f);
}
}else{
_1c.width("auto");
}
};
function _20(_21){
var _22=$.data(_21,"tabs").options;
var tab=_23(_21);
if(tab){
var _24=$(_21).children("div.tabs-panels");
var _25=_22.width=="auto"?"auto":_24.width();
var _26=_22.height=="auto"?"auto":_24.height();
tab.panel("resize",{width:_25,height:_26});
}
};
function _27(_28){
var cc=$(_28);
cc.addClass("tabs-container");
cc.wrapInner("<div class=\"tabs-panels\"/>");
$("<div class=\"tabs-header\">"+"<div class=\"tabs-scroller-left\"></div>"+"<div class=\"tabs-scroller-right\"></div>"+"<div class=\"tabs-wrap\">"+"<ul class=\"tabs\"></ul>"+"</div>"+"</div>").prependTo(_28);
var _29=[];
var tp=cc.children("div.tabs-panels");
tp.children("div[selected]").attr("toselect","true");
tp.children("div").each(function(){
var pp=$(this);
_29.push(pp);
_37(_28,pp);
});
cc.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function(){
$(this).addClass("tabs-scroller-over");
},function(){
$(this).removeClass("tabs-scroller-over");
});
cc.bind("_resize",function(e,_2a){
var _2b=$.data(_28,"tabs").options;
if(_2b.fit==true||_2a){
_18(_28);
_20(_28);
}
return false;
});
return _29;
};
function _2c(_2d){
var _2e=$.data(_2d,"tabs").options;
var _2f=$(_2d).children("div.tabs-header");
var _30=$(_2d).children("div.tabs-panels");
if(_2e.plain==true){
_2f.addClass("tabs-header-plain");
}else{
_2f.removeClass("tabs-header-plain");
}
if(_2e.border==true){
_2f.removeClass("tabs-header-noborder");
_30.removeClass("tabs-panels-noborder");
}else{
_2f.addClass("tabs-header-noborder");
_30.addClass("tabs-panels-noborder");
}
$(".tabs-scroller-left",_2f).unbind(".tabs").bind("click.tabs",function(){
var _31=$(".tabs-wrap",_2f);
var pos=_31.scrollLeft()-_2e.scrollIncrement;
_31.animate({scrollLeft:pos},_2e.scrollDuration);
});
$(".tabs-scroller-right",_2f).unbind(".tabs").bind("click.tabs",function(){
var _32=$(".tabs-wrap",_2f);
var pos=Math.min(_32.scrollLeft()+_2e.scrollIncrement,_1(_2d));
_32.animate({scrollLeft:pos},_2e.scrollDuration);
});
var _33=$.data(_2d,"tabs").tabs;
for(var i=0,len=_33.length;i<len;i++){
var _34=_33[i];
var tab=_34.panel("options").tab;
tab.unbind(".tabs").bind("click.tabs",{p:_34},function(e){
_45(_2d,_36(_2d,e.data.p));
}).bind("contextmenu.tabs",{p:_34},function(e){
_2e.onContextMenu.call(_2d,e,e.data.p.panel("options").title);
});
tab.find("a.tabs-close").unbind(".tabs").bind("click.tabs",{p:_34},function(e){
_35(_2d,_36(_2d,e.data.p));
return false;
});
}
};
function _37(_38,pp,_39){
_39=_39||{};
pp.panel($.extend({},_39,{border:false,noheader:true,closed:true,doSize:false,iconCls:(_39.icon?_39.icon:undefined),onLoad:function(){
if(_39.onLoad){
_39.onLoad.call(this,arguments);
}
$.data(_38,"tabs").options.onLoad.call(_38,pp);
}}));
var _3a=pp.panel("options");
var _3b=$(_38).children("div.tabs-header");
var _3c=$("ul.tabs",_3b);
var tab=$("<li></li>").appendTo(_3c);
var _3d=$("<a href=\"javascript:void(0)\" class=\"tabs-inner\"></a>").appendTo(tab);
var _3e=$("<span class=\"tabs-title\"></span>").html(_3a.title).appendTo(_3d);
var _3f=$("<span class=\"tabs-icon\"></span>").appendTo(_3d);
if(_3a.closable){
_3e.addClass("tabs-closable");
$("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
}
if(_3a.iconCls){
_3e.addClass("tabs-with-icon");
_3f.addClass(_3a.iconCls);
}
_3a.tab=tab;
};
function _40(_41,_42){
var _43=$.data(_41,"tabs").options;
var _44=$.data(_41,"tabs").tabs;
var pp=$("<div></div>").appendTo($(_41).children("div.tabs-panels"));
_44.push(pp);
_37(_41,pp,_42);
_43.onAdd.call(_41,_42.title);
_7(_41);
_2c(_41);
_45(_41,_44.length-1);
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
_2c(_47);
$.data(_47,"tabs").options.onUpdate.call(_47,_4b.title);
};
function _35(_4c,_4d){
var _4e=$.data(_4c,"tabs").options;
var _4f=$.data(_4c,"tabs").tabs;
var _50=$.data(_4c,"tabs").selectHis;
if(!_51(_4c,_4d)){
return;
}
var tab=_52(_4c,_4d);
var _53=tab.panel("options").title;
if(_4e.onBeforeClose.call(_4c,_53)==false){
return;
}
var tab=_52(_4c,_4d,true);
tab.panel("options").tab.remove();
tab.panel("destroy");
_4e.onClose.call(_4c,_53);
_7(_4c);
for(var i=0;i<_50.length;i++){
if(_50[i]==_53){
_50.splice(i,1);
i--;
}
}
var _54=_50.pop();
if(_54){
_45(_4c,_54);
}else{
if(_4f.length){
_45(_4c,0);
}
}
};
function _52(_55,_56,_57){
var _58=$.data(_55,"tabs").tabs;
if(typeof _56=="number"){
if(_56<0||_56>=_58.length){
return null;
}else{
var tab=_58[_56];
if(_57){
_58.splice(_56,1);
}
return tab;
}
}
for(var i=0;i<_58.length;i++){
var tab=_58[i];
if(tab.panel("options").title==_56){
if(_57){
_58.splice(i,1);
}
return tab;
}
}
return null;
};
function _36(_59,tab){
var _5a=$.data(_59,"tabs").tabs;
for(var i=0;i<_5a.length;i++){
if(_5a[i][0]==$(tab)[0]){
return i;
}
}
return -1;
};
function _23(_5b){
var _5c=$.data(_5b,"tabs").tabs;
for(var i=0;i<_5c.length;i++){
var tab=_5c[i];
if(tab.panel("options").closed==false){
return tab;
}
}
return null;
};
function _5d(_5e){
var _5f=$.data(_5e,"tabs").tabs;
for(var i=0;i<_5f.length;i++){
if(_5f[i].attr("toselect")=="true"){
_45(_5e,i);
return;
}
}
if(_5f.length){
_45(_5e,0);
}
};
function _45(_60,_61){
var _62=$.data(_60,"tabs").options;
var _63=$.data(_60,"tabs").tabs;
var _64=$.data(_60,"tabs").selectHis;
if(_63.length==0){
return;
}
var _65=_52(_60,_61);
if(!_65){
return;
}
var _66=_23(_60);
if(_66){
_66.panel("close");
_66.panel("options").tab.removeClass("tabs-selected");
}
_65.panel("open");
var _67=_65.panel("options").title;
_64.push(_67);
var tab=_65.panel("options").tab;
tab.addClass("tabs-selected");
var _68=$(_60).find(">div.tabs-header div.tabs-wrap");
var _69=tab.position().left+_68.scrollLeft();
var _6a=_69-_68.scrollLeft();
var _6b=_6a+tab.outerWidth();
if(_6a<0||_6b>_68.innerWidth()){
var pos=Math.min(_69-(_68.width()-tab.width())/2,_1(_60));
_68.animate({scrollLeft:pos},_62.scrollDuration);
}else{
var pos=Math.min(_68.scrollLeft(),_1(_60));
_68.animate({scrollLeft:pos},_62.scrollDuration);
}
_20(_60);
_62.onSelect.call(_60,_67);
};
function _51(_6c,_6d){
return _52(_6c,_6d)!=null;
};
$.fn.tabs=function(_6e,_6f){
if(typeof _6e=="string"){
return $.fn.tabs.methods[_6e](this,_6f);
}
_6e=_6e||{};
return this.each(function(){
var _70=$.data(this,"tabs");
var _71;
if(_70){
_71=$.extend(_70.options,_6e);
_70.options=_71;
}else{
$.data(this,"tabs",{options:$.extend({},$.fn.tabs.defaults,$.fn.tabs.parseOptions(this),_6e),tabs:_27(this),selectHis:[]});
}
_12(this);
_2c(this);
_18(this);
_5d(this);
});
};
$.fn.tabs.methods={options:function(jq){
return $.data(jq[0],"tabs").options;
},tabs:function(jq){
return $.data(jq[0],"tabs").tabs;
},resize:function(jq){
return jq.each(function(){
_18(this);
_20(this);
});
},add:function(jq,_72){
return jq.each(function(){
_40(this,_72);
});
},close:function(jq,_73){
return jq.each(function(){
_35(this,_73);
});
},getTab:function(jq,_74){
return _52(jq[0],_74);
},getTabIndex:function(jq,tab){
return _36(jq[0],tab);
},getSelected:function(jq){
return _23(jq[0]);
},select:function(jq,_75){
return jq.each(function(){
_45(this,_75);
});
},exists:function(jq,_76){
return _51(jq[0],_76);
},update:function(jq,_77){
return jq.each(function(){
_46(this,_77);
});
}};
$.fn.tabs.parseOptions=function(_78){
var t=$(_78);
return {width:(parseInt(_78.style.width)||undefined),height:(parseInt(_78.style.height)||undefined),fit:(t.attr("fit")?t.attr("fit")=="true":undefined),border:(t.attr("border")?t.attr("border")=="true":undefined),plain:(t.attr("plain")?t.attr("plain")=="true":undefined)};
};
$.fn.tabs.defaults={width:"auto",height:"auto",plain:false,fit:false,border:true,tools:null,scrollIncrement:100,scrollDuration:400,onLoad:function(_79){
},onSelect:function(_7a){
},onBeforeClose:function(_7b){
},onClose:function(_7c){
},onAdd:function(_7d){
},onUpdate:function(_7e){
},onContextMenu:function(e,_7f){
}};
})(jQuery);

