'use strict';

var extend = require('shallow-object-extend');
var isArray = require('isarray');
var isObject = require('isobject');

var generateUniqueNumber = function() {
  var unique = 0;

  return {
    next: function() {
      return ++unique;
    },
    empty: function() {
      unique = 0;
    }
  };
};

var generator = generateUniqueNumber();

var traverse = function(object, childrenProperty, predicate, parent) {
  var result = null;

  if (isArray(object)) {
    for (var i = 0; i < object.length; i++) {
      result = traverse(object[i], childrenProperty, predicate, parent);

      if (result) {
        break ;
      }
    }
  }

  if (isObject(object)) {
    object.__id = generator.next();

    if (parent) {
      object.__parent = parent;
    }

    if (predicate(object)) {
      return object;
    }

    if (object[childrenProperty]) {
      result = traverse(object[childrenProperty], childrenProperty, predicate, object.__id);
    }
  }

  return result;
};
/**
 * ancestors
 *
 * @name ancestors
 * @function
 * @return
 */

module.exports = function ancestors(options) {
  options = extend({
    childrenProperty: 'children',
    identifier: 'id'
  }, options);

  generator.empty();

  if (!isArray(options.data)) {
    throw new TypeError('Expected array');
  }

  return traverse(options.data, options.childrenProperty, options.predicate);
};
