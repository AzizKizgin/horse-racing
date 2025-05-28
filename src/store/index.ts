import { createStore } from 'vuex'

// global state for race round
export const store = createStore({
  state: () => ({
    round: 0,
    results: {},
    showResults: false,
    showHorseList: false,
  }),
  mutations: {
    increment(state) {
      state.round++
    },
    setResults(state, results) {
      state.results[state.round] = results
    },
    setShowResults(state, showResults) {
      state.showResults = showResults
    },
    setShowHorseList(state, showHorseList) {
      state.showHorseList = showHorseList
    },

    reset(state) {
      state.round = 0
      state.results = {}
      state.showResults = false
      state.showHorseList = false
    },
  },
  actions: {
    increment({ commit }) {
      commit('increment')
    },

    setResults({ commit }, results) {
      commit('setResults', results)
    },
    setShowResults({ commit }, showResults) {
      commit('setShowResults', showResults)
    },

    setShowHorseList({ commit }, showHorseList) {
      commit('setShowHorseList', showHorseList)
    },

    reset({ commit }) {
      commit('reset')
    },
  },
})

export type RootState = ReturnType<typeof store.state>
export default store
