// 数组扁平化[4, 5, 6, 7]
const arr = [1, 2, [2, 3, [4, 5, 6, 7]], 3]

//1.  Array.prototype.flat
// const flats = arr.flat(2) // 深度为2
// console.log(flats);


//2. reduce
function deepReduce(acc, currValue) {
    return currValue.reduce((result, curr) => {
        return Object.prototype.toString.call(curr) === '[object Array]' ? deepReduce(result, curr) : result.concat(curr);
    }, acc)
}

const newArr = deepReduce([], arr)
console.log(newArr);