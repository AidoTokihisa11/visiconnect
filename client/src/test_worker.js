self.onmessage = () => {
  self.importScripts = function() { console.log("poly"); };
  self.importScripts();
}
