<script setup lang="ts">
import { D3DragEvent, drag, select, Selection } from 'd3';
import { computed, onMounted, ref } from 'vue';
import { state } from '../GlobalState';
const props = defineProps<{ card: ICard }>();

let cardEl = ref<HTMLDivElement>();
let line: Selection<HTMLDivElement, any, HTMLElement, any>;
onMounted(() => {
    line = select<HTMLDivElement, any>(`[cardreference='${props.card.id}']`)
})
const mousedown = (e: MouseEvent) => {
    if (state.mode === "normal") {
        e.stopPropagation()
        state.isDraggableDragging = true
        state.offsetX = e.clientX - props.card.position.x;
        state.offsetY = e.clientY - props.card.position.y;
        cardEl.value!.style.cursor = 'grabbing';
    }

}
const mouseup = () => {
    if (state.mode === "normal") {
        if (!state.isDraggableDragging) return;
        state.isDraggableDragging = false;
        cardEl.value!.style.cursor = 'pointer';

        let div: HTMLDivElement = document.querySelector("#canvas")!
        div.style.pointerEvents = "all"
    }


}

const cardStyle = computed(() => {
    return {
        transform: `translate(${props.card.position.x}px,${props.card.position.y}px)`,
        width: props.card.size.width + 'px',
        height: props.card.size.height + 'px',

    }
})
function dragstarted(d) {
    console.log(d)
    select<HTMLDivElement, any>("#canvas").append("svg").attr("width", 500).attr("height", 500).append("line")
        .attr("class", "line")
        .attr("x1", d.x)
        .attr("y1", d.y).attr("x2", d.x).attr("y2", d.y)
}

function dragged(event: D3DragEvent<HTMLDivElement, any, any>) {
    line.attr("x2", event.x)
        .attr("y2", event.y);
}
onMounted(() => {
    // 选择要拖动的元素
    const draggableElement = select<HTMLDivElement, any>("[cardreference]");
    const dragEvent = drag<HTMLDivElement, { x: number, y: number }>()
        .on("start", dragstarted).on("drag", dragged)
    draggableElement.call(dragEvent)
    // 创建拖动函数

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