<script setup>
import { markRaw } from "vue";

import Decision from "@/components/symbols/Decision.vue";
import Process from "@/components/symbols/Process.vue";
import Data from "@/components/symbols/Data.vue";

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
    <template v-if="schema.children?.constructor.name == 'Array'">
      <div
        class="group-head"
        :class="{
          [schema.symbol]: true,
          symbol: depth > 0,
          [`depth-${depth}`]: true,
        }"
        :id="schema.id"
      >
        <Decision v-if="schema.symbol == 'decision'" />
        <Process v-if="schema.symbol == 'process'" />
        <Data v-if="schema.symbol == 'data'" />
        <div v-if="schema.symbol == 'parallel'">Parallel</div>
        <div v-if="schema.symbol == 'container'">Vue Flowchart Builder</div>
      </div>
      <div class="group-body">
        <FlowChildren
          :class="`depth-${depth}`"
          v-bind="$props"
          :schema="schema"
        />
      </div>
    </template>

    <div class="single-single-children" v-else>
      <FlowSingle
        :depth="depth"
        :index="0"
        :max-depth="maxDepth"
        :schema="schema"
      />
    </div>
  </div>
</template>
