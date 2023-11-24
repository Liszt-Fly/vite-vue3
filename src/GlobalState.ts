import { reactive, ref } from "vue";

export const state = reactive({
  isDragging: false,
  isDraggableDragging: false,
  offsetX: 0,
  offsetY: 0,
});
export const canvas = ref<HTMLDivElement>();
