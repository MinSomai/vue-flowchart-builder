import { toRefs, getCurrentInstance } from "vue";
import { v4 as uuidv4 } from "uuid";

import { SYMBOLTYPES } from "@/helpers/const/SymbolTypes";
import deepClone from "@/helpers/deepClone";

/*
 * useFlowSingle
 */
export const useFlowGroup = () => {
  const { props, emit } = getCurrentInstance();
  const { schema, isGroupSiblingContainer } = toRefs(props);

  const addChildren = ({ symbolType }) => {
    let updated_schema = deepClone(schema.value);
    const options = {
      schema: props.schema,
      index: props.index,
      type: props.type,
      depth: props.depth,
      isGroupSiblingContainer: isGroupSiblingContainer.value,
    };

    const group = {
      type: "group",
      schema: {
        symbol: "decision",
        id: uuidv4(),
        children: [],
        next: [],
      },
    };

    const single = {
      type: "single",
      schema: {
        symbol: symbolType,
        id: uuidv4(),
      },
    };

    if (symbolType === SYMBOLTYPES.DECISION) {
      if (updated_schema.children.length == 0) {
        group.schema.next = updated_schema.next[0];
        updated_schema.next = [group.schema.id];
      }
      if (updated_schema.children.length > 0) {
        // const lastSibling = updated_schema.children[updated_schema.children.length - 1];

        group.schema.next = [];
        // group.schema.next.push(lastSibling.schema.next);
        updated_schema.next.push(group.schema.id);
      }
      updated_schema.children.push(group);
    } else {
      if (updated_schema.children.length == 0) {
        single.schema.next = updated_schema.next[0];
        updated_schema.next = [single.schema.id];
      }
      if (updated_schema.children.length > 0) {
        const lastSibling = updated_schema.children[updated_schema.children.length - 1];
        // TODO: doesn't work when the last child is an anonymous group
        if (lastSibling.type == SYMBOLTYPES.SIBLINGCONTAINER) {
          console.log("container");
        }
        // single.schema.next = updated_schema.children[updated_schema.children.length - 1].schema.next;
        updated_schema.next.push(single.schema.id);
      }
      updated_schema.children.push(single);
    }
    const updateOptions = {
      index: updated_schema.children.length - 1,
    };
    emit("update:schema", updated_schema);
    emit("update-sibling", { updatedItem: updated_schema, options, updateOptions });
    // emit("update:schema", updated_schema);
  };

  return {
    addChildren,
  };
};
