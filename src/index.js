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
      ExpressionStatement(statementPath) {
        statementPath.traverse({
          MemberExpression(path) {
            // ignore MemberExpression when it is on left side of
            // AssignmentExpression
            if (path.parent.type == 'AssignmentExpression' &&
                path.parent.left == path.node) {
              return;
            }

            statementPath.insertBefore(
              createPropertyAssert(t, path.node.object, path.node.property)
            );
          }
        });
      }
    }
  };
}
