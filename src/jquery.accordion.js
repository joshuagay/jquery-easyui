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
		if (opts.fit == true){
			var p = cc.parent();
			opts.width = p.width();
			opts.height = p.height();
		}
		
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
		$('>div.accordion-panel>div.accordion-body', container).each(function(){
			var pbody = $(this);
			var panel = $(this).find('>div');
			if ($.boxModel == true){
				pbody.height(height - (pbody.outerHeight() - pbody.height()));
				panel.height(height - (panel.outerHeight() - panel.height()));
			} else {
				pbody.height(height);
				panel.height(height);
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
						.addClass('accordion-arrow-open')
						.parent().addClass('accordion-header-selected');
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
					.addClass('accordion-arrow-open')
					.parent().addClass('accordion-header-selected');
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
			
			$('>div.accordion-panel>div.accordion-header-selected', container).removeClass('accordion-header-selected');
			$(this).addClass('accordion-header-selected');
			setSize(container);
		});
		
		$(container).bind('_resize', function(){
			var opts = $.data(container, 'accordion').options;
			if (opts.fit == true){
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
				opts = $.extend({}, $.fn.accordion.defaults, {
					width: (parseInt($(this).css('width')) || 'auto'),
					height: (parseInt($(this).css('height')) || 'auto'),
					fit: $(this).attr('fit') == 'true'
				}, options);
				$.data(this, 'accordion', {
					options: opts,
					accordion: wrapAccordion(this)
				});
			}
			
			setSize(this);
		});
	};
	
	$.fn.accordion.defaults = {
		width: 'auto',
		height: 'auto',
		fit: false
	};
	
	$(function(){
		$('.accordion-container').accordion();
	});
})(jQuery);