<template>
  <div class="dashboard">
    <div class="row row-equal">
      <div class="flex xs12 md6 lg6">
        <div class="va-card">
          <div class="va-card__header">
            <div class="va-card__header-inner">Fluentbit Data</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row row-equal">
      <div class="flex xs12 md6 lg6">
        <div class="va-card">
          <div class="va-card__header">
            <div class="va-card__header-inner">
              <line-chart :dataset="chartData" :labels="label"  :isReady="isReady"></line-chart>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row row-equal">
      <div class="flex xs12 md6 lg6">
        <div class="va-card">
          <div class="va-card__header">
            <div class="va-card__header-inner">
              <InputChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from './chart.vue'
import InputChart from './InputChart.vue'

import axios from 'axios'

export default {
  name: 'dashboard',
  components: {
    LineChart,
    InputChart,
  },
  data () {
    return {
      isReady: false,
      chartData: null,
      label: null,
    }
  },
  mounted () {
    this.isReady = false
    const api = 'http://127.0.0.1:2020'
    axios
      .get(`${api}/api/v1/metrics`)
      .then(response => {
        this.label = [response.data.input['cpu.0'].bytes, response.data.input['cpu.1'].bytes]
        this.chartData = [{
          label: 'CPU 1',
          fill: false,
          backgroundColor: 'red',
          data: [0, response.data.input['cpu.0'].records],
        },
        {
          label: 'CPU 2',
          backgroundColor: 'blue',
          fill: false,
          data: [0, response.data.input['cpu.1'].records],
        }]
        this.label = [4, 5, 59, 5]
        this.chartData = [{
          label: 'CPU 1',
          fill: false,
          backgroundColor: 'red',
          data: [4, 4, 4, 27],
        },
        {
          label: 'CPU 2',
          backgroundColor: 'blue',
          fill: false,
          data: [4, 5, 6, 5],
        }]
        this.isReady = true
      })
      .catch(err => console.log(err))
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
