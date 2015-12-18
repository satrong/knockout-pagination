# knockout-page
Knockout.js分页插件

## 示例(Example)
html代码：
```html
<ul data-bind="foreach:list">
	<li><span data-bind="text:id"></span>：<span data-bind="text:name"></span></li>
</ul>
<div data-bind="page:currentPage"></div>
```
js代码：
```js
var data = [
	{id:"1",name:"a"},
	{id:"2",name:"b"},
	{id:"3",name:"c"},
	{id:"4",name:"d"},
	...
];

var Viewmodel = function(){
	this.list = ko.observableArray();
	ko.koPage.init(this,this.GetData,{
		pagesize:5
	});
}

Viewmodel.prototype.GetData = function(pageindex){
	ko.koPage.count(data.length);
	this.list(data.slice((pageindex-1)*5,pageindex*5));
}

ko.applyBindings(new Viewmodel);
```

## 使用方法(Usage)
- `ko.koPage.init(self, callback, config)`: 初始化分页方法，参数(Arguments)介绍如下
  * `self`: Viewmodel；
  * `callback`: 处理数据，传入的参数为当前的页码(`currentPage`)；
  * `config`: 自定义配置
    * `next`: {`String`} 默认值：下一页
    * `prev`: {`String`} 默认值：上一页
    * `first`: {`String`} 默认值：首页
    * `last`: {`String`} 默认值：末页
    * `className`: {`String`} 给分页添加的样式， 默认值：pagination
    * `linksCount`: {`Number`} 显示的页面按钮数据，若值为偶数则会自动加1，默认值：5
    * `pagesize`: {`Number`} 每页显示的条数，必须根据实际情况设定，必须手动设置
    * `showLinks`: {`Boolen`} 是否显示页码按钮，默认值：true
- `ko.koPage.count(total)`: `total`为Number类型，设置总条数的快捷方法，在`callback`中用到，也可以直接使用`this.countItems(total)`
- `page`: 自定义绑定方法，在视图中直接使用`data-bind="page:currentPage"`即可

## 注意事项
- 一个ViewModel中只能使用一个分页
- 在一个页面中有多个分页（多个ViewModel）时不能使用`ko.koPage.count`方法，需要使用`this.countItems`替代
 
## 依赖(Dependencies)
- Knockout

## Demos
- [静态分页demo](http://www.xiaoboy.com/demos/knockout-page/static.html)
- [Ajax分页demo](http://www.xiaoboy.com/demos/knockout-page/ajax.html)
