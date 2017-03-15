import { HOST } from '../utils/config'
import _ from 'lodash'

const actions = {

  setUsername: ({commit}, username) => commit('setUsername', username),
  setReqCalled: ({commit}, b) => commit('setReqCalled', b),
  changePagPage: ({commit, state}, page) => {
    commit('changePaginationPage', page)
    requestData(state)
      .then(res => {
        commit('setRows', res.records)
        commit('setCount', Math.ceil(res.count/state.data.displayCount))
        document.getElementById('date').click()
      })
      .catch(res => console.log(res))
  },
  setOrder: ({commit, state}, order) => {
    commit('setOrder', order)
    requestData(state)
      .then(res => {
        commit('setRows', res.records)
        commit('setCount', Math.ceil(res.count/state.data.displayCount))
      })
      .catch(res => console.log(res))
  },
  getStatsData: ({commit, state}) => {
    requestStatsData()
    .then(res => res.json())
    .then(res => {
        getDiff(state.stats.data, res, commit)
        setTimeout(() => state.stats.data.newPlays.map(i => document.getElementById(i).className = 'positive'), 1)
        commit('setStatsData', res)
    })
    .catch(res => console.log(res))
  },
  getStats: ({ state, commit, dispatch }) => {
    if(state.statsReqCalled === true) return
    const currentPlays = state.stats.totalPlays
    const URL = `${HOST}/controller/stats.php?action=stats&cp=${currentPlays}&delay=${state.request.intervalTime}`
    const myRequest = new Request(URL)
    commit('setReqCalled', true)
    fetch(myRequest)
      .then(function(res) {
        if(res.status == 200) return res.json();
        else throw new Error('Something went wrong on api server!');
      })
      .then(function(data) {
        if(data.status == 'rec') {
          console.info('Timeout has been reached. Re-sending request..')
          commit('setReqCalled', false)
          dispatch('getStats')
        } else {
          const newPlays = data.totalPlays - state.stats.totalPlays
          const stats = {
            totalPlays: data.totalPlays,
            msgsCount: data.messages,
            donations: data.donations
          }
          if(newPlays > 0 && state.stats.totalPlays !== 0) commit('setNewPlays', newPlays)
          commit('setStats', stats)
          commit('setReqCalled', false)
          dispatch('getStats')
          dispatch('getStatsData')
        }
      })
      .catch(function(error) {
          console.error(error)
      })
  },
  setLogout: ({commit}) => commit('logout'),
  updateState: ({commit}) => commit('updateState'),
  updateRows: ({commit, state}, {artist, track}) => {
    const newArr = state.data.originalRows.filter(i => !(i.artist === artist && i.track === track))
    commit('updateRows', newArr)
  },
  setLogin({commit}, form) {
    const URL = HOST + '/controller/login.php'
    const myRequest = new Request(URL, {
      method: 'POST',
      body: new FormData(form)
    })

    fetch(myRequest)
      .then(function(response) {
          if(response.status == 200) return response.json();
          else throw new Error('Something went wrong on api server!');
      })
      .then(function(response) {
        if(response.status === true) commit('setLogin', true)
        else commit('setErrMsg', response.err)
      })
      .catch(function(error) {
          console.error(error)
      })
  },
  setIntervalTime({commit}, time) {
    commit('setIntervalTime', time)
  }
}

const requestData = (state) => {
  const { displayCount, displayOffset, order, username } = state.data
  return new Promise((resolve, reject) => {

    const URL = `${HOST}/controller/stats.php?action=errorsData&limit=${displayCount}&offset=${displayOffset}&order=${order}&username=${username}`
    const myRequest = new Request(URL)

    fetch(myRequest)
      .then(function(res) {
          if(res.status == 200) return res.json();
          else reject('Something went wrong on api server!');
      })
      .then(function(res) {
        resolve(res)
      })
      .catch(function(error) {
          reject(error)
      })
  })
}

const requestStatsData = () => {

    const URL = `${HOST}/controller/stats.php?action=tableData`
    const myRequest = new Request(URL)

    return fetch(myRequest)
}

const getDiff = (oldArr, newArr, commit) => {

  for (let i=0; i < oldArr.rows.length; i++) {
    const oldOBJ = _.find(oldArr.rows, {'username': oldArr.rows[i].username})
    const newOBJ = _.find(newArr, {'username': oldOBJ.username})
    if(oldOBJ.count !== newOBJ.count){
      commit('newPlaysIncr', newOBJ.id)
    }
  }
}

export default actions