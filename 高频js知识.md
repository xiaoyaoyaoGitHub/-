1. 数组扁平化
    - const arr = [1, [2, [3, [4, 5]]], 6]; // 结果数组 => [1, 2, 3, 4, 5, 6]
    - ① 使用flat() 
        ```js
        const res1 = arr.flat(Infinity);
    - ② 利用正则
        ```js
        const res2 = JSON.stringify(arr).replace(/\[|\]/g, '').split(',');
        // 或
        const res3 = JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']');
    - ③ 使用reduce
        ```js
        const flatten = arr => {
            return arr.reduce((pre, cur) => {
                return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
            }, [])
        }
        const res4 = flatten(arr);
    - ④ 函数递归
        ```js
        const res5 = [];
        const fn = arr => {
            for (let i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])) {
                    fn(arr[i]);
                } else {
                    res5.push(arr[i]);
                }
            }
        }
        fn(arr);
2. 数组去重
    - 示例
        ```js 
        const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}]; // => [1, '1', 17, true, false, 'true', 'a', {}, {}]
    - ① 利用Set
        ```js
        const newArray = Array.from(new Set(arr))
    - ② for循环+splice
        ```js
        const unique1 = arr => {
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                for (let j = i + 1; j < len; j++) {
                    if (arr[i] === arr[j]) {
                        arr.splice(j, 1); // 每删除一个树，j--保证j的值经过自加后不变。同时，len--，减少循环次数提升性能
                        len--;
                        j--;
                    }
                }
            }
            return arr;
        }
    - ③ 利用indexOf或include
        ```js
        const unique2 = arr => {
            const res = [];
            for (let i = 0; i < arr.length; i++) {
                if (res.indexOf(arr[i]) === -1 || !res.include(arr[i])) res.push(arr[i]);
            }
            return res;
        }
    - ④ 利用filter
        ```js
        const unique4 = arr => {
            return arr.filter((item, index) => {
                return arr.indexOf(item) === index;
            });
        }
    - ⑤ 利用Map
    ```js
        const unique5 = arr => {
            const map = new Map();
            const res = [];
            for (let i = 0; i < arr.length; i++) {
                if (!map.has(arr[i])) {
                    map.set(arr[i], true)
                    res.push(arr[i]);
                }
            }
            return res;
        }
4. 类数组转化为数组（类数组是具有length属性，但不具有数组原型上的方法。常见的类数组有arguments、DOM操作方法返回的结果。）
    - ① Array.from(document.querySelectorAll('div'))
    - ② Array.prototype.slice.call()
        ```js
        Array.prototype.slice.call(document.querySelectorAll('div'))
    - ③ 扩展运算符
        ```js
        [...document.querySelectorAll('div')]
    - ④ concat
        ```js
        Array.prototype.concat.apply([], document.querySelectorAll('div'));
    - ⑤ Array.prototype.filter()
        ```js
        Array.prototype.filter = function(callback, thisArg) {
            if (this == undefined) {
                throw new TypeError('this is null or not undefined');
            }
            if (typeof callback !== 'function') {
                throw new TypeError(callback + 'is not a function');
            }
            const res = [];
            // 让O成为回调函数的对象传递（强制转换对象）
            const O = Object(this);
            // >>>0 保证len为number，且为正整数
            const len = O.length >>> 0;
            for (let i = 0; i < len; i++) {
                // 检查i是否在O的属性（会检查原型链）
                if (i in O) {
                    // 回调函数调用传参
                    if (callback.call(thisArg, O[i], i, O)) {
                        res.push(O[i]);
                    }
                }
            }
            return res;
        }
5. 函数柯里化
    - 指的是将一个接受多个参数的函数 变为 接受一个参数返回一个函数的固定形式，这样便于再次调用，例如f(1)(2)
    - 经典面试题：实现add(1)(2)(3)(4)=10;
    - 
    ```js
    function add() {
        const _args = [...arguments];
        function fn() {
            _args.push(...arguments);
            return fn;
        }
        fn.toString = function() {
            return _args.reduce((sum, cur) => sum + cur);
        }
        return fn;
    }
6. bind的手动实现
    ```js
    Function.prototype.myBind = function (context) {
        if (typeof this !== 'function') {
            throw new TypeError('Error')
        }
        let _this = this
        let args = [...arguments].slice(1)
        return function F() {
            // 判断是否被当做构造函数使用
            if (this instanceof F) {
                return _this.apply(this, args.concat([...arguments]))
            }
            return _this.apply(context, args.concat([...arguments]))
        }
    };
