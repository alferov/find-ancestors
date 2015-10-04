module.exports = [{
  id: 1,
  children: [{
    id: 2,
    __parent: 1,
    children: [{
      id: 3,
      __parent: 2
    }]
  }]
}, {
  id: 2,
  children: [{
    id: 3,
    __parent: 2
  }]
}, {
  id: 3,
  __parent: 2
}];
