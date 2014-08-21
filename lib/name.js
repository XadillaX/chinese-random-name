var fs = require("fs");
var dict = fs.readFileSync(__dirname + "/../dict/n.dict", "utf8");
dict = dict.split("\n");
dict = dict.map(function(d) {
    return d.split(" ");
});

function propertiesInterval(n1, n2) {
    if(n1 > n2) {
        n1 += n2;
        n2 = n1 - n2;
        n1 -= n2;
    }

    return Math.min(n2 - n1, n1 + 5 - n2);
};

const properties = [ "金", "木", "水", "火", "土" ];
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
        if(1 === interval) combination2Max += 20;
        if(2 === interval) combination2Max += 50;

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
        if(base === 1) base = 20;
        if(base === 2) base = 50;
        for(var k = 0; k < 5; k++) {
            var temp = { property: properties[i] + properties[j] + properties[j] };
            temp.min = combination3Max;

            var interval = propertiesInterval(j, k);
            if(0 === interval) combination3Max += 100;
            if(1 === interval) combination3Max += 20;
            if(2 === interval) combination3Max += 50;
            combination3Max += base;

            temp.max = combination3Max - 1;
            
            combination3.push(temp);
        }
    }
}

exports.get1 = function(property) {
    if(undefined === property) property = properties[Number.random(0, 4)];

    var temp = names[property];
    var idx = Number.random(0, temp.length - 1);
    return temp[idx];
};

exports.get2 = function(property) {
    if(undefined === property) {
        var idx = Number.random(0, combination2Max - 1);
        property = combination2.find(function(p) {
            return p.min <= idx && p.max >= idx;
        }).property;
    }

    return exports.get1(property[0]) + exports.get1(property[1]);
};

exports.get3 = function(property) {
    if(undefined === property) {
        var idx = Number.random(0, combination3Max - 1);
        property = combination3.find(function(p) {
            return p.min <= idx && p.max >= idx;
        });
    }

    return exports.get2(property.property.substr(0, 2)) + exports.get1(property.property[2]);
};

exports.get = function() {
    var temp = Number.random(1, 1000);
    if(temp <= 475) return exports.get1();
    if(temp <= 950) return exports.get2();
    return exports.get3();
};

