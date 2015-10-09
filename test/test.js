'use strict';
var chai = require('chai');
var expect = chai.expect;
var ancestors = require('../index.js');
var initial = require('./fixtures/initial.js');
var expected = require('./fixtures/expected.js');
var current;

describe('ancestors', function() {
  describe('with valid arguments', function() {

    it('should return a matched object from plain arrays & generate uniques meta IDs', function() {
      var predicate = function(item) {
        return item.id === 4;
      };

      var custom = [{ id: 1}, { id: 4}];
      current = ancestors({ data: custom, predicate: predicate});

      expect(current).to.be.deep.equal([{ id: 4, __id: 2 }]);
    });

    it('should be able to find nested objects & create links to parent', function() {

      var predicate = function(item) {
        return item.id === 4;
      };

      current = ancestors({ data: initial, predicate: predicate});

      expect(current).to.be.deep.equal(expected);
    });
  });

  describe('with invalid arguments', function() {

    it('should throw an error if wrong arguments passed', function() {
      expect(ancestors.bind(null, { data: 'string' }))
        .to.throw(TypeError);

      expect(ancestors.bind(null, { data: {} }))
        .to.throw(/should be an array/);

      expect(ancestors.bind(null, { data: [] }))
        .to.throw(/should be a function/);
    });


  });
});
