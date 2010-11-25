/**
 * jQuery EasyUI 1.2.2
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
function _1(_2){
_2.each(function(){
$(this).remove();
if($.browser.msie){
this.outerHTML="";
}
});
};
function _3(_4,_5){
var _6=$.data(_4,"panel").options;
var _7=$.data(_4,"panel").panel;
var _8=_7.children("div.panel-header");
var _9=_7.children("div.panel-body");
if(_5){
if(_5.width){
_6.width=_5.width;
}
if(_5.height){
_6.height=_5.height;
}
if(_5.left!=null){
_6.left=_5.left;
}
if(_5.top!=null){
_6.top=_5.top;
}
}
if(_6.fit==true){
var p=_7.parent();
_6.width=p.width();
_6.height=p.height();
}
_7.css({left:_6.left,top:_6.top});
if(!isNaN(_6.width)){
if($.boxModel==true){
_7.width(_6.width-(_7.outerWidth()-_7.width()));
}else{
_7.width(_6.width);
}
}else{
_7.width("auto");
}
if($.boxModel==true){
_8.width(_7.width()-(_8.outerWidth()-_8.width()));
_9.width(_7.width()-(_9.outerWidth()-_9.width()));
}else{
_8.width(_7.width());
_9.width(_7.width());
}
if(!isNaN(_6.height)){
if($.boxModel==true){
_7.height(_6.height-(_7.outerHeight()-_7.height()));
_9.height(_7.height()-_8.outerHeight()-(_9.outerHeight()-_9.height()));
}else{
_7.height(_6.height);
_9.height(_7.height()-_8.outerHeight());
}
}else{
_9.height("auto");
}
_7.css("height",null);
_6.onResize.apply(_4,[_6.width,_6.height]);
_7.find(">div.panel-body>div").triggerHandler("_resize");
};
function _a(_b,_c){
var _d=$.data(_b,"panel").options;
var _e=$.data(_b,"panel").panel;
if(_c){
if(_c.left!=null){
_d.left=_c.left;
}
if(_c.top!=null){
_d.top=_c.top;
}
}
_e.css({left:_d.left,top:_d.top});
_d.onMove.apply(_b,[_d.left,_d.top]);
};
function _f(_10){
var _11=$(_10).addClass("panel-body").wrap("<div class=\"panel\"></div>").parent();
_11.bind("_resize",function(){
var _12=$.data(_10,"panel").options;
if(_12.fit==true){
_3(_10);
}
return false;
});
return _11;
};
function _13(_14){
var _15=$.data(_14,"panel").options;
var _16=$.data(_14,"panel").panel;
_1(_16.find(">div.panel-header"));
if(_15.title&&!_15.noheader){
var _17=$("<div class=\"panel-header\"><div class=\"panel-title\">"+_15.title+"</div></div>").prependTo(_16);
if(_15.iconCls){
_17.find(".panel-title").addClass("panel-with-icon");
$("<div class=\"panel-icon\"></div>").addClass(_15.iconCls).appendTo(_17);
}
var _18=$("<div class=\"panel-tool\"></div>").appendTo(_17);
if(_15.closable){
$("<div class=\"panel-tool-close\"></div>").appendTo(_18).bind("click",_19);
}
if(_15.maximizable){
$("<div class=\"panel-tool-max\"></div>").appendTo(_18).bind("click",_1a);
}
if(_15.minimizable){
$("<div class=\"panel-tool-min\"></div>").appendTo(_18).bind("click",_1b);
}
if(_15.collapsible){
$("<div class=\"panel-tool-collapse\"></div>").appendTo(_18).bind("click",_1c);
}
if(_15.tools){
for(var i=_15.tools.length-1;i>=0;i--){
var t=$("<div></div>").addClass(_15.tools[i].iconCls).appendTo(_18);
if(_15.tools[i].handler){
t.bind("click",eval(_15.tools[i].handler));
}
}
}
_18.find("div").hover(function(){
$(this).addClass("panel-tool-over");
},function(){
$(this).removeClass("panel-tool-over");
});
_16.find(">div.panel-body").removeClass("panel-body-noheader");
}else{
_16.find(">div.panel-body").addClass("panel-body-noheader");
}
function _1c(){
if(_15.collapsed==true){
_39(_14,true);
}else{
_29(_14,true);
}
return false;
};
function _1b(){
_44(_14);
return false;
};
function _1a(){
if(_15.maximized==true){
_48(_14);
}else{
_28(_14);
}
return false;
};
function _19(){
_1d(_14);
return false;
};
};
function _1e(_1f){
var _20=$.data(_1f,"panel");
if(_20.options.href&&(!_20.isLoaded||!_20.options.cache)){
_20.isLoaded=false;
var _21=_20.panel.find(">div.panel-body");
_21.html($("<div class=\"panel-loading\"></div>").html(_20.options.loadingMessage));
$.ajax({url:_20.options.href,cache:false,success:function(_22){
_21.html(_22);
if($.parser){
$.parser.parse(_21);
}
_20.options.onLoad.apply(_1f,arguments);
_20.isLoaded=true;
}});
}
};
function _23(_24,_25){
var _26=$.data(_24,"panel").options;
var _27=$.data(_24,"panel").panel;
if(_25!=true){
if(_26.onBeforeOpen.call(_24)==false){
return;
}
}
_27.show();
_26.closed=false;
_26.minimized=false;
_26.onOpen.call(_24);
if(_26.maximized==true){
_26.maximized=false;
_28(_24);
}
if(_26.collapsed==true){
_26.collapsed=false;
_29(_24);
}
if(!_26.collapsed){
_1e(_24);
}
};
function _1d(_2a,_2b){
var _2c=$.data(_2a,"panel").options;
var _2d=$.data(_2a,"panel").panel;
if(_2b!=true){
if(_2c.onBeforeClose.call(_2a)==false){
return;
}
}
_2d.hide();
_2c.closed=true;
_2c.onClose.call(_2a);
};
function _2e(_2f,_30){
var _31=$.data(_2f,"panel").options;
var _32=$.data(_2f,"panel").panel;
if(_30!=true){
if(_31.onBeforeDestroy.call(_2f)==false){
return;
}
}
_1(_32);
_31.onDestroy.call(_2f);
};
function _29(_33,_34){
var _35=$.data(_33,"panel").options;
var _36=$.data(_33,"panel").panel;
var _37=_36.children("div.panel-body");
var _38=_36.children("div.panel-header").find("div.panel-tool-collapse");
if(_35.collapsed==true){
return;
}
_37.stop(true,true);
if(_35.onBeforeCollapse.call(_33)==false){
return;
}
_38.addClass("panel-tool-expand");
if(_34==true){
_37.slideUp("normal",function(){
_35.collapsed=true;
_35.onCollapse.call(_33);
});
}else{
_37.hide();
_35.collapsed=true;
_35.onCollapse.call(_33);
}
};
function _39(_3a,_3b){
var _3c=$.data(_3a,"panel").options;
var _3d=$.data(_3a,"panel").panel;
var _3e=_3d.children("div.panel-body");
var _3f=_3d.children("div.panel-header").find("div.panel-tool-collapse");
if(_3c.collapsed==false){
return;
}
_3e.stop(true,true);
if(_3c.onBeforeExpand.call(_3a)==false){
return;
}
_3f.removeClass("panel-tool-expand");
if(_3b==true){
_3e.slideDown("normal",function(){
_3c.collapsed=false;
_3c.onExpand.call(_3a);
_1e(_3a);
});
}else{
_3e.show();
_3c.collapsed=false;
_3c.onExpand.call(_3a);
_1e(_3a);
}
};
function _28(_40){
var _41=$.data(_40,"panel").options;
var _42=$.data(_40,"panel").panel;
var _43=_42.children("div.panel-header").find("div.panel-tool-max");
if(_41.maximized==true){
return;
}
_43.addClass("panel-tool-restore");
$.data(_40,"panel").original={width:_41.width,height:_41.height,left:_41.left,top:_41.top,fit:_41.fit};
_41.left=0;
_41.top=0;
_41.fit=true;
_3(_40);
_41.minimized=false;
_41.maximized=true;
_41.onMaximize.call(_40);
};
function _44(_45){
var _46=$.data(_45,"panel").options;
var _47=$.data(_45,"panel").panel;
_47.hide();
_46.minimized=true;
_46.maximized=false;
_46.onMinimize.call(_45);
};
function _48(_49){
var _4a=$.data(_49,"panel").options;
var _4b=$.data(_49,"panel").panel;
var _4c=_4b.children("div.panel-header").find("div.panel-tool-max");
if(_4a.maximized==false){
return;
}
_4b.show();
_4c.removeClass("panel-tool-restore");
var _4d=$.data(_49,"panel").original;
_4a.width=_4d.width;
_4a.height=_4d.height;
_4a.left=_4d.left;
_4a.top=_4d.top;
_4a.fit=_4d.fit;
_3(_49);
_4a.minimized=false;
_4a.maximized=false;
_4a.onRestore.call(_49);
};
function _4e(_4f){
var _50=$.data(_4f,"panel").options;
var _51=$.data(_4f,"panel").panel;
if(_50.border==true){
_51.children("div.panel-header").removeClass("panel-header-noborder");
_51.children("div.panel-body").removeClass("panel-body-noborder");
}else{
_51.children("div.panel-header").addClass("panel-header-noborder");
_51.children("div.panel-body").addClass("panel-body-noborder");
}
_51.css(_50.style);
_51.addClass(_50.cls);
_51.children("div.panel-header").addClass(_50.headerCls);
_51.children("div.panel-body").addClass(_50.bodyCls);
};
function _52(_53,_54){
$.data(_53,"panel").options.title=_54;
$(_53).panel("header").find("div.panel-title").html(_54);
};
var TO=false;
var _55=true;
$(window).unbind(".panel").bind("resize.panel",function(){
if(!_55){
return;
}
if(TO!==false){
clearTimeout(TO);
}
TO=setTimeout(function(){
_55=false;
var _56=$("body.layout");
if(_56.length){
_56.layout("resize");
}else{
$("body>div.panel").triggerHandler("_resize");
}
_55=true;
TO=false;
},200);
});
$.fn.panel=function(_57,_58){
if(typeof _57=="string"){
return $.fn.panel.methods[_57](this,_58);
}
_57=_57||{};
return this.each(function(){
var _59=$.data(this,"panel");
var _5a;
if(_59){
_5a=$.extend(_59.options,_57);
}else{
_5a=$.extend({},$.fn.panel.defaults,$.fn.panel.parseOptions(this),_57);
$(this).attr("title","");
_59=$.data(this,"panel",{options:_5a,panel:_f(this),isLoaded:false});
}
if(_5a.content){
$(this).html(_5a.content);
if($.parser){
$.parser.parse(this);
}
}
_13(this);
_4e(this);
if(_5a.doSize==true){
_59.panel.css("display","block");
_3(this);
}
if(_5a.closed==true||_5a.minimized==true){
_59.panel.hide();
}else{
_23(this);
}
});
};
$.fn.panel.methods={options:function(jq){
return $.data(jq[0],"panel").options;
},panel:function(jq){
return $.data(jq[0],"panel").panel;
},header:function(jq){
return $.data(jq[0],"panel").panel.find(">div.panel-header");
},body:function(jq){
return $.data(jq[0],"panel").panel.find(">div.panel-body");
},setTitle:function(jq,_5b){
return jq.each(function(){
_52(this,_5b);
});
},open:function(jq,_5c){
return jq.each(function(){
_23(this,_5c);
});
},close:function(jq,_5d){
return jq.each(function(){
_1d(this,_5d);
});
},destroy:function(jq,_5e){
return jq.each(function(){
_2e(this,_5e);
});
},refresh:function(jq,_5f){
return jq.each(function(){
$.data(this,"panel").isLoaded=false;
if(_5f){
$.data(this,"panel").options.href=_5f;
}
_1e(this);
});
},resize:function(jq,_60){
return jq.each(function(){
_3(this,_60);
});
},move:function(jq,_61){
return jq.each(function(){
_a(this,_61);
});
},maximize:function(jq){
return jq.each(function(){
_28(this);
});
},minimize:function(jq){
return jq.each(function(){
_44(this);
});
},restore:function(jq){
return jq.each(function(){
_48(this);
});
},collapse:function(jq,_62){
return jq.each(function(){
_29(this,_62);
});
},expand:function(jq,_63){
return jq.each(function(){
_39(this,_63);
});
}};
$.fn.panel.parseOptions=function(_64){
var t=$(_64);
return {width:(parseInt(_64.style.width)||undefined),height:(parseInt(_64.style.height)||undefined),left:(parseInt(_64.style.left)||undefined),top:(parseInt(_64.style.top)||undefined),title:(t.attr("title")||undefined),iconCls:(t.attr("iconCls")||t.attr("icon")),cls:t.attr("cls"),headerCls:t.attr("headerCls"),bodyCls:t.attr("bodyCls"),href:t.attr("href"),cache:(t.attr("cache")?t.attr("cache")=="true":undefined),fit:(t.attr("fit")?t.attr("fit")=="true":undefined),border:(t.attr("border")?t.attr("border")=="true":undefined),noheader:(t.attr("noheader")?t.attr("noheader")=="true":undefined),collapsible:(t.attr("collapsible")?t.attr("collapsible")=="true":undefined),minimizable:(t.attr("minimizable")?t.attr("minimizable")=="true":undefined),maximizable:(t.attr("maximizable")?t.attr("maximizable")=="true":undefined),closable:(t.attr("closable")?t.attr("closable")=="true":undefined),collapsed:(t.attr("collapsed")?t.attr("collapsed")=="true":undefined),minimized:(t.attr("minimized")?t.attr("minimized")=="true":undefined),maximized:(t.attr("maximized")?t.attr("maximized")=="true":undefined),closed:(t.attr("closed")?t.attr("closed")=="true":undefined)};
};
$.fn.panel.defaults={title:null,iconCls:null,width:"auto",height:"auto",left:null,top:null,cls:null,headerCls:null,bodyCls:null,style:{},href:null,cache:true,fit:false,border:true,doSize:true,noheader:false,content:null,collapsible:false,minimizable:false,maximizable:false,closable:false,collapsed:false,minimized:false,maximized:false,closed:false,tools:[],href:null,loadingMessage:"Loading...",onLoad:function(){
},onBeforeOpen:function(){
},onOpen:function(){
},onBeforeClose:function(){
},onClose:function(){
},onBeforeDestroy:function(){
},onDestroy:function(){
},onResize:function(_65,_66){
},onMove:function(_67,top){
},onMaximize:function(){
},onRestore:function(){
},onMinimize:function(){
},onBeforeCollapse:function(){
},onBeforeExpand:function(){
},onCollapse:function(){
},onExpand:function(){
}};
})(jQuery);

