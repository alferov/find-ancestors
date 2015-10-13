'use strict';
var chai = require('chai');
var expect = chai.expect;
var findAncestors = require('../index.js');
var initial = require('./fixtures/initial.js');
var expected = require('./fixtures/expected.js');
var current;
var predicate = function(item) {
  return item.id === 4;
};

describe('find-ancestors', function() {
  describe('with valid arguments', function() {

    it('should return a matched object from plain arrays & generate uniques meta IDs', function() {

      var custom = [{ id: 1}, { id: 4}];
      current = findAncestors({ data: custom, predicate: predicate});

      expect(current).to.be.deep.equal([{ id: 4, __id: 2 }]);
    });

    it('should be able to find nested objects & create links to parent', function() {

      var predicate = function(item) {
        return item.id === 4;
      };

      current = findAncestors({ data: initial, predicate: predicate});

      expect(current).to.be.deep.equal(expected);
    });
  });

  describe('with invalid arguments', function() {

    it('should throw an error if wrong arguments passed', function() {
      expect(findAncestors.bind(null, { data: 'string' }))
        .to.throw(TypeError);

      expect(findAncestors.bind(null, { data: {} }))
        .to.throw(/should be an array/);

      expect(findAncestors.bind(null, { data: [] }))
        .to.throw(/should be a function/);

      expect(findAncestors.bind(null, { data: [], predicate: predicate }))
        .not.to.throw(TypeError);
    });
  });
});
