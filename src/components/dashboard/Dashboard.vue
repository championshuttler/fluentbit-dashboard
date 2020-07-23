<template>
  <div class="dashboard">
    <config-input></config-input>
    <template>
      <va-notification color="danger" v-if="error" closeable>
        <va-badge color="danger">
          Error
        </va-badge>
        Can't establish connection to {{host}}:{{port}} check if host is receiving connection or check CORS extension.
        <va-button @click="showConfig">Settings</va-button>
      </va-notification>
      <template v-show="!error">
        <input-plugin  :data="inputPluginData"></input-plugin>
        <filter-plugin :data="filterPluginData"></filter-plugin>
        <output-plugin :data="outputPluginData"></output-plugin>
      </template>
    </template>
  </div>
</template>

<script>
import InputPlugin from '../plugins/input/Index'
import FilterPlugin from '../plugins/filters/Index'
import OutputPlugin from '../plugins/output/Index'
import ConfigInput from './Config'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  components: {
    InputPlugin,
    FilterPlugin,
    OutputPlugin,
    ConfigInput,
  },
  computed: {
    ...mapGetters({
      port: 'appPort',
      host: 'appHost',
    }),
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
    showConfig () {
      this.$store.commit('updateShowConfig', true)
    },
    axiosFetch () {
      const self = this
      return axios
        .get(`http://${this.host}:${this.port}/api/v1/metrics`)
        .then(({ data }) => {
          self.error = false
          return data
        })
        .catch(() => {
          self.error = true
        })
    },
    makeRequest () {
      const self = this
      console.log('Fetch...')
      self.axiosFetch().then((data) => {
        self.apiData = data
        console.log('Fetched ...')
        self.interval = setInterval(() => {
          self.axiosFetch().then((data) => {
            self.apiData = data
          })
        }, 10000)
      })
    },
  },
  data () {
    return {
      apiData: null,
      error: false,
      interval: null,
      showSmallModal: false,
    }
  },
  mounted () {
    this.makeRequest()
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
