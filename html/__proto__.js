

// 继承
//  只有函数才有prototype属性
function Person(){
    this.name = '234'
}
const lily = new Person()
console.log(lily.__proto__); // {constructor: ƒ}constructor: ƒ Person()[[Prototype]]: Object
console.log(lily.__proto__.constructor); //ƒ Person(){ this.name = '234'}
console.log(lily.__proto__.constructor.__proto__); //function 
console.log(lily.__proto__.constructor.__proto__.__proto__); //null
