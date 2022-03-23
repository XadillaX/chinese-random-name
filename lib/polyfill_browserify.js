'use strict';

// @crand/mt19937 uses emscripten to compile the code to a bundled JavaScript
// file. And it judge `process.versions.node` as Node.js environment to export
// CMD JavaScript.
//
// Browserify compiles code to evaluate a dummy Node.js environment but it
// leaves `process.versions.node` as an empty string.
//
// Here we patch the dummy Node.js version value if it's empty to let
// @crand/mt19937's code regard it as a Node.js environment.
if (!process.versions.node) {
  process.versions.node = 'dummy';
}
