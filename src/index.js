function createPropertyAssert(t, object, property) {
  // assert(property in object);
  return t.expressionStatement(
    t.callExpression(
      t.identifier("assert"),
      [t.binaryExpression(
        "in",
        property,
        object
      )]
    )
  );
}

export default function ({ types: t }) {
  return {
    visitor: {
      Statement(statementPath) {
        statementPath.traverse({
          MemberExpression(path) {
            // ignore MemberExpression when it is on left side of
            // AssignmentExpression
            if (t.isAssignmentExpression(path.parent) &&
                path.parent.left === path.node) {
              return;
            }

            // if property is constant (literal or identifier)
            // just assert it before ExpressionStatement
            if (t.isLiteral(path.node.property) ||
                t.isIdentifier(path.node.property)) {
              statementPath.insertBefore(
                createPropertyAssert(t, path.node.object, path.node.property)
              );
            }
            // else property is expression and we have to avoid evaluating
            // it twice so we ...
            else {
              // ... precalculate index to temporary variable ...
              const id = path.scope.generateUidIdentifier("index");
              statementPath.scope.push({ id, init: path.node.property });
              // ..assert it before expressionStatement ...
              statementPath.insertBefore(
                createPropertyAssert(t, path.node.object, id)
              );
              // ... and replace original property with this variable
              path.node.property = id;
            }
          }
        });
      }
    }
  };
}
