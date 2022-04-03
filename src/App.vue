<script setup>
import { reactive } from "vue";
import FlowGroup from "./components/FlowGroup.vue";

let schema = reactive({
  symbol: "container",
  children: [
    {
      type: "single",
      schema: {
        symbol: "start",
      },
    },
    {
      type: "single",
      schema: {
        symbol: "process",
      },
    },
    {
      type: "group",
      schema: {
        symbol: "decision",
        children: [
          {
            type: "single",
            schema: {
              symbol: "process",
              hasGroup: true,
            },
          },
          {
            type: "group",
            schema: {
              symbol: "decision",
              children: [
                {
                  type: "single",
                  schema: {
                    symbol: "process",
                  },
                },
                {
                  type: "group",
                  schema: {
                    symbol: "decision",
                    children: [
                      {
                        type: "single",
                        schema: {
                          symbol: "process",
                        },
                      },
                      {
                        type: "group",
                        schema: {
                          symbol: "decision",
                          children: [
                            {
                              type: "single",
                              schema: {
                                symbol: "process",
                              },
                            },
                            {
                              type: "single",
                              schema: {
                                symbol: "process",
                              },
                            },
                          ],
                        },
                      },
                      {
                        type: "single",
                        schema: {
                          symbol: "process",
                        },
                      },
                    ],
                  },
                },
                {
                  type: "single",
                  schema: {
                    symbol: "process",
                  },
                },
              ],
            },
          },
          {
            type: "single",
            schema: {
              symbol: "process",
              hasGroup: true,
            },
          },
          {
            type: "group",
            schema: {
              symbol: "decision",
              children: [
                {
                  type: "single",
                  schema: {
                    symbol: "process",
                  },
                },
                {
                  type: "group",
                  schema: {
                    symbol: "decision",
                    children: [
                      {
                        type: "single",
                        schema: {
                          symbol: "process",
                        },
                      },
                      {
                        type: "single",
                        schema: {
                          symbol: "process",
                        },
                      },
                    ],
                  },
                },
                {
                  type: "single",
                  schema: {
                    symbol: "process",
                  },
                },
                {
                  type: "group",
                  schema: {
                    symbol: "decision",
                    children: [
                      {
                        type: "single",
                        schema: {
                          symbol: "process",
                        },
                      },
                      {
                        type: "single",
                        schema: {
                          symbol: "process",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      type: "single",
      schema: {
        symbol: "stop",
      },
    },
  ],
});
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
