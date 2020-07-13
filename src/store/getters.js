const config = state => state.app.config
const palette = state => state.app.config.palette
const isLoading = state => state.app.isLoading
const graphColor = state => state.app.color

export {
  config,
  palette,
  isLoading,
  graphColor,
}
