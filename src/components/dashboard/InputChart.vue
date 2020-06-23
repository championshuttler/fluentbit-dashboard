<template>
  <div>
    <h1 class="text-center pb-3">Input Plugin</h1>
    <line-chart v-if="loaded" :chart-data="datacollection"></line-chart>
  </div>
</template>

<script>
import LineChart from './chart.vue'
import axios from 'axios'
export default {
  components: {
    LineChart,
  },
  data () {
    return {
      datacollection: null,
      loaded: false,
      records: 0,
      bytes: 0,
      time: 0,
      test: '',
    }
  },

  methods: {
    fillData () {
      this.datacollection = {
        labels: this.time,
        datasets: [{
          label: 'Records',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          fill: false,
          borderColor: 'lightblue',
          pointBackgroundColor: 'blue',
          borderWidth: 1,
          pointBorderColor: 'blue',
          data: this.records,
        },
        {
          label: 'Byte',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'lightpink',
          pointBackgroundColor: 'red',
          fill: false,
          borderWidth: 1,
          pointBorderColor: 'red',
          // data: [6,7,6,8,7,8,6,7,6,6]
          data: this.bytes,
        },

        ],
        options: {
          scales: {
            xAxes: [{
              type: 'time',
              displayFormats: {
                quarter: 'h:mm a',
              },
            }],
          },
        },
      }
    },

    getInputPlugin () {
      //  setInterval(function(){
      const api = 'http://127.0.0.1:2020/api/v1/metrics'
      axios.get(api)
        .then((response) => {
          this.test = response.data.input['cpu.0']
          console.log(this.test)
          const rec = [0]
          const byt = [0]

          const array = []
          const date = new Date()

          // Here we will find the closest time
          // If it's 13:09 we'll iterate to 13:15 and stop
          //
          // We'll iterate fifteen times in the worst case scenario
          while (date.getMinutes() % 5 !== 0) {
            date.setMinutes(date.getMinutes() + 1)
          }

          // A whole day has 24 * 4 quarters of an hour
          // Let's iterate using for loop
          for (let i = 0; i < 24 * 4; i++) {
            array.push(date.getHours() + ':' + date.getMinutes())
            date.setMinutes(date.getMinutes() + 5)
          }
          // var dt = new Date()
          // var mt = dt.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })
          var time = array.slice(0, 6)
          for (let i = 3; i >= 0; i--) {
            var r = parseInt(this.test.records)
            console.log(r)

            var b = parseInt(this.test.bytes)

            rec.push(r)
            byt.push(b)
          }
          console.log(this.test)
          console.log(rec)
          console.log(byt)
          this.records = rec
          this.bytes = byt
          this.time = time
          this.loaded = true
          this.fillData()
        })
        .catch((err) => {
          console.log(err)
        })
      //  }, 3000);
    },

    startInterval () {
      setInterval(() => {
        this.getInputPlugin()
      }, 2000)
    },

  },

  created () {
    this.fillData()
    this.startInterval()
    this.loaded = false
    this.getInputPlugin()
  },
  mounted () {

  },
}

</script>

<style lang="scss" scoped>

</style>
