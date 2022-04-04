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
    <template v-if="!schema.hasGroup">
      <div :class="`symbol ${schema.symbol}`" v-if="schema.symbol == 'start'">
        <Start />
      </div>
      <div :class="`symbol ${schema.symbol}`" v-if="schema.symbol == 'stop'">
        <Stop />
      </div>
      <div :class="`symbol ${schema.symbol}`" v-if="schema.symbol == 'process'">
        <Process />
      </div>
      <div :class="`symbol ${schema.symbol}`" v-if="schema.symbol == 'data'">
        <Data />
      </div>
    </template>

    <div class="group-body" v-else>
      <div :class="`symbol ${schema.symbol}`" v-if="schema.symbol == 'start'">
        <Start />
      </div>
      <div :class="`symbol ${schema.symbol}`" v-if="schema.symbol == 'process'">
        <Process />
      </div>
      <FlowChildren :class="`depth-${depth}`" v-bind="$props" :schema="schema.children" />
    </div>
  </div>
</template>
