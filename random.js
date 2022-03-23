'use strict';

const surnames = require('./lib/surname');
const names = require('./lib/name');

exports.surnames = surnames;
exports.names = names;

/**
 * Get a random name with surname and last name.
 * @param {number} len The whole name length.
 * @return {string} The random name.
 */
exports.generate = function(len) {
  let surname,
    name;
  if (undefined === len) {
    surname = surnames.getOne();
    name = names.get();
  } else if (len === 2) {
    do { surname = surnames.getOne(); } while (surname.length !== 1);
    name = names.get1();
  } else if (len === 3) {
    do { surname = surnames.getOne(); } while (surname.length > 2);
    if (surname.length === 1) name = names.get2();
    if (surname.length === 2) name = names.get1();
  } else if (len === 4) {
    do { surname = surnames.getOne(); } while (surname.length > 3);
    if (surname.length === 1) name = names.get3();
    if (surname.length === 2) name = names.get2();
    if (surname.length === 3) name = names.get1();
  }

  const n = surname + name;
  return n;
};
