<template>
  <div class="flex md12 xs12">
    <va-card title="Input Metrics" :style="computedStyle">
      <div class="row">
        <line-chart class="flex xs6 lg6" v-for="(value, name) in metrics" :key="name" :data-set="dataSets[name]" :metric-name="name" :labels="timeLabels"></line-chart>
      </div>
    </va-card>
  </div>
</template>

<script>
/* eslint-disable no-prototype-builtins */
import LineChart from './LineChart'
import moment from 'moment'

export default {
  computed: {
    computedStyle () {
      return {
        backgroundColor: this.$themes.dark,
        color: 'white',
      }
    },
  },
  components: {
    LineChart,
  },
  data () {
    return {
      metrics: {},
      timeLabels: this.initTimeLabel(),
      dataSets: {},
    }
  },
  props: {
    inputData: {
      type: Object,
    },
  },
  methods: {
    initTimeLabel () {
      const now = moment()
      return [
        `${now.format('h:mm')}`,
        `${now.add('minute', 2).format('h:mm')}`,
        `${now.add('minute', 2).format('h:mm')}`,
        `${now.add('minute', 2).format('h:mm')}`,
        `${now.add('minute', 2).format('h:mm')}`,
      ]
    },
    appendDataSet (metricName, lineLabel, data) {
      const metric = this.dataSets[metricName]
      for (let index = 0; index < metric.length; index++) {
        const element = metric[index]
        if (element.label === lineLabel) {
          if (element.data.length >= 5) element.data.shift()
          element.data.push(data)
          break
        }
      }
    },
    lineLabelExist (metric, lineLabel) {
      for (let index = 0; index < metric.length; index++) {
        const element = metric[index]
        if (element.label === lineLabel) return true
      }
      return false
    },
    setDataSets (data) {
      for (const lineLabel in data) {
        if (data.hasOwnProperty(lineLabel)) {
          const metrics = Object.keys(data[lineLabel])
          for (let index = 0; index < metrics.length; index++) {
            const metricName = metrics[index]
            const metric = this.dataSets[metricName]
            const lineData = data[lineLabel][metricName]
            if (typeof metric === 'undefined') {
              this.dataSets[metricName] = []
              this.dataSets[metricName].push({
                label: lineLabel,
                backgroundColor: 'rgba(50, 78, 238, 0.966)',
                fill: false,
                borderColor: 'rgba(0, 172, 224,1)',
                data: [lineData],
              })
              continue
            }
            if (this.lineLabelExist(metric, lineLabel)) {
              this.appendDataSet(metricName, lineLabel, lineData)
              continue
            } else {
              metric.push({
                label: lineLabel,
                borderColor: 'rgba(50, 199, 102,1)',
                fill: false,
                backgroundColor: '#f87979',
                data: [lineData],
              })
            }
          }
        }
      }
    },
    saveMetrics (metrics) {
      for (const key in metrics) {
        if (metrics.hasOwnProperty(key)) {
          if (typeof this.metrics === 'undefined') return
          if (typeof this.metrics[key] === 'undefined') this.metrics[key] = {}
        }
      }
    },
    setupMetrics (metrics) {
      for (const key in metrics) {
        if (metrics.hasOwnProperty(key)) {
          const element = metrics[key]
          this.saveMetrics(element)
        }
      }
    },
    setTimeLabels (time) {
      const timeLabels = this.timeLabels
      const lastTime = moment(timeLabels[timeLabels.length - 1], 'h:mm')
      if (moment().isAfter(lastTime)) {
        this.timeLabels.shift()
        this.timeLabels.push(`${lastTime.add('minute', 2).format('h:mm')}`)
      }
    },
  },
  watch: {
    inputData: {
      immediate: true,
      handler (newValue, oldValue) {
        if (newValue) {
          const { data, lock } = newValue
          if (!lock) this.setupMetrics(data)
          this.setTimeLabels()
          this.setDataSets(data)
        }
      },
    },
  },
}
</script>
