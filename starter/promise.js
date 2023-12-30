'use strict';

const promise = new Promise(function () {
  //Logic
  //resolve
  //reject
  resolve();
});
promise
  .then(() => console.log('Sucessfully!'))
  .catch(() => console.log('Failure!'))
  .finally(() => console.log('Done!'));
