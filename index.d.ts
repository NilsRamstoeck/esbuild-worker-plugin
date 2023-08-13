declare module 'esbuild-worker-plugin' {
  export type WorkerPluginOptions = {
    workerOutdir?: string,
  };

  type WorkerOptions = ConstructorParameters<typeof Worker>[1];
  type SharedWorkerOptions = ConstructorParameters<typeof SharedWorker>[1];

  export type WorkerConstructorParams =
    ({ options?: SharedWorkerOptions, shared: true; }) |
    { options?: WorkerOptions, shared?: false; };

  export type WorkerConstructor = ((options?: WorkerConstructorParams) => Worker) & { path: string; };

  export const WorkerPlugin: (opts: WorkerPluginOptions) => import('esbuild').Plugin;
}