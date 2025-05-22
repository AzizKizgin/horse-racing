import { createStore } from 'vuex'

// global state for race round
export const store = createStore({
  state: () => ({
    round: 0,
  }),
  mutations: {
    increment(state) {
      state.round++
    },
  },
  actions: {
    increment({ commit }) {
      commit('increment')
    },
  },
})

export type RootState = ReturnType<typeof store.state>
export default store
