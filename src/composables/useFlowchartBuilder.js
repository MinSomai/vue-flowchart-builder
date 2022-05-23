import { reactive } from "vue";

/*
 * useFlowchartBuilder
 */
export const useFlowchartBuilder = () => {
  const newSchema = reactive({
    mySchema: {
      symbol: "sibling-container",
      id: "95933cc6-d9ec-4522-a10e-7e6180379506",
      sibling: [
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
            id: "ecc12bbe-f8e7-452a-85d9-f8f21d7fd343",
          },
        },
        {
          type: "group",
          schema: {
            symbol: "decision",
            id: "f9424ed9-be34-4393-bfd2-8c3c2aec9ef9",
            children: [
              {
                type: "single",
                schema: {
                  symbol: "process",
                  id: "046d7a08-73bf-4854-9c86-4bba951b49bc",
                },
              },
              {
                type: "single",
                schema: {
                  symbol: "process",
                  id: "b5568669-b91a-46b3-9e67-48552d92dce5",
                },
              },
            ],
          },
        },
        {
          type: "single",
          schema: {
            symbol: "io",
            id: "8b27ee07-c016-48b5-927f-351fabb19eea",
          },
        },
        {
          type: "single",
          schema: {
            symbol: "process",
            id: "66221500-7af4-4d63-98b9-e3b7f09a07d6",
          },
        },
        {
          type: "group",
          schema: {
            symbol: "decision",
            id: "1414ccd7-931c-449a-99ae-3e03a3e766fb",
            children: [
              {
                type: "single",
                schema: {
                  symbol: "process",
                  id: "b41c50fd-0706-4ea9-a74d-4519e4cb0189",
                },
              },
              {
                type: "group-sibling-container",
                schema: {
                  symbol: "sibling-container",
                  id: "2b2e955f-c99b-4ea9-a2b3-1c7704955f87",
                  sibling: [
                    {
                      type: "single",
                      schema: {
                        symbol: "process",
                        id: "03ab55aa-f82a-4b79-9d3d-8978b34ba5e6",
                      },
                    },
                    {
                      type: "group",
                      schema: {
                        symbol: "decision",
                        id: "a81f7026-26c9-4fad-a0f2-0ad267b8407e",
                        children: [
                          {
                            type: "single",
                            schema: {
                              symbol: "process",
                              id: "89ef55b5-8ba5-488d-8152-177b7fdf2962",
                            },
                          },
                          {
                            type: "single",
                            schema: {
                              symbol: "io",
                              id: "89c31ccd-8e19-4f1f-be0f-0fbbd96d9891",
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
            id: "f21bdf67-4f1e-4029-ba39-0b874b66d699",
          },
        },
      ],
    },
  });

  return {
    newSchema,
  };
};
