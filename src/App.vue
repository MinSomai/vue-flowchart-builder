<script setup>
import FlowGroup from "./components/FlowGroup.vue";

import { useFlowchartBuilder } from "@/composables/useFlowchartBuilder";

const { schema } = useFlowchartBuilder();
</script>

<template>
  <main>
    <div class="vue-flowchart-builder">
      <FlowGroup :depth="0" :index="0" :max-depth="5" v-model:schema="schema" />
    </div>
  </main>
</template>

<style>
@import "./assets/base.css";
</style>
