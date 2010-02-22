(function($){
	$.parser = {
		parse: function(context){
			if ($.parser.defaults.auto){
				var r;
				r = $('.easyui-linkbutton', context); if (r.length) r.linkbutton();
				r = $('.easyui-accordion', context); if (r.length) r.accordion();
				r = $('.easyui-menu', context); if (r.length) r.menu();
				r = $('.easyui-layout', context); if (r.length) r.layout();
				r = $('.easyui-panel', context); if (r.length) r.panel();
				r = $('.easyui-tabs', context); if (r.length) r.tabs();
				r = $('.easyui-tree', context); if (r.length) r.tree();
				r = $('.easyui-window', context); if (r.length) r.window();
				r = $('.easyui-datagrid', context); if (r.length) r.datagrid();
				r = $('.easyui-combobox', context); if (r.length) r.combobox();
				r = $('.easyui-combotree', context); if (r.length) r.combotree();
			}
		}
	};
	
	$.parser.defaults = {
		auto: true
	};
	
	$(function(){
		$.parser.parse();
	});
})(jQuery);