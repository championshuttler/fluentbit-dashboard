<template>
  <div class="grid__container flex-center chart mx-2 my-2">
    <chart v-if="chartData" :height="220" :chart-data="chartData" :options="option"></chart>
  </div>
</template>

<script>
import Chart from './index.js'
import moment from 'moment'
import {
  getInitTime,
  replaceLastPopFirst,
  defaultChartOption,
  defaultDataSetConfig,
} from '../../utils/helper'

export default {
  components: {
    Chart,
  },
  data () {
    return {
      color: null,
      dataSize: 12,
      dataSets: [],
      privateLabel: getInitTime(this.dataSize),
      chartData: null,
      option: defaultChartOption(this.metricName),
    }
  },
  methods: {
    InitDataSets () {
      if (this.dataSets.length !== 0) return
      this.dataSets = [{
        label: this.label,
        ...defaultDataSetConfig(12, this.color),
      }]
    },
    updateDataSet (data) {
      if (this.dataSets.length !== 0) this.InitDataSets()
      const arr = this.dataSets[0].data
      if (this.dataSets[0].data.length >= this.dataSize) {
        this.dataSets[0].data = replaceLastPopFirst(this.dataSets[0].data, data)
      }
      this.dataSets[0].data = replaceLastPopFirst(arr, data)
      replaceLastPopFirst(this.privateLabel, moment().format('mm:ss'))
    },
    buildData () {
      this.chartData = {
        labels: this.privateLabel,
        datasets: this.dataSets,
      }
    },
  },
  mounted () {
    this.$store.dispatch('updateColor').then((value) => {
      this.color = value
      this.InitDataSets()
      this.privateLabel = getInitTime(this.dataSize)
      this.buildData()
    })
  },
  watch: {
    data: {
      handler (newValue, oldValue) {
        if (newValue) {
          this.updateDataSet(newValue[this.metricName])
          this.buildData()
        }
      },
    },
  },
  props: {
    label: {
      type: String,
    },
    data: {
      type: Object,
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
    background-color: rgba(46, 45, 45, 0.966);
    max-width: 48%;
    min-width: 48%;

    /* max-height: 300px;
    width: 100% !important; */
  }
</style>
