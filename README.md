# Chinese Random Name

Generate Chinese name using Node.js with 💗.

## Installation

```sh
$ npm install chinese-random-name
```

## Usage

### Generate a Full Name Automatically

Using `generate` function:

```javascript
var randomName = require("chinese-random-name");

console.log(randomName.generate());
```

### Only Surname

Using `getOne` function in `surnames`.

```javascript
console.log(randomName.surnames.getOne());
```

### Name

Using `get` / `get1` / `get2` / `get3` function in `names`.

+ `get`: returns a random name and its length between 1 and 3.
+ `get1`: returns a random name with length 1. (you can pass a parameter which may be `"金"` / `"木"` / `"水"` / `"火"` / `"土"` or leave it blank)
+ `get2`: returns a random name with length 2. (you can pass `"金金"` / `"金木"` / ... or leave it blank)
+ `get3`: returns a random name with length 3. (you can pass `"金金金"` / `"水火土"` / ... or leave it blank)

Examples:

```javascript
randomName.names.get();
randomName.names.get1();
randomName.names.get2();
randomName.names.get3();
randomName.names.get1("金");
randomName.names.get2("木水");
randomName.names.get3("火火火");
```

## Related Article

http://xcoder.in/2014/09/01/how-i-made-chinese-random-x/

## Contribute

You're welcome to fork and make pull requests!

