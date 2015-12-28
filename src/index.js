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
            statementPath.insertBefore(
              createPropertyAssert(t, path.node.object, path.node.property)
            );
          }
        });
      }
    }
  };
}
