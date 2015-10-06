'use strict';
var extend = require('shallow-object-extend');
var isArray = require('isarray');
var isObject = require('isobject');

// Generate unique ID
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

// Recursive tree traversal
var traverse = function(options) {
  var result = null;
  var object = options.object;
  var childrenProperty = options.childrenProperty;
  var predicate = options.predicate;
  var modifier = options.modifier;
  var parent = options.parent;

  if (isArray(object)) {
    for (var i = 0; i < object.length; i++) {
      result = traverse({
        object: object[i],
        childrenProperty: childrenProperty,
        predicate: predicate,
        modifier: modifier,
        parent: parent
      });

      if (result) {
        break ;
      }
    }
  }

  if (isObject(object)) {

    if (modifier) {
      object = modifier(object, parent);
    }

    if (predicate(object)) {
      return object;
    }

    if (object[childrenProperty]) {
      result = traverse({
        object: object[childrenProperty],
        childrenProperty: childrenProperty,
        predicate: predicate,
        modifier: modifier,
        parent: object.__id
      });

    }
  }

  return result;
};

var findNode = function(options) {
  var path = [];

  // Assign custom ids to each tree node to identify relationships between
  // nodes later
  var modifier = function(object, parent) {
    object.__id = generator.next();

    if (parent) {
      object.__parent = parent;
    }

    path.push(object);

    return object;
  };

  options = extend({
    // Callback that takes every node and its parent (if node is nested)
    // as arguments. It should return a node.
    modifier: modifier
  }, options);

  var result = traverse(options);

  return { result: result, path: path };
};

var findParentNodes = function(object, node, childrenProperty) {
  var nodes = [];

  var findParentNode = function(object, node, childrenProperty) {
    var result = null;
    var predicate = function(item) {
      return item.__id === node.__parent;
    }

    if (node) {
      nodes.push(node);
    }

    if (node.__parent) {

      result = traverse({
        object: object,
        childrenProperty: childrenProperty,
        predicate: predicate
      });

      if (result) {
        findParentNode(object, result, childrenProperty);
      }
    }

    return result;
  };

  findParentNode(object, node, childrenProperty);

  return nodes;
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

  if (!isArray(options.data)) {
    throw new TypeError('Expected array');
  }

  generator.empty();

  var searchResults = findNode({
    object: options.data,
    childrenProperty: options.childrenProperty,
    predicate: options.predicate
  });

  return findParentNodes(searchResults.path, searchResults.result, options.childrenProperty);
};
