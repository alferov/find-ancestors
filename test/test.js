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
    beforeEach(function() {
      current = findAncestors(initial, predicate);
    });

    it('doesn\'t mutate passed object', function() {
      expect(initial).to.be.deep.equal(initial);
    });

    it('finds nested objects & create links to the parents', function() {
      expect(current).to.be.deep.equal(expected);
    });

    it('returns a matched object from plain arrays & generate uniques meta IDs', function() {
      var custom = [{ id: 1}, { id: 4}];
      var currentPlain = findAncestors(custom, predicate);

      expect(currentPlain).to.be.deep.equal([{ id: 4, __id: 2 }]);
    });
  });

  describe('with invalid arguments', function() {
    it('throws an error if wrong arguments are passed', function() {
      expect(findAncestors.bind(null, 'string' ))
        .to.throw(TypeError);

      expect(findAncestors.bind(null, {}))
        .to.throw(/Expected an array/);

      expect(findAncestors.bind(null, []))
        .to.throw(/Expected a function/);

      expect(findAncestors.bind(null, [], predicate))
        .not.to.throw(TypeError);
    });
  });
});
