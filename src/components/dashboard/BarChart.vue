<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['barData', 'chartOptions'],
  mounted () {
    this.renderChart(this.barData, this.chartOptions)
  },

  responsive: true,
  maintainAspectRatio: false,
}
</script>
