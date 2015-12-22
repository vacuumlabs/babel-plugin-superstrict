export default function () {
  return {
    visitor: {
      Program(path) {
        const firstStatement = path.node.body[0];
        console.log(firstStatement.type);
      }
    }
  };
}
