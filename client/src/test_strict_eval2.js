'use strict';
const globalEval = eval;
globalEval('var testVar12345 = 1;\nif(typeof testVar12345 !== "undefined") { global.testVar12345 = testVar12345; }');
console.log(typeof global.testVar12345);
