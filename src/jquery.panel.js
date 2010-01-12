/**
 * panel - jQuery easyui 1.0.1
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
	function setSize(target, param){
		var opts = $.data(target, 'panel').options;
		var panel = $.data(target, 'panel').panel;
		var pheader = panel.find('>div.panel-header');
		var pbody = panel.find('>div.panel-body');
		
		if (param){
			if (param.width) opts.width = param.width;
			if (param.height) opts.height = param.height;
			if (param.left != null) opts.left = param.left;
			if (param.top != null) opts.top = param.top;
		}
		
		if (opts.fit == true){
			var p = panel.parent();
			opts.width = p.width();
			opts.height = p.height();
		}
		panel.css({
			left: opts.left,
			top: opts.top
		});
		panel.css(opts.style);
		panel.addClass(opts.cls);
		
		if (!isNaN(opts.width)){
			if ($.boxModel == true){
				panel.width(opts.width - (panel.outerWidth() - panel.width()));
				pheader.width(panel.width() - (pheader.outerWidth() - pheader.width()));
				pbody.width(panel.width() - (pbody.outerWidth() - pbody.width()));
			} else {
				panel.width(opts.width);
				pheader.width(panel.width());
				pbody.width(panel.width());
			}
		} else {
			panel.width('auto');
			pbody.width('auto');
		}
		if (!isNaN(opts.height)){
//			var height = opts.height - (panel.outerHeight()-panel.height()) - pheader.outerHeight();
//			if ($.boxModel == true){
//				height -= pbody.outerHeight() - pbody.height();
//			}
//			pbody.height(height);
			
			if ($.boxModel == true){
				panel.height(opts.height - (panel.outerHeight() - panel.height()));
				pbody.height(panel.height() - pheader.outerHeight() - (pbody.outerHeight() - pbody.height()));
			} else {
				panel.height(opts.height);
				pbody.height(panel.height() - pheader.outerHeight());
			}
		} else {
			pbody.height('auto');
		}
		panel.css('height', null);
		
		opts.onResize.apply(target, [opts.width, opts.height]);
		
		panel.find('>div.panel-body>div').triggerHandler('_resize');
	}
	
	function movePanel(target, param){
		var opts = $.data(target, 'panel').options;
		var panel = $.data(target, 'panel').panel;
		if (param){
			if (param.left != null) opts.left = param.left;
			if (param.top != null) opts.top = param.top;
		}
		panel.css({
			left: opts.left,
			top: opts.top
		});
		opts.onMove.apply(target, [opts.left, opts.top]);
	}
	
	function wrapPanel(target){
		var panel = $(target).addClass('panel-body').wrap('<div class="panel"></div>').parent();
		panel.bind('_resize', function(){
			var opts = $.data(target, 'panel');
			if (opts.fit == true){
				setSize(target);
			}
			return false;
		});
		return panel;
	}
	
	function addHeader(target){
		var opts = $.data(target, 'panel').options;
		var panel = $.data(target, 'panel').panel;
		panel.find('>div.panel-header').remove();
		if (opts.title){
			var header = $('<div class="panel-header"><div class="panel-title">'+opts.title+'</div></div>').prependTo(panel);
			if (opts.iconCls){
				header.find('.panel-title').addClass('panel-with-icon');
				$('<div class="panel-icon"></div>').addClass(opts.iconCls).appendTo(header);
			}
			var tool = $('<div class="panel-tool"></div>').appendTo(header);
			if (opts.closable){
				$('<div class="panel-tool-close"></div>').appendTo(tool).bind('click', onClose);
			}
			if (opts.maximizable){
				$('<div class="panel-tool-max"></div>').appendTo(tool).bind('click', onMax);
			}
			if (opts.minimizable){
				$('<div class="panel-tool-min"></div>').appendTo(tool).bind('click', onMin);
			}
			if (opts.collapsible){
				$('<div class="panel-tool-collapse"></div>').appendTo(tool).bind('click', onToggle);
			}
			if (opts.tools){
				for(var i=opts.tools.length-1; i>=0; i--){
					var t = $('<div></div>').addClass(opts.tools[i].iconCls).appendTo(tool);
					if (opts.tools[i].handler){
						t.bind('click', eval(opts.tools[i].handler));
					}
				}
			}
			tool.find('div').hover(
				function(){$(this).addClass('panel-tool-over');},
				function(){$(this).removeClass('panel-tool-over');}
			);
			panel.find('>div.panel-body').removeClass('panel-body-noheader');
		} else {
			panel.find('>div.panel-body').addClass('panel-body-noheader');
		}
		
		function onToggle(){
			if ($(this).hasClass('panel-tool-expand')){
				expandPanel(target, true);
			} else {
				collapsePanel(target, true);
			}
			return false;
		}
		
		function onMin(){
			minimizePanel(target);
			return false;
		}
		
		function onMax(){
			if ($(this).hasClass('panel-tool-restore')){
				restorePanel(target);
			} else {
				maximizePanel(target);
			}
			return false;
		}
		
		function onClose(){
			closePanel(target);
			return false;
		}
	}
	
	/**
	 * load content from remote site if the href attribute is defined
	 */
	function loadData(target){
		var state = $.data(target, 'panel');
		if (state.options.href && !state.isLoaded){
			state.isLoaded = false;
			var pbody = state.panel.find('>.panel-body');
			pbody.html($('<div class="panel-loading"></div>').html(state.options.loadingMessage));
			pbody.load(state.options.href, null, function(){
				state.options.onLoad.apply(target, arguments);
				state.isLoaded = true;
			});
		}
	}
	
	function openPanel(target, forceOpen){
		var opts = $.data(target, 'panel').options;
		var panel = $.data(target, 'panel').panel;
		
		if (forceOpen != true){
			if (opts.onBeforeOpen.call(target) == false) return;
		}
		panel.show();
		opts.closed = false;
		opts.onOpen.call(target);
	}
	
	function closePanel(target, forceClose){
		var opts = $.data(target, 'panel').options;
		var panel = $.data(target, 'panel').panel;
		
		if (forceClose != true){
			if (opts.onBeforeClose.call(target) == false) return;
		}
		panel.hide();
		opts.closed = true;
		opts.onClose.call(target);
	}
	
	function destroyPanel(target, forceDestroy){
		var opts = $.data(target, 'panel').options;
		var panel = $.data(target, 'panel').panel;
		
		if (forceDestroy != true){
			if (opts.onBeforeDestroy.call(target) == false) return;
		}
		panel.remove();
		opts.onDestroy.call(target);
	}
	
	function collapsePanel(target, animate){
		var opts = $.data(target, 'panel').options;
		var panel = $.data(target, 'panel').panel;
		if (opts.onBeforeCollapse.call(target) == false) return;
		
		panel.find('>div.panel-header .panel-tool-collapse').addClass('panel-tool-expand');
		if (animate == true){
			panel.find('>div.panel-body').slideUp('normal', function(){
				opts.collapsed = true;
				opts.onCollapse.call(target);
			});
		} else {
			panel.find('>div.panel-body').hide();
			opts.collapsed = true;
			opts.onCollapse.call(target);
		}
	}
	
	function expandPanel(target, animate){
		var opts = $.data(target, 'panel').options;
		var panel = $.data(target, 'panel').panel;
		if (opts.onBeforeExpand.call(target) == false) return;
		
		panel.find('>div.panel-header .panel-tool-collapse').removeClass('panel-tool-expand');
		if (animate == true){
			panel.find('>div.panel-body').slideDown('normal', function(){
				opts.collapsed = false;
				opts.onExpand.call(target);
			});
		} else {
			panel.find('>div.panel-body').show();
			opts.collapsed = false;
			opts.onExpand.call(target);
		}
	}
	
	function maximizePanel(target){
		var opts = $.data(target, 'panel').options;
		var panel = $.data(target, 'panel').panel;
		panel.find('>div.panel-header .panel-tool-max').addClass('panel-tool-restore');
		$.data(target, 'panel').original = {
			width: opts.width,
			height: opts.height,
			left: opts.left,
			top: opts.top,
			fit: opts.fit
		};
		opts.left = 0;
		opts.top = 0;
		opts.fit = true;
		setSize(target);
		opts.minimized = false;
		opts.maximized = true;
		opts.onMaximize.call(target);
	}
	
	function minimizePanel(target){
		var opts = $.data(target, 'panel').options;
		var panel = $.data(target, 'panel').panel;
		panel.hide();
		opts.minimized = true;
		opts.maximized = false;
		opts.onMinimize.call(target);
	}
	
	function restorePanel(target){
		var opts = $.data(target, 'panel').options;
		var panel = $.data(target, 'panel').panel;
		panel.show();
		panel.find('>div.panel-header .panel-tool-max').removeClass('panel-tool-restore');
		var original = $.data(target, 'panel').original;
		opts.width = original.width;
		opts.height = original.height;
		opts.left = original.left;
		opts.top = original.top;
		opts.fit = original.fit;
		setSize(target);
		opts.minimized = false;
		opts.maximized = false;
		opts.onRestore.call(target);
	}
	
	function setBorder(target){
		var opts = $.data(target, 'panel').options;
		var panel = $.data(target, 'panel').panel;
		if (opts.border == true){
			panel.find('>div.panel-header').removeClass('panel-header-noborder');
			panel.find('>div.panel-body').removeClass('panel-body-noborder');
		} else {
			panel.find('>div.panel-header').addClass('panel-header-noborder');
			panel.find('>div.panel-body').addClass('panel-body-noborder');
		}
	}
	
	
	$.fn.panel = function(options, param){
		if (typeof options == 'string'){
			switch(options){
			case 'options':
				return $.data(this[0], 'panel').options;
			case 'panel':
				return $.data(this[0], 'panel').panel;
			case 'header':
				return $.data(this[0], 'panel').panel.find('>div.panel-header');
			case 'body':
				return $.data(this[0], 'panel').panel.find('>div.panel-body');
			case 'open':
				return this.each(function(){
					openPanel(this, param);
				});
			case 'close':
				return this.each(function(){
					closePanel(this, param);
				});
			case 'destroy':
				return this.each(function(){
					destroyPanel(this, param);
				});
			case 'refresh':
				return this.each(function(){
					$.data(this, 'panel').isLoaded = false;
					loadData(this);
				});
			case 'resize':
				return this.each(function(){
					setSize(this, param);
				});
			case 'move':
				return this.each(function(){
					movePanel(this, param);
				});
			}
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'panel');
			var opts;
			if (state){
				opts = $.extend(state.options, options);
			} else {
				var t = $(this);
				opts = $.extend({}, $.fn.panel.defaults, {
					width: (parseInt(t.css('width')) || t.outerWidth()),
					height: (parseInt(t.css('height')) || t.outerHeight()),
					left: (parseInt(t.css('left')) || null),
					top: (parseInt(t.css('top')) || null),
					title: t.attr('title'),
					iconCls: t.attr('icon'),
					href: t.attr('href'),
					fit: t.attr('fit') == 'true',
					border: (t.attr('border') == 'false' ? false : true),
					collapsible: t.attr('collapsible') == 'true',
					minimizable: t.attr('minimizable') == 'true',
					maximizable: t.attr('maximizable') == 'true',
					closable: t.attr('closable') == 'true',
					collapsed: t.attr('collapsed') == 'true',
					minimized: t.attr('minimized') == 'true',
					maximized: t.attr('maximized') == 'true',
					closed: t.attr('closed') == 'true'
				}, options);
				t.attr('title', '');
				state = $.data(this, 'panel', {
					options: opts,
					panel: wrapPanel(this),
					isLoaded: false
				});
			}
			
			addHeader(this);
			setBorder(this);
			loadData(this);
			
			if (opts.closed == true){
				closePanel(this, true);
			} else {
				openPanel(this, true);
				if (opts.doSize == true){
					setSize(this);
				}
				if (opts.maximized == true) maximizePanel(this);
				if (opts.minimized == true) minimizePanel(this);
				if (opts.collapsed == true) collapsePanel(this);
			}
			
//			if (opts.doSize == true) setSize(this);
////			setSize(this);
//			
//			if (opts.maximized == true) maximizePanel(this);
//			if (opts.minimized == true) minimizePanel(this);
//			if (opts.collapsed == true) collapsePanel(this);
//			if (opts.closed == true) closePanel(this);
		});
	};
	
	$.fn.panel.defaults = {
		title: null,
		iconCls: null,
		width: 'auto',
		height: 'auto',
		left: null,
		top: null,
		cls: null,
		style: {},
		fit: false,
		border: true,
		doSize: true,	// true to set size and do layout
		
		collapsible: false,
		minimizable: false,
		maximizable: false,
		closable: false,
		collapsed: false,
		minimized: false,
		maximized: false,
		closed: false,
		
		href: null,
		loadingMessage: 'Loading...',
		onLoad: function(){},
		onBeforeOpen: function(){},
		onOpen: function(){},
		onBeforeClose: function(){},
		onClose: function(){},
		onBeforeDestroy: function(){},
		onDestroy: function(){},
		onResize: function(width,height){},
		onMove: function(left,top){},
		onMaximize: function(){},
		onRestore: function(){},
		onMinimize: function(){},
		onBeforeCollapse: function(){},
		onBeforeExpand: function(){},
		onCollapse: function(){},
		onExpand: function(){}
	};
})(jQuery);
