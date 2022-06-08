// useRecursiveFlowchartHelper builds an array of nodes
export const useRecursiveFlowchartHelper = () => {
  const recursiveNodesBuilder = (child) => {
    if (child.type === "single") {
      if (child.schema.symbol == "stop") {
        return;
      }
      const edge = {
        nodeID: child.schema.id,
      };
      return edge;
    }

    if (child.type === "group") {
      let innerEdges = [];

      child.schema.children.forEach((innerChild) => {
        let edge = recursiveNodesBuilder(innerChild);
        if (Array.isArray(edge)) {
          innerEdges = [...innerEdges, ...edge];
        } else {
          innerEdges.push(recursiveNodesBuilder(innerChild));
        }
      });
      return innerEdges;
    }

    if (child.type === "group-sibling-container") {
      // this is an anonymous group and doesn't have self 'next' like 'group''s next[]
      let innerEdges = [];
      child.schema.sibling.forEach((innerSibling) => {
        let edge = recursiveNodesBuilder(innerSibling);
        if (Array.isArray(edge)) {
          innerEdges = [...innerEdges, ...edge];
        } else {
          innerEdges.push(recursiveNodesBuilder(innerSibling));
        }
      });
      return innerEdges;
    }
  };

  const getNodes = (schema) => {
    let rawEdges = [];
    schema.sibling.forEach((sibling) => {
      let edge = recursiveNodesBuilder(sibling);
      if (Array.isArray(edge)) {
        rawEdges = [...rawEdges, ...edge];
      } else {
        rawEdges.push(recursiveNodesBuilder(sibling));
      }
    });
    return rawEdges;
  };
  return {
    getNodes,
  };
};
