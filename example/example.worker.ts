//workers need to be named [name].worker.[js|ts] for the plugin to recognize them as such

//Just a simple worker that echoes the recieved message
onmessage = (e) => {
  const responsePrefix: string = "Recieved Message:";
  postMessage(`${responsePrefix} ${JSON.stringify(e.data, null, 2)}`);
};