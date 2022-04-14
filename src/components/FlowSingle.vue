<script setup>
import { toRefs } from "vue";

import { useSymbolSingle } from "@/composables/useSymbolSingle";

import Start from "@/components/symbols/Start.vue";
import Stop from "@/components/symbols/Stop.vue";
import Process from "@/components/symbols/Process.vue";
import Data from "@/components/symbols/Data.vue";

import FlowChildren from "@/components/FlowChildren.vue";

const props = defineProps({
  schema: Object,
  index: Number,
  depth: Number,
  type: String,
});

const { schema } = toRefs(props);
defineEmits(["deletion-requested", "update:schema"]);

const { remove, updateSchema } = useSymbolSingle({ schema: schema.value });
</script>

<template>
  <div
    class="single"
    :class="{
      [schema.symbol]: true,
      'single-group-container': schema.children !== undefined,
      [`depth-${depth}`]: true,
    }"
  >
    <!-- Single with one child, but composite behaviour ? -->
    <div
      class="group-body"
      :class="{
        'single-group': schema.children !== undefined,
      }"
      v-if="schema.children?.constructor.name == 'Object'"
    >
      <div
        class="symbol single-group-head"
        :class="{ [schema.symbol]: true }"
        :id="schema.id"
      >
        <Process v-if="schema.symbol == 'process'" />
        <Data v-if="schema.symbol == 'data'" />
      </div>

      <FlowChildren
        :class="`depth-${depth}`"
        v-bind="$props"
        :schema="schema.children"
      />
    </div>

    <!-- Single/Leaf -->
    <template v-else>
      <div
        class="symbol"
        :class="{
          [schema.symbol]: true,
          'symbol-end': schema.isEnd,
        }"
        :id="schema.id"
      >
        <Start v-if="schema.symbol == 'start'" />
        <Stop v-if="schema.symbol == 'stop'" />
        <Process v-if="schema.symbol == 'process'" />
        <Data v-if="schema.symbol == 'data'" />

        <div class="options-menu">
          <div class="menu-item">Process</div>
          <div class="menu-item">IO</div>
          <div class="menu-item">Data</div>
          <div class="menu-item">Decision</div>
        </div>
      </div>
    </template>
  </div>
</template>
