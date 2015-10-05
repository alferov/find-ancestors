module.exports = [{
  id: 1,
  __id: 1,
  children: [{
      __id: 2,
      __parent: 1,
      id: 2
    }, {
    id: 3,
    __id: 3,
    __parent: 1,
    children: [{
      id: 4,
      __id: 4,
      __parent: 3
    }]
  }]
}, {
  id: 3,
  __id: 3,
  __parent: 1,
  children: [{
    id: 4,
    __id: 4,
    __parent: 3
  }]
}, {
  id: 4,
  __id: 4,
  __parent: 3
}];
