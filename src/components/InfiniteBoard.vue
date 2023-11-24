<script setup lang="ts">
import { reactive, ref } from 'vue';
import { createCard } from '../card/card';
import Card from './Card.vue'
import { state } from '../GlobalState';
import { mitter } from '../mitt';

const canvas = ref<HTMLDivElement>()
const content = ref<HTMLDivElement>()
let currentCard: ICard | null = null
let cardCurrentX: number = 0; // 元素的当前 X 位置
let cardCurrentY: number = 0; // 元素的当前 Y 位置
let draggableStartX: number = 0; let draggableStartY: number = 0;

let lastX: number = 0
let lastY: number = 0
let translateX = 0, translateY = 0;
const getCard = (e: MouseEvent) => {
    let target: HTMLDivElement = e.target as HTMLDivElement
    let card = cards.find(item => item.id === target.getAttribute('cardReference'))
    if (card) {
        currentCard = card
        return card
    }
    else {
        currentCard = null
        return null
    }


}
const mousedown = (e: MouseEvent) => {
    console.log(getCard(e))
    state.isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    let canvas = e.target as unknown as HTMLDivElement
    canvas.style.cursor = "grabbing"
}
const mouseup = (e: MouseEvent) => {
    state.isDragging = false;
    let canvas = e.target as unknown as HTMLDivElement
    canvas!.style.cursor = 'grab';
    mitter.emit("mouseup")

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
const dbClick = (e: MouseEvent) => {
    if (getCard(e)) return
    let card = createCard({ x: e.x - translateX, y: e.y - translateY }, { height: 100, width: 300 })
    cards.push(card)
}
const mousemove = (e: MouseEvent) => {

    if (!currentCard) return
    if (state.isDraggableDragging) {

        let transformX = e.clientX - state.offsetX
        let transformY = e.clientY - state.offsetY

        currentCard.position.x = transformX
        currentCard.position.y = transformY
        console.log(currentCard.position)

    }
}


const cards: ICard[] = reactive([])

</script>
<template>
    <div id="canvas" ref="canvas" @mousedown.capture="mousedown" @mouseup="mouseup" @wheel="wheel" @dblclick.exact="dbClick"
        @mousemove="mousemove">
        <div class="content" id="content" ref="content">
            <template v-for="card in cards">
                <Card :card="card"></Card>
            </template>
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