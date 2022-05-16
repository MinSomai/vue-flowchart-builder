<script setup>
import { v4 as uuidv4 } from "uuid";

import { SYMBOLTYPES } from "@/helpers/const/SymbolTypes";

import Start from "@/components/symbols/Start.vue";
import Stop from "@/components/symbols/Stop.vue";
import Process from "@/components/symbols/Process.vue";
import Data from "@/components/symbols/Data.vue";

const props = defineProps({
  schema: Object,
  index: Number,
  depth: Number,
  type: String
});

const emit = defineEmits(["add-sibling"]);

const addSibling = ({ symbolType }) => {
  const options = {
    schema: props.schema,
    index: props.index,
    type: props.type,
    depth: props.depth
  };

  const single = {
    type: "single",
    schema: {
      symbol: symbolType,
      id: uuidv4()
    }
  };

  emit("add-sibling", { singleSchema: single, options });
};

const getSymbol = type => {
  switch (type) {
    case SYMBOLTYPES.START:
      return Start;
    case SYMBOLTYPES.STOP:
      return Stop;
    case SYMBOLTYPES.PROCESS:
      return Process;
    case SYMBOLTYPES.DATA:
      return Data;
  }
};
</script>

<template>
  <div
    class="single symbol"
    :class="{
      [schema.symbol]: true,
      [`depth-${depth}`]: true
    }"
  >
    <div class="symbol">
      <component :is="getSymbol(schema.symbol)" />

      <div class="options-menu">
        <div class="menu-item" @click="addSibling({ symbolType: 'process' })">
          Process
        </div>
        <div class="menu-item" @click="addSibling({ symbolType: 'io' })">
          IO
        </div>
        <div class="menu-item" @click="addSibling({ symbolType: 'data' })">
          Data
        </div>
        <div class="menu-item" @click="addSibling({ symbolType: 'decision' })">
          Decision
        </div>
      </div>
    </div>
  </div>
</template>
