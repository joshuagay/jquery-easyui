(function($){
	function fitChildSize(panel){
		var body = $('>div.layout-body', panel);
		if (body.attr('fit') == 'true'){
			$('>div', body).trigger('_resize', [body.width(), body.height()]);
		}
	}
	
	function setBodySize(panel){
		var header = $('>div.layout-header', panel);
		var body = $('>div.layout-body', panel);
		
		if ($.boxModel == true){
			header.width(panel.width() - (header.outerWidth() - header.width()));
			body.width(panel.width() - (body.outerWidth() - body.width()));
			body.height(panel.height() - header.outerHeight() - (body.outerHeight() - body.height()));
		} else {
			header.width(panel.width());
			body.width(panel.width());
			body.height(panel.height() - header.outerHeight());
		}
		
		fitChildSize(panel);
//		if (body.attr('fit') == 'true'){
//			$('>div', body).trigger('_resize', [body.width(), body.height()]);
//		}
	}
	function setSize(container){
		var cc = $(container);
		var north = $('>div.layout-panel-north', cc);
		var west = $('>div.layout-panel-west', cc);
		var center = $('>div.layout-panel-center', cc);
		
		
		var cpos = {
			top:0,
			left:0,
			width:cc.width(),
			height:cc.height(),
			deltaWidth:center.outerWidth()-center.width(),
			deltaHeight:center.outerHeight()-center.height()
		};
		
		if (north){
			if ($.boxModel == true){
				north.width(cc.width() - (north.outerWidth() - north.width()));
			} else {
				north.width(cc.width());
			}
			north.css({
				top:0,
				left:0
			});
			setBodySize(north);
			
			cpos.top = north.outerHeight();
			cpos.height -= north.outerHeight();
		}
		
		var south = $('>div.layout-panel-south', cc);
		var expand = $('>div.layout-expand-south', cc);
		if (south){
			if ($.boxModel == true){
				south.width(cc.width() - (south.outerWidth() - south.width()));
				expand.width(cc.width() - (expand.outerWidth() - expand.width()));
			} else {
				south.width(cc.width());
				expand.width(cc.width());
			}
			south.css({
				top:cc.height() - south.outerHeight(),
				left:0
			});
			expand.css({
				top: cc.height() - expand.outerHeight(),
				left: 0
			});
			setBodySize(south);
			
			if (south.is(':visible')){
				cpos.height -= south.outerHeight();
			} else {
				cpos.height -= expand.outerHeight();
			}
		}
		
		var east = $('>div.layout-panel-east', cc);
		var expand = $('>div.layout-expand-east', cc);
		if (east){
			if ($.boxModel == true){
				east.height(cpos.height - (east.outerHeight() - east.height()));
				expand.height(cpos.height - (expand.outerHeight() - expand.height()));
			} else {
				east.height(cpos.height);
				expand.height(cpos.height);
			}
			east.css({
				top:cpos.top,
				left:cc.width() - east.outerWidth()
			});
			expand.css({
				top:cpos.top,
				left:cc.width() - expand.outerWidth()
			});
			setBodySize(east);
			
			if (east.is(':visible')){
				cpos.width -= east.outerWidth();
			} else {
				cpos.width -= expand.outerWidth();
			}
		}
		if (west){
			if ($.boxModel == true){
				west.height(cpos.height - (west.outerHeight() - west.height()));
			} else {
				west.height(cpos.height);
			}
			west.css({
				top:cpos.top,
				left:0
			});
			setBodySize(west);
			
			cpos.left = west.outerWidth();
			cpos.width -= west.outerWidth();
		}
		
		center.css({
			top:cpos.top,
			left:cpos.left,
			width:($.boxModel==true ? cpos.width-cpos.deltaWidth : cpos.width),
			height:($.boxModel==true ? cpos.height-cpos.deltaHeight : cpos.height)
		});
		setBodySize(center);
	}
	
	function init(container){
		var cc = $(container);
		if (cc[0].tagName == 'BODY'){
			$('html').css({
				height: '100%',
				overflow: 'hidden'
			});
			$('body').css({
				height: '100%',
				overflow: 'hidden',
				border: 'none'
			});
		}
		cc.addClass('layout');
		cc.css({
			margin:0,
			padding:0
		});
		$('<div class="layout-split-proxy-h"></div>').appendTo(cc);
		$('<div class="layout-split-proxy-v"></div>').appendTo(cc);
		
		$('<div class="layout-expand-east"><div class="layout-button-expand layout-button-left"></div></div>').appendTo(cc);
		$('<div class="layout-expand-west"><div class="layout-button-expand layout-button-right"></div></div>').appendTo(cc);
		$('<div class="layout-expand-north"><div class="layout-button-expand layout-button-down"></div></div>').appendTo(cc);
		$('<div class="layout-expand-south"><div class="layout-button-expand layout-button-up"></div></div>').appendTo(cc);
		
		$('>div[region=center]', container)
				.addClass('layout-body')
				.wrap('<div class="layout-panel layout-panel-center"></div>');
		
		function wrapPanel(dir){
			var pp = $('>div[region='+dir+']', container).addClass('layout-body');
			pp.wrap('<div class="layout-panel layout-panel-'+dir+'"></div>');
			var panel = $('>div.layout-panel-' + dir, container);
			panel.css({
				visibility:'visible',
				zIndex:1
			});
			if (pp.attr('title')){
				var header = $('<div class="layout-header"><span></span><div class="layout-button-collapse"></div></div>').prependTo(panel);
				$('span', header).html(pp.attr('title'));
				if (pp.attr('icon')){
					header.addClass('layout-header-with-icon');
					$('<div class="layout-icon ' + pp.attr('icon') + '"></div>').appendTo(header);
				}
				var collapse = $('div.layout-button-collapse', header);
				if (dir == 'north'){
					collapse.addClass('layout-button-up');
				} else if (dir == 'south'){
					collapse.addClass('layout-button-down');
				} else if (dir == 'east'){
					collapse.addClass('layout-button-right');
				} else if (dir == 'west'){
					collapse.addClass('layout-button-left');
				}
			}
			panel.css({
				width: pp.css('width'),
				height: pp.css('height')
			});
			pp.css({
				width: null,
				height: null
			});
			if ($.boxModel == true){
				panel.width(panel.width() - (panel.outerWidth() - panel.width()));
				panel.height(panel.height() - (panel.outerHeight() - panel.height()));
			}
			
			if (pp.attr('split') == 'true'){
				panel.addClass('layout-split-' + dir);
				
				var handles = '';
				if (dir == 'north') handles = 's';
				if (dir == 'south') handles = 'n';
				if (dir == 'east') handles = 'w';
				if (dir == 'west') handles = 'e';
				
				panel.resizable({
					handles:handles,
					onStartResize: function(e){
						if (dir == 'north' || dir == 'south'){
							var proxy = $('>div.layout-split-proxy-v', container);
						} else {
							var proxy = $('>div.layout-split-proxy-h', container);
						}
						var top=0,left=0,width=0,height=0;
						var pos = {display: 'block'};
						if (dir == 'north'){
							pos.top = parseInt(panel.css('top')) + panel.outerHeight() - proxy.height();
							pos.left = parseInt(panel.css('left'));
							pos.width = panel.outerWidth();
							pos.height = proxy.height();
						} else if (dir == 'south'){
							pos.top = parseInt(panel.css('top'));
							pos.left = parseInt(panel.css('left'));
							pos.width = panel.outerWidth();
							pos.height = proxy.height();
						} else if (dir == 'east'){
							pos.top = parseInt(panel.css('top')) || 0;
							pos.left = parseInt(panel.css('left')) || 0;
							pos.width = proxy.width();
							pos.height = panel.outerHeight();
						} else if (dir == 'west'){
							pos.top = parseInt(panel.css('top')) || 0;
							pos.left = panel.outerWidth() - proxy.width();
							pos.width = proxy.width();
							pos.height = panel.outerHeight();
						}
						proxy.css(pos);
					},
					onResize: function(e){
						if (dir == 'north' || dir == 'south'){
							var proxy = $('>div.layout-split-proxy-v', container);
							proxy.css('top', e.pageY - $(container).offset().top - proxy.height()/2);
						} else {
							var proxy = $('>div.layout-split-proxy-h', container);
							proxy.css('left', e.pageX - $(container).offset().left - proxy.width()/2);
						}
						return false;
					},
					onStopResize: function(){
						$('>div.layout-split-proxy-v', container).css('display','none');
						$('>div.layout-split-proxy-h', container).css('display','none');
						setSize(container);
					}
				});
			}
			return panel;
		}
		
		var north = wrapPanel('north');
		var south = wrapPanel('south');
		var east = wrapPanel('east');
		var west = wrapPanel('west');
		var center = $('>div.layout-panel-center', container);
		
		if ($.boxModel == true){
			north.height(north.height() - (north.outerHeight() - north.height()));
			south.height(south.height() - (south.outerHeight() - south.height()));
			east.width(east.width() - (east.outerWidth() - east.width()));
			west.width(west.width() - (west.outerWidth() - west.width()));
		}
		
		initCollapse(container);

//		$('>div.layout-header div.layout-button-collapse', east).click(function(){
//			center.width(center.width()+east.outerWidth()-$('>div.layout-expand-east', container).outerWidth());
//			setBodySize(center);
//			fitChildSize(center);
//			
//			east.animate({left:cc.width()}, function(){
//				east.css('display', 'none');
//				var collapsed = $('>div.layout-expand-east', container);
//				collapsed.css({
//					display:'block',
//					left:cc.outerWidth() - collapsed.outerWidth(),
//					top:parseInt(east.css('top')),
//					height:($.boxModel==true ? (east.outerHeight()-(collapsed.outerHeight()-collapsed.height())) : east.outerHeight())
//				});
////				setSize(container);
//			});
//		});
//		$('>div.layout-expand-east div.layout-button-expand', container).click(function(){
//			$('>div.layout-expand-east', container).css('display','none');
//			east.css('display','block');
//			east.animate({left:cc.width()-east.outerWidth()}, function(){
//				setSize(container);
//			});
//		});
		
		$(container).bind('_resize', function(e,width,height){
			$(container).width(width).height(height);
			setSize(container);
			return false;
		});
		$(window).resize(function(){
			setSize(container);
		});
	}
	
	function initCollapse(container){
		var cc = $(container);
		var north = $('>div.layout-panel-north', container);
		var south = $('>div.layout-panel-south', container);
		var east = $('>div.layout-panel-east', container);
		var west = $('>div.layout-panel-west', container);
		var center = $('>div.layout-panel-center', container);
		
		// set east panel collapse property
		$('>div.layout-header div.layout-button-collapse', east).click(function(){
			center.width(center.width()+east.outerWidth()-$('>div.layout-expand-east', container).outerWidth());
			setBodySize(center);
			fitChildSize(center);
			
			east.animate({left:cc.width()}, function(){
				east.css('display', 'none');
				var collapsed = $('>div.layout-expand-east', container);
				collapsed.css({
					display:'block',
					left:cc.outerWidth() - collapsed.outerWidth(),
					top:parseInt(east.css('top')),
					height:($.boxModel==true ? (east.outerHeight()-(collapsed.outerHeight()-collapsed.height())) : east.outerHeight())
				});
			});
		});
		$('>div.layout-expand-east div.layout-button-expand', container).click(function(){
			$('>div.layout-expand-east', container).css('display','none');
			east.css('display','block').css('left', cc.outerWidth());
			setBodySize(east);
			east.animate({left:cc.width()-east.outerWidth()}, function(){
				setSize(container);
			});
		});
		
		$('>div.layout-header div.layout-button-collapse', south).click(function(){
			var expand = $('>div.layout-expand-south', cc);
			center.height(center.height()+south.outerHeight()-expand.outerHeight());
			east.height(east.height()+south.outerHeight()-expand.outerHeight());
			west.height(west.height()+south.outerHeight()-expand.outerHeight());
			setBodySize(center);
			setBodySize(east);
			setBodySize(west);
			fitChildSize(center);
			fitChildSize(east);
			fitChildSize(west);
			
			south.animate({top:cc.height()}, function(){
				south.css('display', 'none');
				expand.css({
					display: 'block',
					left: 0,
					top: cc.outerHeight() - expand.outerHeight(),
					width: ($.boxModel==true ? (south.outerWidth()-(expand.outerWidth()-expand.width())) : south.outerWidth())
				});
			});
		});
	}
	
	$.fn.layout = function(){
		return this.each(function(){
			var state = $.data(this, 'layout');
			if (!state){
				init(this);
				$.data(this, 'layout', {
					inited: true
				});
			}
			setSize(this);
		});
	};
})(jQuery);
