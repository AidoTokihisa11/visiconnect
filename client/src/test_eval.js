async function test() {
  const res = await fetch("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm/vision_wasm_internal.js");
  const code = await res.text();
  eval(code);
  console.log(typeof createMediaPipeWasmModule === "function");
}
test();
