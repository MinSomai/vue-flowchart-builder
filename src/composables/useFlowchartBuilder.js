import { reactive } from "vue";
/*
 * useFlowchartBuilder
 */

export const useFlowchartBuilder = () => {
  const schema = reactive({
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
        type: "single",
        schema: {
          symbol: "process",
          hasGroup: true,
          children: {
            type: "group",
            schema: {
              symbol: "decision",
              children: [
                {
                  type: "single",
                  schema: {
                    symbol: "process",
                    hasGroup: true,
                    children: {
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
                          {
                            type: "single",
                            schema: {
                              symbol: "process",
                            },
                          },
                        ],
                      },
                    },
                  },
                },
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
        },
      },
      {
        type: "single",
        schema: {
          symbol: "process",
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

  return {
    schema,
  };
};
