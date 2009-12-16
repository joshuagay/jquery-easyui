/**
 * tree 1.0 - jQuery Plug-in
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2009 stworthy [ stworthy@gmail.com ] 
 */
(function($){
	/**
	 * wrap the <ul> tag as a tree and then return it.
	 */
	function wrapTree(target){
		var tree = $(target);
		tree.addClass('tree');
		
		wrapNode(tree, 0);
		
		function wrapNode(ul, depth){
			$('>li', ul).each(function(){
				var node = $('<div class="tree-node"></div>').prependTo($(this));
				$.data(node[0], 'tree-node', {});
				$('>span', this).addClass('tree-title').appendTo(node);
				var subTree = $('>ul', this);
				if (subTree.length){
					$('<span class="tree-folder tree-folder-open"></span>').prependTo(node);
					$('<span class="tree-hit tree-expanded"></span>').prependTo(node);
					wrapNode(subTree, depth+1);
				} else {
					$('<span class="tree-file"></span>').prependTo(node);
					$('<span class="tree-indent"></span>').prependTo(node);
				}
				for(var i=0; i<depth; i++){
					$('<span class="tree-indent"></span>').prependTo(node);
				}
			});
		}
		return tree;
	}
	
	function expandNode(target, node){
		var opts = $.data(target, 'tree').options;
		
		var hit = $('>span.tree-hit', node);
		if (hit.length == 0) return;	// is a leaf node
		
		if (hit.hasClass('tree-collapsed')){
			hit.removeClass('tree-collaspsed').addClass('tree-expanded');
			hit.next().addClass('tree-folder-open');
			var ul = $(node).next();
			if (ul.length){
				if (opts.animate){
					ul.slideDown();
				} else {
					ul.css('display','block');
				}
			} else {
				var id = $.data($(node)[0], 'tree-node').id;
				var subul = $('<ul></ul>').insertAfter(node);
				request(target, subul, {id:id});	// request children nodes data
			}
		}
	}
	
	function collapseNode(target, node){
		var opts = $.data(target, 'tree').options;
		
		var hit = $('>span.tree-hit', node);
		if (hit.length == 0) return;	// is a leaf node
		
		if (hit.hasClass('tree-expanded')){
			hit.removeClass('tree-expanded').addClass('tree-collapsed');
			hit.next().removeClass('tree-folder-open');
			if (opts.animate){
				$(node).next().slideUp();
			} else {
				$(node).next().css('display','none');
			}
		}
	}
	
	function toggleNode(target, node){
		var hit = $('>span.tree-hit', node);
		if (hit.length == 0) return;	// is a leaf node
		
		if (hit.hasClass('tree-expanded')){
			collapseNode(target, node);
		} else {
			expandNode(target, node);
		}
	}
	
	function setTreeProperties(target){
		var opts = $.data(target, 'tree').options;
		var tree = $.data(target, 'tree').tree;
		
		$('.tree-hit', tree).unbind('.tree');
		$('.tree-hit', tree).bind('click.tree', onClick);
		$('.tree-title', tree).unbind('.tree');
		$('.tree-title', tree).bind('click.tree', onTitleClick);
		
		function onClick(){
			var node = $(this).parent();
			toggleNode(target, node);
		}
		function onTitleClick(){
			$('.tree-title-selected',tree).removeClass('tree-title-selected');
			$(this).addClass('tree-title-selected');
			var node = $(this).parent();
			var s = $.data(node[0], 'tree-node');
			if (opts.onClick){
				opts.onClick.call(node, {
					id:s.id,
					text:$(this).html(),
					attributes:s.attributes
				});
			}
		}
	}
	
	function loadData(ul, data, depth){
		function appendNodes(ul, children, depth){
			for(var i=0; i<children.length; i++){
				var li = $('<li></li>').appendTo(ul);
				var item = children[i];
				
				// the node state has only 'open' or 'closed' attribute
				if (item.state != 'open' && item.state != 'closed'){
					item.state = 'open';
				}
				
				var node = $('<div class="tree-node"></div>').appendTo(li);
				
				// store node attributes
				$.data(node[0], 'tree-node', {
					id: item.id,
					attributes: item.attributes
				});
				
				$('<span class="tree-title"></span>').html(item.text).appendTo(node);
				if (item.children){
					var subul = $('<ul></ul>').appendTo(li);
					if (item.state == 'open'){
						$('<span class="tree-folder tree-folder-open"></span>').addClass(item.iconCls).prependTo(node);
						$('<span class="tree-hit tree-expanded"></span>').prependTo(node);
					} else {
						$('<span class="tree-folder"></span>').addClass(item.iconCls).prependTo(node);
						$('<span class="tree-hit tree-collapsed"></span>').prependTo(node);
						subul.css('display','none');
					}
					appendNodes(subul, item.children, depth+1);
				} else {
					if (item.state == 'closed'){
						$('<span class="tree-folder"></span>').addClass(item.iconCls).prependTo(node);
						$('<span class="tree-hit tree-collapsed"></span>').prependTo(node);
					} else {
						$('<span class="tree-file"></span>').addClass(item.iconCls).prependTo(node);
						$('<span class="tree-indent"></span>').prependTo(node);
					}
				}
				for(var j=0; j<depth; j++){
					$('<span class="tree-indent"></span>').prependTo(node);
				}
			}
		}

		var depth = $(ul).prev().find('>span.tree-indent,>span.tree-hit').length;
		appendNodes(ul, data, depth);
	}
	
	/**
	 * request remote data and then load nodes in the <ul> tag.
	 */
	function request(target, ul, param){
		var opts = $.data(target, 'tree').options;
		if (!opts.url) return;
		
		param = param || {};
		
		var folder = $(ul).prev().find('>span.tree-folder');
		folder.addClass('tree-loading');
		$.ajax({
			type: 'post',
			url: opts.url,
			data: param,
			dataType: 'json',
			success: function(data){
				folder.removeClass('tree-loading');
				loadData(ul, data);
				setTreeProperties(target);
				if (opts.onLoadSuccess){
					opts.onLoadSuccess.apply(this, arguments);
				}
			},
			error: function(){
				folder.removeClass('tree-loading');
				if (opts.onLoadError){
					opts.onLoadError.apply(this, arguments);
				}
			}
		});
	}
	
	$.fn.tree = function(options){
		if (typeof options == 'string'){
			switch(options){
				case 'reload':
					return this.each(function(){
						$(this).empty();
						request(this, this);
					});
			}
		}
		
		var options = options || {};
		return this.each(function(){
			var state = $.data(this, 'tree');
			var opts;
			if (state){
				opts = $.extend(state.options, options);
				state.options = opts;
			} else {
				opts = $.extend({}, $.fn.tree.defaults, options);
				$.data(this, 'tree', {
					options: opts,
					tree: wrapTree(this)
				});
				request(this, this);
			}
			
			if (opts.url){
			}
			setTreeProperties(this);
		});
	};
	
	$.fn.tree.defaults = {
		url: null,
		animate: false,
		
		onClick: function(node){},
		onLoadSuccess: function(){},
		onLoadError: function(){}
	};
})(jQuery);
