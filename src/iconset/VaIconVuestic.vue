<template>
  <img src="../assets/icons/logo.png" :style="logoStyle"/>
</template>
<script>

export default {
  name: 'VaIconVuestic',
  inject: ['contextConfig'],
  computed: {
    logoStyle () {
      return {
        color: 'white',
      }
    },
    themeGradientId () {
      return this.contextConfig.invertedColor ? 'CORPORATE' : 'ORIGINAL'
    },
    textColor () {
      return this.contextConfig.invertedColor ? '#6E85E8' : '#E4FF32'
    },
  },
}
</script>

<style lang="scss">
.va-icon-vuestic {
  .st0 {
    fill: #4ae387;
  }
}
</style>
