import { getCurrentInstance } from "vue";
import { v4 as uuidv4 } from "uuid";

import { SYMBOLTYPES } from "@/helpers/const/SymbolTypes";

/*
 * useFlowSingle
 */
export const useFlowSingle = () => {
  const { props, emit } = getCurrentInstance();

  const addSibling = ({ symbolType }) => {
    const options = {
      schema: props.schema,
      index: props.index,
      type: props.type,
      depth: props.depth,
    };

    const single = {
      type: "single",
      schema: {
        symbol: symbolType,
        id: uuidv4(),
      },
    };

    const group = {
      type: "group",
      schema: {
        symbol: symbolType,
        id: uuidv4(),
        children: [],
        next: [],
      },
    };

    if (symbolType === SYMBOLTYPES.DECISION) {
      emit("add-sibling", { newItem: group, options });
    } else {
      emit("add-sibling", { newItem: single, options });
    }
  };

  const removeSibling = ({ symbolType }) => {
    if (symbolType == SYMBOLTYPES.START || symbolType === SYMBOLTYPES.STOP) return;
    const options = {
      schema: props.schema,
      index: props.index,
      type: props.type,
      depth: props.depth,
    };
    emit("remove-child", { itemIndex: props.index, options });
  };

  return {
    addSibling,
    removeSibling,
  };
};
