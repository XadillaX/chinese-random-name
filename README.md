# Chinese Random Name

Generate Chinese name by using Node.js with ❤️.

## Installation

```sh
$ npm --save install chinese-random-name
```

## Usage

First you need to require this package:

```javascript
const randomName = require('chinese-random-name');
```

> **If you're using it from Browser environment, do require
> `chinese-random-name/random.min`.**

### Generate a Full Name Automatically

Use `generate()` function:

```javascript
console.log(randomName.generate());
```

### Only Surname

Use `getOne` function in `surnames`.

```javascript
console.log(randomName.surnames.getOne());
```

`getOne` has an optional parameter `opt`. You may pass a field named
`useSurnamesCountAtTheTop` to specify only get surname from most top
`useSurnamesCountAtTheTop` surnames. e.g.

```javascript
randomName.surnames.getOne({ useSurnamesCountAtTheTop: 100 });
```

It means the function only select a random surname from the most top 100
surnames.

### Name

Use `get` / `get1` / `get2` / `get3` function in `names`.

+ `get`: returns a random name and its length between 1 and 3.
+ `get1`: returns a random name with length 1. (you can pass a parameter which may be `"金"` / `"木"` / `"水"` / `"火"` / `"土"` or leave it blank)
+ `get2`: returns a random name with length 2. (you can pass `"金金"` / `"金木"` / ... or leave it blank)
+ `get3`: returns a random name with length 3. (you can pass `"金金金"` / `"水火土"` / ... or leave it blank)
+ `dict`: the dictionary object.

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
