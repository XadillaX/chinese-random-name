var assert = require("assert");
var randomName = require("..");

function assertLength (name, length) {
    console.log(name);
    var ok = !length ? (name.length > 0) : name.length === length;
    assert.ok(ok, "Invlaid length!!" + name);
}

function run () {
    assertLength(randomName.generate());
    assertLength(randomName.surnames.getOne());
    assertLength(randomName.names.get());
    assertLength(randomName.names.get1(), 1);
    assertLength(randomName.names.get2(), 2);
    assertLength(randomName.names.get3(), 3);
    assertLength(randomName.names.get1("火"), 1);
    assertLength(randomName.names.get2("火火"), 2);
    assertLength(randomName.names.get3("火火火"), 3);
}

for(var i = 0; i < 10000; i++) run();
