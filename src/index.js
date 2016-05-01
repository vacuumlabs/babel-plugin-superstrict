import * as t from 'babel-types';

const ignoredNode = Symbol('ignoredNode');

// returns t.memberExpression but marked to be ignored when visited
function getIgnoredMemberExpression(object, property, computed) {
  let node = t.memberExpression(object, property, computed);
  node[ignoredNode] = true;
  return node;
}

// var safeGetItem = require('../lib/safe_get.js').safeGetItem;
function generateRequire(method, safeGetFilePath) {
  return t.variableDeclaration(
    'var',
    [
      t.variableDeclarator(
        t.identifier(method),
        getIgnoredMemberExpression(
          t.callExpression(
            t.identifier('require'),
            [
              t.stringLiteral(safeGetFilePath)
            ]
          ),
          t.identifier(method),
          false
        )
      )
    ]
  );
};

// safeGetItem(object, 'property');
// safeGetAttr(object, 'property');
function generateSafeGetCall(object, property, computed) {
  let functionName;
  let propertyNode;
  if (computed) {
    functionName = 'safeGetAttr';
    propertyNode = property;
  } else {
    functionName = 'safeGetItem';
    propertyNode = t.stringLiteral(property.name);
  }

  return t.callExpression(
    t.identifier(functionName),
    [
      object,
      propertyNode
    ]
  );
};

function splitMultipleDirectives(directive) {
  if (!directive.startsWith('use ')) {
    return [];
  }

  return directive.slice(4) // ommit 'use '
    .split(',')
    .map((directive) => directive.trim());
}

export default function() {
  return {
    visitor: {
      Program(path, {opts}) {
        let directivePolicy = opts['directivePolicy'];
        if (!directivePolicy) {
          directivePolicy = 'opt in'; // default policy
        }

        let foundPositiveDirective = false;
        let foundNegativeDirective = false;

        for (const directiveNode of path.node.directives) {
          const directiveString = directiveNode.value.value
          const directives = splitMultipleDirectives(directiveString);
          for (const directive of directives) {
            if (directive === 'superstrict') {
              foundPositiveDirective = true;
            } else if (directive === '!superstrict') {
              foundNegativeDirective = true;
            }
          }
        }

        // 'opt in' transpiles only files with positive directive
        if ((directivePolicy === 'opt in') && (!foundPositiveDirective)) {
          path.skip();
        // 'opt out' transpiles all files except those with negative directive
        } else if ((directivePolicy === 'opt out') && (foundNegativeDirective)) {
          path.skip();
        // in other cases or with 'everything' policy transpile file
        } else {
          path.node.body = [
            generateRequire('safeGetItem', opts['safeGetFilePath']),
            generateRequire('safeGetAttr', opts['safeGetFilePath']),
            generateRequire('safeGetImmutableJs', opts['safeGetFilePath']),
            ...path.node.body
          ];
        }
      },
      // transform map.get('a') to safeGetImmutableJs(map, 'a')
      // do not transform if get has two arguments - second is default value
      // used when key is not found
      CallExpression(path) {
        const memberExpression = path.node.callee; // map.get
        const property = path.node.arguments[0]; // 'a'

        if ((memberExpression.type === 'MemberExpression') &&
            (memberExpression.property.type === 'Identifier') &&
            (memberExpression.property.name === 'get') &&
            (path.node.arguments.length === 1)) {
          path.replaceWith(t.callExpression(
            t.identifier('safeGetImmutableJs'),
            [
              memberExpression.object,
              property
            ]
          ));
        }
      },
      // ignore left sides of assignments
      AssignmentExpression(path) {
        path.node.left[ignoredNode] = true;
      },
      MemberExpression(path) {
        if (path.node[ignoredNode]) {
          path.skip();
        } else {
          path.replaceWith(generateSafeGetCall(path.node.object,
                                               path.node.property,
                                               path.node.computed));
        }
      }
    }
  };
}
