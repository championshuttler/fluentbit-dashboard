<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
    loaded: {
      type: Boolean,
      default: false,
    },
    dataset: {
      type: Array,
    },
    labels: {
      type: Array,
    },
    isReady: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isReady: {
      handler (newValue, oldValue) {
        if (newValue) {
          this.renderChart({
            labels: this.labels,
            datasets: this.dataset,
          }, {
            responsive: true,
          })
        }
      },
    },
  },
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  },
  responsive: true,
  maintainAspectRatio: false,
}
</script>
