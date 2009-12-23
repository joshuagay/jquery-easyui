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
		
		var height = panel.height() - panel.find('>.panel-corner-top').outerHeight() - panel.find('>.panel-corner-bottom').outerHeight();
		
		var pbody = panel.find('>div.panel-body');
		if ($.boxModel == true){
			pbody.width(panel.width() - (pbody.outerWidth() - pbody.width()));
			pbody.height(height - (pbody.outerHeight() - pbody.height()));
		} else {
			pbody.width(panel.width());
			pbody.height(height);
		}
	}
	
	function wrapPanel1(target){
		var top = '';
		var bottom = '';
		var radius = 50;
		
		for(var i=0; i<radius; i++){
			var width = Math.round(radius*(1-Math.cos(Math.asin(i/radius))));
			top = '<b style="margin:0 ' + (width+'px') + '"></b>' + top;
			bottom += '<b style="margin:0 ' + (width+'px') + '"></b>';
		}
		$(target).prepend('<b class="panel-corner-top">' + top + '</b>');
		$(target).append('<b class="panel-corner-bottom">' + bottom + '</b>');
	}
	function wrapPanel(target){
		$(target).addClass('panel-body');
		var panel = $(target).addClass('panel').wrap('<div class="panel"></div>').parent();
		panel.prepend('<b class="panel-corner-top"></b>');
		panel.append('<b class="panel-corner-bottom"></b>');
		return panel;
	}
	
	function buildCorner(target){
		var opts = $.data(target, 'panel').options;
		var panel = $.data(target, 'panel').panel;
		
		var pbody = panel.find('>div.panel-body');
		pbody.css('border', opts.border);
		
		if (opts.cornerWidth > 0){
			var top = '';
			var bottom = '';
			for(var i=0; i<opts.cornerWidth; i++){
//				var width = Math.round(Math.sqrt(opts.cornerWidth*opts.cornerWidth-i*i));
				var width = Math.round(opts.cornerWidth*(1-Math.cos(Math.asin(i/opts.cornerWidth))));
				top = '<b style="margin:0 ' + (width+'px') + '"></b>' + top;
				bottom += '<b style="margin:0 ' + (width+'px') + '"></b>';
			}
			panel.find('>.panel-corner-top').html(top);
			panel.find('>.panel-corner-bottom').html(bottom);
			panel.find('>.panel-corner-top b,>.panel-corner-bottom b').css({
				borderLeft: pbody.css('borderLeft'),
				borderRight: pbody.css('borderRight'),
				background: pbody.css('background')
			});
			var firstB = panel.find('>.panel-corner-top b:first');
			var lastB = panel.find('>.panel-corner-bottom b:last');
			panel.find('>.panel-corner-top b:first').css('borderTop', pbody.css('borderTop'));
			panel.find('>.panel-corner-bottom b:last').css('borderBottom', pbody.css('borderBottom'));
			if ($.boxModel == true){
				firstB.css('height', 1-(firstB.outerHeight()-firstB.height()));
				lastB.css('height', 1-(lastB.outerHeight()-lastB.height()));
			}
			
			pbody.css('borderTop', 0);
			pbody.css('borderBottom', 0);
		}
	}
	
	$.fn.panel = function(options){
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'panel');
			if (state){
				
			} else {
				var opts = $.extend({}, $.fn.panel.defaults, {
					width: (parseInt($(this).css('width')) || 'auto'),
					height: (parseInt($(this).css('height')) || 'auto'),
					border: $(this).css('border')
				}, options);
				$.data(this, 'panel', {
					options: opts,
					panel: wrapPanel(this)
				});
			}
			
			buildCorner(this);
			setSize(this);
		});
	};
	
	$.fn.panel.defaults = {
		width: 'auto',
		height: 'auto',
		cornerWidth: 5
	};
})(jQuery);
