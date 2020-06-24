<template>
  <div class="dashboard">
    <div v-if="isReady">
      <input-metrics :input-data="inputMetricsData"></input-metrics>
    </div>
    <div v-if="isReady">
      <input-metrics :output-data="outputMetricsData"></input-metrics>
    </div>
  </div>
</template>

<script>
import InputMetrics from './InputMetrics'
import axios from 'axios'
export default {
  name: 'dashboard',
  components: {
    InputMetrics,
  },
  methods: {
    axiosFetch (api) {
      return axios
        .get(`${api}/api/v1/metrics`)
        .then(({ data }) => {
          return data
        })
        .catch(err => console.log(err))
    },
    makeRequest (lock = false) {
      const api = 'http://127.0.0.1:2020'
      const date = new Date()
      const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      this.axiosFetch(api).then((data) => {
        this.inputMetricsData = {
          data: data.input,
          time,
          lock,
        }
        this.outputMetricsData = {
          data: data.output,
          time,
          lock,
        }
        this.isReady = true
      })
    },
  },
  data () {
    return {
      isReady: false,
      inputMetricsData: null,
      outputMetricsData: null,
    }
  },
  mounted () {
    this.makeRequest()
    setInterval(() => {
      this.makeRequest(true)
    }, 5000)
  },
}
</script>

<style lang="scss">
.row-equal .flex {
  .va-card {
    height: 100%;
  }
}

.dashboard {
  .va-card {
    margin-bottom: 0 !important;
  }
}
</style>
