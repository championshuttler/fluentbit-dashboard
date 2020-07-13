import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
    },
  },
  watch: {
    chartData: {
      handler (newValue, oldValue) {
        // Update graph on data change to solve update problem
        this.$data._chart.update()
      },
    },
  },
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  },
}
