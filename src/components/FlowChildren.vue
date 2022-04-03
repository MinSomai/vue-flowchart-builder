<script setup>
import { shallowRef, defineProps, onMounted, getCurrentInstance } from "vue";
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
  flowGroup.value = instance.parent.exposed.FlowGroup;
  flowSingle.value = instance.parent.exposed.FlowSingle;
});

const getComponent = (type) => {
  return type === SYMBOLTYPES.GROUP ? flowGroup.value : flowSingle.value;
};
</script>
<template>
  <div class="group-children">
    <!-- <pre>{{ schema.children }}</pre> -->
    <template v-for="(child, index) in schema.children" :key="index">
      <component
        :is="getComponent(child.type)"
        :type="child.type"
        v-model:schema="child.schema"
        :index="index"
        :max-depth="maxDepth"
        :depth="depth + 1"
        @child-deletion-requested="$parent.removeChild"
      />
    </template>
  </div>
</template>
