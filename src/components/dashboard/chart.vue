<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['lineData', 'chartOptions'],
  mounted () {
    this.renderChart(this.lineData, this.chartOptions)
  }, /*,
    watch:{
      lineData () {
        this.renderChart(this.lineData, this.chartOptions);
    },
      chartOptions () {
        this.renderChart(this.lineData, this.chartOptions);
    }
    } */
  responsive: true,
  maintainAspectRatio: false,
}
</script>
