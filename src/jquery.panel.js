(function($){
	function setSize(target){
		var opts = $.data(target, 'panel').options;
		var panel = $.data(target, 'panel').panel;
		if (!isNaN(opts.width)){
			if ($.boxModel == true){
				panel.width(opts.width - (panel.outerWidth() - panel.width()));
			} else {
				panel.width(opts.width);
			}
		}
		if (!isNaN(opts.height)){
			if ($.boxModel == true){
				panel.height(opts.height - (panel.outerHeight() - panel.height()));
			} else {
				panel.height(opts.height);
			}
		}
		
		var height = panel.height() - panel.find('>div.panel-header').outerHeight();
		
		var pheader = panel.find('>div.panel-header');
		var pbody = panel.find('>div.panel-body');
		if ($.boxModel == true){
			pheader.width(panel.width() - (pheader.outerWidth() - pheader.width()));
			pbody.width(panel.width() - (pbody.outerWidth() - pbody.width()));
			pbody.height(height - (pbody.outerHeight() - pbody.height()));
		} else {
			pheader.width(panel.width());
			pbody.width(panel.width());
			pbody.height(height);
		}
	}
	
	function wrapPanel(target){
		var panel = $(target).addClass('panel-body').wrap('<div class="panel"></div>').parent();
		return panel;
	}
	
	function addHeader(target){
		var opts = $.data(target, 'panel').options;
		var panel = $.data(target, 'panel').panel;
		panel.find('>div.panel-header').remove();
		if (opts.title){
			var header = $('<div class="panel-header"></div>').prependTo(panel);
			var tool = $('<div class="panel-tool"></div>').appendTo(header);
			$('<span></span>').html(opts.title).appendTo(header);
			if (opts.closable){
				$('<div class="panel-tool-close"></div>').appendTo(tool);
			}
			if (opts.maximizable){
				$('<div class="panel-tool-max"></div>').appendTo(tool);
			}
			if (opts.minimizable){
				$('<div class="panel-tool-min"></div>').appendTo(tool);
			}
			if (opts.collapsible){
				$('<div class="panel-tool-toggle panel-tool-collapse"></div>').appendTo(tool);
			}
			panel.find('>div.panel-body').removeClass('panel-body-noheader');
		} else {
			panel.find('>div.panel-body').addClass('panel-body-noheader');
		}
	}
	
	function bindEvents(target){
		var panel = $.data(target, 'panel').panel;
		$('>div.panel-header .panel-tool-toggle', panel).unbind('.panel', onToggle).bind('click.panel', onToggle);
		
		function onToggle(){
			if ($(this).hasClass('panel-tool-collapse')){
				$(this).removeClass('panel-tool-collapse').addClass('panel-tool-expand');
				panel.find('>div.panel-body').slideUp();
			} else {
				$(this).removeClass('panel-tool-expand').addClass('panel-tool-collapse');
				panel.find('>div.panel-body').slideDown();
			}
		}
	}
	
	
	$.fn.panel = function(options){
		options = options || {};
		return this.each(function(){
			var opts;
			var state = $.data(this, 'panel');
			if (state){
				opts = $.extend(state.options, options);
			} else {
				opts = $.extend({}, $.fn.panel.defaults, {
					width: (parseInt($(this).css('width')) || 'auto'),
					height: (parseInt($(this).css('height')) || 'auto'),
					title: $(this).attr('title'),
					collapsible: $(this).attr('collapsible') == 'true',
					minimizable: $(this).attr('minimizable') == 'true',
					maximizable: $(this).attr('maximizable') == 'true',
					closable: $(this).attr('closable') == 'true'
				}, options);
				$.data(this, 'panel', {
					options: opts,
					panel: wrapPanel(this)
				});
			}
			
			addHeader(this);
			bindEvents(this);
			
			setSize(this);
		});
	};
	
	$.fn.panel.defaults = {
		width: 'auto',
		height: 'auto',
		title: null,
		fit: false,
		collapsible: false,
		minimizable: false,
		maximizable: false,
		closable: false
	};
})(jQuery);
