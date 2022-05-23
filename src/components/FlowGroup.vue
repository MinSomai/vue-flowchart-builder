<script setup>
import { markRaw, toRefs, onMounted } from "vue";
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
  let updated_schema = deepClone(schema.value);
  //edge case:  when is single but not wrapped by single "GROUPSIBLINGCONTAINER"
  if (!isGroupSiblingContainer.value && schema.value.symbol != SYMBOLTYPES.SIBLINGCONTAINER) {
    const groupSiblingContainer = {
      type: "group-sibling-container",
      schema: {
        symbol: "sibling-container",
        id: uuidv4(),
        sibling: [],
      },
    };

    let existingSibling = updated_schema.children[options.index];
    groupSiblingContainer.schema.sibling.push(existingSibling);
    groupSiblingContainer.schema.sibling.push(singleSchema);

    emit("update:schema", updated_schema);
    updated_schema.children.splice(options.index, 1, groupSiblingContainer);
    emit("update:schema", updated_schema);
    return;
  }
  // otherwise
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

const addGroup = ({ groupSchema, options }) => {
  //edge case:  when is single but not wrapped by single "GROUPSIBLINGCONTAINER"
  let updated_schema = deepClone(schema.value);
  if (!isGroupSiblingContainer.value && schema.value.symbol != SYMBOLTYPES.SIBLINGCONTAINER) {
    const groupSiblingContainer = {
      type: "group-sibling-container",
      schema: {
        symbol: "sibling-container",
        id: uuidv4(),
        sibling: [],
      },
    };

    let existingSibling = updated_schema.children[options.index];
    groupSiblingContainer.schema.sibling.push(existingSibling);
    groupSiblingContainer.schema.sibling.push(groupSchema);

    emit("update:schema", updated_schema);
    updated_schema.children.splice(options.index, 1, groupSiblingContainer);
    emit("update:schema", updated_schema);
    return;
  }
  // otherwise
  updated_schema.sibling.splice(options.index + 1, 0, groupSchema);
  // updated_schema.sibling.push(groupSchema);
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

// add children for the current group type (happens in the current component/ not delegated)
const addChildrenGroupLocal = ({ symbolType }) => {
  const group = {
    type: "group",
    schema: {
      symbol: "decision",
      id: uuidv4(),
      children: [],
    },
  };

  const single = {
    type: "single",
    schema: {
      symbol: symbolType,
      id: uuidv4(),
    },
  };
  let updated_schema = deepClone(schema.value);
  if (symbolType === SYMBOLTYPES.DECISION) {
    updated_schema.children.push(group);
  } else {
    updated_schema.children.push(single);
  }
  emit("update:schema", updated_schema);
};

// delegates the deletion to parent
const removeChildrenGroupLocal = (itemIndex) => {
  emit("remove-children-group", itemIndex);
};

defineExpose({
  addSibling,
  removeSibling,
  removeSiblingGroup,
  removeChildrenGroup,
  addGroup,
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
    >
      <div class="symbol" :id="schema.id">
        <component :is="getSymbol(schema.symbol)" />

        <div class="symbol-actions">
          <Cross @click="removeChildrenGroupLocal(index)" />
        </div>

        <div v-if="schema.symbol == 'main-container'">Vue Flowchart Builder</div>

        <div class="options-menu" v-if="depth > 0">
          <div class="menu-item" @click="addChildrenGroupLocal({ symbolType: 'process' })">Process</div>
          <div class="menu-item" @click="addChildrenGroupLocal({ symbolType: 'io' })">IO</div>
          <div class="menu-item" @click="addChildrenGroupLocal({ symbolType: 'data' })">Data</div>
          <div class="menu-item" @click="addChildrenGroupLocal({ symbolType: 'decision' })">Decision</div>
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
