'use strict';

require('./polyfill_browserify');

const Mt19937 = require('@crand/mt19937');

const {
  combination2,
  combination2Max,
  combination3,
  combination3Max,
  names,
  properties,
} = require('../dict/n');

let currentSeed = Date.now();
const random5 = new Mt19937(currentSeed++, 0, 4);
const randoms = {};
for (let i = 0; i < properties.length; i++) {
  const random = new Mt19937(currentSeed++, 0, names[properties[i]].length - 1);
  randoms[properties[i]] = random;
}
const randomCombination2 = new Mt19937(currentSeed++, 0, combination2Max - 1);
const randomCombination3 = new Mt19937(currentSeed++, 0, combination3Max - 1);
const random1000 = new Mt19937(currentSeed++, 0, 999);

process.on('exit', () => {
  random5.destroy();
  randomCombination2.destroy();
  randomCombination3.destroy();
  random1000.destroy();
  for (const random of randoms) {
    random.destroy();
  }
});

/**
 * Get a random name with a single Chinese character.
 * @param {'金' | '木' | '水' | '火' | '土'} [property] The five-elements property of the name.
 * @return {string} The random name.
 */
exports.get1 = function get1(property) {
  if (undefined === property) {
    property = properties[random5.next(5)];
  }

  const temp = names[property];
  const idx = randoms[property].next();
  return temp[idx];
};

/**
 * Get a random name with two Chinese characters.
 * @param {('金' | '木' | '水' | '火' | '土')[2] | string} property The file-elements properties for each character of the name.
 * @return {string} The random name.
 */
exports.get2 = function get2(property) {
  if (undefined === property) {
    const idx = randomCombination2.next();
    property = combination2.find(p => (p.min <= idx && p.max >= idx)).property;
  }

  return exports.get1(property[0]) + exports.get1(property[1]);
};

/**
 * Get a random name with three Chinese characters.
 * @param {('金' | '木' | '水' | '火' | '土')[3] | string} property The file-elements properties for each character of the name.
 * @return {string} The random name.
 */
exports.get3 = function get3(property) {
  if (undefined === property) {
    const idx = randomCombination3.next();
    property = combination3.find(p => (p.min <= idx && p.max >= idx)).property;
  }

  return exports.get2(property.substr(0, 2)) + exports.get1(property[2]);
};

/**
 * Get a random name with random Chinese characters.
 * @return {string} The random name.
 */
exports.get = function get() {
  const temp = random1000.next();
  if (temp <= 475) return exports.get1();
  if (temp <= 950) return exports.get2();
  return exports.get3();
};

exports.dict = names;
