<template>
  <el-row class="home">
    <el-col :span="24">
      <div id="chart"></div>

      <div id="barChart"></div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { reactive, onMounted, defineComponent } from "vue";

import * as d3 from "d3";

export default defineComponent({
  name: "inbound-detail",
  setup() {
    const WIDTH = 1000;
    const HEIGHT = 380;
    const BORDER = 50;
    const GAP = 60;

    let scaleX: any;
    let scaleY: any;
    let axisX: any;
    let axisY: any;
    let svg, elMain, elDragZone, elAxisX, elAxisY, elDateStartAll;
    let elContainer: any;
    let currentSlot = null;
    //

    let dateStartAll = new Date();
    dateStartAll.setMinutes(dateStartAll.getMinutes() + 10);
    dateStartAll.setSeconds(0);
    dateStartAll.setMilliseconds(0);

    let data = [
      { id: 1, name: "UT-002", startAt: 10 * 60, duration: 30 * 60 },
      { id: 3, name: "UT-003", startAt: 0 * 60, duration: 30 * 60 },
      { id: 4, name: "UT-004", startAt: 21 * 60, duration: 30 * 60 },
      { id: 2, name: "UT-001", startAt: 31 * 60, duration: 30 * 60 },
      { id: 5, name: "UT-001", startAt: 65 * 60, duration: 30 * 60 * 2 },
    ];

    function getDuration(date: any, duration: any) {
      return new Date(date.getTime() + duration * 1000);
    }

    function getCarList() {
      return data
        .map((x: any) => x.name)
        .sort()
        .reverse();
    }

    function buildDom() {
      // 設定 x 軸，時間
      scaleX = d3
        .scaleTime()
        .range([0, WIDTH - BORDER * 2])
        .domain([dateStartAll, getDuration(dateStartAll, 60 * 60 * 3)]);
      // 設定 Y軸，維修車編號
      scaleY = d3
        .scalePoint()
        .range([HEIGHT - BORDER * 2, 0])
        .padding(0.5)
        .domain(getCarList());

      // 設定刻度大小
      axisX = d3.axisBottom(scaleX).tickSizeInner(-HEIGHT + BORDER * 2);
      axisY = d3.axisLeft(scaleY).tickSizeInner(-WIDTH + BORDER * 2);

      // 設定 svg 畫布
      svg = d3
        .select("#chart")
        .append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT);
      // 加入 main 元素
      elMain = svg
        .append("g")
        .attr("class", "main")
        .attr("transform", "translate(" + BORDER + "," + BORDER + ")");
      // 加入 x 軸
      elMain
        .append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + (HEIGHT - BORDER * 2) + ")")
        .call(axisX);
      // 加入 y 軸
      elMain.append("g").attr("class", "axis axis--y").call(axisY);

      // 加入 Container
      elContainer = elMain
        .append("g")
        .attr("class", "container")
        .attr("clip-path", "url(#clip)");
    }
    let startDragMouseX: number;
    let startDragDuration: number;
    let startDragDate: any;

    function dragLeftStart(slot: any) {
      const data = slot.subject;
      if (slot.sourceEvent.screenX) {
        startDragMouseX = slot.sourceEvent.screenX;
      }

      startDragDuration = data.duration;
      startDragDate = getStart(data);

      console.log(startDragMouseX);
      console.log(startDragDuration);
      console.log(startDragDate);
      //selectSlot(data.id);
    }

    function selectSlot(slot: any) {
      // let slot = data.find((s) => s.id == id);
      elContainer.selectAll(".slot").select(".zone").classed("active", false);

      let p = elContainer.selectAll("slot");
      console.log(slot);
      p.each((d: any) => {
        console.log(d);
      });

      if (slot) {
        // console.log(slot);

        elContainer
          .selectAll(`.slot[uniqid='id${slot.id}']`)
          .select(".zone")
          .classed("active", true);
      }

      //updateDatas();
    }
    function dragLeftProgress(d: any) {
      //console.log(d);
    }

    function dragLeftEnd(slot: any) {
      startDragMouseX = 0;
      startDragDuration = 0;
      startDragDate = 0;
    }

    function getStart(slot: any) {
      return getDuration(dateStartAll, slot.startAt);
    }

    function getEnd(slot: any) {
      return getDuration(getStart(slot), slot.duration);
    }

    function getSlotHeight() {
      const l = getCarList().length;
      return Math.ceil((HEIGHT - 2 * BORDER) / l) - (l > 10 ? 0 : 30);
    }

    function getColor(name: any) {
      switch (name) {
        case "UT-001":
          return "#FFF176";
        case "UT-002":
          return "#E57373";
        case "UT-003":
          return "#FFB74D";
        case "UT-004":
          return "#81C784";
        case "E":
          return "rgba(16,39,102,1)";
        case "F":
          return "rgba(222,222,122,1)";
      }
    }

    function dragZoneStart(slot: any) {
      //startDragMouseX = d3.mouse(this)[0];
      selectSlot(slot);
    }
    function dragZoneProgress() {}
    function dragZoneEnd() {}

    function updateDatas() {
      //
      const updateSlots = elContainer
        .selectAll(".slot")
        .data(data, (d: any) => d.id); // 綁定 data 資料給予接下來的元素
      // 刪除多餘元素
      const exitSlots = updateSlots.exit();
      exitSlots.remove();

      exitSlots.transition().duration(500).attr("opacity", 0);
      // 重新繪製
      const enterSlots = updateSlots.enter();

      const slotHeight = getSlotHeight();

      // 加入 svg 的 g元素及其他標籤
      const entry = enterSlots
        .append("g")
        .attr("class", "solt")
        .attr("uniqid", (d: any) => d.id)
        .attr("name", (d: any) => d.name)
        .attr(
          "transform",
          (d: any) => `translate(${scaleX(getStart(d))}, ${scaleY(d.name)})`
        );

      // 繪製矩形
      entry
        .append("rect")
        .attr("class", "zone")
        .attr("x", 0)
        .attr("y", -slotHeight / 2)
        .attr("width", (d: any) => scaleX(getEnd(d)) - scaleX(getStart(d)))
        .attr("height", slotHeight)
        .attr("cursor", "move")
        .style("fill", (d: any) => getColor(d.name))
        .call(
          d3
            .drag()
            .on("start", dragZoneStart)
            .on("drag", dragZoneProgress)
            .on("end", dragZoneEnd)
        );

      entry
        .append("rect")
        .attr("class", "handlerLeft")
        .attr("x", (d: any) => -5)
        .attr("y", (d: any) => -slotHeight / 2)
        .attr("width", 10)
        .attr("height", slotHeight)
        .attr("cursor", "ew-resize")
        .style("fill", "grey")
        .attr("fill-opacity", 0)
        .call(
          d3
            .drag()
            .on("start", dragLeftStart)
            .on("drag", dragLeftProgress)
            .on("end", dragLeftEnd)
        );
    }
    onMounted(() => {
      buildDom();
      updateDatas();
    });
  },
});
</script>

<style>
.tick line {
  opacity: 0.2;
}
.drag-zone {
  opacity: 0;
}
.slot {
  border: 10px;
}
.zone.active {
  stroke: #e0e0e0;
  stroke-width: 2px;
}
</style>
