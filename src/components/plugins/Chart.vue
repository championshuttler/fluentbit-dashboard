<template>
  <div class="flex md12 xs12 lg12">
    <va-card :style="computedStyle">
      <template slot="header">
        <div class="row">
          <div class="flex lg11">
            <h5 class="mt-0 mb-0">{{pluginName.toUpperCase()}}</h5>
          </div>
        </div>
      </template>
      <div class="row">
        <template v-for="(metric, index) in metrics">
          <line-chart :key="index" :label="pluginName" :metricName="metric" :data="dataset"></line-chart>
        </template>
      </div>
    </va-card>
  </div>
</template>

<script>
import LineChart from '../chart/LineChart'
import _ from 'lodash'
import AppConfig from '../../../app.config'

export default {
  mounted () {
    setInterval(() => {
      if (this.counter === 0) this.counter = 10
      this.counter--
    }, 1000)
  },
  computed: {
    computedStyle () {
      return {
        backgroundColor: 'rgba(26, 26, 26, 0.5)',
        color: 'white',
      }
    },
  },
  methods: {
    processData (object) {
      for (const key in object) {
        // eslint-disable-next-line no-prototype-builtins
        if (object.hasOwnProperty(key)) {
          this.createMetrics(key)
          this.pushData(object[key], key)
        }
      }
    },
    canPushDiff (metric) {
      const metricConfig = AppConfig.plugins[metric]
      if (!metricConfig) return false
      return metricConfig.showDiff || false
    },
    pushData (data, metric) {
      if (this.canPushDiff(metric)) {
        this.pushDifference(data, metric)
        this.saveAsPrevious(data, metric)
      } else {
        this.dataset[metric] = data
        this.dataset = _.clone(this.dataset)
      }
    },
    pushDifference (data, metric) {
      if (typeof this.previousData[metric] === 'undefined') {
        this.previousData[metric] = data
        this.dataset = _.clone(this.dataset)
      } else {
        this.dataset[metric] = (parseInt(data) - parseInt(this.previousData[metric]))
        this.dataset = _.clone(this.dataset)
      }
    },
    saveAsPrevious (value, metric) {
      this.previousData[metric] = value
    },
    createMetrics (metric) {
      if (!this.metrics.includes(metric)) {
        this.metrics.push(metric)
      }
    },
  },
  watch: {
    data: {
      handler (newValue, oldValue) {
        if (!newValue) return
        this.processData(newValue)
      },
    },
  },
  props: {
    pluginName: String,
    data: Object,
    showDifference: Boolean,
  },
  components: {
    LineChart,
  },
  data () {
    return {
      counter: 10,
      metrics: [],
      dataset: {},
      previousData: {},
    }
  },
}
</script>
