<script setup>
import FlowGroup from "./components/FlowGroup.vue";
import LeaderLine from "vue3-leaderline";

import { useFlowchartBuilder } from "@/composables/useFlowchartBuilder";

const { schema } = useFlowchartBuilder();
console.log(LeaderLine);
</script>

<template>
  <main>
    <div class="vue-flowchart-builder">
      <FlowGroup
        :depth="0"
        :index="0"
        :max-depth="5"
        v-model:schema="schema"
        :id="schema.id"
      />
    </div>
  </main>
</template>

<style>
@import "./assets/base.css";
</style>
