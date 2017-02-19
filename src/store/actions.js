const actions = {
  setCount: ({commit}, count) => commit('setCount', count),
  changePagPage: ({commit}, page) => commit('changePaginationPage', page)
}

export default actions