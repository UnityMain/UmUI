<template>
  <div id="myChart" :style="{ width: '700px', height: '700px' }"></div>
</template>
<script>
export default {
  mounted() {
    var chartDom = document.getElementById("myChart");
    var myChart = this.$echarts.init(chartDom);
    var option;

    option = {
      series: [
        {
          type: "gauge",
          axisLine: {
            lineStyle: {
              width: 30,
              color: [
                [0.3, "#67e0e3"],
                [0.7, "#37a2da"],
                [1, "#fd666d"],
              ],
            },
          },
          pointer: {
            itemStyle: {
              color: "auto",
            },
          },
          axisTick: {
            distance: -30,
            length: 8,
            lineStyle: {
              color: "#fff",
              width: 2,
            },
          },
          splitLine: {
            distance: -30,
            length: 30,
            lineStyle: {
              color: "#fff",
              width: 4,
            },
          },
          axisLabel: {
            color: "auto",
            distance: 40,
            fontSize: 20,
          },
          detail: {
            valueAnimation: true,
            formatter: "{value} cm",
            color: "auto",
          },
          data: [
            {
              value: 130,
            },
          ],
        },
      ],
    };

    myChart.setOption(option);
  },
};
</script>
<style scoped></style>
