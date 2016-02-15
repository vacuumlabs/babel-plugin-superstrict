import * as t from 'babel-types';

const ignoredNode = Symbol('ignoredNode');

// returns t.memberExpression but marked to be ignored when visited
function getIgnoredMemberExpression(object, property, computed) {
  let node = t.memberExpression(object, property, computed);
  node[ignoredNode] = true;
  return node;
}

// require('../lib/safe_get.js')();
function generateRequire() {
  return t.expressionStatement(
    t.callExpression(
      t.callExpression(
        t.identifier('require'),
        [
          t.stringLiteral('../lib/safe_get.js')
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
      Program(path) {
        path.node.body = [
          generateRequire(),
          ...path.node.body
        ];

        let foundDirective = false;
        path.traverse({
          DirectiveLiteral(path) {
            if (path.node.value === 'use superstrict') {
              foundDirective = true;
            }
          }
        });

        // don't perform any transformation when directive is not found
        if (!foundDirective) {
          path.skip();
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
