/**
 * validatebox - jQuery EasyUI
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
	
	function init(target){
		var span = $(target).addClass('validatebox-text').wrap('<span class="validatebox"></span>').parent();
		span.append(
			'<span>' +
				'<span class="validatebox-hint">' +
				'</span>' +
			'</span>'
		);
		var tip = $(
				'<div class="validatebox-tip">' +
					'<span class="validatebox-tip-content">' +
					'</span>' +
					'<span class="validatebox-tip-pointer">' +
					'</span>' +
				'</div>'
				).appendTo('body');
		
		return {
			validatebox:span,
			tip:tip
		}
	}
	
	function setSize(target){
		var opts = $.data(target, 'validatebox').options;
		var validatebox = $.data(target, 'validatebox').validatebox;
		var box = validatebox.find('.validatebox-text');
		
		if (isNaN(opts.width)){
			opts.width = box.outerWidth();
		}
		var width = opts.width - (validatebox.outerWidth()-validatebox.width());
		box.width(width);
	}
	
	function bindEvents(target){
		var opts = $.data(target, 'validatebox').options;
		var validatebox = $.data(target, 'validatebox').validatebox;
		var tip = $.data(target, 'validatebox').tip;
		
		var time = null;
		validatebox.find('.validatebox-text')
		.unbind('.validatebox')
		.bind('focus.validatebox', function(e){
			time = setInterval(function(){
				validate(target);
			}, 200);
		}).bind('blur.validatebox', function(e){
			clearInterval(time);
			tip.hide();
		});
		
		validatebox
		.unbind('.validatebox')
		.bind('mousemove.validatebox', function(e){
			if (validatebox.hasClass('validatebox-invalid')){
				showTip(target);
			}
		}).bind('mouseout.validatebox', function(){
			tip.hide();
		});
	}
	
	function showTip(target, msg){
		var hint = $.data(target, 'validatebox').validatebox.find('.validatebox-hint');
		var tip = $.data(target, 'validatebox').tip;
		if (msg){
			tip.find('.validatebox-tip-content').html(msg);
		}
		tip.css({
			display:'block',
			left:hint.offset().left,
			top:hint.offset().top
		})
	}
	
	function validate(target){
		var opts = $.data(target, 'validatebox').options;
		var validatebox = $.data(target, 'validatebox').validatebox;
		var tip = $.data(target, 'validatebox').tip;
		var value = validatebox.find('.validatebox-text').val();
		
		if (opts.required){
			if (value == ''){
				validatebox.addClass('validatebox-invalid');
				showTip(target, opts.missingMessage);
				return false;
			}
		}
		if (opts.validType){
			var result = /([a-zA-Z_]+)(.*)/.exec(opts.validType);
			var rule = opts.rules[result[1]];
			if (rule){
				var param = eval(result[2]);
				if (!rule['validator'](value, param)){
					validatebox.addClass('validatebox-invalid');
					
					var message = rule['message'];
					if (param){
						for(var i=0; i<param.length; i++){
							message = message.replace(new RegExp("\\{" + i + "\\}", "g"), param[i]);
						}
					}
					showTip(target, opts.invalidMessage || message);
					return false;
				}
			}
		}
		
		validatebox.removeClass('validatebox-invalid');
		tip.hide();
		return true;
	}
	
	$.fn.validatebox = function(options){
		if (typeof options == 'string'){
			switch(options){
			case 'validate':
				return this.each(function(){
					validate(this);
				});
			case 'isValid':
				return validate(this[0]);
			}
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'validatebox');
			if (state){
				$.extend(state.options, options);
			} else {
				var r = init(this);
				var t = $(this);
				state = $.data(this, 'validatebox', {
					options: $.extend({}, $.fn.validatebox.defaults, {
						width: (parseInt(t.css('width')) || undefined),
						required: (t.attr('required') ? (t.attr('required') == 'true' || t.attr('required') == true) : undefined),
						validType: (t.attr('validType') || undefined),
						missingMessage: (t.attr('missingMessage') || undefined),
						invalidMessage: (t.attr('invalidMessage') || undefined)
					}, options),
					validatebox: r.validatebox,
					tip: r.tip
				});
			}
			
			setSize(this);
			bindEvents(this);
		});
	};
	
	$.fn.validatebox.defaults = {
		width:'auto',
		required: false,
		validType: null,
		missingMessage: 'This field is required.',
		invalidMessage: null,
		
		rules: {
			email:{
				validator: function(value){
					return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
				},
				message: 'Please enter a valid email address.'
			},
			url: {
				validator: function(value){
					return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
				},
				message: 'Please enter a valid URL.'
			},
			length: {
				validator: function(value, param){
					var len = $.trim(value).length;
					return len >= param[0] && len <= param[1]
				},
				message: 'Please enter a value between {0} and {1}.'
			}
		}
	};
})(jQuery);