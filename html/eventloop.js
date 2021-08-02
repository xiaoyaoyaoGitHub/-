console.log("1.script start");

setTimeout(() => {
  console.log("9.setTimeout");
}, 1000);

Promise.resolve()
  .then(function () {
    console.log("3.promise1");
  })
  .then(function () {
    console.log("6.promise2");
  });

async function errorFunc() {
  try {
    await Promise.reject("error!!!");
  } catch (e) {
    console.log("4.error caught"); // 微1-3
  }
  console.log("5.errorFunc");
  return Promise.resolve("7.errorFunc success");
}
errorFunc().then((res) => console.log("8.errorFunc then res"));

console.log("2.script end");

