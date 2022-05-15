import { getCurrentInstance } from "vue";
import deepClone from "@/helpers/deepClone";
/*
 * useSymbolGroup
 */

export const useSymbolGroup = ({ schema }) => {
  const { emit } = getCurrentInstance();

  const remove = index => {
    emit("deletion-requested", index);
  };

  const addGroup = () => {};

  const addSingle = ({ index, type, depth, symbolType }) => {
    // console.log("group adding single: ", schema);
    console.log("group: ", index, type, depth, symbolType);
  };

  return {
    remove,
    addGroup,
    addSingle
  };
};
