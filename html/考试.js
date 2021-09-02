let str = 'acbabbcac'

let strToArr = str.split('')
strToArr = strToArr.sort();
strToArr = strToArr.join()
strToArr = strToArr.replace(/,/g,'')
let reg = /(\d+)(\d+)(\d+)/g;
// reg.exec(strToArr,() => {
//     console.log(arguments);
// })
strToArr.replace(/(\d+)(\d+)(\d+)/g,(...args) => {
    console.log('122');
})
console.log(strToArr);

// var name = 'big bear';
// var me = {
//     name:'hhh',
//     sayhello(){
//         // console.log(this);
//         console.log(this.name);
//     },
//     hello(){
//         (function(cb){
//             cb()
//         })(this.sayhello)
//     }
// }

// me.hello()

var name = 'big bear';
var me = {
    name:'hhh',
    sayhello(){
        console.log(this.name);
    },
    hello(){
        setTimeout(function(){
            console.log(this);
            this.sayhello()
        })
    }
}

me.hello()


// 双指针
// 链表