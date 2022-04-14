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

  const addSingle = () => {};

  return {
    remove,
    addGroup,
    addSingle,
  };
};
