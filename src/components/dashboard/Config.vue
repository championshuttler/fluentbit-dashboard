<template>
  <va-modal
    v-model="showConfig"
    @ok="submit"
    @cancel="hideConfig"
    position="top"
    size="large"
    :title="'Configuration Details'"
    :message="'Enter Host and Port of the endpoint'"
    :okText="'Connect'"
    noOutsideDismiss
    cancelClass="none"
    noEscDismiss=false
  >
    <slot>
      <va-input
        v-model="host"
        placeholder="Host"
      />
      <va-input
        v-model="port"
        placeholder="Port"
      />
    </slot>
  </va-modal>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      stagePort: null,
      stageHost: null,
    }
  },
  computed: {
    ...mapGetters({
      showConfigStore: 'showConfig',
      appPort: 'appPort',
      appHost: 'appHost',
    }),
    port: {
      get () {
        return this.appPort
      },
      set (value) {
        this.stagePort = value
      },
    },
    host: {
      get () {
        return this.appHost
      },
      set (value) {
        this.stageHost = value
      },
    },
    showConfig: {
      get () {
        return this.showConfigStore
      },
      set (value) {
        return value
      },
    },
  },
  methods: {
    hideConfig () {
      this.$store.commit('updateShowConfig', false)
    },
    submit () {
      this.hideConfig()
      const host = this.stageHost || this.host
      const port = this.stagePort || this.port
      this.$store.commit('updateConfig', {
        port,
        host,
      })
    },
  },
}
</script>
