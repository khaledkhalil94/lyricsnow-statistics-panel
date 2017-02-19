const mutations = {
  setCount(state, count){
    state.paginationCount = count
  },
  changePaginationPage(state, page){
    state.paginationPage = page + 1
    state.displayOffset = page * state.displayCount
  }
}

export default mutations