/**
 * combobox - jQuery easyui
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
	
	function setSize(target){
		var opts = $.data(target, 'combobox').options;
		var combo = $.data(target, 'combobox').combobox;
		var content = $.data(target, 'combobox').content;
		if (!isNaN(opts.width)){
			var arrowWidth = combo.find('.combobox-arrow').outerWidth();
			var width = opts.width - arrowWidth - (combo.outerWidth() - combo.width());
			combo.find('input.combobox-text').width(width);
		}
		if (opts.listWidth){
			content.width(opts.listWidth);
		} else {
			content.width($.boxModel==true ? combo.outerWidth()-(content.outerWidth()-content.width()) : combo.outerWidth());
		}
		if (opts.listHeight){
			content.height(opts.listHeight);
		}
	}
	
	function init(target){
		$(target).hide();
		
		var span = $('<span class="combobox"></span>').insertAfter(target);
		var input = $('<input type="hidden" class="combobox-value"></input>').appendTo(span);
		var input = $('<input type="text" class="combobox-text"></input>').appendTo(span);
		var arrow = $('<span><span class="combobox-arrow"></span></span>').appendTo(span);
		var content = $('<div class="combobox-content"></div>').insertAfter(span);
		
		var name = $(target).attr('name');
		if (name){
			span.attr('name', name);
			$(target).removeAttr('name');
		}
		
		input.attr('autocomplete', 'off').focus(function(){
			show(target, '');
		}).blur(function(){
			setTimeout(function(){
				$.data(target, 'combobox').content.hide();
			}, 300);
		}).keyup(function(e){
			var selected = content.find('div.combobox-item-selected');
			switch(e.keyCode){
				case 38:	// up
					var prev = selected.prev();
					if (prev.length){
						selected.removeClass('combobox-item-selected');
						prev.addClass('combobox-item-selected');
					}
					break;
				case 40:	// down
					var next = selected.next();
					if (next.length){
						selected.removeClass('combobox-item-selected');
						next.addClass('combobox-item-selected');
					}
					break;
				case 13:	// enter
					select(target, selected.attr('value'));
					content.hide();
					break;
				case 27:	// esc
					content.hide();
					break;
				default:
					show(target, $(this).val());
			}
			return false;
		});
		
		arrow.find('.combobox-arrow').click(function(){
			input.focus();
		}).hover(
			function(){$(this).addClass('combobox-arrow-hover');},
			function(){$(this).removeClass('combobox-arrow-hover');}
		);
		
		return {
			combobox: span,
			content: content
		};
	}
	
	/**
	 * select item by value
	 */
	function select(target, value){
		var data = $.data(target, 'combobox').data;
		var opts = $.data(target, 'combobox').options;
		var combo = $.data(target, 'combobox').combobox;
		var content = $.data(target, 'combobox').content;
		content.find('div.combobox-item-selected').removeClass('combobox-item-selected');
		for(var i=0; i<data.length; i++){
			var rec = data[i];
			if (rec[opts.valueField] == value){
				var oldValue = combo.find('input.combobox-value').val();
				combo.find('input.combobox-value').val(rec[opts.valueField]);
				combo.find('input.combobox-text').val(rec[opts.textField]);
				content.find('div.combobox-item[value='+value+']').addClass('combobox-item-selected');
				opts.onSelect.call(target, rec);
				if (oldValue != value){
					opts.onChange.call(target, value, oldValue);
				}
				return;
			}
		}
	}
	
	/**
	 * set item value
	 */
	function setValue(target, param){
		var combo = $.data(target, 'combobox').combobox;
		var opts = $.data(target, 'combobox').options;
		var data = $.data(target, 'combobox').data;
		
		var value,text;
		var oldValue = combo.find('input.combobox-value').val();
		if (typeof param == 'object'){
			value = param[opts.valueField];
			text = param[opts.textField];
		} else {
			value = param;
			for(var i=0; i<data.length; i++){
				if (data[i][opts.valueField] == value){
					text = data[i][opts.textField];
					break;
				}
			}
		}
		combo.find('input.combobox-value').val(value);
		combo.find('input.combobox-text').val(text);
		
		if (oldValue != value){
			opts.onChange.call(target, value, oldValue);
		}
	}
	
	function transformData(target){
		var opts = $.data(target, 'combobox').options;
		var data = [];
		$('option', target).each(function(){
			var item = {};
			item[opts.valueField] = $(this).attr('value') || $(this).html();
			item[opts.textField] = $(this).html();
			data.push(item);
		});
		return data;
	}
	
	/**
	 * load data, the old list items will be removed.
	 */
	function loadData(target, data){
		$.data(target, 'combobox').data = data;
		var opts = $.data(target, 'combobox').options;
		var content = $.data(target, 'combobox').content;
		
		content.empty();	// remove old data
		for(var i=0; i<data.length; i++){
			var item = $('<div class="combobox-item"></div>').appendTo(content);
			item.attr('value', data[i][opts.valueField]);
			item.html(data[i][opts.textField]);
		}
		
		$('.combobox-item', content).hover(
			function(){$(this).addClass('combobox-item-hover');},
			function(){$(this).removeClass('combobox-item-hover');}
		).click(function(){
			select(target, $(this).attr('value'));
			content.hide();
			return false;
		});
	}
	
	/**
	 * request remote data if the url property is setted.
	 */
	function request(target, url){
		var opts = $.data(target, 'combobox').options;
		if (url){
			opts.url = url;
		}
		if (!opts.url) return;

		$.ajax({
			url:opts.url,
			dataType:'json',
			success:function(data){
				loadData(target, data);
				opts.onLoadSuccess.apply(this, arguments);
			},
			error:function(){
				opts.onLoadError.apply(this, arguments);
			}
		})
	}
	
	/**
	 * show list items with special filter.
	 */
	function show(target, filter){
		filter = filter || '';
		var combobox = $.data(target, 'combobox').combobox;
		var content = $.data(target, 'combobox').content;
		
		var currText = combobox.find('input.combobox-text').val();
		content.find('div.combobox-item-selected').removeClass('combobox-item-selected');
		content.find('div.combobox-item').each(function(){
			var item = $(this);
			if (item.text().indexOf(filter) == 0){
				item.show();
				if (item.text() == currText){
					item.addClass('combobox-item-selected');
				}
			} else {
				item.hide();
			}
		});
		
		content.css({
			display:'block',
			left:combobox.offset().left,
			top:combobox.offset().top+combobox.outerHeight()
		});
		
		// if no item matched select the first visible item
		if (content.find('div.combobox-item-selected').length == 0){
			content.find('div.combobox-item:visible:first').addClass('combobox-item-selected');
		}
	}
	
	
	$.fn.combobox = function(options, param){
		if (typeof options == 'string'){
			switch(options){
				case 'select':
					return this.each(function(){
						select(this, param);
					});
				case 'setValue':
					return this.each(function(){
						setValue(this, param);
					});
				case 'reload':
					return this.each(function(){
						request(this, param);
					});
			}
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'combobox');
			if (state){
				$.extend(state.options, options);
			} else {
				var r = init(this);
				state = $.data(this, 'combobox', {
					options: $.extend({}, $.fn.combobox.defaults, {
						valueField: ($(this).attr('valueField') || 'value'),
						textField: ($(this).attr('textField') || 'text'),
						width:(parseInt($(this).css('width')) || 'auto'),
						listWidth: $(this).attr('listWidth'),
						listHeight: $(this).attr('listHeight'),
						editable: ($(this).attr('editable') == 'false' ? false : true),
						url: $(this).attr('url')
					}, options),
					combobox: r.combobox,
					content: r.content
				});
				loadData(this, transformData(this));
			}
			$('input.combobox-text').attr('readonly', !state.options.editable);
			request(this);
			setSize(this);
		});
	};
	
	$.fn.combobox.defaults = {
		width: 'auto',
		listWidth: null,
		listHeight: null,
		valueField: 'value',
		textField: 'text',
		editable: true,
		url: null,
		
		onLoadSuccess: function(){},
		onLoadError: function(){},
		onSelect: function(record){},
		onChange: function(newValue, oldValue){}
	};
})(jQuery);