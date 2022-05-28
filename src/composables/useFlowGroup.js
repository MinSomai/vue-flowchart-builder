import { toRefs, getCurrentInstance } from "vue";
import { v4 as uuidv4 } from "uuid";

import { SYMBOLTYPES } from "@/helpers/const/SymbolTypes";
import deepClone from "@/helpers/deepClone";

/*
 * useFlowSingle
 */
export const useFlowGroup = () => {
  const { props, emit } = getCurrentInstance();
  const { schema } = toRefs(props);

  const addChildren = ({ symbolType }) => {
    const group = {
      type: "group",
      schema: {
        symbol: "decision",
        id: uuidv4(),
        children: [],
      },
    };

    const single = {
      type: "single",
      schema: {
        symbol: symbolType,
        id: uuidv4(),
      },
    };

    let updated_schema = deepClone(schema.value);
    if (symbolType === SYMBOLTYPES.DECISION) {
      updated_schema.children.push(group);
    } else {
      updated_schema.children.push(single);
    }
    emit("update:schema", updated_schema);
  };

  return {
    addChildren,
  };
};
