const { Worker } = require('worker_threads');
const w = new Worker(`
  self.onmessage = () => {
    try {
      self.importScripts = function() {};
      self.postMessage("success");
    } catch(e) {
      self.postMessage(e.message);
    }
  }
`, { eval: true });
w.on('message', m => console.log(m));
w.postMessage("go");
