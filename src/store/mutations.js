const mutations = {
  setCount(state, count){
    state.paginationCount = count
  },
  setMsgsCount(state, count){
    state.msgsCount = count
  },
  changePaginationPage(state, page){
    state.paginationPage = page + 1
    state.displayOffset = page * state.displayCount
  },
  setOriginalRows(state, rows){
    state.originalRows = rows
  },
  setLogin(state, login){
    state.logged = login
  },
  setErrMsg(state, msg){
    state.errMsg = msg
  },
  logout(state){
    state.logged = false
    state.errMsg = null
  },
  updateRows(state, newRows){
    state.originalRows = newRows
  },
  updateState(state){
    state.enableDelete = !state.enableDelete
  }
}

export default mutations