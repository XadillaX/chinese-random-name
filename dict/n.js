'use strict';

const text = require('./n_text');

function propertiesInterval(n1, n2) {
  if (n1 > n2) {
    n1 += n2;
    n2 = n1 - n2;
    n1 -= n2;
  }

  return Math.min(n2 - n1, n1 + 5 - n2);
}

const names = {
  金: [],
  木: [],
  水: [],
  火: [],
  土: [],
};

// Combinations for 五行 group and their weights.
const combination2 = [];
let combination2Max = 0;
const combination3 = [];
let combination3Max = 0;
const properties = Object.keys(names);

const dict = text
  .split('\n')
  .map(line => line.split(' '))
  .filter(line => line.length > 0 && line[0] !== '');
for (const line of dict) {
  names[line[2].split('：')[0]].push(line[1]);
}

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    const temp = { property: properties[i] + properties[j] };
    temp.min = combination2Max;

    const interval = propertiesInterval(i, j);
    if (interval === 0) combination2Max += 100;
    if (interval === 1) combination2Max += 50;
    if (interval === 2) combination2Max += 20;

    temp.max = combination2Max - 1;

    combination2.push(temp);
  }
}

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    let base = propertiesInterval(i, j);
    if (base === 0) base = 100;
    if (base === 1) base = 50;
    if (base === 2) base = 20;
    for (let k = 0; k < 5; k++) {
      const temp = { property: properties[i] + properties[j] + properties[k] };
      temp.min = combination3Max;

      const interval = propertiesInterval(j, k);
      if (interval === 0) combination3Max += 100;
      if (interval === 1) combination3Max += 50;
      if (interval === 2) combination3Max += 20;
      combination3Max += base;

      temp.max = combination3Max - 1;

      combination3.push(temp);
    }
  }
}

module.exports = {
  names,
  properties,
  combination2,
  combination2Max,
  combination3,
  combination3Max,
};
