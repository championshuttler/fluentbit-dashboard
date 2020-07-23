<template>
  <div class="grid row" v-if="data">
    <va-badge class="mb-2" color="success">Input</va-badge>
    <chart  v-for="(plugin, index) in plugins" :key="index" :data="plugin" :pluginName="index"></chart>
  </div>
</template>

<script>
import Chart from '../Chart'

export default {
  components: {
    Chart,
  },
  props: {
    data: {
      type: [Boolean, Object],
    },
  },
  data () {
    return {
      plugins: {},
      processedData: {},
    }
  },
  watch: {
    data: {
      handler (newValue, oldValue) {
        if (!newValue) return
        this.plugins = newValue
      },
    },
  },
}
</script>
