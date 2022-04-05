<script setup>
import { toRefs } from "vue";

import { useSymbols } from "@/composables/useSymbols";

import Start from "@/svg/Start.vue";
import Stop from "@/svg/Stop.vue";
import Process from "@/svg/Process.vue";
import Data from "@/svg/Data.vue";

import FlowChildren from "@/components/FlowChildren.vue";

const props = defineProps({
  schema: Object,
  index: Number,
  depth: Number,
  type: String,
});

const { schema } = toRefs(props);
defineEmits(["deletion-requested", "update:schema"]);

const { remove, updateSchema } = useSymbols({ schema: schema.value });
</script>

<template>
  <div class="single" v-if="schema.symbol">
    <div
      :class="`group-body ${schema.children && schema.children.constructor.name == 'Object' ? 'single-group': ''}`"
      v-if="schema.children && schema.children.constructor.name == 'Object'"
    >
      <div :class="`symbol ${schema.symbol} single-group-head`">
        <Start v-if="schema.symbol == 'start'" />
        <Process v-if="schema.symbol == 'process'" />
      </div>
      <FlowChildren :class="`depth-${depth}`" v-bind="$props" :schema="schema.children" />
    </div>

    <template v-else>
      <div :class="`symbol ${schema.symbol}`">
        <Start v-if="schema.symbol == 'start'" />
        <Stop v-if="schema.symbol == 'stop'" />
        <Process v-if="schema.symbol == 'process'" />
        <Data v-if="schema.symbol == 'data'" />
      </div>
    </template>
  </div>
</template>
