import AppConfig from '../../../app.config'

const getItem = (object, item) => {
  if (object === null) return null
  if (typeof object === 'object') return object[item]
  return null
}

const state = {
  port: getItem(JSON.parse(localStorage.getItem('fluent.config')), 'port') || getItem(AppConfig, 'port'),
  host: getItem(JSON.parse(localStorage.getItem('fluent.config')), 'host') || getItem(AppConfig, 'host'),
  sidebar: {
    opened: false,
  },
  showConfig: false,
  graphColors: [
    {
      color: 'red',
      taken: false,
    },
    {
      color: 'rgba(17, 99, 156,0.4)',
      taken: false,
    },
    {
      color: 'blue',
      taken: false,
    },
    {
      color: 'orange',
      taken: false,
    },
    {
      color: 'grey',
      taken: false,
    },
    {
      color: 'pink',
      taken: false,
    },
    {
      color: 'violet',
      taken: false,
    },
    {
      color: 'rgba(17, 99, 156,0.4)',
      taken: false,
    },
    {
      color: 'rgba(17, 99, 156,0.4)',
      taken: false,
    },
    {
      color: 'blue',
      taken: false,
    },
    {
      color: 'blue',
      taken: false,
    },
    {
      color: 'blue',
      taken: false,
    },
  ],
  config: {
    palette: {
      primary: '#4ae387',
      danger: '#e34a4a',
      info: '#4ab2e3',
      success: '#db76df',
      warning: '#f7cc36',
      white: '#fff',
      black: '#000',
      fontColor: '#34495e',
      transparent: 'transparent',
      lighterGray: '#ddd',
    },
  },
  isLoading: true,
}

const mutations = {
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  changeColor (state, index) {
    state.graphColors[index].taken = true
  },
  updateShowConfig (state, value) {
    state.showConfig = value
  },
  updateConfig (state, obj) {
    if (typeof obj !== 'object') throw new Error('value must be an object')
    state.port = obj.port
    state.host = obj.host
    localStorage.setItem('fluent.config', JSON.stringify({
      host: obj.host,
      port: obj.port,
    }))
  },
}

const actions = {
  updateColor ({ state, commit }) {
    const colors = state.graphColors
    for (let index = 0; index < colors.length; index++) {
      const color = colors[index]
      if (!color.taken) {
        commit('changeColor', index)
        return color.color
      }
    }
  },
}

export default {
  state,
  mutations,
  actions,
}
