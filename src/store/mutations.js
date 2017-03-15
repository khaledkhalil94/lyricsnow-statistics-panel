const mutations = {
  setCount(state, count){
    state.data.paginationCount = count
  },
  setOrder(state, order){
    state.data.order = order
  },
  setReqCalled(state, b){
    state.statsReqCalled = b
  },
  setUsername(state, username){
    state.data.username = username
  },
  setMsgsCount(state, count){
    state.msgsCount = count
  },
  setStats(state, stats){
    state.stats = Object.assign({}, state.stats, stats)
  },
  setNewPlays(state, plays){
    state.stats.newPlays += plays
  },
  setStatsData(state, rows){
    state.stats.data.rows = rows
  },
  newPlaysIncr(state, obj){
    state.stats.data.newPlays.push(obj)
  },
  changePaginationPage(state, page){
    state.data.paginationPage = page + 1
    state.data.displayOffset = page * state.data.displayCount
  },
  setRows(state, rows){
    state.data.originalRows = rows
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
    state.data.originalRows = newRows
  },
  setIntervalTime(state, time){
    state.request.intervalTime = parseInt(time)
  },
  updateState(state){
    state.enableDelete = !state.enableDelete
  }
}

export default mutations