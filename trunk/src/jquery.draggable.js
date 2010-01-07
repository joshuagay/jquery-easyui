/**
 * draggable - jQuery easyui 1.0.1
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ] 
 */
(function($){
	$.fn.draggable = function(options){
		function drag(e){
			var dragData = e.data;
			var left = dragData.startLeft + e.pageX - dragData.startX;
			var top = dragData.startTop + e.pageY - dragData.startY;
			
			if (e.data.parnet != document.body) {
				if ($.boxModel == true) {
					left += $(e.data.parent).scrollLeft();
					top += $(e.data.parent).scrollTop();
				}
			}
			
			var opts = $.data(e.data.target, 'draggable').options;
			if (opts.axis == 'h') {
				dragData.left = left;
			} else if (opts.axis == 'v') {
				dragData.top = top;
			} else {
				dragData.left = left;
				dragData.top = top;
			}
		}
		
		function applyDrag(e){
			var dragData = e.data;
			$(dragData.target).css({
				left: dragData.left,
				top: dragData.top
			});
		}
		
		function doDown(e){
			$.data(e.data.target, 'draggable').options.onStartDrag.call(e.data.target, e);
			return false;
		}
		
		function doMove(e){
			drag(e);
			if ($.data(e.data.target, 'draggable').options.onDrag.call(e.data.target, e) != false){
				applyDrag(e);
			}
			return false;
		}
		
		function doUp(e){
			drag(e);
			applyDrag(e);
			$(document).unbind('.draggable');
			$.data(e.data.target, 'draggable').options.onStopDrag.call(e.data.target, e);
			return false;
		}
		
		
		return this.each(function(){
			$(this).css('position','absolute');
			
			var opts;
			var state = $.data(this, 'draggable');
			if (state) {
				state.handle.unbind('.draggable');
				opts = $.extend(state.options, options);
			} else {
				opts = $.extend({}, $.fn.draggable.defaults, options || {});
			}
			
			if (opts.disabled == true) {
				$(this).css('cursor', 'default');
				return;
			}
			
			var handle = null;
            if (typeof opts.handle == 'undefined' || opts.handle == null){
                handle = $(this);
            } else {
                handle = (typeof opts.handle == 'string' ? $(opts.handle, this) : handle);
            }
			$.data(this, 'draggable', {
				options: opts,
				handle: handle
			});
			
			// bind mouse event using event namespace draggable
			handle.bind('mousedown.draggable', {target:this}, onMouseDown);
			handle.bind('mousemove.draggable', {target:this}, onMouseMove);
			
			function onMouseDown(e) {
				if (checkArea(e) == false) return;

				var position = $(e.data.target).position();
				var data = {
					startLeft: position.left,
					startTop: position.top,
					left: position.left,
					top: position.top,
					startX: e.pageX,
					startY: e.pageY,
					target: e.data.target,
					parent: $(e.data.target).parent()[0]
				};
				
				$(document).bind('mousedown.draggable', data, doDown);
				$(document).bind('mousemove.draggable', data, doMove);
				$(document).bind('mouseup.draggable', data, doUp);
			}
			
			function onMouseMove(e) {
				if (checkArea(e)){
					$(this).css('cursor', 'move');
				} else {
					$(this).css('cursor', 'default');
				}
			}
			
			// check if the handle can be dragged
			function checkArea(e) {
				var offset = $(handle).offset();
				var width = $(handle).outerWidth();
				var height = $(handle).outerHeight();
				var t = e.pageY - offset.top;
				var r = offset.left + width - e.pageX;
				var b = offset.top + height - e.pageY;
				var l = e.pageX - offset.left;
				
				return Math.min(t,r,b,l) > opts.edge;
			}
			
		});
	};
	
	$.fn.draggable.defaults = {
			handle: null,
			disabled: false,
			edge:0,
			axis:null,	// v or h
			onStartDrag: function(){},
			onDrag: function(){},
			onStopDrag: function(){}
	};
})(jQuery);