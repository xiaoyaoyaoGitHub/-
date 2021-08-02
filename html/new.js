// new 的原理就是继承 我们将新创建的对象的__proto__指向所继承的对象

function Person(name) {
    this.name = name;
}
const lily = new Person('lily')
console.log(lily);

