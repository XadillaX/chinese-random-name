'use strict';

require('./polyfill_browserify');

const Mt19937 = require('@crand/mt19937');

const surnames = require('../dict/f');
const count = surnames[surnames.length - 1].max;

const random = new Mt19937(Date.now(), 0, count - 1);
process.on('exit', () => {
  random.destroy();
});

/**
 * Get one random surname.
 * @param {{ useSurnamesCountAtTheTop: number }} [opt] The option object.
 * @return {string} The random surname.
 */
function getOne(opt = {}) {
  opt = opt || {};

  let mod = count;
  if (opt.useSurnamesCountAtTheTop && (opt.useSurnamesCountAtTheTop > 0 && opt.useSurnamesCountAtTheTop < surnames.length)) {
    mod = surnames[opt.useSurnamesCountAtTheTop - 1].max;
  }

  const weight = random.next() % mod;
  let surname = surnames.find(name => (name.min <= weight && name.max >= weight));
  if (!surname) surname = surnames[0];
  return surname.name;
}

module.exports = {
  getOne,
};
