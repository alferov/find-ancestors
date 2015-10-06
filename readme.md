# ancestors.js

> Recursively find and return a nested node and all its ancestors (parents)
from a tree

## Install

```
$ npm install --save ancestors.js
```

## Usage

```js
var ancestors = require('ancestors.js');

var tree = [{
  id: 1,
  children: [{
    id: 2
  }, {
    id: 3
  }]
}];

var result = ancestors({
  object: tree,
  childrenProperty: 'children',
  predicate: function(item) {
    return item.id === 3;
  }
}); // => [{ id: 3 }, { id: 1, children: [{ id: 2 }, { id: 3 }] }]

```

## API

### `ancestors(options)`
Recursively find and return a nested node and all its ancestors (parents) from a tree

#### Params
**Object** `options`: An object containing the following fields:
- `data` (Array): An array of data
- `childrenProperty` (String): A name of a property that contains nested nodes.
Default: 'children'
- `predicate` (Function): Filter criteria

#### Return
- **Array**: Matched node and its ancestors

## License
MIT © [Philipp Alferov](https://github.com/alferov)
