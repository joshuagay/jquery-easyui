/**
 * combobox - jQuery EasyUI
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ] 
 * 
 * Dependencies:
 *   validatebox
 * 
 */
(function($){
	
	function setSize(target, width){
		var opts = $.data(target, 'combobox').options;
		var combo = $.data(target, 'combobox').combobox;
		var content = $.data(target, 'combobox').content;
		
		if (width) opts.width = width;
		
		if (isNaN(opts.width)){
			opts.width = combo.find('input.combobox-text').outerWidth();
		}
		var arrowWidth = combo.find('.combobox-arrow').outerWidth();
		var width = opts.width - arrowWidth - (combo.outerWidth() - combo.width());
		combo.find('input.combobox-text').width(width);
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
		$('<input type="hidden" class="combobox-value"></input>').appendTo(span);
		var input = $('<input type="text" class="combobox-text"></input>').appendTo(span);
		$('<span><span class="combobox-arrow"></span></span>').appendTo(span);
		var content = $('<div class="combobox-content"></div>').appendTo('body');
		
		var name = $(target).attr('name');
		if (name){
			span.find('input.combobox-value').attr('name', name);
			$(target).removeAttr('name').attr('comboboxName', name);
		}
		input.attr('autocomplete', 'off')
		
		
		return {
			combobox: span,
			content: content
		};
	}
	
	function destroy(target){
		$.data(target, 'combobox').content.remove();
		$.data(target, 'combobox').combobox.remove();
		$(target).remove();
	}
	
	function bindEvents(target){
		var opts = $.data(target, 'combobox').options;
		var combo = $.data(target, 'combobox').combobox;
		var content = $.data(target, 'combobox').content;
		var input = combo.find('.combobox-text');
		var arrow = combo.find('.combobox-arrow');
		
		$(document).unbind('.combobox');
		content.unbind('.combobox');
		input.unbind('.combobox');
		arrow.unbind('.combobox');
		
		if (!opts.disabled){
			$(document).bind('mousedown.combobox', function(){
				$('body>div.combobox-content').hide();
			});
			content.bind('mousedown.combobox', function(){
				return false;
			});
			input.bind('focus.combobox',function(){
				show(target, '');
			}).bind('keyup.combobox', function(e){
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
			arrow.bind('click.combobox', function(){
				input.focus();
			}).bind('mouseenter.combobox', function(){
				$(this).addClass('combobox-arrow-hover');
			}).bind('mouseleave.combobox', function(){
				$(this).removeClass('combobox-arrow-hover');
			});
		}
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
				validate(target, true);
				return;
			}
		}
	}
	
	/**
	 * clear the value/text
	 */
	function clear(target){
		var combo = $.data(target, 'combobox').combobox;
		combo.find('input.combobox-value').val('');
		combo.find('input.combobox-text').val('');
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
		if (text == undefined){
			text = value;
		}
		
		combo.find('input.combobox-value').val(value);
		combo.find('input.combobox-text').val(text);
		
		validate(target, true);
		
		if (oldValue != value){
			opts.onChange.call(target, value, oldValue);
		}
	}
	
	function getValue(target){
		var combo = $.data(target, 'combobox').combobox;
		return combo.find('input.combobox-value').val();
	}
	
	function getText(target){
		var combo = $.data(target, 'combobox').combobox;
		return combo.find('input.combobox-text').val();
	}
	
	function transformData(target){
		var opts = $.data(target, 'combobox').options;
		var data = [];
		$('>option', target).each(function(){
			var item = {};
			item[opts.valueField] = $(this).attr('value') || $(this).html();
			item[opts.textField] = $(this).html();
			item['selected'] = $(this).attr('selected');
			data.push(item);
		});
		return data;
	}
	
	/**
	 * load data, the old list items will be removed.
	 */
	function loadData(target, data){
		var opts = $.data(target, 'combobox').options;
		
		$.data(target, 'combobox').data = data;
		var opts = $.data(target, 'combobox').options;
		var content = $.data(target, 'combobox').content;
		
		var selected = null;
		content.empty();	// remove old data
		for(var i=0; i<data.length; i++){
			var item = $('<div class="combobox-item"></div>').appendTo(content);
			item.attr('value', data[i][opts.valueField]);
			item.html(data[i][opts.textField]);
			if (data[i]['selected']){
				selected = data[i];
			}
		}
		if (selected){
			setValue(target, selected);
		}
		
		opts.onLoadSuccess.call(target, data);
		
		$('.combobox-item', content).hover(
			function(){$(this).addClass('combobox-item-hover');},
			function(){$(this).removeClass('combobox-item-hover');}
		).click(function(){
			content.hide();
			select(target, $(this).attr('value'));
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
		
		// if no item matched select the first visible item
		if (content.find('div.combobox-item-selected').length == 0){
			content.find('div.combobox-item:visible:first').addClass('combobox-item-selected');
		}
		
		if ($.fn.window){
			content.css('z-index', $.fn.window.defaults.zIndex++);
		}
		
		content.show();
		
		(function(){
			if (content.is(':visible')){
				var top = combobox.offset().top + combobox.outerHeight(); 
				if (top + content.outerHeight() > $(window).height() + $(document).scrollTop()){
					top = combobox.offset().top - content.outerHeight();
				}
				if (top < $(document).scrollTop()){
					top = combobox.offset().top + combobox.outerHeight(); 
				}
				content.css({
					display:'block',
					left:combobox.offset().left,
					top:top
				});
				setTimeout(arguments.callee, 200);
			}
		})();
	}
	
	function validate(target, doit){
		if ($.fn.validatebox){
			var opts = $.data(target, 'combobox').options;
			var input = $.data(target, 'combobox').combobox.find('input.combobox-text');
			input.validatebox(opts);
			if (doit){
				input.validatebox('validate');
				input.trigger('mouseleave');
			}
		}
	}
	
	function setDisabled(target, disabled){
		var opts = $.data(target, 'combobox').options;
		var combo = $.data(target, 'combobox').combobox;
		if (disabled){
			opts.disabled = true;
			$(target).attr('disabled', true);
			combo.find('.combobox-value').attr('disabled', true);
			combo.find('.combobox-text').attr('disabled', true);
		} else {
			opts.disabled = false;
			$(target).removeAttr('disabled');
			combo.find('.combobox-value').removeAttr('disabled');
			combo.find('.combobox-text').removeAttr('disabled');
		}
	}
	
	$.fn.combobox = function(options, param){
		if (typeof options == 'string'){
			switch(options){
				case 'destroy':
					return this.each(function(){
						destroy(this);
					});
				case 'resize':
					return this.each(function(){
						setSize(this, param);
					});
				case 'select':
					return this.each(function(){
						select(this, param);
					});
				case 'clear':
					return this.each(function(){
						clear(this);
					});
				case 'setValue':
					return this.each(function(){
						setValue(this, param);
					});
				case 'getValue':
					return getValue(this[0]);
				case 'getText':
					return getText(this[0]);
				case 'loadData':
					return this.each(function(){
						loadData(this, param);
					});
				case 'reload':
					return this.each(function(){
						request(this, param);
					});
				case 'disable':
					return this.each(function(){
						setDisabled(this, true);
						bindEvents(this);
					});
				case 'enable':
					return this.each(function(){
						setDisabled(this, false);
						bindEvents(this);
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
				var t = $(this);
				state = $.data(this, 'combobox', {
					options: $.extend({}, $.fn.combobox.defaults, {
						width:(parseInt(t.css('width')) || undefined),
						listWidth: t.attr('listWidth'),
						listHeight: t.attr('listHeight'),
						valueField: t.attr('valueField'),
						textField: t.attr('textField'),
						editable: (t.attr('editable') ? t.attr('editable') == 'true' : undefined),
						disabled: (t.attr('disabled') ? true : undefined),
						url: t.attr('url'),
						required: (t.attr('required') ? (t.attr('required') == 'true' || t.attr('required') == true) : undefined),
						missingMessage: (t.attr('missingMessage') || undefined)
					}, options),
					combobox: r.combobox,
					content: r.content
				});
				t.removeAttr('disabled');
				loadData(this, transformData(this));
			}
			$('input.combobox-text', state.combobox).attr('readonly', !state.options.editable);
			if (state.options.data){
				loadData(this, state.options.data);
			}
			request(this);
			setDisabled(this, state.options.disabled);
			bindEvents(this);
			setSize(this);
			validate(this);
		});
	};
	
	$.fn.combobox.defaults = {
		width: 'auto',
		listWidth: null,
		listHeight: null,
		valueField: 'value',
		textField: 'text',
		editable: true,
		disabled: false,
		url: null,
		data: null,
		
		required: false,
		missingMessage: 'This field is required.',
		
		onLoadSuccess: function(){},
		onLoadError: function(){},
		onSelect: function(record){},
		onChange: function(newValue, oldValue){}
	};
})(jQuery);