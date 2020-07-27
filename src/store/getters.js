const config = state => state.app.config
const palette = state => state.app.config.palette
const isLoading = state => state.app.isLoading
const graphColor = state => state.app.color
const showConfig = state => state.app.showConfig
const appPort = state => state.app.port
const appHost = state => state.app.host

export {
  config,
  palette,
  isLoading,
  graphColor,
  showConfig,
  appHost,
  appPort,
}
