# esbuild-worker-plugin

A plugin for esbuild that enables importing web workers as functions. This plugin simplifies the process of working with web workers. The workers get bundled into their own bundles, keeping bundle sizes small.

## Installation

You can install the `esbuild-worker-plugin` package using npm or yarn:

```bash
npm install esbuild-worker-plugin --save-dev
```

or

```bash
yarn add esbuild-worker-plugin --dev
```

## Usage

To use the `esbuild-worker-plugin`, follow these steps:

1. Import the plugin at the top of your esbuild configuration file:

```ts
const { WorkerPlugin } = require('esbuild-worker-plugin'); // OR
import { WorkerPlugin } from 'esbuild-worker-plugin';
```

1. Add the plugin to your esbuild configuration:

```ts
const buildContext = await context({
  entryPoints: ['./index.ts'],
  plugins: [WorkerPlugin({ workerOutdir: 'worker' })],
  outdir: './dist',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  tsconfig: './tsconfig.json',
  logLevel: 'info'
});
```

1. In your code, you can now import web workers as functions:

```ts
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
```

## Configuration Options

The `esbuild-worker-plugin` supports the following configuration options, which you can pass as an object to the plugin:

- `workerOutdir`: The output directory of the bundled workers

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/NilsRamstoeck/esbuild-worker-plugin/blob/master/LICENSE) file for details.