7. call方法实现
    ```js
    Function.prototype.call = function(context = window, ...args) {
        const fn = Symbol('fn');
        context[fn] = this;
        const res = context[fn](...args);
        delete context.fn;
        return res;
    }
8. apply方法实现
    ```js
    Function.prototype.apply = function(context = window, args) {
        const fn = Symbol('fn');
        context[fn] = this;
        const res = context[fn](...args);
        delete context[fn];
        return res;
    }
9. Object.is
    ```js
    Object.is解决的主要是这两个问题：

    +0 === -0  // true
    NaN === NaN // false

    const is= (x, y) => {
        if (x === y) {
            // +0和-0应该不相等
            return x !== 0 || y !== 0 || 1/x === 1/y;
        } else {
            return x !== x && y !== y;  
        }
    }
10. Object.assign
    - Object.assign()方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象（请注意这个操作是浅拷贝）
    ```js
    - Object.defineProperty(Object, 'assign', {
        value: function(target, ...args) {
            if (target == null) {
                return new TypeError('Cannot convert undefined or null to object');
            }
            // 目标对象需要统一是引用数据类型，若不是会自动转换
            const to = Object(target);
            for (let i = 0; i < args.length; i++) {
            // 每一个源对象
            const nextSource = args[i];
            if (nextSource !== null) {
                // 使用for...in和hasOwnProperty双重判断，确保只拿到本身的属性、方法（不包含继承的）
                for (const nextKey in nextSource) {
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            }
            return to;
        },
        // 不可枚举
        enumerable: false,
        writable: true,
        configurable: true,
    })
11. 深拷贝
    - 递归的完整版本（考虑到了Symbol属性）
    ```js
    - const cloneDeep1 = (target, hash = new WeakMap()) => {
        if (typeof target !== 'object' || target === null) {
            return target;
        }
        if (hash.has(target)) return hash.get(target);
        const cloneTarget = Array.isArray(target) ? [] : {};
        hash.set(target, cloneTarget);
        const symKeys = Object.getOwnPropertySymbols(target);
        if (symKeys.length) {
            symKeys.forEach(key => {
                if (typeof target[key] === 'object' && target[key] !== null) {
                    cloneTarget[key] = cloneDeep1(target[key]);
                } else {
                    cloneTarget[key] = target[key];
                }
            })
        }
        for (const i in target) {
            if (Object.prototype.hasOwnProperty.call(target, i)) {
            cloneTarget[i] =
                typeof target[i] === 'object' && target[i] !== null
                ? cloneDeep1(target[i], hash)
                : target[i];
            }
        }
        return cloneTarget;
    }
12. 手写Promise（简易版本）
    - 实现
    ```js
    function Promise(fn){ //executor执行器
        let self = this;
        self.status = 'pending'; //等待态
        self.value  = undefined; // 表示当前成功的值
        self.reason = undefined; // 表示是失败的值
        self.fulfilledCallbacks = [];
        self.rejectedCallbacks = [];
        function resolve(value){ // 成功的方法
            if(self.status === 'pending'){
                self.status = 'fulfilled';
                self.value = value;
                self.fulfilledCallbacks.forEach(myFn => myFn(self.value))
            }
        }
        function reject(reason){ //失败的方法
            if(self.status === 'pending'){
                self.status = 'rejected';
                self.reason = reason;
                self.rejectedCallbacks.forEach(myFn => myFn(self.value))
            }
        }
        
        // 执行回调函数
        try{
            fn(resolve, reject)
        }catch (e) {
            reject(e);
        }
    }
    Promise.prototype.then = function(onFufiled,onRejected){
        let self = this;
        //等待状态，则添加回调函数到栈中
        if(self.status === 'pending'){
            self.fulfilledCallbacks.push(()=>{
                onFulfilled(self.value);
            });
            self.rejectedCallbacks.push(()=>{
                onRejected(self.value);
            })
        }
        if(self.status === 'fulfilled'){
            onFulfilled(self.value);
        }
        if(self.status === 'rejected'){
            onRejected(self.value)
        }
    }

    class Promise2 {
        state = "pending";
        callbacks = [];
        constructor(fn) {
            fn(this.resolve.bind(this), this.reject.bind(this));
        }
        resolve(result) {
            this.state = "fulfilled";
            nextTick(() => {
                this.callbacks.forEach((handle) => {
                    if (typeof handle[0] === "function") {
                        handle[0].call(undefined, result);
                    }
                });
            });
        }
        reject(reason) {
            this.state = "rejected";
            nextTick(() => {
                this.callbacks.forEach((handle) => {
                    if (typeof handle[1] === "function") {
                        handle[1].call(undefined, reason);
                    }
                });
            });
        }
        then(succeed, fail) {
            const handle = [];
            if (typeof succeed === "function") {
                handle[0] = succeed;
            }
            if (typeof fail === "function") {
                handle[1] = fail;
            }
            this.callbacks.push(handle);
        }
    }

    function nextTick(fn) {
        if (process !== undefined && typeof process.nextTick === "function") {
            return process.nextTick(fn);
        } else {
            // 用MutationObserver实现浏览器上的nextTick
            var counter = 1;
            var observer = new MutationObserver(fn);
            var textNode = document.createTextNode(String(counter));

            observer.observe(textNode, {
                characterData: true,
            });
            counter += 1;
            textNode.data = String(counter);
        }
    }
    ```
13. Promise.all
    ```js
    Promise.myAll = function(promiseArr) {
        return new Promise((resolve, reject) => {
            const ans = [];
            let index = 0;
            for (let i = 0; i < promiseArr.length; i++) {
            promiseArr[i]
            .then(res => {
                ans[i] = res;
                index++;
                if (index === promiseArr.length) {
                    resolve(ans);
                }
            })
            .catch(err => reject(err));
            }
        })
    }
    ```

14. promise.race
    ```js
    Promise.race = function(promiseArr) {
        return new Promise((resolve, reject) => {
            promiseArr.forEach(p => {
            // 如果不是Promise实例需要转化为Promise实例
            Promise.resolve(p).then(
                val => resolve(val),
                err => reject(err),
            )
            })
        })
    }
    ```
15. 渲染大量数据不卡顿问题
    ```js
    setTimeout(() => {
        // 插入十万条数据
        const total = 100000;
        // 一次插入的数据
        const once = 20;
        // 插入数据需要的次数
        const loopCount = Math.ceil(total / once);
        let countOfRender = 0;
        const ul = document.querySelector('ul');
        // 添加数据的方法
        function add() {
            const fragment = document.createDocumentFragment();
            for(let i = 0; i < once; i++) {
                const li = document.createElement('li');
                li.innerText = Math.floor(Math.random() * total);
                fragment.appendChild(li);
            }
            ul.appendChild(fragment);
            countOfRender += 1;
            loop();
        }
        function loop() {
            if(countOfRender < loopCount) {
                window.requestAnimationFrame(add);
            }
        }
        loop();
    }, 0)
    ```
16. 谐一个函数实现每次调用都能累加计数
    - 使用闭包
    ```js
    var add = (function () {
        var counter = 0;
        return function () {
            return counter += 1;
        }
    })();
    // 或
    function test() {
        var counter = 0;
        return function() {
            return counter += 1;
        };
    }
    var add = test();
    ```
17. js实现一个二叉树搜索
    - 详情见本文： https://www.ki4.cn/106500.html
    ```js
    class BinaryTreeNode {
        constructor(key, value) {
            // 指向父节点
            this.p = null;
            // 左节点
            this.left = null;
            // 右节点
            this.right = null;
            // 键
            this.key = key;
            // 值
            this.value = value;
        }
    }
    class BinaryTree {
        constructor() {
            this.root = null;
        }
        static createNode(key, value) {
            return new BinaryTreeNode(key, value);
        }
        search(key) {
            let p = this.root;
            if (!p) {
                return;
            }
            while (p && p.key !== key) {
                if (p.key < key) {
                    p = p.right;
                } else {
                    p = p.left;
                }
            }
            return p;
        }
        insert(node) {
            // 尾指针的父节点指针
            let p = this.root;
            // 尾指针
            let tail = this.root;
            while (tail) {
                p = tail;
                if (node.key < tail.key) {
                    tail = tail.left;
                } else {
                    tail = tail.right;
                }
            }
            if (!p) {
                this.root = node;
                return;
            }
            // 插入
            if (p.key < node.key) {
                p.right = node;
            } else {
                p.left = node;
            }
            node.p = p;
        }
        transverse() {
            return this.__transverse(this.root);
        }
        *__transverse(node) {
            if (!node) {
                return;
            }
            yield* this.__transverse(node.left);
            yield node;
            yield* this.__transverse(node.right);
        }
    }
    ```
18. 二叉树深度
    - 二叉树的深度计算，首先要判断节点：
        - 1、一颗树只有一dao个节点，它的深度是1；
        - 2、二叉树的根节点只有左子树而没有右子树，那么可以判断，二叉树的深度应该是其左子树的深度加1；
        - 3、二叉树的根节点只有右子树而没有左子树，那么可以判断，那么二叉树的深度应该是其右树的深度加1；
        - 4、二叉树的根节点既有右子树又有左子树，那么可以判断，那么二叉树的深度应该是其左右子树的深度较大值加1。
        - 一棵深度为k，且有2^k-1个节点的二叉树，称为满二叉树。这种树的特点是每一层上的节点数都是最大节点数。而在一棵二叉树中，除最后一层外，若其余层都是满的，并且最后一层或者是满的，或者是在右边缺少连续若干节点，则此二叉树为完全二叉树。
        - 具有n个节点的完全二叉树的深度为floor(log2n)+1。深度为k的完全二叉树，至少有2k-1个叶子节点，至多有2k-1个节点。
19. JS大数相加
    ```js
    - function bigNumAdd (num1, num2) {
        let numString_1 = `${num1}`,
            numString_2 = `${num2}`
        let numArray_1 = numString_1.split(''),
            numArray_2 = numString_2.split('');
        let numLength = numArray_1.length>numArray_2.length?numArray_1.length:numArray_2.length
        let tempArray = numArray_1.length>numArray_2.length?numArray_2:numArray_1 // 较短
        let tempArray_1 = numArray_1.length>numArray_2.length?numArray_1:numArray_2 // 较长
        let result = ''
        let num = 0
        for (let i = 0; i < numLength; i++) {
            let add_1 = numString_1.charAt(numString_1.length - i - 1)
            let add_2 = numString_2.charAt(numString_2.length - i - 1)
            let sumNum = Number(add_1) + Number(add_2) + num
            result = sumNum%10 + result
            num = Math.floor(num/10)
        }
        console.log(result.replace(/^0+/,''))
    }
    bigNumAdd(2111, 89999988999)
    ```
20. js斐波那契数列
    - 1、1、2、3、5、8、13、21、……
    ```js
    - function fibonacci(n) {
        if (n == 1 || n == 2) {
            return 1
        };
        return fibonacci(n - 2) + fibonacci(n - 1);
    }
    - function fibonacci(n) {
        var n1 = 1, n2 = 1, sum;
        for (let i = 2; i < n; i++) {
            sum = n1 + n2
            n1 = n2
            n2 = sum
        }
        return sum
    }
    - var fibonacci = function (n) {
        let n1 = 1; n2 = 1;
        for (let i = 2; i < n; i++) {
            [n1, n2] = [n2, n1 + n2]
        }
        return n2
    }
    ```
21. js间隔一秒输出数组中的元素
    - 数组[1,2,3,4,5,6,7]
    - 使用promise
    ```js
        function printf (arr) {
            arr.reduce((prev, next) => {
                return prev.then(() => {
                    return new Promise ( resolve => {
                        setTimeout(() => {
                            resolve(console.log(next))
                        }, 1000)
                    })
                })
            }, Promise.resolve())
        }
    - 使用for循环加立即执行函数
        function printf (arr) {
            for (let i=0; i< arr.length; i++) {
                (function () {
                    setTimeout(function () {
                        console.log(arr[i])
                    }, i * 1000)
                })(i)
            }
        }
    ```
22. 利用setTimeout实现setInterval
    ```js
    // 简单实现方式
    const mySetInterval = (cb, time) => {
        const fn = () => {
            cb() // 执行传入的回调函数
            setTimeout(() => {
                fn() // 递归调用自己
            }, time)
        }
        setTimeout(fn, time)
    }
    ```
23. 扩展上述方法实现clearInterval
    ```js
    // 考虑到需要实现清除循环器的功能需求，需要上述方法返回唯一id，故改造该方法
    let timeMap = {}
    let id = 0
    const mySetInterval = (cb, time) => {
        let timeId = id
        id++
        let fn = () => {
            cb()
            timeMap[timeId] = setTimeout(() => {
                fn()
            }, time)
        }
        timeMap[timeId] = setTimeout(fn, time)
        return timeId // 返回timeId
    }
    // 在此基础上，清除循环的方法可以用clearTimeout实现 
    const myClearInterval = (id) => {
        clearTimeout(timeMap[id]) // 通过timeMap[id]获取真正的id
        delete timeMap[id]
    }
    ```
24. 统计数组内相同元素出现的次数
    ```js
    //方法：使用obj记录重复的元素，以及出现的次数
    function getCount(arr) {
        var obj = {}, k, arr1 = [];
        for(var i = 0, len = arr.length; i < len; i++) {
            k = arr[i];
            if(obj[k])
                obj[k]++;
            else
                obj[k] = 1;
        }
        console.log(obj)
        //保存结果{el-'元素'，count-出现次数}
        for(var o in obj) {
            arr1.push({
                el: o,
                count: obj[o]
            });
        }
        console.log(arr1);
    }
    ```
25. 简单实现的数据劫持（vue）
    ```js
    let obj = {name:'jeffywin',play:{sport:'basketball'}}
    function observer(obj){
        if(typeof obj !== 'object') return; //如果不是对象，则return
        for(let key in obj) {
            defineReactive(obj, key, obj[key]) // 对象，属性，内容
            observer(obj[key])//假如最后一层不是对象，把obj[key]递归下去
        }
    }
    
    function defineReactive(tar, por, val) {
        Object.defineProperty(tar, por,{
            get() {
                return val
            },
            set(newVal) {
                if(val === newVal) return
                val = newVal
            }
        })
    }
    observer(obj)
    ```
26. js实现数组转树
    - 利用递归
    ```js
        function array2Tree(data, pid){
            let res = [];
            data.forEach(item => {
                if(item.parentId === pid){
                    let itemChildren = array2Tree(data,item.id);
                    if(itemChildren.length) item.children = itemChildren;
                    res.push(item);
                }
            });
            return res;
        } 
    - 使用map存储数组项，空间换时间
    function array2Tree(arr){
        if(!Array.isArray(arr) || !arr.length) return;
        let map = {};
        arr.forEach(item => map[item.id] = item);

        let roots = [];
        arr.forEach(item => {
            const parent = map[item.parentId];
            if(parent){
                (parent.children || (parent.children=[])).push(item);
            }
            else{
                roots.push(item);
            }
        })

        return roots;
    }
    ```
27. js实现树转数组
    
    ```js
    - 深度优先遍历
    function treetoArray(root,fVisit){
        let stack = Array.isArray(root) ? [...root] : [root];
        while(stack.length){
            let node = stack.pop();
            fVisit && fVisit(node);
            let children = node.children;
            if(children && children.length){
                for(let i=children.length-1;i>=0;i--) stack.push(children[i]);
            }
        }
    }
    - 广度优先遍历
    function treetoArray(root,fVisit){
        let queue = Array.isArray(root) ? [...root] : [root];
        while(queue.length){
            let node = queue.shift();
            fVisit && fVisit(node);
            let children = node.children;
            if(children && children.length){
                for(let i=0;i<children.length;i++) queue.push(children[i]);
            }
        }
    }
    ```