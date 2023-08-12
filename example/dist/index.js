// worker://worker/example.worker.ts
var example_worker_default = (opts) => new (opts.shared ? SharedWorker : Worker)("/worker/example.worker.js", opts.options);

// index.ts
var myWorker = example_worker_default({ options: { name: "ExampleWorker" } });
var outputPreEl = document.getElementById("worker-response");
myWorker.onmessage = (e) => {
  outputPreEl.textContent = JSON.stringify(e.data);
};
myWorker.postMessage("Hello World");
console.log(example_worker_default({ options: {}, shared: true }));
