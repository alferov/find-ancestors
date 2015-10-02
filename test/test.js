'use strict';
var chai = require('chai');
var expect = chai.expect;
var parentsOfNested = require('../index.js');
var initial = require('./fixtures/initial.js');
var expected = require('./fixtures/expected.js');
var current;

describe('parents-of-nested', function() {
  describe('with valid arguments', function() {

    before(function() {
      current = parentsOfNested({ data: initial });
    });

    it('should return an array', function() {
      expect(current).to.be.an('array');
    });

    it('should return an expected value', function() {
      expect(current).to.be.deep.equal(expected);
    });
  });

  describe('with invalid arguments', function() {
    it('should return an empty array if the empty array passed', function() {
      expect(parentsOfNested({ data: [] })).to.be.deep.equal([]);
    });

    it('should throw an error if wrong arguments passed', function() {
      expect(parentsOfNested.bind(null, { data: 'string' }))
        .to.throw(/invalid argument/);

      expect(parentsOfNested.bind(null, { data: {} }))
        .to.throw(/invalid argument/);
    });

  });
});
