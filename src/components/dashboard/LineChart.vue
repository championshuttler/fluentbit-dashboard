<template>
  <div class="grid__container flex-center small">
    <chart class="canvas" v-if="flex" :height="220" :chart-data="flex"></chart>
  </div>
</template>

<script>
import Chart from './Chart.js'

export default {
  components: {
    Chart,
  },
  data () {
    return {
      flex: null,
      option: {
        legend: {
          labels: {
            fontColor: 'black',
          },
        },
      },
    }
  },
  mounted () {
    const self = this
    this.flex = {
      labels: this.labels,
      datasets: this.dataSet,
    }
    setInterval(() => {
      this.flex = {
        labels: self.labels,
        datasets: self.dataSet,
      }
    }, 5000)
  },
  props: {
    labels: {
      type: Array,
    },
    dataSet: {
      type: Array,
    },
    metricName: String,
  },
  responsive: true,
  maintainAspectRatio: false,
}
</script>

<style scoped>
  .canvas {
    color: white;
  }

  .small {
    max-height: 300px;
  }
</style>
