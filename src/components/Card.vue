<script setup lang="ts">
import { computed, ref } from 'vue';
import { state } from '../GlobalState';

const props = defineProps<{ card: ICard }>();

let cardEl = ref<HTMLDivElement>();
let draggableStartX: number, draggableStartY: number;

let cardCurrentX: number = 0; // 元素的当前 X 位置
let cardCurrentY: number = 0; // 元素的当前 Y 位置

const mousedown = (e: MouseEvent) => {
    e.stopPropagation()
    state.isDraggableDragging = true
    state.offsetX = e.clientX - props.card.position.x;
    state.offsetY = e.clientY - props.card.position.y;
    cardEl.value!.style.cursor = 'grabbing';
}
const mouseup = (e: MouseEvent) => {
    if (!state.isDraggableDragging) return;
    state.isDraggableDragging = false;
    cardEl.value!.style.cursor = 'pointer';

    let div: HTMLDivElement = document.querySelector("#canvas")!
    div.style.pointerEvents = "all"

}

const cardStyle = computed(() => {
    return {
        transform: `translate(${props.card.position.x}px,${props.card.position.y}px)`,
        width: props.card.size.width + 'px',
        height: props.card.size.height + 'px',

    }
})

</script>
<template>
    <div :cardReference="card.id" ref="cardEl"
        class="border select-none border-solid bg-gray-200  rounded-md shadow-sm  absolute p-2 " :style="cardStyle"
        @mousedown="mousedown" @mouseup="mouseup">
        {{ card?.content }}
    </div>
</template>
<style lang="scss"></style>