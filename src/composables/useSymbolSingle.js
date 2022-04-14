import { getCurrentInstance } from "vue";
import deepClone from "@/helpers/deepClone";
/*
 * useSymbolSingle
 */

export const useSymbolSingle = ({ schema }) => {
  const { emit } = getCurrentInstance();

  const remove = index => {
    emit("deletion-requested", index);
  };

  const updateSchema = value => {
    let updated_shema = deepClone(schema);
    updated_shema.value = value;
    emit("update:schema", updated_shema);
  };

  return {
    remove,
    updateSchema,
  };
};
