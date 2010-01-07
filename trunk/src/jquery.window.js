/**
 * window - jQuery easyui 1.0.1
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ] 
 * 
 * Dependencies:
 * 	 panel
 *   draggable
 *   resizable
 * 
 */
(function($){
	function setSize(target){
		$(target).panel('resize');
	}
	
	/**
	 * create and initialize window, the window is created based on panel component 
	 */
	function init(target, options){
		var state = $.data(target, 'window');
		var opts;
		if (state){
			opts = $.extend(state.opts, options);
		} else {
			opts = $.extend({}, $.fn.window.defaults, options);
			state = $.data(target, 'window', {});
		}
		
		// create mask
		if (state.mask) state.mask.remove();
		if (opts.modal == true){
			state.mask = $('<div class="window-mask"></div>').appendTo('body');
			state.mask.css({
				zIndex: $.fn.window.defaults.zIndex++,
				width: getPageArea().width,
				height: getPageArea().height
			});
		}
		
		// create window
		var win = $(target).addClass('window-body').panel($.extend({}, opts, {
			border: false,
			doSize: false,
			onClose: function(){
				var state = $.data(target, 'window');
				if (state.shadow) state.shadow.hide();
				if (state.mask) state.mask.hide();
				
				if (opts.onClose) opts.onClose.call(target);
			},
			onOpen: function(){
				var state = $.data(target, 'window');
				if (state.shadow) state.shadow.show();
				if (state.mask) state.mask.show();
				setSize(target);
				
				if (opts.onOpen) opts.onOpen.call(target);
			},
			onResize: function(width, height){
				var state = $.data(target, 'window');
				if (state.shadow){
					state.shadow.css({
						left: state.options.left,
						top: state.options.top,
						width: state.options.width,
						height: state.options.height
					});
				}
				
				if (opts.onResize) opts.onResize.call(target, width, height);
			},
			onMove: function(left, top){
				var state = $.data(target, 'window');
				if (state.shadow){
					state.shadow.css({
						left: state.options.left,
						top: state.options.top
					});
				}
				
				if (opts.onMove) opts.onMove.call(target, left, top);
			},
			onMinimize: function(){
				var state = $.data(target, 'window');
				if (state.shadow) state.shadow.hide();
				if (state.mask) state.mask.hide();
				
				if (opts.onMinimize) opts.onMinimize.call(target);
			},
			onBeforeCollapse: function(){
				if (opts.onBeforeCollapse){
					if (opts.onBeforeCollapse.call(target) == false) return false;
				}
				var state = $.data(target, 'window');
				if (state.shadow) state.shadow.hide();
			},
			onExpand: function(){
				var state = $.data(target, 'window');
				if (state.shadow) state.shadow.show();
				if (opts.onExpand) opts.onExpand.call(target);
			}
		}));
		win.panel('panel').find('>div.panel-header').addClass('window-header');
		
		// create shadow
		if (state.shadow) state.shadow.remove();
		if (opts.shadow == true){
			state.shadow = $('<div class="window-shadow"></div>').insertAfter(win.panel('panel'));
			state.shadow.css({
				zIndex: $.fn.window.defaults.zIndex++,
				display: (win.panel('options').closed == true ? 'none' : 'block')
			});
		}
		win.panel('panel').css('z-index', $.fn.window.defaults.zIndex++);
		
		// save the window state
		state.options = win.panel('options');
		state.opts = opts;
		state.window = win.panel('panel');
		
		// if require center the window
		if (state.options.left == null){
			state.options.left = ($(window).width() - state.options.width) / 2 + $(document).scrollLeft();
		}
		if (state.options.top == null){
			state.options.top = ($(window).height() - state.options.height) / 2 + $(document).scrollTop();
		}
	}
	
	/**
	 * set window drag and resize property
	 */
	function setProperties(target){
		var state = $.data(target, 'window');
		
		state.window.draggable({
			handle: '>div.panel-header>div.panel-title',
			disabled: state.options.draggable == false,
			onStartDrag: function(e){
				if (state.mask) state.mask.css('z-index', $.fn.window.defaults.zIndex++);
				if (state.shadow) state.shadow.css('z-index', $.fn.window.defaults.zIndex++);
				state.window.css('z-index', $.fn.window.defaults.zIndex++);
				
				state.proxy = $('<div class="window-proxy"></div>').insertAfter(state.window);
				state.proxy.css({
					zIndex: $.fn.window.defaults.zIndex++,
					left: e.data.left,
					top: e.data.top,
					width: ($.boxModel==true ? (state.window.outerWidth()-(state.proxy.outerWidth()-state.proxy.width())) : state.window.outerWidth()),
					height: ($.boxModel==true ? (state.window.outerHeight()-(state.proxy.outerHeight()-state.proxy.height())) : state.window.outerHeight())
				});
			},
			onDrag: function(e){
				state.proxy.css({
					left: e.data.left,
					top: e.data.top
				});
				return false;
			},
			onStopDrag: function(e){
				state.options.left = e.data.left;
				state.options.top = e.data.top;
				$(target).window('move');
				state.proxy.remove();
			}
		});
		
		state.window.resizable({
			disabled: state.options.resizable == false,
			onStartResize:function(e){
				state.proxy = $('<div class="window-proxy"></div>').insertAfter(state.window);
				state.proxy.css({
					zIndex: $.fn.window.defaults.zIndex++,
					left: e.data.left,
					top: e.data.top,
					width: ($.boxModel==true ? (e.data.width-(state.proxy.outerWidth()-state.proxy.width())) : e.data.width),
					height: ($.boxModel==true ? (e.data.height-(state.proxy.outerHeight()-state.proxy.height())) : e.data.height)
				});
			},
			onResize: function(e){
				state.proxy.css({
					left: e.data.left,
					top: e.data.top,
					width: ($.boxModel==true ? (e.data.width-(state.proxy.outerWidth()-state.proxy.width())) : e.data.width),
					height: ($.boxModel==true ? (e.data.height-(state.proxy.outerHeight()-state.proxy.height())) : e.data.height)
				});
				return false;
			},
			onStopResize: function(e){
				state.options.left = e.data.left;
				state.options.top = e.data.top;
				state.options.width = e.data.width;
				state.options.height = e.data.height;
				setSize(target);
				state.proxy.remove();
			}
		});
	}
	
	function getPageArea() {
		if (document.compatMode == 'BackCompat') {
			return {
				width: Math.max(document.body.scrollWidth, document.body.clientWidth),
				height: Math.max(document.body.scrollHeight, document.body.clientHeight)
			}
		} else {
			return {
				width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
				height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
			}
		}
	}
	
	// when window resize, reset the width and height of the window's mask
	$(window).resize(function(){
		$('.window-mask').css({
			width: $(window).width(),
			height: $(window).height()
		});
		setTimeout(function(){
			$('.window-mask').css({
				width: getPageArea().width,
				height: getPageArea().height
			});
		}, 50);
	});
	
	$.fn.window = function(options, param){
		if (typeof options == 'string'){
			switch(options){
			case 'options':
				return $.data(this[0], 'window').options;
			case 'window':
				return $.data(this[0], 'window').window;
			case 'open':
				return this.each(function(){
					$(this).panel('open', param);
				});
			case 'close':
				return this.each(function(){
					$(this).panel('close', param);
				});
			case 'refresh':
				return this.each(function(){
					$(this).panel('refresh');
				});
			case 'resize':
				return this.each(function(){
					$(this).panel('resize', param);
				});
			case 'move':
				return this.each(function(){
					$(this).panel('move', param);
				});
			}
		}
		
		options = options || {};
		return this.each(function(){
			init(this, options);
			setProperties(this);
			setSize(this);
		});
	};
	
	$.fn.window.defaults = {
		zIndex: 9000,
		draggable: true,
		resizable: true,
		cls: 'window',
		collapsible: true,
		minimizable: true,
		maximizable: true,
		closable: true,
		shadow: true
	};
})(jQuery);