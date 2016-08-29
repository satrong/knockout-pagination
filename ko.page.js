/**
 *  Knockout.js 分页插件
 *  author: satrong (http://www.xiaoboy.com)
 *  https://github.com/satrong/knockout-page
 *	静态分页demo：http://www.xiaoboy.com/demos/knockout-page/static.html
 *	Ajax分页demo：http://www.xiaoboy.com/demos/knockout-page/ajax.html
 */

ko && ko.bindingHandlers && (function (ko, undefined) {
	/// 分页bind
	ko.bindingHandlers.page = {
		update : function (element, valueAccessor, allBindings, viewModel, bindingContext) {
			$(element).children().undelegate();
			element.innerHTML = '';
			var config = ko.utils.extend({
					next : '下一页',
					prev : '上一页',
					first : '首页',
					last : '末页',
					className : 'pagination',
					linksCount : 5,
					pagesize : 10,
					showLinks : true
				}, viewModel.pageConfig || {});
			var current = viewModel.currentPage() - 0; // 当前页码
			var pagesize = config.pagesize; // 每页的条数
			var total = viewModel.countItems() - 0; // 总条数
			if (total < 1)
				return;
			var maxPage = Math.ceil(total / pagesize); // 最大的页码
			if (maxPage < 2)
				return;
			var range = centerPosition(maxPage, current, config.linksCount);
			var div = document.createElement('div');
			div.setAttribute('class', config.className);

			var html = '';
			if (config.first && range[0] !== current) {
				html += '<a href="javascript:;" data-n="1">' + config.first + '</a>';
			}
			if (config.prev && current > 1) {
				html += '<a href="javascript:;" data-n="' + (current - 1) + '">' + config.prev + '</a>';
			}
			if (config.showLinks) {
				for (var i = range[0]; i <= range[1]; i++) {
					if (i === current) {
						html += '<span>' + i + '</span>';
					} else {
						html += '<a href="javascript:;" data-n="' + i + '">' + i + '</a>';
					}
				}
			} else {
				html += '<span>' + current + '</span>';
			}
			if (config.next && current !== maxPage) {
				html += '<a href="javascript:;" data-n="' + (current + 1) + '">' + config.next + '</a>';
			}
			if (config.last && range[1] !== current) {
				html += '<a href="javascript:;" data-n="' + maxPage + '">' + config.last + '</a>';
			}

			div.innerHTML = html;
			element.appendChild(div);

			if (div.addEventListener) {
				div.addEventListener("click", action, false);
			} else if (div.attachEvent) {
				div.attachEvent("onclick", action);
			}
			function action(event) {
				var target = event.target || event.srcElement;
				if (target.tagName === 'A') {
					valueAccessor()(target.getAttribute("data-n"));
				}
			}
		}
	};

	/// 取得current的中心位置
	/// @max {Number}
	/// @current {Number}
	/// @showBtns {Number}
	/// return {Array}
	function centerPosition(max, current, showBtns) {
		showBtns = showBtns % 2 === 0 ? showBtns + 1 : showBtns;
		var step = Math.floor(showBtns / 2);
		var pos1 = [current - step, current + step];
		var pos2 = pos1;
		if (pos1[0] < 1) {
			var diff = 1 - pos1[0];
			pos2 = [pos1[0] + diff, pos1[1] + diff];
		}
		if (pos2[1] > max) {
			pos2[1] = max;
		}

		if (pos2[1] - pos2[0] + 1 < showBtns) {
			pos2[0] = max - showBtns + 1;
			if (pos2[0] < 1) {
				pos2[0] = 1;
			}
		}
		return pos2;
	}

	var page = function (self, callback, options) {
		var that = ko.utils.extend(this, self);
		this.pageConfig = options;
		this.currentPage = ko.observable(1);
		this.currentPage.subscribe(function (value) {
			if(value > 0){
				callback.call(that, that.currentPage());
			}
		});
		this.countItems = ko.observable(0);
		this.pagesize = ko.observable();

		/**
		 * 重置分页
		 * @param {Number} pageindex 指定重置到哪页，默认为当前页，即this.currentPage
		 */
		this.pageReset = function(pageindex){
			if(pageindex === undefined) pageindex = this.currentPage();
			this.currentPage(0);
			this.currentPage(pageindex);
			return this;
		}
	}

	/// 外部接口：初始化
	/// @self {Object}
	/// @callback {Function}
	/// @options {Object}
	page.init = function (self, callback, options) {
		if (!(Object.prototype.toString.call(options) === "[object Object]" && options.pagesize)) {
			if (/^\d+$/.test(options.pagesize)) {
				throw "ko.koPage.init：pagesize参数必须为数字";
			} else {
				throw "ko.koPage.init：你还没有设置pagesize参数，";
			}
		}
		options.pagesize = options.pagesize - 0;
		ko.utils.extend(self, new page(self, callback, options));
		page.__this = self;
		callback && callback.call(self, self.currentPage());
		return self;
	}

	/// 外部接口：总条数
	/// @total {Number}
	page.count = function (total) {
		this.__this.countItems(total);
		return this.__this;
	}

	page.version = '1.2';

	ko.koPage = page;
})(ko);
