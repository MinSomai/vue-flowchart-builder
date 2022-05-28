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
      },
    };

    if (symbolType === SYMBOLTYPES.DECISION) {
      emit("add-sibling", { newSchema: group, options });
    } else {
      emit("add-sibling", { newSchema: single, options });
    }
  };

  const removeSibling = ({ symbolType }) => {
    if (symbolType == SYMBOLTYPES.START || symbolType === SYMBOLTYPES.STOP) return;
    emit("remove-sibling", props.index);
  };

  return {
    addSibling,
    removeSibling,
  };
};