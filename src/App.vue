<script setup>
import FlowGroup from "./components/FlowGroup.vue";
import LeaderLine from "vue3-leaderline";

import { useFlowchartBuilder } from "@/composables/useFlowchartBuilder";

const { newSchema } = useFlowchartBuilder();
let lineOptions = {
  path: "grid",
  size: 2.5,
  color: "black",
};
console.log(LeaderLine);
setTimeout(() => {
  new LeaderLine(
    document.getElementById("5df7e663-09c5-4af5-bdcc-bd0e38548f04"),
    document.getElementById("ecc12bbe-f8e7-452a-85d9-f8f21d7fd343"),
    lineOptions,
  );

  new LeaderLine(
    document.getElementById("ecc12bbe-f8e7-452a-85d9-f8f21d7fd343"),
    document.getElementById("f9424ed9-be34-4393-bfd2-8c3c2aec9ef9"),
    lineOptions,
  );

  new LeaderLine(
    document.getElementById("f9424ed9-be34-4393-bfd2-8c3c2aec9ef9"),
    document.getElementById("046d7a08-73bf-4854-9c86-4bba951b49bc"),
    lineOptions,
  );

  new LeaderLine(
    document.getElementById("f9424ed9-be34-4393-bfd2-8c3c2aec9ef9"),
    document.getElementById("b5568669-b91a-46b3-9e67-48552d92dce5"),
    lineOptions,
  );

  new LeaderLine(
    document.getElementById("046d7a08-73bf-4854-9c86-4bba951b49bc"),
    document.getElementById("8b27ee07-c016-48b5-927f-351fabb19eea"),
    lineOptions,
  );

  let line = new LeaderLine(
    document.getElementById("b5568669-b91a-46b3-9e67-48552d92dce5"),
    document.getElementById("8b27ee07-c016-48b5-927f-351fabb19eea"),
    lineOptions,
  );

  new LeaderLine(
    document.getElementById("8b27ee07-c016-48b5-927f-351fabb19eea"),
    document.getElementById("66221500-7af4-4d63-98b9-e3b7f09a07d6"),
    lineOptions,
  );
}, 2000);
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
      <FlowGroup :depth="0" :index="0" :max-depth="5" v-model:schema="newSchema.mySchema" :id="newSchema.id" />
    </div>
    <pre>{{ newSchema.mySchema }}</pre>
  </main>
</template>

<style>
@import "./assets/base.css";
</style>
