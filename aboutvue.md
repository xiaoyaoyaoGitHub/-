#### computed 与 watch 区别

-   compouted 是新创建一个属性挂载到实例上,watch 是监听已经挂载到实例上的属性,也可以监听 computed
-   computed 适合一个数据被多个数据影响,wathc 适合一个数据影响多个数据
-   computed 是惰性的,依赖变化后,第一次访问会重新计算,watch 则是当数变就会调用执行函数

#### 防抖和节流的区别

-   防抖是 触发高频事件后 n 秒内函数只执行一次,n 秒内高频事件重新触发则重新计时,会在输入框监听用户输入时使用

```js
function debounce(fn, wait) {
	let timer;
	return function () {
		const context = this;
		const args = Array.from(arguments);
		if (timer) clearTimeout(timer);
		timer = setTimeout(function () {
			fn.apply(context, args);
		}, wait);
	};
}
```

-   节流 是在 n 秒内只会触发一次,稀释函数的执行频率

```js
function throttle(fn, timer) {
	let preTime;
	return function () {
		const context = this;
		const args = Array.from(arguments);
		if (!preTime || new Date() - preTime > timer) {
			fn.apply(context, args);
		}
	};
}
```

#### 介绍下 Set、Map、WeakSet 和 WeakMap 的区别?
- Set 允许你存储任何类型的唯一值,无论是原始值或者是对象引用
- WeakSet 成员都是对象,都是弱引用,可以被垃圾回收机制回收,不容易内存泄露
- Map 是键值对的集合,
- WeakMap 只接受对象作为键名,不能是基础类型,不能遍历,get set has delete