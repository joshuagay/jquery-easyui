/**
 * layout 1.0 - jQuery Plug-in
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2009 stworthy [ stworthy@gmail.com ] 
 * 
 * Dependencies:
 * 	resizable
 */
(function($){
	var resizing = false;	// indicate if the region panel is resizing
	
	/**
	 * make the child fit it's parent panel by trigger the _resize event
	 */
	function fitChildSize(panel){
		var body = $('>div.layout-body', panel);
		$('>div', body).trigger('_resize');
	}
	
	/**
	 * set the region panel body size
	 */
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
	}
	
	/**
	 * set layout size
	 */
	function setSize(container){
		var opts = $.data(container, 'layout').options;
		var cc = $(container);
		
		if (opts.fit == true){
			var p = cc.parent();
			cc.width(p.width()).height(p.height());
		}
		
		var center = $('>div.layout-panel-center', cc);
		
		var cpos = {
			top:0,
			left:0,
			width:cc.width(),
			height:cc.height(),
			deltaWidth:center.outerWidth()-center.width(),
			deltaHeight:center.outerHeight()-center.height()
		};
		
		function setNorthSize(panel){
			if ($.boxModel == true){
				panel.width(cc.width() - (panel.outerWidth() - panel.width()));
			} else {
				panel.width(cc.width());
			}
			panel.css({
				top: 0,
				left: 0
			});
			setBodySize(panel);
			cpos.top += panel.outerHeight();
			cpos.height -= panel.outerHeight();
		}
		var expand = $('>div.layout-expand-north:visible', cc);
		var north = $('>div.layout-panel-north:visible', cc);
		if (expand.length){
			setNorthSize(expand);
			setBodySize(north);
		} else {
			setNorthSize(north);
		}
		
		
		function setSouthSize(panel){
			if ($.boxModel == true){
				panel.width(cc.width() - (panel.outerWidth() - panel.width()));
			} else {
				panel.width(cc.width());
			}
			panel.css({
				top: cc.height()-panel.outerHeight(),
				left: 0
			});
			setBodySize(panel);
			cpos.height -= panel.outerHeight();
			
		}
		var expand = $('>div.layout-expand-south:visible', cc);
		var south = $('>div.layout-panel-south:visible', cc);
		if (expand.length){
			setSouthSize(expand);
			setBodySize(south);
		} else {
			setSouthSize(south);
		}
		
		function setEastSize(panel){
			if ($.boxModel == true){
				panel.height(cpos.height - (panel.outerHeight() - panel.height()));
			} else {
				panel.height(cpos.height);
			}
			panel.css({
				top: cpos.top,
				left: cc.width()-panel.outerWidth()
			});
			setBodySize(panel);
			cpos.width -= panel.outerWidth();
		}
		var expand = $('>div.layout-expand-east:visible', cc);
		var east = $('>div.layout-panel-east:visible', cc);
		if (expand.length){
			setEastSize(expand);
			setBodySize(east);
		} else {
			setEastSize(east);
		}
		
		
		function setWestSize(panel){
			if ($.boxModel == true){
				panel.height(cpos.height - (panel.outerHeight() - panel.height()));
			} else {
				panel.height(cpos.height);
			}
			panel.css({
				top: cpos.top,
				left: 0
			});
			setBodySize(panel);
			cpos.left += panel.outerWidth();
			cpos.width -= panel.outerWidth();
		}
		var expand = $('>div.layout-expand-west:visible', cc);
		var west = $('>div.layout-panel-west:visible', cc);
		if (expand.length){
			setWestSize(expand);
			setBodySize(west);
		} else {
			setWestSize(west);
		}
		
		center.css({
			top:cpos.top,
			left:cpos.left,
			width:($.boxModel==true ? cpos.width-cpos.deltaWidth : cpos.width),
			height:($.boxModel==true ? cpos.height-cpos.deltaHeight : cpos.height)
		});
		setBodySize(center);
	}
	
	/**
	 * initialize and wrap the layout
	 */
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
		
		var center = $('>div[region=center]', container)
				.addClass('layout-body')
				.wrap('<div class="layout-panel layout-panel-center"></div>');
		if (center.attr('title')){
			var header = $('<div class="layout-header"><span></span></div>').prependTo(center.parent());
			$('span', header).html(center.attr('title'));
			if (center.attr('icon')){
				header.addClass('layout-header-with-icon');
				$('<div class="layout-icon ' + center.attr('icon') + '"></div>').appendTo(header);
			}
		}
		
		function wrapPanel(dir){
			var pp = $('>div[region='+dir+']', container).addClass('layout-body');
			pp.wrap('<div class="layout-panel layout-panel-'+dir+'"></div>');
			var panel = $('>div.layout-panel-' + dir, container);
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
						resizing = true;
						
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
						resizing = false;
					}
				});
			}
			return panel;
		}
		
		var north = wrapPanel('north');
		var south = wrapPanel('south');
		var east = wrapPanel('east');
		var west = wrapPanel('west');
		
		if ($.boxModel == true){
			north.height(north.height() - (north.outerHeight() - north.height()));
			south.height(south.height() - (south.outerHeight() - south.height()));
			east.width(east.width() - (east.outerWidth() - east.width()));
			west.width(west.width() - (west.outerWidth() - west.width()));
		}
		
		initCollapse(container);

		$(container).bind('_resize', function(){
			var opts = $.data(container, 'layout').options;
			if (opts.fit == true){
				setSize(container);
			}
			return false;
		});
		$(window).resize(function(){
			setSize(container);
		});
	}
	
	/**
	 * initialize collapse event of the layout container
	 */
	function initCollapse(container){
		var cc = $(container);
		var north = $('>div.layout-panel-north', container);
		var south = $('>div.layout-panel-south', container);
		var east = $('>div.layout-panel-east', container);
		var west = $('>div.layout-panel-west', container);
		var center = $('>div.layout-panel-center', container);
		
		
		// set east panel collapse property
		$('>div.layout-header div.layout-button-collapse', east).click(function(){
			var expand = $('>div.layout-expand-east', container);
			expand.css({
				width: ($.boxModel==true ? (23-(expand.outerWidth()-expand.width())) : 23),
				height:($.boxModel==true ? (east.outerHeight()-(expand.outerHeight()-expand.height())) : east.outerHeight())
			});
			center.width(center.width()+east.outerWidth()-expand.outerWidth());
			setBodySize(center);
			
			east.animate({left:cc.width()}, function(){
				east.css('display', 'none');
				expand.css({
					display:'block',
					top:parseInt(east.css('top')),
					left:cc.outerWidth() - expand.outerWidth()
				});
			});
		});
		$('>div.layout-expand-east', container).click(function(){
			east.css({
				display: 'block',
				left: cc.outerWidth()
			});
			setBodySize(east);
			east.animate({left:cc.width()-east.outerWidth()});
		});
		$('>div.layout-expand-east div.layout-button-expand', container).click(function(){
			$(this).parent().css('display','none');
			east.css({
				display: 'block',
				left: cc.outerWidth()
			});
			setBodySize(east);
			east.animate({left:cc.width()-east.outerWidth()}, function(){
				setSize(container);
			});
		});
		
		// set west panel collapse property
		$('>div.layout-header div.layout-button-collapse', west).click(function(){
			var expand = $('>div.layout-expand-west', container);
			expand.css({
				width: ($.boxModel==true ? (23-(expand.outerWidth()-expand.width())) : 23),
				height: ($.boxModel==true ? (west.outerHeight()-(expand.outerHeight()-expand.height())) : west.outerHeight())
			});
			center.width(center.width()+west.outerWidth()-expand.outerWidth());
			center.css('left', expand.outerWidth());
			setBodySize(center);
			west.animate({left:-west.outerWidth()}, function(){
				west.css('display','none');
				expand.css({
					display: 'block',
					top: parseInt(west.css('top')),
					left: 0
				});
			});
		});
		$('>div.layout-expand-west', container).click(function(){
			west.css({
				display:'block',
				left:-west.outerWidth()
			});
			setBodySize(west);
			west.animate({left:0});
		});
		$('>div.layout-expand-west div.layout-button-expand', container).click(function(){
			$(this).parent().css('display','none');
			west.css({
				display:'block',
				left:-west.outerWidth()
			});
			setBodySize(west);
			west.animate({left:0}, function(){
				setSize(container);
			});
		});
		
		// set north panel collapse property
		$('>div.layout-header div.layout-button-collapse', north).click(function(){
			var expand = $('>div.layout-expand-north', container);
			expand.css({
				width: ($.boxModel==true ? (north.outerWidth()-(expand.outerWidth()-expand.width())) : north.outerWidth()),
				height: ($.boxModel==true ? (23-(expand.outerHeight()-expand.height())) : 23)
			});
			var hh = cc.height()
					- $('>div.layout-expand-south:visible', cc).outerHeight()
					- $('>div.layout-panel-south:visible', cc).outerHeight()
					- expand.outerHeight();
			
			center.height(hh).css('top',expand.outerHeight());
			east.height(hh).css('top',expand.outerHeight());
			west.height(hh).css('top',expand.outerHeight());
			var expand1 = $('>div.layout-expand-east:visible', container).css('top',expand.outerHeight());
			var expand2 = $('>div.layout-expand-west:visible', container).css('top',expand.outerHeight());
			if ($.boxModel == true){
				expand1.height(east.outerHeight()-(expand1.outerHeight()-expand1.height()));
				expand2.height(west.outerHeight()-(expand2.outerHeight()-expand2.height()));
			} else {
				expand1.height(east.outerHeight());
				expand2.height(west.outerHeight());
			}
			setBodySize(center);
			setBodySize(east);
			setBodySize(west);
			
			north.animate({top:-north.outerHeight()}, function(){
				north.css('display','none');
				expand.css({
					display: 'block',
					top: 0,
					left: 0
				});
			});
		});
		$('>div.layout-expand-north', container).click(function(){
			north.css({
				display: 'block',
				left: 0
			});
			setBodySize(north);
			north.animate({top:0});
		});
		$('>div.layout-expand-north div.layout-button-expand', container).click(function(){
			$(this).parent().css('display','none');
			north.css({
				display: 'block',
				left: 0
			});
			setBodySize(north);
			north.animate({top:0}, function(){
				setSize(container);
			});
		});
		
		// set south panel collapse property
		$('>div.layout-header div.layout-button-collapse', south).click(function(){
			var expand = $('>div.layout-expand-south', cc);
			expand.css({
				width: ($.boxModel==true ? (south.outerWidth()-(expand.outerWidth()-expand.width())) : south.outerWidth()),
				height: ($.boxModel==true ? (23-(expand.outerHeight()-expand.height())) : 23)
			});
			var hh = cc.height()
					- $('>div.layout-expand-north:visible', cc).outerHeight()
					- $('>div.layout-panel-north:visible', cc).outerHeight()
					- expand.outerHeight();
			center.height(hh);
			east.height(hh);
			west.height(hh);
			var expand1 = $('>div.layout-expand-east:visible', container);
			var expand2 = $('>div.layout-expand-west:visible', container);
			if ($.boxModel == true){
				expand1.height(east.outerHeight()-(expand1.outerHeight()-expand1.height()));
				expand2.height(west.outerHeight()-(expand2.outerHeight()-expand2.height()));
			} else {
				expand1.height(east.outerHeight());
				expand2.height(west.outerHeight());
			}
			
			setBodySize(center);
			setBodySize(east);
			setBodySize(west);
			
			south.animate({top:cc.height()}, function(){
				south.css('display', 'none');
				expand.css({
					display: 'block',
					left: 0,
					top: cc.outerHeight() - expand.outerHeight()
				});
			});
		});
		$('>div.layout-expand-south', container).click(function(){
			south.css({
				display: 'block',
				left: 0,
				top: cc.outerHeight()
			});
			setBodySize(south);
			south.animate({top:cc.height()-south.outerHeight()});
		});
		$('>div.layout-expand-south div.layout-button-expand', container).click(function(){
			$(this).parent().css('display', 'none');
			south.css({
				display: 'block',
				left: 0,
				top: cc.outerHeight()
			});
			setBodySize(south);
			south.animate({top:cc.height()-south.outerHeight()}, function(){
				setSize(container);
			});
		});
		
		center.bind('mouseover','center',collapsePanel);
		north.bind('mouseover','north',collapsePanel);
		south.bind('mouseover','south',collapsePanel);
		east.bind('mouseover','east',collapsePanel);
		west.bind('mouseover','west',collapsePanel);
		
		function collapsePanel(e){
			if (resizing == true) return;
			
			if (e.data != 'east' && $('>div.layout-expand-east',container).is(':visible') && east.is(':visible')){
				east.animate({left:cc.outerWidth()}, function(){
					east.css('display','none');
				});
			}
			if (e.data != 'west' && $('>div.layout-expand-west',container).is(':visible') && west.is(':visible')){
				west.animate({left:-west.outerWidth()}, function(){
					west.css('display','none');
				});
			}
			if (e.data != 'north' && $('>div.layout-expand-north',container).is(':visible') && north.is(':visible')){
				north.animate({top:-north.outerHeight()}, function(){
					north.css('display','none');
				});
			}
			if (e.data != 'south' && $('>div.layout-expand-south',container).is(':visible') && south.is(':visible')){
				south.animate({top:cc.outerHeight()}, function(){
					south.css('display','none');
				});
			}
		}
	}
	
	$.fn.layout = function(){
		return this.each(function(){
			var state = $.data(this, 'layout');
			if (!state){
				var opts = $.extend({}, {
					fit: $(this).attr('fit') == 'true'
				});
				init(this);
				$.data(this, 'layout', {
					inited: true,
					options: opts
				});
			}
			setSize(this);
//			doFit(this);
		});
	};
})(jQuery);
