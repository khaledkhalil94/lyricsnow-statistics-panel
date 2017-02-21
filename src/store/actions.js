const actions = {
  setCount: ({commit}, count) => commit('setCount', count),
  changePagPage: ({commit}, page) => commit('changePaginationPage', page),
  setRows: ({commit}, rows) => commit('setOriginalRows', rows),
}

export default actions