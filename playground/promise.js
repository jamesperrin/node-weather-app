var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 1500);
  });
};

asyncAdd(5, "7").then((result1) => {
  console.log('Result: ', result1);
  return asyncAdd(result1, 33);

}).then((result2) => {
  console.log('Should be 45: ', result2);

}).catch((errorMessage) => {
  console.log(errorMessage);
  
});

// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('Hey. It worked!');
//     reject('Unable to fulfil promise');
//   }, 2500);
// });

// somePromise.then((message) => {
//   console.log('Success: ', message);
// }, (errorMessage) => {
//   console.log('Error: ', errorMessage);
// });