(() => {
  // example.worker.ts
  onmessage = (e) => {
    const responsePrefix = "Recieved Message:";
    postMessage(`${responsePrefix} ${JSON.stringify(e.data, null, 2)}`);
  };
})();
