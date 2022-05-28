<script setup>
import { shallowRef, onMounted, getCurrentInstance } from "vue";

import { SYMBOLTYPES } from "@/helpers/const/SymbolTypes";

const instance = getCurrentInstance();

defineProps({
  schema: Object,
  depth: Number,
  maxDepth: Number,
});

const flowGroup = shallowRef(null);
const flowSingle = shallowRef(null);

onMounted(() => {
  if (Object.keys(instance.parent.exposed).length !== 0) {
    flowGroup.value = instance.parent.exposed.FlowGroup;
    flowSingle.value = instance.parent.exposed.FlowSingle;
  }
});

const getComponent = (type) => {
  if (type == SYMBOLTYPES.GROUP || type == SYMBOLTYPES.GROUPSIBLINGCONTAINER) return flowGroup.value;
  if (type == SYMBOLTYPES.SINGLE) return flowSingle.value;
};

const getSiblingsOrChildrens = (schema) => {
  if (schema.children) return schema.children;
  if (schema.sibling) return schema.sibling;
};
</script>
<template>
  <div
    :class="{
      'group-sibling': schema.sibling,
      'group-children': schema.children,
    }"
  >
    <component
      v-for="(child, index) in getSiblingsOrChildrens(schema)"
      v-model:schema="child.schema"
      :key="child.schema.id"
      :is="getComponent(child.type)"
      :type="child.type"
      :index="index"
      :max-depth="maxDepth"
      :depth="depth + 1"
      :is-group-sibling-container="child.type === SYMBOLTYPES.GROUPSIBLINGCONTAINER ? true : false"
      @add-sibling="$parent.addSibling"
      @remove-child="$parent.removeChild"
      @remove-parent="$parent.removeParent"
    />
  </div>
</template>
