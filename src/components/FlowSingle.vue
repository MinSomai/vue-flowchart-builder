<script setup>
import { toRefs, computed } from "vue";
import { v4 as uuidv4 } from "uuid";

import { SYMBOLTYPES } from "@/helpers/const/SymbolTypes";

import Start from "@/components/symbols/Start.vue";
import Stop from "@/components/symbols/Stop.vue";
import Process from "@/components/symbols/Process.vue";
import Data from "@/components/symbols/Data.vue";
import IO from "@/components/symbols/IO.vue";
import Cross from "@/assets/svg/Cross.vue";

const props = defineProps({
  schema: Object,
  index: Number,
  depth: Number,
  type: String,
});

const emit = defineEmits(["add-sibling", "remove-sibling", "add-group"]);

const { schema } = toRefs(props);

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
  emit("add-sibling", { singleSchema: single, options });
};

const removeSibling = ({ symbolType }) => {
  if (symbolType == SYMBOLTYPES.START || symbolType === SYMBOLTYPES.STOP) return;
  emit("remove-sibling", props.index);
};

const addGroup = ({ symbolType }) => {
  const options = {
    schema: props.schema,
    index: props.index,
    type: props.type,
    depth: props.depth,
  };

  const group = {
    type: "group",
    schema: {
      symbol: symbolType,
      id: uuidv4(),
      children: [],
    },
  };

  emit("add-group", { groupSchema: group, options });
};

const getSymbol = (type) => {
  switch (type) {
    case SYMBOLTYPES.START:
      return Start;
    case SYMBOLTYPES.STOP:
      return Stop;
    case SYMBOLTYPES.PROCESS:
      return Process;
    case SYMBOLTYPES.IO:
      return IO;
    case SYMBOLTYPES.DATA:
      return Data;
  }
};

const showActions = computed(() => {
  const hide = [SYMBOLTYPES.STOP, SYMBOLTYPES.START];
  return !hide.includes(schema.value.symbol);
});
</script>

<template>
  <div
    class="single symbol"
    :class="{
      [schema.symbol]: true,
      [`depth-${depth}`]: true,
    }"
  >
    <div :id="schema.id" class="symbol">
      <component :is="getSymbol(schema.symbol)" />

      <div class="symbol-actions" v-if="showActions">
        <Cross @click="removeSibling({ symbolType: schema.symbol })" />
      </div>
      <div class="options-menu" v-show="schema.symbol !== SYMBOLTYPES.STOP">
        <div class="menu-item" @click="addSibling({ symbolType: 'process' })">Process</div>
        <div class="menu-item" @click="addSibling({ symbolType: 'io' })">IO</div>
        <div class="menu-item" @click="addSibling({ symbolType: 'data' })">Data</div>
        <div class="menu-item" @click="addGroup({ symbolType: 'decision' })">Decision</div>
      </div>
    </div>
  </div>
</template>
