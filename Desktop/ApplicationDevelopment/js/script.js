'use strict';
(() => {
   const aPromise = new Promise((resolve, reject) => {
    const sum = 1 + 1;
    sum === 2
    ? resolve("That is the correct answer, resolve promise")
    : reject("That is incorrect, reject promise")
   })
//    console.log(aPromise)
aPromise.then(resolution => console.log(resolution))
        .catch(error => console.log(error))
})()