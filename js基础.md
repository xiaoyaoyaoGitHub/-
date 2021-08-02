### 原型和原型链
    1. JavaScript 的函数和对象是怎样的关系？
        - 函数是一种特殊的对象，在对象内部属性拥有仅供 JavaScript引擎读取的 Call 属性的对象称为函数，使用 typeof 检测时会被识别为 function
    2. __proto__和prototype都表示原型对象，它们有什么区别呢？
        - __proto__ 可以称作指针指向 prototype ，后者实质上也是对象。
    3. JavaScript 中对象的继承和原型链是什么关系？
        - 可以__proto__比作链，prototype 比作节点，以 null 为顶点链接起来形成原型链，当访问标识符时，实例没有则会去原型链上查找，找到则返回结果，直到顶端 null 没找到则返回 undefined
    4. JavaScript 中对象是怎么实现继承的(经典继承(盗用构造函数)、组合继承、原型式继承、寄生式继承)
        - 实例对象通过将__proto__属性指向构造函数的原型对象（Person.prototype），实现了该原型对象的继承。
        - 只有函数才有prototype属性,这个属性拥有constructor属性,该属性指向原型对象的构造函数
    5. JavaScript 是怎么访问对象的方法和属性的？
        - 遍历原型链
            - 首先会优先在该对象上搜寻。如果找不到，还会依次层层向上搜索该对象的原型对象、该对象的原型对象的原型对象等（套娃告警）;
            - JavaScript 中的所有对象都来自Object，Object.prototype.__proto__ === null。null没有原型，并作为这个原型链中的最后一个环节；
            - JavaScript 会遍历访问对象的整个原型链，如果最终依然找不到，此时会认为该对象的属性值为undefined。


### javascript引擎如何执行javascript代码
    1. 语法分析阶段 (语法报错阶段在此阶段抛出)
        - 词法分析
        - 语法分析
        - 语义分析 //此处检查语法
        - 生成AST       
    2. 编译阶段
        - 创建上下文
            1.依赖javascript运行环境, 包括全局环境,函数环境和eval
                - 全局环境: 第一次载入javascript时,会创建全局环境,应用全部退出则会被销毁
                - 函数环境: 函数被调用时,则会进入该函数的运行环境,同一个函数每次被调用都会创建一个独立的运行环境
            2.过程:
                - 建立作用域链;
                - 创建变量对象 Variable Object
                    1). 
                - 确定this的指向
    3. 执行阶段

### endecodeURI 与 endecodeURIComponent 区别
    ```js
        encodeURIComponent('http://localhost:3000/')
        'http%3A%2F%2Flocalhost%3A3000%2F'

        encodeURI('http://localhost:3000/') // 只针对中文?
        'http://localhost:3000/'
    ```
### put 和 petch 区别
    - put 是替换
    - petch 是修改