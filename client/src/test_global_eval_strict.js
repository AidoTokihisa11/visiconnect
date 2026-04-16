'use strict';
function a() {
  const globalEval = eval;
  globalEval('var testVar1234 = 1;');
}
a();
console.log(typeof testVar1234);
