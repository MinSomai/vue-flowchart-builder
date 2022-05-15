<script setup>
import FlowGroup from "./components/FlowGroup.vue";
import LeaderLine from "vue3-leaderline";

import { useFlowchartBuilder } from "@/composables/useFlowchartBuilder";

const { newSchema, schema } = useFlowchartBuilder();
console.log(LeaderLine);
const debug = false;
</script>

<template>
  <main>
    <div
      class="vue-flowchart-builder debug-css"
      :class="{
        'debug-css': debug
      }"
    >
      <FlowGroup
        :depth="0"
        :index="0"
        :max-depth="5"
        v-model:schema="newSchema"
        :id="newSchema.id"
      />
    </div>
  </main>
</template>

<style>
@import "./assets/base.css";
</style>
