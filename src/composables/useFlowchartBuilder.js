import { reactive } from "vue";

/*
 * useFlowchartBuilder
 */
export const useFlowchartBuilder = () => {
  const schema = reactive({
    symbol: "container",
    id: "95933cc6-d9ec-4522-a10e-7e6180379506",
    children: [
      {
        type: "single",
        schema: {
          symbol: "start",
          id: "5df7e663-09c5-4af5-bdcc-bd0e38548f04",
        },
      },
      {
        type: "single",
        schema: {
          symbol: "process",
          id: "69753206-dc83-4de0-8ade-76436888fead",
          children: {
            type: "group",
            schema: {
              symbol: "decision",
              id: "a4038ea0-62bb-46a5-8396-7911cc6b433d",
              children: [
                {
                  type: "single",
                  schema: {
                    symbol: "process",
                    id: "67765332-0b02-477e-b378-bb0b36ca6a35",
                    children: {
                      type: "group",
                      schema: {
                        symbol: "decision",
                        id: "a4038ea0-62bb-46a5-8396-7911cc6b433d",
                        children: [
                          {
                            type: "single",
                            schema: {
                              symbol: "process",
                              id: "67765332-0b02-477e-b378-bb0b36ca6a35",
                              isEnd: true,
                            },
                          },
                          {
                            type: "single",
                            schema: {
                              symbol: "process",
                              id: "fe764f24-6e72-4d25-b547-4a12d2a4accf",
                              isEnd: true,
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
                    id: "fe764f24-6e72-4d25-b547-4a12d2a4accf",
                    children: {
                      type: "single",
                      schema: {
                        symbol: "process",
                        id: "a4038ea0-62bb-46a5-8396-7911cc6b433d",
                        children: {
                          type: "single",
                          schema: {
                            symbol: "process",
                            id: "a4038ea0-62bb-46a5-8396-7911cc6b433d",
                            children: {
                              type: "single",
                              schema: {
                                symbol: "process",
                                id: "a4038ea0-62bb-46a5-8396-7911cc6b433d",
                                children: {
                                  type: "group",
                                  schema: {
                                    symbol: "decision",
                                    id: "a4038ea0-62bb-46a5-8396-7911cc6b433d",
                                    children: [
                                      {
                                        type: "single",
                                        schema: {
                                          symbol: "process",
                                          id: "67765332-0b02-477e-b378-bb0b36ca6a35",
                                          isEnd: true,
                                        },
                                      },
                                      {
                                        type: "single",
                                        schema: {
                                          symbol: "process",
                                          id: "fe764f24-6e72-4d25-b547-4a12d2a4accf",
                                          isEnd: true,
                                        },
                                      },
                                    ],
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
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
          id: "489dab47-d5e9-45f3-8ac3-09334ea14fc6",
        },
      },
      {
        type: "single",
        schema: {
          symbol: "stop",
          id: "f21bdf67-4f1e-4029-ba39-0b874b66d699",
        },
      },
    ],
  });

  return {
    schema,
  };
};
