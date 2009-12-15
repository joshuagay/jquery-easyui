(function($){
	var target;
	var opts;
	
	function init(elem, options){
		target = elem;
		var state = $.data(target, 'tree');
		if (state){
			opts = $.extend(state.options, options);
			state.options = opts;
		} else {
			opts = $.extend({}, $.fn.tree.defaults, options);
			$.data(target, 'tree', {
				options: opts,
				tree: wrapTree()
			});
			request(target);
		}
	}
	
	/**
	 * wrap the <ul> tag as a tree and then return it.
	 */
	function wrapTree(){
		var tree = $(target);
		tree.addClass('tree');
		
		wrapNode(tree, 0);
		
		function wrapNode(ul, depth){
			$('>li', ul).each(function(){
				var node = $('<div class="tree-node"></div>').prependTo($(this));
				$('>span', this).addClass('tree-title').appendTo(node);
				var subTree = $('>ul', this);
				if (subTree.length){
					$('<span class="tree-folder"></span>').prependTo(node);
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
	
	function expandNode(node){
		var hit = $('>span.tree-hit', node);
		if (hit.length == 0) return;	// is a leaf node
		
		if (hit.hasClass('tree-collapsed')){
			hit.removeClass('tree-collaspsed').addClass('tree-expanded');
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
				request(subul, {id:id});	// request children nodes data
			}
		}
	}
	
	function collapseNode(node){
		var hit = $('>span.tree-hit', node);
		if (hit.length == 0) return;	// is a leaf node
		
		if (hit.hasClass('tree-expanded')){
			hit.removeClass('tree-expanded').addClass('tree-collapsed');
			if (opts.animate){
				$(node).next().slideUp();
			} else {
				$(node).next().css('display','none');
			}
		}
	}
	
	function toggleNode(node){
		var hit = $('>span.tree-hit', node);
		if (hit.length == 0) return;	// is a leaf node
		
		if (hit.hasClass('tree-expanded')){
			collapseNode(node);
		} else {
			expandNode(node);
		}
	}
	
	function bindTreeEvents(){
		var tree = $.data(target, 'tree').tree;
		$('.tree-hit', tree).unbind('.tree');
		$('.tree-hit', tree).bind('click.tree', onClick);
		$('.tree-title', tree).unbind('.tree');
		$('.tree-title', tree).bind('click.tree', onTitleClick);
		
		function onClick(){
			var node = $(this).parent();
			toggleNode(node);
		}
		function onClick1(){
			var hit = $(this);
			if (hit.hasClass('tree-expanded')){
				hit.removeClass('tree-expanded').addClass('tree-collapsed');
				hit.parent().next().slideUp();
			} else {
				hit.removeClass('tree-collapsed').addClass('tree-expanded');
				if (hit.parent().parent().find('>ul').length){
					hit.parent().next().slideDown();
				} else {
					// get the node id
					var nodeId = $.data(hit.parent()[0], 'tree-node').id;
					var ul = $('<ul></ul>').appendTo(hit.parent().parent());
					request(ul, {id:nodeId});
				}
			}
		}
		function onTitleClick(){
			$('.tree-title-selected',tree).removeClass('tree-title-selected');
			$(this).addClass('tree-title-selected');
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
					$('<span class="tree-folder"></span>').addClass(item.iconCls).prependTo(node);
					if (item.state == 'open'){
						$('<span class="tree-hit tree-expanded"></span>').prependTo(node);
					} else {
						$('<span class="tree-hit tree-collapsed"></span>').prependTo(node);
						subul.css('display','none');
					}
					appendNodes(subul, item.children, depth+1);
				} else {
					if (item.state == 'closed'){
						$('<span class="tree-folder"></span>').prependTo(node);
						$('<span class="tree-hit tree-collapsed"></span>').prependTo(node);
					} else {
						$('<span class="tree-file"></span>').prependTo(node);
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
	function request(ul, param){
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
				bindTreeEvents();
			},
			error: function(){
			}
		});
	}
	
	$.fn.tree = function(options){
		if (typeof options == 'string'){
			switch(options){
				case 'reload':
					return this.each(function(){
						$(this).empty();
						request()
					});
			}
		}
		
		var options = options || {};
		return this.each(function(){
			init(this, options);
			
			bindTreeEvents();
		});
	};
	
	$.fn.tree.defaults = {
		url: null,
		async: false,
		animate: false
	};
})(jQuery);