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
$(_2).addClass("validatebox-text");
};
function _3(_4){
var _5=$.data(_4,"validatebox");
_5.validating=false;
var _6=_5.tip;
if(_6){
_6.remove();
}
$(_4).unbind();
$(_4).remove();
};
function _7(_8){
var _9=$(_8);
var _a=$.data(_8,"validatebox");
_9.unbind(".validatebox").bind("focus.validatebox",function(){
_a.validating=true;
_a.value=undefined;
(function(){
if(_a.validating){
if(_a.value!=_9.val()){
_a.value=_9.val();
_16(_8);
}else{
_10(_8);
}
setTimeout(arguments.callee,200);
}
})();
}).bind("blur.validatebox",function(){
_a.validating=false;
_b(_8);
}).bind("mouseenter.validatebox",function(){
if(_9.hasClass("validatebox-invalid")){
_c(_8);
}
}).bind("mouseleave.validatebox",function(){
if(!_a.validating){
_b(_8);
}
});
};
function _c(_d){
var _e=$.data(_d,"validatebox").message;
var _f=$.data(_d,"validatebox").tip;
if(!_f){
_f=$("<div class=\"validatebox-tip\">"+"<span class=\"validatebox-tip-content\">"+"</span>"+"<span class=\"validatebox-tip-pointer\">"+"</span>"+"</div>").appendTo("body");
$.data(_d,"validatebox").tip=_f;
}
_f.find(".validatebox-tip-content").html(_e);
_10(_d);
};
function _10(_11){
var _12=$.data(_11,"validatebox");
if(!_12){
return;
}
var tip=_12.tip;
if(tip){
var box=$(_11);
var _13=tip.find(".validatebox-tip-pointer");
var _14=tip.find(".validatebox-tip-content");
tip.show();
tip.css("top",box.offset().top-(_14._outerHeight()-box._outerHeight())/2);
if(_12.options.tipPosition=="left"){
tip.css("left",box.offset().left-tip._outerWidth());
tip.addClass("validatebox-tip-left");
}else{
tip.css("left",box.offset().left+box._outerWidth());
tip.removeClass("validatebox-tip-left");
}
_13.css("top",(_14._outerHeight()-_13._outerHeight())/2);
}
};
function _b(_15){
var tip=$.data(_15,"validatebox").tip;
if(tip){
tip.remove();
$.data(_15,"validatebox").tip=null;
}
};
function _16(_17){
var _18=$.data(_17,"validatebox");
var _19=$.data(_17,"validatebox").options;
var tip=$.data(_17,"validatebox").tip;
var box=$(_17);
var _1a=box.val();
function _1b(msg){
$.data(_17,"validatebox").message=msg;
};
if(_19.required){
if(_1a==""){
box.addClass("validatebox-invalid");
_1b(_19.missingMessage);
if(_18.validating){
_c(_17);
}
return false;
}
}
if(_19.validType){
var _1c=/([a-zA-Z_]+)(.*)/.exec(_19.validType);
var _1d=_19.rules[_1c[1]];
if(_1a&&_1d){
var _1e=eval(_1c[2]);
if(!_1d["validator"](_1a,_1e)){
box.addClass("validatebox-invalid");
var _1f=_1d["message"];
if(_1e){
for(var i=0;i<_1e.length;i++){
_1f=_1f.replace(new RegExp("\\{"+i+"\\}","g"),_1e[i]);
}
}
_1b(_19.invalidMessage||_1f);
if(_18.validating){
_c(_17);
}
return false;
}
}
}
box.removeClass("validatebox-invalid");
_b(_17);
return true;
};
$.fn.validatebox=function(_20,_21){
if(typeof _20=="string"){
return $.fn.validatebox.methods[_20](this,_21);
}
_20=_20||{};
return this.each(function(){
var _22=$.data(this,"validatebox");
if(_22){
$.extend(_22.options,_20);
}else{
_1(this);
$.data(this,"validatebox",{options:$.extend({},$.fn.validatebox.defaults,$.fn.validatebox.parseOptions(this),_20)});
}
_7(this);
});
};
$.fn.validatebox.methods={destroy:function(jq){
return jq.each(function(){
_3(this);
});
},validate:function(jq){
return jq.each(function(){
_16(this);
});
},isValid:function(jq){
return _16(jq[0]);
}};
$.fn.validatebox.parseOptions=function(_23){
var t=$(_23);
return $.extend({},$.parser.parseOptions(_23,["validType","missingMessage","invalidMessage","tipPosition"]),{required:(t.attr("required")?true:undefined)});
};
$.fn.validatebox.defaults={required:false,validType:null,missingMessage:"This field is required.",invalidMessage:null,tipPosition:"right",rules:{email:{validator:function(_24){
return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_24);
},message:"Please enter a valid email address."},url:{validator:function(_25){
return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_25);
},message:"Please enter a valid URL."},length:{validator:function(_26,_27){
var len=$.trim(_26).length;
return len>=_27[0]&&len<=_27[1];
},message:"Please enter a value between {0} and {1}."},remote:{validator:function(_28,_29){
var _2a={};
_2a[_29[1]]=_28;
var _2b=$.ajax({url:_29[0],dataType:"json",data:_2a,async:false,cache:false,type:"post"}).responseText;
return _2b=="true";
},message:"Please fix this field."}}};
})(jQuery);

