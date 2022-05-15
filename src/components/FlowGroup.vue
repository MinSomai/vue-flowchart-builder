<script setup>
import { markRaw } from "vue";

import { SYMBOLTYPES } from "@/helpers/const/SymbolTypes";

import Decision from "@/components/symbols/Decision.vue";
import Process from "@/components/symbols/Process.vue";
import Data from "@/components/symbols/Data.vue";

import FlowSingle from "@/components/FlowSingle.vue";
import FlowGroup from "@/components/FlowGroup.vue";
import FlowSibling from "@/components/FlowSibling.vue";

const emit = defineEmits(["child-deletion-requested"]);

const props = defineProps({
  type: {
    type: String,
    default: "group"
  },
  schema: Object,
  index: Number,
  depth: Number,
  maxDepth: Number,
  isGroupSingle: Boolean
});

markRaw({
  FlowSingle,
  FlowGroup
});

const remove = () => {
  emit("child-deletion-requested", props.index);
};

const addProcess = ({ index, type, symbolType }) => {
  // console.log("xyz: ", schema, index, type);
  console.log("group: ", index, type, symbolType);
};

defineExpose({
  remove,
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
      group: !isGroupSingle,
      'single group-single': isGroupSingle,
      [`depth-${depth}`]: true
    }"
  >
    <!-- Head for 'decision' -->
    <div
      v-if="!isGroupSingle"
      class="group-head"
      :class="{
        [schema.symbol]: true,
        symbol: depth > 0,
        [`depth-${depth}`]: true,
        'group-head': schema.sibling,
        'group-single-head': schema.children
      }"
      :id="schema.id"
    >
      <div class="symbol">
        <component :is="getSymbol(schema.symbol)" />
        <div v-if="schema.symbol == 'container'">Vue Flowchart Builder</div>

        <div class="options-menu" v-if="depth > 0">
          <div
            class="menu-item"
            @click="addProcess({ schema, index, type, symbolType: 'process' })"
          >
            Process
          </div>
          <div
            class="menu-item"
            @click="addProcess({ schema, index, type, symbolType: 'io' })"
          >
            IO
          </div>
          <div
            class="menu-item"
            @click="addProcess({ schema, index, type, symbolType: 'data' })"
          >
            Data
          </div>
          <div
            class="menu-item"
            @click="addProcess({ schema, index, type, symbolType: 'decision' })"
          >
            Decision
          </div>
        </div>
      </div>
    </div>

    <div
      :class="{
        'group-body': schema.sibling && !isGroupSingle,
        'group-single-body': schema.children && !isGroupSingle,
        'group-single-body': isGroupSingle,
        'group-body': !isGroupSingle
      }"
    >
      <FlowSibling :class="`depth-${depth}`" v-bind="$props" :schema="schema" />
    </div>
  </div>
</template>
