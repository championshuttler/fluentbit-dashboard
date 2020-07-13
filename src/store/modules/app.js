const state = {
  sidebar: {
    opened: false,
  },
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
