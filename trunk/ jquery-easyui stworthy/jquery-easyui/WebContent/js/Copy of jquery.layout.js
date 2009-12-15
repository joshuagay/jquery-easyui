(function($){
	function setSize(container){
		var cc = $(container);
		var north = $('>div[region=north]', cc);
		var south = $('>div[region=south]', cc);
		var east = $('>div[region=east]', cc);
		var west = $('>div[region=west]', cc);
		var center = $('>div[region=center]', cc);
		
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
			
			cpos.top = north.outerHeight();
			cpos.height -= north.outerHeight();
			
			if (north.attr('fit') == 'true'){
				$('>div',north).trigger('_resize', [north.width(),north.height()]);
			}
		}
		if (south){
			if ($.boxModel == true){
				south.width(cc.width() - (south.outerWidth() - south.width()));
			} else {
				south.width(cc.width());
			}
			south.css({
				top:cc.height() - south.outerHeight(),
				left:0
			});
			
			cpos.height -= south.outerHeight();
			
			if (south.attr('fit') == 'true'){
				$('>div',south).trigger('_resize', [south.width(),south.height()]);
			}
		}
		
		if (east){
			east.addClass('layout-panel');
			east.css({
				top:cpos.top,
				left:cc.width() - east.outerWidth(),
				height:($.boxModel==true ? cpos.height-(east.outerHeight() - east.height()) : cpos.height)
			});
			
			cpos.width -= east.outerWidth();
			
			if (east.attr('fit') == 'true'){
				$('>div',east).trigger('_resize', [east.width(),east.height()]);
			}
		}
		if (west){
			west.addClass('layout-panel');
			west.css({
				top:cpos.top,
				left:0,
				height:($.boxModel==true ? cpos.height-(west.outerHeight() - west.height()) : cpos.height)
			});
			cpos.left = west.outerWidth();
			cpos.width -= west.outerWidth();
			
			if (west.attr('fit') == 'true'){
				$('>div',west).trigger('_resize', [west.width(),west.height()]);
			}
		}
		
		center.css({
			top:cpos.top,
			left:cpos.left,
			width:($.boxModel==true ? cpos.width-cpos.deltaWidth : cpos.width),
			height:($.boxModel==true ? cpos.height-cpos.deltaHeight : cpos.height)
					
		});
		
		if (center.attr('fit') == 'true'){
			$('>div',center).trigger('_resize', [center.width(),center.height()]);
		}
	}
	
	function setEastSize1(container){
		var cc = $(container);
		var east = $('>div[region=east]', cc);
		var center = $('>div[region=center]', cc);
		if (east){
			east.css({
				top:parseInt(center.css('top')),
				left:cc.width() - east.outerWidth(),
				height:center.outerHeight()
			});
			if ($.boxModel == true){
				east.height(east.height() - (east.outerHeight() - east.height()));
			}
			center.width(center.outerWidth()-east.outerWidth());
			if ($.boxModel == true){
				center.width(center.width() - (center.outerWidth() - center.width()));
			}
			
			$('>div',east).trigger('resize', [east.width(),east.height()]);
			$('>div',center).trigger('resize', [center.width(),center.height()]);
		}
	}
	
	function init(container){
		$(container).addClass('layout');
		$(container).css({
			margin:0,
			padding:0
		});
		$('<div class="layout-split-proxy-h"></div>').appendTo($(container));
		$('<div class="layout-split-proxy-v"></div>').appendTo($(container));
		
		$('>div[region=center]', container).addClass('layout-panel');
		var north = $('>div[region=north]', container).addClass('layout-panel');
		if (north.attr('split') === 'true'){
			north.addClass('layout-split-north');
			north.resizable({
				handles:'s',
				onStartResize:function(e){
					var proxy = $('>div.layout-split-proxy-v', container);
					proxy.css('display','block');
					proxy.css({
						top:parseInt(north.css('top'))+north.outerHeight()-proxy.height(),
						left:parseInt(north.css('left')),
						width:north.outerWidth()
					});
				},
				onResize:function(e){
					var proxy = $('>div.layout-split-proxy-v', container);
					proxy.css('top', e.pageY - $(container).offset().top - proxy.height()/2);
					return false;
				},
				onStopResize:function(e){
					$('>div.layout-split-proxy-v', container).css('display','none');
					setSize(container);
				}
			});
		}
		if ($.boxModel == true){
			north.height(north.height() - (north.outerHeight() - north.height()));
		}
		
		var south = $('>div[region=south]', container).addClass('layout-panel');
		if(south.attr('split') === 'true'){
			south.addClass('layout-split-south');
			south.resizable({
				handles:'n',
				onStartResize:function(e){
					var proxy = $('>div.layout-split-proxy-v', container);
					proxy.css({
						display:'block',
						top:parseInt(south.css('top')),
						left:parseInt(south.css('left')),
						width:south.outerWidth()
					});
				},
				onResize:function(e){
					var proxy = $('>div.layout-split-proxy-v', container);
					proxy.css('top',e.pageY - $(container).offset().top - proxy.height()/2);
					return false;
				},
				onStopResize:function(e){
					$('>div.layout-split-proxy-v', container).css('display','none');
					setSize(container);
				}
			});
		}
		if ($.boxModel == true){
			south.height(south.height() - (south.outerHeight() - south.height()));
		}
		
		var east = $('>div[region=east]', container).addClass('layout-panel');
		if (east.attr('split') === 'true'){
			east.addClass('layout-split-east');
			east.resizable({
				handles:'w',
				onStartResize:function(e){
					var proxy = $('>div.layout-split-proxy-h', container);
					proxy.css({
						display:'block',
						top:(parseInt(east.css('top')) || 0),
						left:(parseInt(east.css('left')) || 0),
						height:east.outerHeight()
					});
				},
				onResize:function(e){
					var proxy = $('>div.layout-split-proxy-h', container);
					proxy.css('left',e.pageX - $(container).offset().left - proxy.width()/2);
					return false;
				},
				onStopResize:function(e){
					$('>div.layout-split-proxy-h', container).css('display','none');
					setSize(container);
				}
			});
		}
		if ($.boxModel == true){
			east.width(east.width() - (east.outerWidth() - east.width()));
		}
		
		var west = $('>div[region=west]', container).addClass('layout-panel');
		if (west.attr('split') === 'true'){
			west.addClass('layout-split-west');
			west.resizable({
				handles:'e',
				onStartResize:function(e){
					var proxy = $('>div.layout-split-proxy-h', container);
					proxy.css({
						display:'block',
						top:(parseInt(west.css('top')) || 0),
						left:west.outerWidth()-proxy.width(),
						height:west.outerHeight()
					});
				},
				onResize:function(e){
					var proxy = $('>div.layout-split-proxy-h', container);
					proxy.css('left',e.pageX - $(container).offset().left - proxy.width()/2);
					return false;
				},
				onStopResize:function(e){
					$('>div.layout-split-proxy-h', container).css('display','none');
					setSize(container);
				}
			});
		}
		if ($.boxModel == true){
			west.width(west.width() - (west.outerWidth() - west.width()));
		}
		
		$(container).bind('_resize', function(e,width,height){
			$(container).width(width).height(height);
			setSize(container);
			return false;
		});
	}
	
	$.fn.layout = function(){
		return this.each(function(){
			var container = this;
			init(container);
			
			var center = $('>div[region=center]', container);
			setSize(container);
		});
	};
})(jQuery);
