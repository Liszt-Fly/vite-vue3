<script setup lang="ts">
import { ref } from 'vue';

const canvas = ref<HTMLDivElement>()
const content = ref<HTMLDivElement>()
let isDragging = false
let lastX = 0
let lastY = 0
let translateX = 0, translateY = 0;
const mousedown = (e: MouseEvent) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    let canvas = e.target as unknown as HTMLDivElement
    canvas.style.cursor = "grabbing"
}
const mouseup = (e: MouseEvent) => {
    isDragging = false;
    let canvas = e.target as unknown as HTMLDivElement
    canvas!.style.cursor = 'grab';
}

const wheel = (e: WheelEvent) => {
    e.preventDefault();
    // 水平滚动时，平移画布
    translateX -= e.deltaX;
    // 垂直滚动时，平移画布
    translateY -= e.deltaY;
    updateTransform();
}
const updateTransform = () => {
    content.value!.style.transform = `translate(${translateX}px, ${translateY}px)`;
}
</script>
<template>
    <div id="canvas" ref="canvas" @mousedown="mousedown" @mouseup="mouseup" @wheel="wheel">
        <div class="content" id="content" ref="content">
            <div class="border border-solid bg-gray-200 w-[300px] h-[300px] rounded-md shadow-sm">123</div>
        </div>
    </div>
</template>
<style lang="scss">
#canvas {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    cursor: grab;
}

.content {
    position: absolute;
    width: 100%;
    height: 100%;
    will-change: transform;
}
</style>