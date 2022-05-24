// useRecursiveEdgeBuilder builds an array of object with start and stop property for each edge
export const useRecursiveEdgeBuilder = () => {
  const recursiveEdgeBuilder = (child) => {
    if (child.type === "single") {
      const edge = {
        start: child.schema.id,
        end: child.schema.next,
      };
      return edge;
    }

    if (child.type === "group") {
      let innerEdges = [];

      child.schema.next.forEach((nextChild) => {
        let edge = {
          start: child.schema.id,
          end: nextChild,
        };
        innerEdges.push(edge);
      });

      child.schema.children.forEach((innerChild) => {
        let edge = recursiveEdgeBuilder(innerChild);
        if (Array.isArray(edge)) {
          innerEdges = [...innerEdges, ...edge];
        } else {
          innerEdges.push(recursiveEdgeBuilder(innerChild));
        }
      });
      return innerEdges;
    }

    if (child.type === "group-sibling-container") {
      // this is an anonymous group and doesn't have self 'next' like 'group''s next[]
      let innerEdges = [];
      child.schema.sibling.forEach((innerSibling) => {
        let edge = recursiveEdgeBuilder(innerSibling);
        if (Array.isArray(edge)) {
          innerEdges = [...innerEdges, ...edge];
        } else {
          innerEdges.push(recursiveEdgeBuilder(innerSibling));
        }
      });
      return innerEdges;
    }
  };
  return {
    recursiveEdgeBuilder,
  };
};
