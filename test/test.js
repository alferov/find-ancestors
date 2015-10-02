'use strict';
var chai = require('chai');
var expect = chai.expect;
var ancestors = require('../index.js');
var initial = require('./fixtures/initial.js');
var expected = require('./fixtures/expected.js');
var current;

describe('ancestors', function() {
  describe('with valid arguments', function() {

    it('should return a matched object from plain arrays', function() {
      var predicate = function(item) {
        return item.id === 4;
      };

      var custom = [{ id: 1}, { id: 4 }];
      current = ancestors({ data: custom, predicate: predicate});

      expect(current).to.be.deep.equal({ id: 4 });
    });

  });

  describe('with invalid arguments', function() {

    it('should throw an error if wrong arguments passed', function() {
      expect(ancestors.bind(null, { data: 'string' }))
        .to.throw(TypeError);

      expect(ancestors.bind(null, { data: {} }))
        .to.throw(TypeError);
    });


  });
});
