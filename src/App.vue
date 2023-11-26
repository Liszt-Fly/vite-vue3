<script setup lang="ts">
import InfiniteBoard from './components/InfiniteBoard.vue';
import ToolBox from './components/ToolBox.vue';
</script>

<template>
    <infinite-board></infinite-board>
    <tool-box></tool-box>
</template>

<style scoped>
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
