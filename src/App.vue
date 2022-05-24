<script setup>
import { onMounted, watch } from "vue";
import FlowGroup from "./components/FlowGroup.vue";
import LeaderLine from "vue3-leaderline";

import { useFlowchartBuilder } from "@/composables/useFlowchartBuilder";
import { useRecursiveEdgeBuilder } from "@/composables/useRecursiveEdgeBuilder";

const { newSchema } = useFlowchartBuilder();
const { recursiveEdgeBuilder } = useRecursiveEdgeBuilder();

const lineOptions = {
  path: "grid",
  size: 2.5,
  color: "black",
  startPlug: "disc",
  startPlugSize: 2,
  // dropShadow: true,
};

watch(
  () => newSchema.mySchema,
  (schema) => {
    let edges = [];

    schema.sibling.forEach((sibling) => {
      let edge = recursiveEdgeBuilder(sibling);
      if (Array.isArray(edge)) {
        edges = [...edges, ...edge];
      } else {
        edges.push(recursiveEdgeBuilder(sibling));
      }
    });

    // NOTE: only for testing
    setTimeout(() => {
      edges.forEach((edge) => {
        if (!edge) return;
        if (!edge.start) return;
        if (!edge.end) return;
        if (!document.getElementById(edge.end)) return;
        if (!document.getElementById(edge.start)) return;

        new LeaderLine({
          start: document.getElementById(edge.start),
          end: document.getElementById(edge.end),
          ...lineOptions,
        });
      });
    }, 200);
  },
  { immediate: true },
);

onMounted(async () => {
  // await nextTick();
  // edges.forEach((edge) => {
  //   new LeaderLine({
  //     start: document.getElementById(edge.start),
  //     end: document.getElementById(edge.end),
  //     ...lineOptions,
  //   });
  // });
});
const debug = false;
</script>

<template>
  <main>
    <div
      class="vue-flowchart-builder"
      :class="{
        'debug-css': debug,
      }"
    >
      Note: Edges/arrows rendering is not reactive yet: ie. arrows doesn't re-renders when adding new
      nodes/leaf/symbols.
      <FlowGroup :depth="0" :index="0" :max-depth="5" v-model:schema="newSchema.mySchema" :id="newSchema.id" />
    </div>
    <pre>{{ newSchema.mySchema }}</pre>
  </main>
</template>

<style>
@import "./assets/base.css";
</style>
