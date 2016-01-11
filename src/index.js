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
  if (computed) {
    functionName = 'safeGetAttr';
  } else {
    functionName = 'safeGetItem';
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
        t.stringLiteral(property.name)
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
      },
      MemberExpression(path) {
        if (!path.node[ignoredNode]) {
          path.replaceWith(generateSafeGetCall(path.node.object,
                                               path.node.property,
                                               path.node.computed));
        }
      }
    }
  };
}
