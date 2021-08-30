const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}]; // => [1, '1', 17, true, false, 'true', 'a', {}, {}]

//1. set
// console.log(Array.from(new Set(arr)));

//2. reduce
// const newArr = arr.reduce((acc, curr) => {
//     return acc.includes(curr) ? acc : acc.concat(curr);
// }, [])
// console.log(newArr);

// 3 filter
// const newArr = arr.filter((item, index) => {
//     return arr.indexOf(item) === index
// })
// console.log(newArr);