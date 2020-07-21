
<template>
  <va-modal
    v-model="showConfig"
    @ok="submit"
    @cancel="hideConfig"
    position="top"
    size="large"
    :title="'Enter Configuration Details'"
    :message="'You need to enter Host and Port of the endpoint'"
    :okText="'Submit'"
    noOutsideDismiss
    cancelClass="none"
    noEscDismiss
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
  computed: {
    port: {
      get () {
        return this.appPort
      },
      set (value) {
        return value
      },
    },
    host: {
      get () {
        return this.apppHost
      },
      set (value) {
        return value
      },
    },
    ...mapGetters({
      showConfigStore: 'showConfig',
      appPort: 'appPort',
      appHost: 'appHost',
    }),
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
      this.$store.commit('updateShowConfig', false)
      this.$store.commit('updateConfig', {
        port: this.port,
        host: this.host,
      })
      this.$emit('configUpdated', {
        port: this.port,
        host: this.host,
      })
    },
  },
}
</script>
