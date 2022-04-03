<script setup>
import { toRefs } from "vue";
import { useSymbols } from "@/composables/useSymbols";

const props = defineProps({
  schema: Object,
  index: Number,
  depth: Number,
  type: String,
});

const { schema } = toRefs(props);
defineEmits(["deletion-requested", "update:schema"]);

const { remove, updateSchema } = useSymbols({ schema: schema.value });
</script>

<template>
  <div class="single" v-if="schema.symbol">
    <div :class="`symbol ${schema.symbol}`" v-if="schema.symbol == 'start'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="102px"
        height="102px"
        viewBox="-0.5 -0.5 102 102"
        content='&lt;mxfile host="Chrome" modified="2022-04-02T14:43:27.565Z" agent="5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36" etag="1p2v7jBucIvdh57J6e8S" version="16.2.2" type="device" pages="2"&gt;&lt;diagram id="EKtKKHo3ZdTH-zuWGdtb" name="Page-1"&gt;jZLBboMwDIafhuMqKO3EjlvXrYdxQtp2myLikmgBo+AO2NMvDBOKqkq9gPPldxL/dhDvyu7VilqlKMEE61B2QfwcrNdRFCbuN5B+JNvNZgSF1ZJFM8j0LzAMmZ60hGYhJERDul7CHKsKclowYS22S9kRzfLWWhRwAbJcmEv6oSWpkSbbcOYH0IUiXzDvlGISM2iUkNieoXgfxDuLSGNUdjswg3mTL2Pey5Vd/zALFd2SAPKQfr4/vj0QoDJJavQG7uLxlB9hTlwwP5b6yYGGLH774t2znxSVxoWRC11R9aAru2Lo/+posM2VsLRqyH2/BnmrNEFWi3wQtk7mGF8LlqC7Wk/kXXLjBVgC2d5JOOGefeXB8j63c5t8M9R5iyYoeDQKf/TsngvYwGk5N+p/72zc4/0f&lt;/diagram&gt;&lt;diagram id="sH9pLrft0GiItcGhdZMm" name="Page-2"&gt;ldG9DsIgEADgp2E0aUtNdLXWn/g3NNHEDcvZEmmvIsbWp7cGtBIXnTg+joMDQqOinipW5SvkIEng8ZrQMQkC3/cG7fCUxkg/DA1kSnCb1EEi7mDRs3oVHC5OokaUWlQupliWkGrHmFJ4c9OOKN1TK5bBFyQpk9+6E1znRgd9r/MZiCzX74btSsFeyRYuOeN4+yAaExopRG2ioo5APh/v9S4gh0tx2k1G6wM2m+15Mff3PVNs8s+WdwsKSv1r6TbortZOnA+m8QM=&lt;/diagram&gt;&lt;/mxfile&gt;'
      >
        <ellipse
          cx="51"
          cy="51"
          rx="50"
          ry="50"
          fill="rgb(255, 255, 255)"
          stroke="rgb(0, 0, 0)"
          stroke-width="2"
          pointer-events="none"
        />
      </svg>
    </div>
    <div :class="`symbol ${schema.symbol}`" v-if="schema.symbol == 'stop'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="102px"
        height="62px"
        viewBox="-0.5 -0.5 102 62"
        content='&lt;mxfile host="Chrome" modified="2022-04-02T14:40:08.983Z" agent="5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36" etag="d2b-GCEkWObkoiRFEcWX" version="16.2.2" type="device" pages="2"&gt;&lt;diagram id="EKtKKHo3ZdTH-zuWGdtb" name="Page-1"&gt;jZLBboMwDIafhuMqKHSix63t1sN6qrTtGhGXREswCu6ge/qFYUJRVWmnOF/+JPZvR+nGdq9O1OqAEky0jGUXpdtouUySOPdLTy4DWWXZAEqnJYsmcNQ/wDBmetYSmpmQEA3peg4LrCooaMaEc9jOZSc0819rUcINOBbC3NIPLUkNNF/FE9+DLhWFgvnEilHMoFFCYnuF0l2UbhwiDZHtNmB680Zfhnsvd05DYg4q+s8FkPvD5/vT25oAlckPRmfwwK98C3PmgjlZuowONOTwKxTv035WZI0PEx/6oupeZ7uy7//iZLAtlHC0IHBWV4LQeVmrNMGxFkWvbb3SM/4ZHEF3t6QkGOUnDNACuYuX8IXgLQ9XsuZ9O7UqNERdtemRmeDpKMPTk4E+YA/H7dSrv7OriU93vw==&lt;/diagram&gt;&lt;diagram id="sH9pLrft0GiItcGhdZMm" name="Page-2"&gt;ldG9DsIgEADgp2E0aUtNdLXWn/g3NNHEDcvZEmmvIsbWp7cGtBIXnTg+joMDQqOinipW5SvkIEng8ZrQMQkC3/cG7fCUxkg/DA1kSnCb1EEi7mDRs3oVHC5OokaUWlQupliWkGrHmFJ4c9OOKN1TK5bBFyQpk9+6E1znRgd9r/MZiCzX74btSsFeyRYuOeN4+yAaExopRG2ioo5APh/v9S4gh0tx2k1G6wM2m+15Mff3PVNs8s+WdwsKSv1r6TbortZOnA+m8QM=&lt;/diagram&gt;&lt;/mxfile&gt;'
      >
        <path
          d="M 31.61 1 L 70.39 1 C 87.29 1 101 14.43 101 31 C 101 47.57 87.29 61 70.39 61 L 31.61 61 C 14.71 61 1 47.57 1 31 C 1 14.43 14.71 1 31.61 1 Z"
          fill="rgb(255, 255, 255)"
          stroke="rgb(0, 0, 0)"
          stroke-width="2"
          stroke-miterlimit="10"
          pointer-events="none"
        />
      </svg>
    </div>
    <div :class="`symbol ${schema.symbol}`" v-if="schema.symbol == 'process'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="102px"
        height="102px"
        viewBox="-0.5 -0.5 102 102"
        content='&lt;mxfile host="Chrome" modified="2022-04-02T14:41:12.287Z" agent="5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36" etag="wYW7cEKSDxa3Kz9W3JlS" version="16.2.2" type="device" pages="2"&gt;&lt;diagram id="EKtKKHo3ZdTH-zuWGdtb" name="Page-1"&gt;jZLLboMwEEW/hmUlXlHpMknTZtGsIrXduniKrRgGmaFAv74mDC9FkbrCc+aBfe940T5vX60o1QklGC/0ZetFz14YBoGfuE9PuoFs4ngAmdWSi2Zw1r/A0GdaawnVqpAQDelyDVMsCkhpxYS12KzLvtGs/1qKDG7AORXmln5oSWqgycaf+RF0pmh6MGdyMRYzqJSQ2CxQdPCivUWk4ZS3ezC9eKMuQ9/Lnex0MQsF/acB5PH0+b59eyJAZZKT0TE8hMOUH2FqfjBflrpRAYt1IaEfEnjRrlGa4FyKtM82znPHFOWG0+KrQlMTbG3KXl7pHMUurMjiZZLTCbHjW4AlaO8+L5hEc9sGmAPZzpVwQ/jIOvOihaNFzWzbZI5aWjZCwauSTbNnNd2BBR3D2bhrbrH+0eEP&lt;/diagram&gt;&lt;diagram id="sH9pLrft0GiItcGhdZMm" name="Page-2"&gt;ldG9DsIgEADgp2E0aUtNdLXWn/g3NNHEDcvZEmmvIsbWp7cGtBIXnTg+joMDQqOinipW5SvkIEng8ZrQMQkC3/cG7fCUxkg/DA1kSnCb1EEi7mDRs3oVHC5OokaUWlQupliWkGrHmFJ4c9OOKN1TK5bBFyQpk9+6E1znRgd9r/MZiCzX74btSsFeyRYuOeN4+yAaExopRG2ioo5APh/v9S4gh0tx2k1G6wM2m+15Mff3PVNs8s+WdwsKSv1r6TbortZOnA+m8QM=&lt;/diagram&gt;&lt;/mxfile&gt;'
      >
        <rect
          x="1"
          y="1"
          width="100"
          height="100"
          rx="7"
          ry="7"
          fill="rgb(255, 255, 255)"
          stroke="rgb(0, 0, 0)"
          stroke-width="2"
          pointer-events="none"
        />
      </svg>
    </div>
  </div>
</template>
