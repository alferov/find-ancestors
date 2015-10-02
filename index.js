'use strict';

var extend = require('shallow-object-extend');
var isArray = require('isarray');
var isObject = require('isobject');

var find = function(object, childrenProperty, predicate) {
  var result = null;

  if (isArray(object)) {
    for (var i = 0; i < object.length; i++) {
      result = find(object[i], childrenProperty, predicate);

      if (result) {
        break;
      }
    }
  }

  if(isObject(object)) {
    if (predicate(object)) {
      return object;
    }

    if (object[childrenProperty]) {
      result = find(object[childrenProperty], childrenProperty, predicate);
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
    childrenProperty: 'children'
  }, options);

  if (!isArray(options.data)) {
    throw new TypeError('Expected array');
  }

  return find(options.data, options.childrenProperty, options.predicate);
};
