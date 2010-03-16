/**
 * numberbox - jQuery EasyUI
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ] 
 * 
 * usage: <input class="easyui-numberbox" min="1" max="100" precision="2">
 * The plugin will make the input can only input number chars
 * Options:
 * 	 min: The minimum allowed value
 *   max: The maximum allowed value
 *   precision: The maximum precision to display after the decimal separator
 */
(function($){
	function fixValue(target){
		var opts = $.data(target, 'numberbox').options;
		var val = parseFloat($(target).val()).toFixed(opts.precision);
		if (isNaN(val)){
			$(target).val('');
			return;
		}
		
		if (opts.min && val < opts.min){
			$(target).val(opts.min.toFixed(opts.precision));
		} else if (opts.max && val > opts.max){
			$(target).val(opts.max.toFixed(opts.precision));
		} else {
			$(target).val(val);
		}
	}
	
	function bindEvents(target){
		$(target).unbind('.numberbox');
		$(target).bind('keypress.numberbox', function(e){
			if (e.which == 45){	//-
				return true;
			} if (e.which == 46) {	//.
				return true;
			}
			else if ((e.which >= 48 && e.which <= 57 && e.ctrlKey == false && e.shiftKey == false) || e.which == 0 || e.which == 8) {
				return true;
			} else if (e.ctrlKey == true && (e.which == 99 || e.which == 118)) {
				return true;
			} else {
				return false;
			}
		}).bind('paste.numberbox', function(){
			if (window.clipboardData) {
				var s = clipboardData.getData('text');
				if (! /\D/.test(s)) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}).bind('dragenter.numberbox', function(){
			return false;
		}).bind('blur.numberbox', function(){
			fixValue(target);
		});
	}
	
	$.fn.numberbox = function(options){
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'numberbox');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'numberbox', {
					options: $.extend({}, $.fn.numberbox.defaults, {
						min: (parseFloat($(this).attr('min')) || undefined),
						max: (parseFloat($(this).attr('max')) || undefined),
						precision: (parseInt($(this).attr('precision')) || undefined)
					}, options)
				});
				$(this).css({imeMode:"disabled"});
			}
			
			bindEvents(this);
		});
	};
	
	$.fn.numberbox.defaults = {
		min: null,
		max: null,
		precision: 0
	};
})(jQuery);