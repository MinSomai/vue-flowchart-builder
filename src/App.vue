<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import AnimEvent from "anim-event";
import Panzoom from "@panzoom/panzoom";
import FlowGroup from "./components/FlowGroup.vue";
import LeaderLine from "vue3-leaderline";

import { useFlowchartBuilder } from "@/composables/useFlowchartBuilder";
import { useRecursiveEdgeBuilder } from "@/composables/useRecursiveEdgeBuilder";

const { newSchema } = useFlowchartBuilder();
const { getEdges } = useRecursiveEdgeBuilder();

const DEBUG = ref(false);
const flowChartPanzoom = ref(null);

const lineOptions = {
  path: "fluid",
  size: 2.5,
  color: "currentColor",
  startPlug: "disc",
  startPlugSize: 2,
  // dropShadow: true,
};

const leaderLineEdges = ref([]); // instances of leader lines
const edges = ref([]); // normal edge definitions
const panzoom = ref(null); // ref for the panzoom element

const buildEdges = async () => {
  deleteEdges();
  let rawEdges = getEdges(newSchema.mySchema);
  edges.value = rawEdges;

  leaderLineEdges.value = rawEdges.map((edge) => {
    if (!edge || !edge.start || !edge.end) return;
    if (!document.getElementById(edge.end)) return;
    if (!document.getElementById(edge.start)) return;

    return new LeaderLine({
      start: document.getElementById(edge.start),
      end: document.getElementById(edge.end),
      ...lineOptions,
      startLabel: edge.start,
      endLabel: edge.end,
    });
  });
  leaderLineEdges.value = leaderLineEdges.value.filter(Boolean);
};

const deleteEdges = () => {
  for (let edge of leaderLineEdges.value) {
    if (edge) edge.remove();
  }
  leaderLineEdges.value = [];
};

const repositionEdges = async () => {
  for (let edge of leaderLineEdges.value) {
    if (edge) {
      edge.position();
    }
  }
};

onMounted(async () => {
  panzoom.value = Panzoom(flowChartPanzoom.value, {
    maxScale: 1.5,
    minScale: 0.7,
    startScale: 1,
    disableYAxis: true,
  });

  flowChartPanzoom.value.addEventListener("panzoomchange", AnimEvent.add(repositionEdges), false);

  await nextTick();
  buildEdges();

  // let leaderLinesContainer = document.getElementById("leaderLines");
  // let rectWrapper = leaderLinesContainer.getBoundingClientRect();
  //
  // leaderLinesContainer.style.transform =
  //   "translate(-" + (rectWrapper.left + scrollX) + "px, -" + (rectWrapper.top + scrollY) + "px)";
  //
  // document.querySelectorAll(".leader-line").forEach((lead) => {
  //   leaderLinesContainer.appendChild(lead);
  // });
});

watch(
  () => newSchema.mySchema,
  async () => {
    await nextTick();
    buildEdges();
  },
);
</script>

<template>
  <main>
    <div id="panzoomParent" class="panzoom-parent">
      <div class="flowchart-actions">
        <button @click="buildEdges">Rebuild edges</button><br />
        <button @click="deleteEdges">Delete edges</button><br />
        <button @click="panzoom.zoomIn">Zoom in</button><br />
        <button @click="panzoom.zoomOut">Zoom out</button><br />
        <button @click="panzoom.reset">Reset</button><br />
        <button @click="DEBUG = !DEBUG">Toggle Debug CSS</button><br />
      </div>
      <div ref="flowChartPanzoom" id="flowChartPanzoom" class="flowchart-panzoom">
        <div
          class="vue-flowchart-builder"
          :class="{
            'debug-css': DEBUG,
          }"
        >
          <FlowGroup :depth="0" :index="0" :max-depth="5" v-model:schema="newSchema.mySchema" :id="newSchema.id" />
        </div>
      </div>
      <!-- <div id="leaderLines"></div> -->
    </div>

    <svg version="1.1" id="svg-clip">
      <defs>
        <rect id="clip-rect" />

        <clipPath id="clip-1">
          <use xlink:href="#clip-rect" />
        </clipPath>
        <clipPath id="clip-2">
          <use xlink:href="#clip-rect" />
        </clipPath>
      </defs>
    </svg>

    <br />
    <pre>{{ newSchema.mySchema }}</pre>
    <br />
    EDGES<br />
    <pre>{{ edges }}</pre>
  </main>
</template>

<style>
@import "./assets/base.css";
.panzoom-parent {
  position: relative;
  box-shadow: inset 0 0 5px rgba(223, 212, 212, 0.5);
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px;
  border: 1px solid black;
  margin-left: 50px;
  margin-right: 50px;
}
.flowchart-panzoom {
  padding: 10px;
}
.flowchart-actions {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 10;
  width: 144px;
}
</style>
