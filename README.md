# knockout-page
Knockout.js分页插件

## 示例(Example)
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
- `ko.koPage.init(self, callback, config)`:
  * `self`: Viewmodel；
  * `callback`: 处理数据，传入的参数为当前的页码(`currentPage`)；
  * `config`: 自定义配置
    * `next`: {`String`} 默认值：下一页
    * `prev`: {`String`} 默认值：上一页
    * `first`: {`String`} 默认值：首页
    * `last`: {`String`} 默认值：末页
    * `className`: {`String`} 给分页添加的样式， 默认值：pagination
    * `linksCount`: {`Number`} 显示的页面按钮数据，若值为偶数则会自动加1，默认值：5
    * `pagesize`: {`Number`} 每页显示的条数，默认值：10
    * `showLinks`: {`Boolen`} 是否显示页码按钮，默认值：true

## 依赖(Dependencies)
- jQuery
- Knockout
