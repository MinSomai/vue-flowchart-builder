import Decision from "@/components/symbols/Decision.vue";
import Start from "@/components/symbols/Start.vue";
import Stop from "@/components/symbols/Stop.vue";
import Process from "@/components/symbols/Process.vue";
import Data from "@/components/symbols/Data.vue";
import IO from "@/components/symbols/IO.vue";

import { SYMBOLTYPES } from "@/helpers/const/SymbolTypes";

/*
 * useFlowSingle
 */
export const useSymbol = () => {
  const getSymbol = (type) => {
    switch (type) {
      case SYMBOLTYPES.DECISION:
        return Decision;
      case SYMBOLTYPES.PROCESS:
        return Process;
      case SYMBOLTYPES.DATA:
        return Data;
      case SYMBOLTYPES.PARALLEL:
        // TODO: parallel type
        return Data;
      case SYMBOLTYPES.START:
        return Start;
      case SYMBOLTYPES.STOP:
        return Stop;
      case SYMBOLTYPES.IO:
        return IO;
    }
  };
  return {
    getSymbol,
  };
};
