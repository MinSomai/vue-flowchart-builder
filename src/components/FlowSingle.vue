<script setup>
import { toRefs } from "vue";

import { useSymbolSingle } from "@/composables/useSymbolSingle";

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

const { schema } = toRefs(props);
defineEmits(["deletion-requested", "update:schema"]);

const { remove, updateSchema, addProcess } = useSymbolSingle({
  schema: schema.value
});

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
        <div
          class="menu-item"
          @click="addProcess({ schema, index, type, depth })"
        >
          Process
        </div>
        <div class="menu-item">IO</div>
        <div class="menu-item">Data</div>
        <div class="menu-item">Decision</div>
      </div>
    </div>
  </div>
</template>
