<template>
  <div class="grid__container flex-center chart mx-2 my-2">
    <chart v-if="flex" :height="220" :chart-data="flex" :options="option"></chart>
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
        responsive: true,
        legend: {
          labels: {
            fontColor: 'rgba(255, 255, 255, 0.973)',
          },
        },
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                color: 'rgba(161, 161, 161, 0.973)',
                lineWidth: 1,
              },
              ticks: {
                fontColor: 'white',
                position: 'right',
              },
              scaleLabel: {
                display: true,
                fontColor: 'white',
                fontStyle: 'bold',
                labelString: 'Time',
              },
            },
          ],
          yAxes: [{
            display: true,
            position: 'right',
            gridLines: {
              color: 'rgba(161, 161, 161, 0.973)',
              lineWidth: 1,
            },
            ticks: {
              fontColor: 'white',
              maxTicksLimit: 6,
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              fontStyle: 'bold',
              fontColor: 'white',
              labelString: this.metricName.charAt(0).toUpperCase() + this.metricName.slice(1),
            },
          }],
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
}
</script>

<style scoped>
  /* @media only screen and (max-width: 1500px) {
    .small {
      width: 100%;
    }
  } */

  .chart {
    color: rgba(161, 161, 161, 0.973);
    background-color: rgba(46, 45, 45, 0.5);
    max-width: 48%;
    min-width: 48%;

    /* max-height: 300px;
    width: 100% !important; */
  }
</style>
