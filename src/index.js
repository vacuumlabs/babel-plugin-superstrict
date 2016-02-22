import * as t from 'babel-types';

const ignoredNode = Symbol('ignoredNode');

// returns t.memberExpression but marked to be ignored when visited
function getIgnoredMemberExpression(object, property, computed) {
  let node = t.memberExpression(object, property, computed);
  node[ignoredNode] = true;
  return node;
}

// require('../lib/safe_get.js')();
function generateRequire(safeGetFilePath) {
  return t.expressionStatement(
    t.callExpression(
      t.callExpression(
        t.identifier('require'),
        [
          t.stringLiteral(safeGetFilePath)
        ]
      ),
      []
    )
  );
};

// object[Symbol.for('safeGetItem/safeGetAttr')]('property');
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

  return t.expressionStatement(
    t.callExpression(
      getIgnoredMemberExpression(
        object,
        t.callExpression(
          getIgnoredMemberExpression(
            t.identifier('Symbol'),
            t.identifier('for'),
            false
          ),
          [
            t.stringLiteral(functionName)
          ]
        ),
        true
      ),
      [
        propertyNode
      ]
    )
  );
};

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
        path.traverse({
          DirectiveLiteral(path) {
            if (path.node.value === 'use superstrict') {
              foundPositiveDirective = true;
            } else if (path.node.value === 'use !superstrict') {
              foundNegativeDirective = true;
            }
          }
        });

        // 'opt in' transpiles only files with positive directive
        if ((directivePolicy === 'opt in') && (!foundPositiveDirective)) {
          path.skip();
        // 'opt out' transpiles all files except those with negative directive
        } else if ((directivePolicy === 'opt out') && (foundNegativeDirective)) {
          path.skip();
        // in other cases or with 'everything' policy transpile file
        } else {
          path.node.body = [
            generateRequire(opts['safeGetFilePath']),
            ...path.node.body
          ];
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
