function a() {
  var globalEval = eval;
  globalEval('var testVar123 = 1;');
}
a();
console.log(typeof testVar123);
