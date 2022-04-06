<script setup>
import { shallowRef, onMounted, getCurrentInstance } from "vue";

import { SYMBOLTYPES } from "@/helpers/const/SymbolTypes";

import FlowGroup from "@/components/FlowGroup.vue";

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
  return type === SYMBOLTYPES.GROUP ? flowGroup.value : flowSingle.value;
};
</script>
<template>
  <div :class="`group-children ${schema.children ? '' : 'single-group-body'}`">
    <template v-if="schema.children">
      <component
        v-for="(child, index) in schema.children"
        :key="index"
        :is="getComponent(child.type)"
        :type="child.type"
        v-model:schema="child.schema"
        :index="index"
        :max-depth="maxDepth"
        :depth="depth + 1"
        @child-deletion-requested="$parent.removeChild"
      />
    </template>

    <div class="single-group-children" v-else>
      <!-- For case when single is used as a composite. -->
      <!-- But with only one child. Not composite, but different than single/leaf. -->
      <FlowGroup :depth="depth" :index="0" :max-depth="maxDepth" v-model:schema="schema.schema" />
    </div>
  </div>
</template>
