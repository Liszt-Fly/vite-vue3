<script setup lang="ts">
import { select, drag, line, curveBasis, curveBundle } from 'd3';
import { onMounted } from 'vue';

onMounted(() => {
    let div1 = select("#div1");
    let div2 = select("#div2");
    let path = select("#path");

    let lineGenerator = line().curve(curveBundle.beta(0.8));

    let dragBehavior = drag()
        .on("drag", function (event: any, d: any) {
            select(this)
                .style("transform", `translate(${d.x = event.x}px, ${d.y = event.y}px)`);
            updatePath();
        });

    div1.datum({ x: 50, y: 50 }).call(dragBehavior);
    div2.datum({ x: 200, y: 200 }).call(dragBehavior);

    function updatePath() {
        // Get the dimensions and positions of the divs
        let div1Rect = div1.node().getBoundingClientRect();
        let div2Rect = div2.node().getBoundingClientRect();

        // Calculate the midpoints of the divs
        let div1MidPoint = [div1Rect.left + div1Rect.width / 2, div1Rect.top + div1Rect.height / 2];
        let div2MidPoint = [div2Rect.left + div2Rect.width / 2, div2Rect.top + div2Rect.height / 2];

        // Calculate the midpoint of the line
        let midPoint = [(div1MidPoint[0] + div2MidPoint[0]) / 2, (div1MidPoint[1] + div2MidPoint[1]) / 2];

        // Draw the line
        path.attr("d", lineGenerator([div1MidPoint, midPoint, div2MidPoint]));
    }

    updatePath();

})
</script>
<template>
    <div id="div1"
        style="position: absolute; transform: translate(50px, 50px); width: 50px; height: 50px; background-color: red;">
    </div>
    <div id="div2"
        style="position: absolute; transform: translate(200px, 200px); width: 50px; height: 50px; background-color: blue;">
    </div>
    <svg width="800" height="600">
        <path id="path" stroke="black" stroke-width="2" fill="none"></path>
    </svg>
</template>
<style lang="scss"></style>