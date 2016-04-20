var flatten = require("flatten");
var random = require("random-to");

var dict = require("../dict/f");
dict = dict.split("\n\n");

var weights = [
    100, 70, 10, 5, 1, 1
];

var surnames = [];
var w = 0;
var idx = 0;
surnames = dict.reduce(function(surnames, names) {
    names = names.split("\n");
    names = flatten(names.map(function(n) { return n.split(" "); }));

    if(names.length === 1 && names[0] === "") return surnames;
    for(var i = 0; i < names.length; i++) {
        surnames.push({ 
            name    : names[i],
            min     : w,
            max     : w + weights[idx] - 1
        });

        w += weights[idx];
    }

    idx++;
    return surnames;
}, surnames);
var count = surnames[surnames.length - 1].max;

exports.getOne = function() {
    var idx = random.from0upto(count);
    return surnames.find(function(name) {
        return name.min <= idx && name.max >= idx;
    }).name;
};
