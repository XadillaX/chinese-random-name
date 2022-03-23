'use strict';

const flatten = require('flatten');

const text = require('./f_text');

const surnames = [];

// TODO(XadillaX): A proper weight way.
const maxWeight = 1440 * 10000;
const weightStep = 10000;
let currentWeight = 0;
let currentWeightDuration = maxWeight;

const blocks = text.split('\n\n');
for (const block of blocks) {
  const names = block.split('\n').map(line => line.split(' '));

  /**
   * @type {string[]}
   */
  const flattened = flatten(names).filter(name => name !== '');
  if (!flattened.length) continue;

  for (let i = 0; i < flattened.length; i++) {
    surnames.push({
      name: flattened[i],
      min: currentWeight,
      max: currentWeight + currentWeightDuration - 1,
      duration: currentWeightDuration,
    });

    currentWeight += currentWeightDuration;
    currentWeightDuration -= weightStep;
  }
}

module.exports = surnames;
