<script setup>
import { nextTick, ref, watch } from "vue";
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

const edges = ref([]);

const deleteArrows = () => {
  for (let edge of edges.value) {
    if (edge) edge.remove();
  }
};

const buildArrows = async () => {
  deleteArrows();
  newSchema.mySchema.sibling.forEach((sibling) => {
    let edge = recursiveEdgeBuilder(sibling);
    if (Array.isArray(edge)) {
      edges.value = [...edges.value, ...edge];
    } else {
      edges.value.push(recursiveEdgeBuilder(sibling));
    }
  });

  edges.value = edges.value.map((edge) => {
    if (!edge || !edge.start || !edge.end) return;
    if (!document.getElementById(edge.end)) return;
    if (!document.getElementById(edge.start)) return;

    return new LeaderLine({
      start: document.getElementById(edge.start),
      end: document.getElementById(edge.end),
      ...lineOptions,
    });
  });
  edges.value = edges.value.filter(Boolean);
};

// watch(
//   () => newSchema.mySchema,
//   async (schema) => {
//     deleteArrows();
//
//     schema.sibling.forEach((sibling) => {
//       let edge = recursiveEdgeBuilder(sibling);
//       if (Array.isArray(edge)) {
//         edges.value = [...edges.value, ...edge];
//       } else {
//         edges.value.push(recursiveEdgeBuilder(sibling));
//       }
//     });
//
//     // NOTE: only for testing
//     await nextTick();
//     edges.value = edges.value.map((edge) => {
//       if (!edge || !edge.start || !edge.end) return;
//       if (!document.getElementById(edge.end)) return;
//       if (!document.getElementById(edge.start)) return;
//
//       return new LeaderLine({
//         start: document.getElementById(edge.start),
//         end: document.getElementById(edge.end),
//         ...lineOptions,
//       });
//     });
//     edges.value = edges.value.filter(Boolean);
//   },
//   { immediate: true },
// );

const debug = false;
</script>

<template>
  <main>
    <button @click="buildArrows">Build arrows</button>
    <button @click="deleteArrows">Delete arrows</button>
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
