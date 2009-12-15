/**
 * accordion 1.0 - jQuery Plug-in
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2009 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
	function setSize(container){
		var opts = $.data(container, 'accordion').options;
		var cc = $(container);
		
		if (opts.width > 0){
			cc.width($.boxModel==true ? (opts.width-(cc.outerWidth()-cc.width())) : opts.width);
		}
		if (opts.height > 0){
			cc.height($.boxModel==true ? (opts.height-(cc.outerHeight()-cc.height())) : opts.height);
		}
		
		$('>div.accordion-panel>div.accordion-header', container).each(function(){
			var header = $(this);
			if ($.boxModel == true){
				header.width(cc.width() - (header.outerWidth() - header.width()));
			} else {
				header.width(cc.width());
			}
		});
		
		if (opts.height == 'auto') return;
		
		var h = 0;
		$('>div.accordion-panel>div.accordion-header', container).each(function(){
			h += $(this).outerHeight();
		});
		var height = $(container).height() - h; 
		$('>div.accordion-panel>div.accordion-body>div', container).each(function(){
			var panel = $(this);
			var pp = panel.parent();
			if ($.boxModel == true){
				panel.height(height - (panel.outerHeight() - panel.height()));
				pp.height(height - (pp.outerHeight() - pp.height()));
			} else {
				panel.height(height);
				pp.height(height);
			}
		});
	}
	
	function wrapAccordion(container){
		$(container).addClass('accordion');
		$('>div', container).each(function(){
			var panel = $(
					'<div class="accordion-panel">' +
						'<div class="accordion-header">' +
							'<span></span>' +
							'<div class="accordion-arrow accordion-arrow-close"></div>' +
						'</div>' +
						'<div class="accordion-body"></div>' +
					'</div>'
					).appendTo($(container));
			$('>div.accordion-header span', panel).html($(this).attr('title'));
			if ($(this).attr('selected') == 'true'){
				$('>div.accordion-header div.accordion-arrow', panel)
						.removeClass('accordion-arrow-close')
						.addClass('accordion-arrow-open');
				$('>div.accordion-body', panel).show();
			}
			if ($(this).attr('icon')){
				$('>div.accordion-header', panel)
						.addClass('accordion-header-with-icon')
						.append('<div class="accordion-icon ' + $(this).attr('icon') + '"></div>');
			}
			$(this).appendTo($('.accordion-body', panel));
		});
		
		if ($('>div.accordion-panel>div.accordion-body:visible', container).length == 0){
			$('>div.accordion-panel>div.accordion-header:first>div.accordion-arrow', container)
					.removeClass('accordion-arrow-close')
					.addClass('accordion-arrow-open');
			$('>div.accordion-panel>div.accordion-body:first', container).show();
		}
		
		$('>div.accordion-panel>div.accordion-header', container).click(function(){
			if ($(this).next().is(':visible')) return;
			
			var current = $('>div.accordion-panel>div.accordion-body:visible', container);
			current.slideUp()
					.prev()
					.find('div.accordion-arrow')
					.removeClass('accordion-arrow-open')
					.addClass('accordion-arrow-close');
			
			$(this).next().slideDown()
					.prev()
					.find('div.accordion-arrow')
					.removeClass('accordion-arrow-close')
					.addClass('accordion-arrow-open');
			
		});
		
		$(container).bind('_resize', function(e,width,height){
			if (width>0 && height>0){
				var opts = $.data(container, 'accordion').options;
				opts.width = width;
				opts.height = height;
				setSize(container);
			}
			return false;
		});
		
		return $(container);
	}
	
	$.fn.accordion = function(options){
		options = options || {};
		
		return this.each(function(){
			var state = $.data(this, 'accordion');
			var opts;
			if (state){
				opts = $.extend(state.options, options);
				state.opts = opts;
			} else {
				opts = $.extend({}, $.fn.accordion.defaults, options);
				if (opts.width == 'auto'){
					opts.width = parseInt($(this).css('width')) || 'auto';
				}
				if (opts.height == 'auto'){
					opts.height = parseInt($(this).css('height')) || 'auto';
				}
				$.data(this, 'accordion', {
					options: opts,
					accordion: wrapAccordion(this)
				});
			}
			
			var container = this;
			
			setSize(container);
		});
	};
	
	$.fn.accordion.defaults = {
		width: 'auto',
		height: 'auto'
	};
})(jQuery);