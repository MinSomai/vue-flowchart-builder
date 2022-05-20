<script setup>
import { markRaw, toRefs } from "vue";
import { v4 as uuidv4 } from "uuid";

import { SYMBOLTYPES } from "@/helpers/const/SymbolTypes";

import deepClone from "@/helpers/deepClone";

import Decision from "@/components/symbols/Decision.vue";
import Process from "@/components/symbols/Process.vue";
import Data from "@/components/symbols/Data.vue";
import Cross from "@/assets/svg/Cross.vue";

import FlowSingle from "@/components/FlowSingle.vue";
import FlowGroup from "@/components/FlowGroup.vue";
import FlowSibling from "@/components/FlowSibling.vue";

const props = defineProps({
  type: {
    type: String,
    default: "group",
  },
  schema: Object,
  index: Number,
  depth: Number,
  maxDepth: Number,
  isGroupSiblingContainer: Boolean,
});

const emit = defineEmits(["update:schema", "remove-sibling-group", "remove-children-group", "add-children-group"]);

const { schema, isGroupSiblingContainer, index } = toRefs(props);

const addSibling = ({ singleSchema, options }) => {
  //edge case:  when is single but not wrapped by single "GROUPSIBLINGCONTAINER"
  if (!isGroupSiblingContainer.value && schema.value.symbol != SYMBOLTYPES.SIBLINGCONTAINER) {
    console.info("TODO: edge case sibling", options);
    console.log(schema.value);
    return;
  }
  // otherwise
  let updated_schema = deepClone(schema.value);
  updated_schema.sibling.splice(options.index + 1, 0, singleSchema);
  emit("update:schema", updated_schema);
};

const removeSibling = (itemIndex) => {
  //edge case:  when is single but not wrapped by single "GROUPSIBLINGCONTAINER"
  // removing children
  if (!isGroupSiblingContainer.value && schema.value.symbol != SYMBOLTYPES.SIBLINGCONTAINER) {
    let updated_schema = deepClone(schema.value);

    if (updated_schema.children.length === 1) {
      // edge case when removing the last children"); // maybe unnecessary
      emit("remove-children-group", index.value);
    }
    updated_schema.children.splice(itemIndex, 1);
    emit("update:schema", updated_schema);
    return;
  }

  // removing sibling
  let updated_schema = deepClone(schema.value);
  if (updated_schema.sibling.length === 1) {
    // edge case when removing the last sibling");
    emit("remove-sibling-group", index.value);
  }
  updated_schema.sibling.splice(itemIndex, 1);
  emit("update:schema", updated_schema);
};

const addChildren = ({ symbolType }) => {
  const single = {
    type: "single",
    schema: {
      symbol: symbolType,
      id: uuidv4(),
    },
  };

  let updated_schema = deepClone(schema.value);
  updated_schema.children.splice(index.value + 1, 0, single);
  emit("update:schema", updated_schema);
};

const addChildrenGroup = (groupIndex) => {
  // wrap with another group
  console.log("edge case, add group from the grand parent", groupIndex);

  // if (!isGroupSiblingContainer.value && schema.value.symbol != SYMBOLTYPES.SIBLINGCONTAINER) {
  //   console.log("edge case");
  //   let groupChildren = {
  //     type: "group-sibling-container",
  //     schema: {
  //       symbol: "sibling-container",
  //       id: "12312312",
  //       sibling: [],
  //     },
  //   };
  //
  //   // not here pass one step above
  //   // let updated_schema = deepClone(schema.value);
  //   //
  //   // if (updated_schema.children.length === 1) {
  //   //   // edge case when removing the last children"); // maybe unnecessary
  //   //   emit("remove-children-group", index.value);
  //   // }
  //   // updated_schema.children.splice(index.value + 1, 0, groupChildren);
  //   // emit("update:schema", updated_schema);
  //   return;
  // }
  //
  // const group = {
  //   type: "group",
  //   schema: {
  //     symbol: "decision",
  //     id: uuidv4(),
  //     children: [],
  //   },
  // };
  //
  // let updated_schema = deepClone(schema.value);
  // updated_schema.children.splice(groupIndex.value + 1, 0, group);
  // emit("update:schema", updated_schema);
};

const addGroup = ({ groupSchema, options }) => {
  //edge case:  when is single but not wrapped by single "GROUPSIBLINGCONTAINER"
  if (!isGroupSiblingContainer.value && schema.value.symbol != SYMBOLTYPES.SIBLINGCONTAINER) {
    console.info("TODO: edge case group", options);
    console.log(schema.value);
    return;
  }
  // otherwise
  let updated_schema = deepClone(schema.value);
  updated_schema.sibling.splice(options.index + 1, 0, groupSchema);
  emit("update:schema", updated_schema);
};

markRaw({
  FlowSingle,
  FlowGroup,
});

// remove hidden composite
const removeSiblingGroup = (itemIndex) => {
  let updated_schema = deepClone(schema.value);
  updated_schema.children.splice(itemIndex, 1);
  emit("update:schema", updated_schema);
};

// remove normal group/composite
const removeChildrenGroup = (itemIndex) => {
  let updated_schema = deepClone(schema.value);
  updated_schema.sibling.splice(itemIndex, 1);
  emit("update:schema", updated_schema);
};

// delegates the deletion to parent
const removeChildrenGroupLocal = (itemIndex) => {
  emit("remove-children-group", itemIndex);
};

const addChildrenGroupLocal = (groupIndex) => {
  emit("add-children-group", groupIndex);
};

defineExpose({
  addSibling,
  removeSibling,
  removeSiblingGroup,
  removeChildrenGroup,
  addGroup,
  addChildrenGroup,
  FlowSingle,
  FlowGroup,
});

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
  }
};
</script>

<template>
  <div
    :class="{
      group: !isGroupSiblingContainer,
      'single group-sibling-container': isGroupSiblingContainer,
      [`depth-${depth}`]: true,
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
        'group-sibling-container-head': schema.children,
      }"
      :id="schema.id"
    >
      <div class="symbol">
        <component :is="getSymbol(schema.symbol)" />

        <div class="symbol-actions">
          <Cross @click="removeChildrenGroupLocal(index)" />
        </div>

        <div v-if="schema.symbol == 'main-container'">Vue Flowchart Builder</div>

        <div class="options-menu" v-if="depth > 0">
          <div class="menu-item" @click="addChildren({ symbolType: 'process' })">Process</div>
          <div class="menu-item" @click="addChildren({ symbolType: 'io' })">IO</div>
          <div class="menu-item" @click="addChildren({ symbolType: 'data' })">Data</div>
          <div class="menu-item" @click="addChildrenGroupLocal(index)">Decision</div>
        </div>
      </div>
    </div>

    <div
      v-if="(schema.children && schema.children.length > 0) || (schema.sibling && schema.sibling.length > 0)"
      :class="{
        'group-body': schema.sibling && !isGroupSiblingContainer,
        'group-sibling-container-body': schema.children && !isGroupSiblingContainer,
        'group-sibling-container-body': isGroupSiblingContainer,
        'group-body': !isGroupSiblingContainer,
      }"
    >
      <FlowSibling :class="`depth-${depth}`" v-bind="$props" :schema="schema" />
    </div>
  </div>
</template>
