//Import worker. It is important to include the file ending, otherwise its imported as module not as worker
import ExampleWorker from './example.worker.ts';

//Create the worker. The imported takes an optional WorkerOptions object as parameter
const myWorker = ExampleWorker({ options: { name: 'ExampleWorker' } });

//Get the output element to show the response
const outputPreEl = document.getElementById('worker-response')!;

//Setup a listener for the worker
myWorker.onmessage = (e) => {
  outputPreEl.textContent = JSON.stringify(e.data);
};

//Send the test message to the Worker
myWorker.postMessage("Hello World");

//You can also create a shared worker like this
console.log(ExampleWorker({ options: {}, shared: true }));

