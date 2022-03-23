'use strict';

const assert = require('assert');
const randomName = require('..');

function assertLength(name, length) {
  console.log(name);
  const ok = !length ? (name.length > 0) : name.length === length;
  assert.ok(ok, 'Invalid length. ' + name + ' - ' + length);
}

function run() {
  assertLength(randomName.generate());
  assertLength(randomName.generate(2), 2);
  assertLength(randomName.generate(3), 3);
  assertLength(randomName.generate(4), 4);
  assertLength(randomName.surnames.getOne());
  assertLength(randomName.names.get());
  assertLength(randomName.names.get1(), 1);
  assertLength(randomName.names.get2(), 2);
  assertLength(randomName.names.get3(), 3);
  assertLength(randomName.names.get1('火'), 1);
  assertLength(randomName.names.get2('火火'), 2);
  assertLength(randomName.names.get3('火火火'), 3);
}

for (let i = 0; i < 1000; i++) run();
