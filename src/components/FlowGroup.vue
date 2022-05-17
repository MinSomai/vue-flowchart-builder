<script setup>
import { markRaw, toRefs } from "vue";
import { v4 as uuidv4 } from "uuid";

import { SYMBOLTYPES } from "@/helpers/const/SymbolTypes";

import deepClone from "@/helpers/deepClone";

import Decision from "@/components/symbols/Decision.vue";
import Process from "@/components/symbols/Process.vue";
import Data from "@/components/symbols/Data.vue";

import FlowSingle from "@/components/FlowSingle.vue";
import FlowGroup from "@/components/FlowGroup.vue";
import FlowSibling from "@/components/FlowSibling.vue";

const props = defineProps({
  type: {
    type: String,
    default: "group"
  },
  schema: Object,
  index: Number,
  depth: Number,
  maxDepth: Number,
  isGroupSiblingContainer: Boolean
});

const emit = defineEmits(["update:schema"]);

const { schema, isGroupSiblingContainer, index } = toRefs(props);

const addSibling = ({ singleSchema, options }) => {
  //edge case:  when is single but not wrapped by single "GROUPSIBLINGCONTAINER"
  if (
    !isGroupSiblingContainer.value &&
    schema.value.symbol != SYMBOLTYPES.SIBLINGCONTAINER
  ) {
    console.info("TODO: edge case");
    console.log(schema.value);
    return;
  }
  // otherwise
  let updated_schema = deepClone(schema.value);
  updated_schema.sibling.splice(options.index + 1, 0, singleSchema);
  emit("update:schema", updated_schema);
};

const removeSibling = index => {
  //edge case:  when is single but not wrapped by single "GROUPSIBLINGCONTAINER"
  if (
    !isGroupSiblingContainer.value &&
    schema.value.symbol != SYMBOLTYPES.SIBLINGCONTAINER
  ) {
    console.info("TODO: edge case");
    console.log(schema.value);
    return;
  }
  let updated_schema = deepClone(schema.value);
  updated_schema.sibling.splice(index, 1);
  emit("update:schema", updated_schema);
};

const addChildren = ({ symbolType }) => {
  if (symbolType == SYMBOLTYPES.DECISION) {
    return;
  }
  const single = {
    type: "single",
    schema: {
      symbol: symbolType,
      id: uuidv4()
    }
  };

  let updated_schema = deepClone(schema.value);
  updated_schema.children.splice(index.value + 1, 0, single);
  emit("update:schema", updated_schema);
};

markRaw({
  FlowSingle,
  FlowGroup
});

defineExpose({
  addSibling,
  removeSibling,
  FlowSingle,
  FlowGroup
});

const getSymbol = type => {
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
  }
};
</script>

<template>
  <div
    :class="{
      group: !isGroupSiblingContainer,
      'single group-sibling-container': isGroupSiblingContainer,
      [`depth-${depth}`]: true
    }"
  >
    <!-- Head for 'decision' -->
    <div
      v-if="!isGroupSiblingContainer"
      class="group-head"
      :class="{
        [schema.symbol]: true,
        symbol: depth > 0,
        [`depth-${depth}`]: true,
        'group-head': schema.sibling,
        'group-sibling-container-head': schema.children
      }"
      :id="schema.id"
    >
      <div class="symbol">
        <component :is="getSymbol(schema.symbol)" />

        <div v-if="schema.symbol == 'main-container'">
          Vue Flowchart Builder
        </div>

        <div class="options-menu" v-if="depth > 0">
          <div
            class="menu-item"
            @click="addChildren({ symbolType: 'process' })"
          >
            Process
          </div>
          <div class="menu-item" @click="addChildren({ symbolType: 'io' })">
            IO
          </div>
          <div class="menu-item" @click="addChildren({ symbolType: 'data' })">
            Data
          </div>
          <div
            class="menu-item"
            @click="addChildren({ symbolType: 'decision' })"
          >
            Decision
          </div>
        </div>
      </div>
    </div>

    <div
      :class="{
        'group-body': schema.sibling && !isGroupSiblingContainer,
        'group-sibling-container-body':
          schema.children && !isGroupSiblingContainer,
        'group-sibling-container-body': isGroupSiblingContainer,
        'group-body': !isGroupSiblingContainer
      }"
    >
      <FlowSibling :class="`depth-${depth}`" v-bind="$props" :schema="schema" />
    </div>
  </div>
</template>
