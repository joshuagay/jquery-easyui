/**
 * menubutton - jQuery easyui 1.0.1
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ] 
 * 
 * Dependencies:
 *   linkbutton
 *   menu
 */
(function($){
	
	function init(target){
		var opts = $.data(target, 'menubutton').options;
		var btn = $(target);
		btn.linkbutton($.extend({}, opts, {plain:true}));
		btn.addClass('m-btn');
		if (opts.menu){
			$(opts.menu).menu({
				onShow: function(){
					btn.addClass('m-btn-active');
				},
				onHide: function(){
					btn.removeClass('m-btn-active');
				}
			});
		}
		btn.unbind('.menubutton');
		if (opts.disabled == false && opts.menu){
			btn.bind('click.menubutton', function(){
				showMenu();
				return false;
			});
			var timeout = null;
			btn.bind('mouseenter.menubutton', function(){
				timeout = setTimeout(function(){
					showMenu();
				}, opts.duration);
				return false;
			}).bind('mouseleave.menubutton', function(){
				if (timeout){
					clearTimeout(timeout);
				}
			});
		}
		
		function showMenu(){
			var left = btn.offset().left;
			if (left + $(opts.menu).outerWidth() + 5 > $(window).width()){
				left = $(window).width() - $(opts.menu).outerWidth() - 5;
			}
			
			$('.menu-top').menu('hide');
			$(opts.menu).menu('show', {
				left: left,
				top: btn.offset().top + btn.outerHeight()
			});
			btn.blur();
		}
	}
	
	$.fn.menubutton = function(options){
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'menubutton');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'menubutton', {
					options: $.extend({}, $.fn.menubutton.defaults, options)
				});
				$(this).append('<span class="m-btn-downarrow">&nbsp;</span>');
			}
			
			init(this);
		});
	};
	
	$.fn.menubutton.defaults = {
			disabled: false,
			menu: null,
			duration: 300
	};
})(jQuery);
