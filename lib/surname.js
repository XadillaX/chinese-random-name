var fs = require("fs");
var dict = fs.readFileSync(__dirname + "/../dict/f.dict", "utf8");
dict = dict.split("\n\n");

const weights = [
    100, 70, 10, 5, 1, 1
];

var surnames = [];
var w = 0;
var idx = 0;
surnames = dict.reduce(function(surnames, names) {
    names = names.split("\n");
    names = names.map(function(n) { return n.split(" "); }).flatten();

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
var count = surnames[surnames.length - 1].max - 1;

exports.getOne = function() {
    var idx = Number.random(0, count);
    return surnames.find(function(name) {
        return name.min <= idx && name.max >= idx;
    }).name;
};

