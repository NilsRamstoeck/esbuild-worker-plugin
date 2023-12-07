import { build } from 'esbuild';

/** @type typeof import('esbuild-worker-plugin').WorkerPlugin */
export const WorkerPlugin = ({ workerOutdir }) => ({
  name: 'WorkerPlugin',
  setup: (pluginBuild) => {
    pluginBuild.onLoad({ filter: /.*\.worker\.[tj]s$/, namespace: 'worker' }, ({ pluginData: { workerPath } }) => {
      const result = { contents: /*javascript*/`const WorkerConstructor = (opts) => new (opts.shared?SharedWorker:Worker)('${workerPath}', opts.options);WorkerConstructor.path = '${workerPath}';export default WorkerConstructor;` };
      return result;
    });

    pluginBuild.onResolve({ filter: /.*\.worker\.[tj]s$/ }, async ({ path, kind }) => {
      if (kind != 'import-statement') throw new Error('Workers need to be imported using import statements');
      const outfile = join('/', workerOutdir ?? '', path.split('/').reverse()[0]);
      const workerPath = outfile.replace(/ts$/, 'js').replace(/^\/\//, '/');
      const outPath = join(pluginBuild.initialOptions.outdir ?? '', workerPath);
      await build({
        entryPoints: [path],
        outfile: outPath,
        bundle: true,
        format: 'iife'
      });
      return { path: outfile, namespace: 'worker', pluginData: { workerPath } };
    });

  }
});

function join(...args) {
  return args.join('/');
}