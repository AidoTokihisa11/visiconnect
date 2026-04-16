function a() {
  eval('var testVar = 1;');
}
a();
console.log(typeof testVar);
