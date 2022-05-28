<script setup>
import { toRefs, computed } from "vue";

import Cross from "@/assets/svg/Cross.vue";

import { SYMBOLTYPES } from "@/helpers/const/SymbolTypes";
import { useFlowSingle } from "@/composables/useFlowSingle";
import { useSymbol } from "@/composables/useSymbol";

defineEmits(["add-sibling", "remove-child"]);

const props = defineProps({
  schema: Object,
  index: Number,
  depth: Number,
  type: String,
});
const { schema } = toRefs(props);

const { addSibling, removeSibling } = useFlowSingle();
const { getSymbol } = useSymbol();

const isSymbolRemovable = computed(() => {
  // restrict start and stop symbol removabl
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

      <div class="symbol-actions" v-if="isSymbolRemovable">
        <Cross @click="removeSibling({ symbolType: schema.symbol })" />
      </div>
      <div class="options-menu" v-show="schema.symbol !== SYMBOLTYPES.STOP">
        <div class="menu-item" @click="addSibling({ symbolType: 'process' })">Process</div>
        <div class="menu-item" @click="addSibling({ symbolType: 'io' })">IO</div>
        <div class="menu-item" @click="addSibling({ symbolType: 'data' })">Data</div>
        <div class="menu-item" @click="addSibling({ symbolType: 'decision' })">Decision</div>
      </div>
    </div>
  </div>
</template>
