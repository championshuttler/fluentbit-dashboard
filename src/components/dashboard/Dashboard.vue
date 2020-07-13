<template>
  <div class="dashboard">
    <va-notification color="danger" v-if="error" closeable>
      <va-badge color="danger">
        Error
      </va-badge>
      Check if the backend is up or check CORS extension is enabled or not.
    </va-notification>
    <template v-if="!error">
      <input-plugin  :data="inputPluginData"></input-plugin>
      <filter-plugin :data="filterPluginData"></filter-plugin>
      <output-plugin :data="outputPluginData"></output-plugin>
    </template>
  </div>
</template>

<script>
import InputPlugin from '../plugins/input/Index'
import FilterPlugin from '../plugins/filters/Index'
import OutputPlugin from '../plugins/output/Index'

import axios from 'axios'
export default {
  name: 'dashboard',
  components: {
    InputPlugin,
    FilterPlugin,
    OutputPlugin,
  },
  computed: {
    inputPluginData () {
      if (this.apiData) return this.apiData.input
      return false
    },
    filterPluginData () {
      if (this.apiData) return this.apiData.filter
      return false
    },
    outputPluginData () {
      if (this.apiData) return this.apiData.output
      return false
    },
  },
  methods: {
    axiosFetch (api) {
      const self = this
      return axios
        .get(`${api}/api/v1/metrics`)
        .then(({ data }) => {
          self.error = false
          return data
        })
        .catch(() => {
          self.error = true
        })
    },
    makeRequest () {
      const api = 'http://127.0.0.1:2020'
      this.axiosFetch(api).then((data) => {
        this.apiData = data
      })
    },
  },
  data () {
    return {
      apiData: null,
      error: false,
    }
  },
  mounted () {
    // To initialize values
    this.makeRequest()
    this.makeRequest()
    setInterval(() => {
      this.makeRequest(true)
    }, 10000)
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
