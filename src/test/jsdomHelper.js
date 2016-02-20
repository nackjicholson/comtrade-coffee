import { jsdom } from 'jsdom';

// Sets up global "document" and "window" variables which do not exist in the node run
// time using jsdom. This makes it possible to run tests which render React components.
const doc = jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});
