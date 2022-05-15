import { getCurrentInstance } from "vue";
import { v4 as uuidv4 } from "uuid";
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

  const addSingle = ({ index, type, depth, symbolType }) => {
    let updated_schema = deepClone(schema);
    const single = {
      type: "single",
      schema: {
        symbol: symbolType,
        id: uuidv4()
      }
    };
    // console.log("abc: ", updated_schema);
    console.log("single: ", index, type, depth, symbolType);
  };

  return {
    remove,
    updateSchema,
    addSingle
  };
};
