<script setup>
import { defineEmits, markRaw, defineProps, defineExpose } from "vue";

import Decision from "@/svg/Decision.vue";

import FlowSingle from "@/components/FlowSingle.vue";
import FlowGroup from "@/components/FlowGroup.vue";
import FlowChildren from "@/components/FlowChildren.vue";

const emit = defineEmits(["child-deletion-requested"]);

const props = defineProps({
  type: {
    type: String,
    default: "group",
  },
  schema: Object,
  index: Number,
  depth: Number,
  maxDepth: Number,
});

markRaw({
  FlowSingle,
  FlowGroup,
});

const remove = () => {
  emit("child-deletion-requested", props.index);
};

defineExpose({
  remove,
  FlowSingle,
  FlowGroup,
});
</script>

<template>
  <div class="group" :class="'depth-' + depth.toString()">
    <template v-if="schema.symbol">
      <div :class="`group-head depth-${depth} ${schema.symbol}`">
        <Decision v-if="schema.symbol == 'decision'" />
        <div v-if="schema.symbol == 'parallel'">Parallel</div>
        <div v-if="schema.symbol == 'container'">Vue Flowchart Builder</div>
      </div>
    </template>

    <div class="group-body">
      <FlowChildren :class="`depth-${depth}`" v-bind="$props" :schema="schema" />
    </div>
  </div>
</template>
