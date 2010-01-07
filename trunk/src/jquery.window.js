(function($){
	function setSize(target){
		$(target).panel('resize');
	}
	
	function init(target, options){
		var state = $.data(target, 'window');
		var opts;
		if (state){
			opts = $.extend(state.opts, options);
		} else {
			opts = $.extend({}, $.fn.window.defaults, options);
			state = $.data(target, 'window', {});
		}
		if (state.mask) state.mask.remove();
		if (opts.modal == true){
			state.mask = $('<div class="window-mask"></div>').appendTo('body');
			state.mask.css({
				zIndex: $.fn.window.defaults.zIndex++,
				width: getPageArea().width,
				height: getPageArea().height
			});
		}
		var win = $(target).addClass('window-body').panel($.extend({}, opts, {
//			cls: 'window',
//			border: false,
//			collapsible: true,
//			minimizable: true,
//			maximizable: true,
//			closable: true,
//			doSize: false,
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
			}
		}));
		
		if (state.shadow) state.shadow.remove();
		if (opts.shadow == true){
			state.shadow = $('<div class="window-shadow"></div>').insertAfter(win.panel('panel'));
			state.shadow.css({
				zIndex: $.fn.window.defaults.zIndex++,
				display: (win.panel('options').closed == true ? 'none' : 'block')
			});
		}
		win.panel('panel').css('z-index', $.fn.window.defaults.zIndex++);
		
		win.panel('panel').find('>div.panel-header').addClass('window-header');
		state.options = win.panel('options');
		state.opts = opts;
		state.window = win.panel('panel');
		
		if (state.options.left == null){
			state.options.left = ($(window).width() - state.options.width) / 2 + $(document).scrollLeft();
		}
		if (state.options.top == null){
			state.options.top = ($(window).height() - state.options.height) / 2 + $(document).scrollTop();
		}
	}
	
	function setProperties(target){
		var state = $.data(target, 'window');
		
		state.window.draggable({
			handle: '>div.panel-header',
			disabled: state.options.draggable == false,
			onDrag: function(e){
				if (state.shadow){
					state.shadow.css({
						left: e.data.left,
						top: e.data.top
					});
				}
				return false;
			},
			onStopDrag: function(e){
				state.options.left = e.data.left;
				state.options.top = e.data.top;
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
					display:'block',
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
	
	
	$.fn.window = function(options, param){
		if (typeof options == 'string'){
			switch(options){
			case 'options':
				return $.data(this[0], 'window').options;
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
		title: 'New Window',
		zIndex: 9000,
		draggable: true,
		resizable: true,
		cls: 'window',
		border: false,
		collapsible: true,
		minimizable: true,
		maximizable: true,
		closable: true,
		doSize: false
	};
})(jQuery);