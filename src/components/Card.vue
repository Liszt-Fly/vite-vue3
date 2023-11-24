<script setup lang="ts">
const props = defineProps<{ card: ICard }>()
console.log(props.card.id)
</script>
<template>
    <div class="border select-none border-solid bg-gray-200  rounded-md shadow-sm  absolute p-2 " :style="{
        width: card?.size.width + 'px', height: card?.size.height + 'px', left: card?.position.x + 'px', top:
            card?.position.y + 'px'
    }">
        {{ card?.content }}
    </div>
</template>
<style lang="scss"></style>