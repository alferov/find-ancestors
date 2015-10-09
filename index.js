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

    // Every node during tree traversal is being added to an array
    // It helps to represent tree structure as a plain list (since each node
    // has own unique id and pointer to a parent node) and find parent using
    // iteration instead of recursion
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

// Get all parents nodes from a plain array
var findParentNodes = function(nodes, node) {
  var result = [];

  if (node) {
    result.push(node);
  }

  if (!nodes) {
    return result;
  }

  while (node.__parent) {
    var matchedNode;

    for (var i = 0; i < nodes.length; i++) {
      var item = nodes[i];

      if (item.__id !== node.__parent) {
        continue ;
      }

      node = matchedNode = item;
      result.push(node);
    }

    if (!matchedNode) {
      break ;
    }
  }

  return result;
};

/**
 * ancestors
 * Recursively find and return a nested node and all its ancestors (parents)
 * from a tree
 *
 * @name ancestors
 * @function
 * @param {Object} options An object containing the following fields:
 *
 *  - `data` (Array): An array of data
 *  - `childrenProperty` (String): A name of a property that contains nested
 * nodes. Default: 'children'
 *  - `predicate` (Function): Filter criteria
 *
 * @return {Array} Matched node and its ancestors
 */

module.exports = function ancestors(options) {
  options = extend({
    childrenProperty: 'children'
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

  return findParentNodes(searchResults.path, searchResults.result);
};
