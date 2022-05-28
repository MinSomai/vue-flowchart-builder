<script setup>
import { markRaw, toRefs } from "vue";
import { v4 as uuidv4 } from "uuid";

import { SYMBOLTYPES } from "@/helpers/const/SymbolTypes";
import { useSymbol } from "@/composables/useSymbol";
import { useFlowSingle } from "@/composables/useFlowSingle";
import { useFlowGroup } from "@/composables/useFlowGroup";

import deepClone from "@/helpers/deepClone";

import Cross from "@/assets/svg/Cross.vue";

import FlowSingle from "@/components/FlowSingle.vue";
import FlowGroup from "@/components/FlowGroup.vue";
import FlowSibling from "@/components/FlowSibling.vue";

const props = defineProps({
  type: {
    type: String,
    default: "group",
  },
  schema: Object,
  index: Number,
  depth: Number,
  maxDepth: Number,
  isGroupSiblingContainer: Boolean,
});

const { schema, isGroupSiblingContainer, index } = toRefs(props);
const { addChildren } = useFlowGroup();

const emit = defineEmits(["update:schema", "remove-parent", /*addSiblingFromGroup */ "add-sibling"]);

const { getSymbol } = useSymbol();
const { addSibling: addSiblingFromGroup } = useFlowSingle();

const addSibling = ({ newChild, options }) => {
  const updated_schema = deepClone(schema.value);
  const tempNext = options.schema.next;

  if (newChild.type === SYMBOLTYPES.GROUP) {
    newChild.schema.next.push(tempNext);
  } else {
    newChild.schema.next = tempNext;
  }
  //edge case:  when child is single inside the group, but not wrapped by single "GROUPSIBLINGCONTAINER",
  // which is an anonymous group(cross axis)
  // same case when removing a child
  if (!isGroupSiblingContainer.value && schema.value.symbol != SYMBOLTYPES.SIBLINGCONTAINER) {
    const groupSiblingContainer = {
      type: "group-sibling-container",
      schema: {
        symbol: "sibling-container",
        id: uuidv4(),
        sibling: [],
      },
    };

    const updatedCurrentChildren = updated_schema.children[options.index];
    updatedCurrentChildren.schema.next = newChild.schema.id;

    groupSiblingContainer.schema.sibling.push(updatedCurrentChildren);
    groupSiblingContainer.schema.sibling.push(newChild);

    updated_schema.children.splice(options.index, 1, groupSiblingContainer);
    emit("update:schema", updated_schema);
    return;
  }

  // when adding new sibling, update the current sibling's next with newChild's id and add .next to the newChild
  const updatedCurrentSibling = updated_schema.sibling[options.index];
  updatedCurrentSibling.schema.next = newChild.schema.id;

  updated_schema.sibling.splice(options.index, 1, updatedCurrentSibling, newChild);
  emit("update:schema", updated_schema);
};

// remove both the children's child and sibling's child
const removeChild = ({ itemIndex, options }) => {
  let updated_schema = deepClone(schema.value);

  // remove children
  if (!isGroupSiblingContainer.value && schema.value.symbol != SYMBOLTYPES.SIBLINGCONTAINER) {
    // TODO: remove from the next[] of parent
    updated_schema.children.splice(itemIndex, 1);
    emit("update:schema", updated_schema);
    return;
  }

  // remove sibling
  // edge case when removing the last sibling");
  // remove parent too
  if (updated_schema.sibling.length === 1) {
    const options = {
      schema: props.schema,
      index: props.index,
      type: props.type,
      depth: props.depth,
      isGroupSiblingContainer: isGroupSiblingContainer.value,
    };
    emit("remove-parent", { itemIndex: index.value, options });
    return;
  }

  // TODO: check if the child being deleted is used elsewhere
  const tempPrev = updated_schema.sibling[itemIndex - 1];
  if (tempPrev) {
    const tempNext = options.schema.next;
    tempPrev.schema.next = tempNext;
    updated_schema.sibling.splice(itemIndex - 1, 1, tempPrev);
  }

  updated_schema.sibling.splice(itemIndex, 1);
  emit("update:schema", updated_schema);
};

const removeParent = ({ itemIndex, options }) => {
  let updated_schema = deepClone(schema.value);

  if (updated_schema.symbol == SYMBOLTYPES.SIBLINGCONTAINER) {
    updated_schema.sibling.splice(itemIndex, 1);
  } else {
    updated_schema.children.splice(itemIndex, 1);
    // emit("remove-parent", {
    //   itemIndex: index.value,
    //   options: {
    //     index: index.value,
    //     schema: schema.value,
    //     isGroupSiblingContainer: isGroupSiblingContainer.value,
    //   },
    // });
    // return;
  }
  emit("update:schema", updated_schema);
};

markRaw({
  FlowSingle,
  FlowGroup,
});

defineExpose({
  addSibling,
  removeChild,
  removeParent,
  FlowSingle,
  FlowGroup,
});
</script>

<template>
  <div
    :class="{
      group: !isGroupSiblingContainer,
      'single group-sibling-container': isGroupSiblingContainer,
      [`depth-${depth}`]: true,
    }"
  >
    <!-- Head for 'decision' -->
    <div
      v-if="!isGroupSiblingContainer"
      class="group-head"
      :class="{
        [schema.symbol]: true,
        symbol: depth > 0,
        [`depth-${depth}`]: true,
        'group-head': schema.sibling,
        'group-sibling-container-head': schema.children,
      }"
    >
      <div class="symbol" :id="schema.id">
        <component :is="getSymbol(schema.symbol)" :schema="schema" />

        <div class="symbol-actions">
          <Cross
            @click="
              $emit('remove-parent', {
                itemIndex: index,
                options: {
                  index,
                  schema,
                  depth,
                  type,
                  isGroupSiblingContainer,
                },
              })
            "
          />
        </div>

        <div v-if="schema.symbol == 'main-container'">Vue Flowchart Builder</div>

        <div class="options-menu" v-if="depth > 0">
          <div>Children(main axis)</div>
          <div class="menu-item" @click="addChildren({ symbolType: 'process' })">Process</div>
          <div class="menu-item" @click="addChildren({ symbolType: 'io' })">IO</div>
          <div class="menu-item" @click="addChildren({ symbolType: 'data' })">Data</div>
          <div class="menu-item" @click="addChildren({ symbolType: 'decision' })">Decision</div>

          <div class="options-menu options-menu-sibling" v-if="depth > 0">
            <div>Sibling(cross axis)</div>
            <div class="menu-item" @click="addSiblingFromGroup({ symbolType: 'process' })">Process</div>
            <div class="menu-item" @click="addSiblingFromGroup({ symbolType: 'io' })">IO</div>
            <div class="menu-item" @click="addSiblingFromGroup({ symbolType: 'data' })">Data</div>
            <div class="menu-item" @click="addSiblingFromGroup({ symbolType: 'decision' })">Decision</div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="(schema.children && schema.children.length > 0) || (schema.sibling && schema.sibling.length > 0)"
      :class="{
        'group-body': schema.sibling && !isGroupSiblingContainer,
        'group-sibling-container-body': schema.children && !isGroupSiblingContainer,
        'group-sibling-container-body': isGroupSiblingContainer,
        'group-body': !isGroupSiblingContainer,
      }"
    >
      <FlowSibling :class="`depth-${depth}`" v-bind="$props" :schema="schema" />
    </div>
  </div>
</template>
