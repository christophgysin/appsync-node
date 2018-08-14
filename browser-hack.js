/*
 * This is a horrible hack to make libraries meant to run in the browser work on
 * node.js.
 *
 * Don't blame me, this is the official AWS suggestion how to run GraphQL
 * queries from node.js:
 * https://docs.aws.amazon.com/appsync/latest/devguide/building-a-client-app-node.html
 */

require('isomorphic-fetch');

global.WebSocket = require('ws');

global.window = global.window || {
  setTimeout,
  clearTimeout,
  WebSocket: global.WebSocket,
  ArrayBuffer: global.ArrayBuffer,
  addEventListener: () => {},
  navigator: { onLine: true },
};

global.localStorage = {
  store: {},
  getItem: key => this.store[key],
  setItem: (key, value) => {
    this.store[key] = value;
  },
  removeItem: (key) => {
    delete this.store[key];
  },
};
