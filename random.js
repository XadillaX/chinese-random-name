var surnames = require("./lib/surname");
var names = require("./lib/name");

exports.surnames = surnames;
exports.names = names;

exports.generate = function(len) {
    var surname, name;
    if(undefined === len) {
        surname = surnames.getOne();
        name = names.get();
    } else if(len === 2) {
        do { surname = surname.getOne(); } while(surname.length !== 1);
        name = names.get();
    } else if(len === 3) {
        surname = surname.getOne();
        if(surname.length === 1) name = names.get2();
        if(surname.length === 2) name = names.get1();
    } else if(len === 4) {
        surname = surname.getOne();
        if(surname.length === 1) name = names.get3();
        if(surname.length === 2) name = names.get2();
    }

    var n = surname + name;
    return n;
};
