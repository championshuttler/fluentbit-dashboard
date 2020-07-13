<template>
  <div class="flex md12 xs12 lg12">
    <va-card :style="computedStyle">
      <template slot="header">
        <div class="row">
          <div class="flex lg11">
            <h5 class="mt-0 mb-0">{{pluginName.toUpperCase()}}</h5>
          </div>
          <div class="flex lg1">
            <div id="countdown">
              <div id="countdown-number">{{counter}}</div>
              <svg>
                <circle r="18" cx="20" cy="20"></circle>
              </svg>
            </div>
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
        backgroundColor: 'rgba(26, 26, 26, 0.966)',
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
    pushData (data, metric) {
      if (this.showDifference) {
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

<style scoped>
#countdown {
  display: inline-block;
  position: relative;
  margin: auto;
  margin-top: 5px;
  height: 40px;
  width: 40px;
  text-align: center;
}

#countdown-number {
  color: white;
  display: inline-block;
  line-height: 40px;
}

svg {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  transform: rotateY(-180deg) rotateZ(-90deg);
}

svg circle {
  stroke-dasharray: 113px;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-width: 2px;
  stroke: white;
  fill: none;
  animation: countdown 10s linear infinite forwards;
}

@keyframes countdown {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: 113px;
  }
}
</style>
