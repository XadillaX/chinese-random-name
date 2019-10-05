var random = require("random-to");

var dict = require("../dict/n");

function propertiesInterval(n1, n2) {
    if(n1 > n2) {
        n1 += n2;
        n2 = n1 - n2;
        n1 -= n2;
    }

    return Math.min(n2 - n1, n1 + 5 - n2);
}

var properties = [ "金", "水", "木", "火", "土" ];
var names = {
    "金": [],
    "木": [],
    "水": [],
    "火": [],
    "土": []
};
names = dict.reduce(function(names, n) {
    if(n.length === 1 && n[0] === "") return names;
    names[n[2].split("：")[0]].push(n[1]);

    return names;
}, names);

var combination2 = [];
var combination2Max = 0;
for(var i = 0; i < 5; i++) {
    for(var j = 0; j < 5; j++) {
        var temp = { property: properties[i] + properties[j] };
        temp.min = combination2Max;

        var interval = propertiesInterval(i, j);
        if(0 === interval) combination2Max += 100;
        if(1 === interval) combination2Max += 50;
        if(2 === interval) combination2Max += 20;

        temp.max = combination2Max - 1;

        combination2.push(temp);
    }
}

var combination3 = [];
var combination3Max = 0;
for(var i = 0; i < 5; i++) {
    for(var j = 0; j < 5; j++) {
        var base = propertiesInterval(i, j);
        if(base === 0) base = 100;
        if(base === 1) base = 50;
        if(base === 2) base = 20;
        for(var k = 0; k < 5; k++) {
            var temp = { property: properties[i] + properties[j] + properties[j] };
            temp.min = combination3Max;

            var interval = propertiesInterval(j, k);
            if(0 === interval) combination3Max += 100;
            if(1 === interval) combination3Max += 50;
            if(2 === interval) combination3Max += 20;
            combination3Max += base;

            temp.max = combination3Max - 1;

            combination3.push(temp);
        }
    }
}

exports.get1 = function(property) {
    if(undefined === property) property = properties[random.from0upto(5)];

    var temp = names[property];
    var idx = random.from0upto(temp.length);
    return temp[idx];
};

exports.get2 = function(property) {
    if(undefined === property) {
        var idx = random.from0upto(combination2Max);
        property = combination2.find(function(p) {
            return p.min <= idx && p.max >= idx;
        }).property;
    }

    return exports.get1(property[0]) + exports.get1(property[1]);
};

exports.get3 = function(property) {
    if(undefined === property) {
        var idx = random.from0upto(combination3Max);
        property = combination3.find(function(p) {
            return p.min <= idx && p.max >= idx;
        }).property;
    }

    return exports.get2(property.substr(0, 2)) + exports.get1(property[2]);
};

exports.get = function() {
    var temp = random.from1to(1000);
    if(temp <= 475) return exports.get1();
    if(temp <= 950) return exports.get2();
    return exports.get3();
};

exports.dict = names;
