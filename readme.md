# find-ancestors

> Recursively find and return a nested node and all its ancestors (parents)
from a nested data structure (i.e. tree)

## Install

```
$ npm install --save find-ancestors
```

## Usage

```js
var findAncestors = require('find-ancestors');

var tree = [{
  id: 1,
  children: [{
    id: 2
  }, {
    id: 3
  }]
}];

var result = findAncestors({
  data: tree,
  predicate: function(item) {
    return item.id === 3;
  }
}); // => [{ id: 3 }, { id: 1, children: [{ id: 2 }, { id: 3 }] }]

```

## API

### `findAncestors(options)`
Recursively find and return a nested node and all its ancestors (parents) from a nested data structure (i.e. tree)

#### Params
**Object** `options`: An object containing the following fields:
- `data` (Array): An array of data
- `predicate` (Function): Filter criteria

#### Return
- **Array**: Matched node and its ancestors

## License
MIT © [Philipp Alferov](https://github.com/alferov)
