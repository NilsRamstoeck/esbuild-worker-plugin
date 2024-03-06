//This is to give us correct typings when using the plugin and importing a worker

declare module '*.worker.ts' {
  const content: import('esbuild-worker-plugin').WorkerConstructor;
  export default content;
}

declare module '*.worker.js' {
  const content: import('esbuild-worker-plugin').WorkerConstructor;
  export default content;
}
